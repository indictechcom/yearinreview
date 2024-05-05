<template>
  <div class="wrapper">
    <!-- first screen -->
    <input-taker
      v-if="currentPage === SCREEN_TYPE.USER_INPUT_SCREEN"
      :statclickhandler="statclickhandler"
    />
    <!-- second screen -->
    <user-stat
      v-if="currentPage === SCREEN_TYPE.USER_STATS_SCREEN"
      :currentCardIndex="currentCardIndex"
      :goNext="goNext"
      :goBack="goBack"
      :copyToClipboard="copyToClipboard"
      :cards="cards"
    />
  </div>
</template>

<script>
import { CdxCard } from "@wikimedia/codex";
import InputTaker from "./layouts/userInputLayout";
import UserStat from "./layouts/userStatLayout";
import { SCREEN_TYPE } from "./helpers/consts";
import { toRaw } from "vue";
import helper from "./utils/backend_helper";
import {
  WIKIPEDIA,
  PUZZLE,
  PUZZLE_COLLAB,
  PEN_PAPER,
  MEETING,
  FRIENDSHIP,
  COMMUNITY,
  CARD_TYPE,
  WIKIPEDIA_KNOWLEDGE,
  WIKIPEDIA_HASHFLAG,
  WIKIPEDIA_MOONCYCLE
} from "./helpers/consts.js";
import * as htmlToImage from "html-to-image";

const humanDay = (day) => {
  return [
    "Sundays",
    "Mondays",
    "Tuesdays",
    "Wednesdays",
    "Thursdays",
    "Fridays",
  ][day];
};

const currentDate = new Date();
const MONTH = currentDate.getMonth();
const CURRENT_YEAR = currentDate.getFullYear();
const YEAR = MONTH === 11 ? CURRENT_YEAR + 1 : CURRENT_YEAR;
const PREVIOUS_YEAR = YEAR - 1;

const LAST_FIVE = [YEAR - 1, YEAR - 2, YEAR - 3, YEAR - 4, YEAR - 5].map(
  (year) => ({
    label: `${year}`,
    value: year,
  })
);

export default {
  name: "Index",
  components: {
    InputTaker,
    UserStat,
    CdxCard,
  },
  data() {
    return {
      nextYear: YEAR,
      feedback: "",
      loading: 0,
      status: "",
      error: false,
      editCount: 0,
      activePage: null,
      currentPage: -1,
      pages: [],
      project: "",
      username: "",
    };
  },
  methods: {
    async statclickhandler(username, selectedLang, selectedProject, previousYear) {
      await this.start(username, selectedLang, selectedProject, previousYear);
      this.currentCardIndex = 0;
      this.currentPage = SCREEN_TYPE.USER_STATS_SCREEN;
    },
    async start(username, selectedLang, selectedProject, previousYear) {
      let project = (selectedLang && selectedLang + ".") + selectedProject + ".org".toLowerCase();
      this.project = project;
      this.currentPage = 0;
      const loader = setInterval(() => {
        this.loading++;
      }, 1000);
      const err = (er) => {
        this.error = true;
        this.currentPage = -1;
        clearInterval(loader);
        this.loading = 0;
      };
      const statuschecker = setInterval(() => {
        this.status = helper.getStatus();
      }, 300);

      helper(username, previousYear, project).then((stats) => {
        clearInterval(loader);
        clearInterval(statuschecker);
        this.loading = 0;
        this.editCount = stats.totalEdits;
        this.talkCount = stats.talkEdits;
        this.thanksCount = stats.thanksCount;
        this.thankedCount = stats.thankedCount;
        if (!this.editCount || this.editCount === 0) {
          //return err();
        }

        const toReadable = (num) => {
          let msg = num;
          if (num > 1000) {
            const thousands = parseInt(num / 1000, 10);
            if (thousands > 0) {
              msg = `${thousands}K+`;
            }
          }
          return `${msg}`;
        };
        const topDay = stats.dayofweek[0];
        this.pages = [];
        if (stats.totalEdits) {
          this.pages.push({
            type: CARD_TYPE.USER_STATS,
            image: WIKIPEDIA,
            messagePrefix: "You made",
            value: toReadable(stats.totalEdits),
            qualifier: "edits",
            messageSuffix: "across the project",
          });
        } else {
          this.pages.push({
            type: CARD_TYPE.USER_STATS,
            image: WIKIPEDIA,
            messagePrefix: "You didn't edit any Wiki project this year, but...",
            qualifier: YEAR,
            messageSuffix:
              "is another year to contribute to the sum of all human knowledge!",
          });
        }
        if (stats.paragraphs) {
          this.pages.push({
            type: CARD_TYPE.USER_STATS,
            image: WIKIPEDIA_KNOWLEDGE,
            messagePrefix: "Editing approximately",
            value: toReadable(stats.paragraphs),
            qualifier: "paragraphs",
            messageSuffix: "of text!",
          });
        }
        if (stats.articleEdits > 0) {
          this.pages = this.pages.concat([
            {
              type: CARD_TYPE.USER_STATS,
              messagePrefix: "You made",
              value: toReadable(stats.articleEdits),
              qualifier: "edits",
              image: PEN_PAPER,
              messageSuffix: `in ${toReadable(
                stats.articlesNumber
              )} different articles`,
            },
            {
              type: CARD_TYPE.USER_STATS,
              messagePrefix: "You edited the most on",
              class: "smaller",
              image: PUZZLE_COLLAB,
              value: humanDay(parseInt(topDay.day, 10)),
              messageSuffix: `${topDay.count} edits`,
            },
          ]);
        }
        const wikiUrl = (t) => {
          return `https://${this.project}/wiki/${encodeURIComponent(t)}`;
        };
        if (stats.top5[0]) {
          let topTitle = stats.top5[0].title;
          this.pages = this.pages.concat([
            {
              type: CARD_TYPE.USER_STATS,
              messagePrefix: "You made contributions to",
              image: stats.thumbs[0],
              messageSuffix: `[[<a class="wikiLink" href="${wikiUrl(
                topTitle
              )}">${topTitle}</a>]]`,
            },
            ...stats.top5.slice(1).map((t, i) => {
              return {
                type: CARD_TYPE.USER_STATS,
                image: stats.thumbs[i + 1],
                messagePrefix: "and",
                messageSuffix: `[[<a class="wikiLink" href="${wikiUrl(
                  t.title
                )}">${t.title}</a>]]`,
              };
            }),
          ]);
        }

        if (stats.talkEdits > 0) {
          this.pages.push({
            type: CARD_TYPE.USER_STATS,
            messagePrefix: "You contributed",
            image: MEETING,
            value: toReadable(stats.talkEdits),
            qualifier: "times",
            messageSuffix: "to discussions.",
          });
        }

        let wasThanked = false;
        if (stats.thanksCount > 0) {
          wasThanked = true;
          this.pages = this.pages.concat([
            {
              type: CARD_TYPE.USER_STATS,
              messagePrefix: "You were appreciated by",
              image: FRIENDSHIP,
              value: toReadable(stats.thankedCount),
              qualifier: "editors",
            },
          ]);
        }
        if (stats.thanksCount > 0) {
          this.pages = this.pages.concat([
            {
              type: CARD_TYPE.USER_STATS,
              messagePrefix: wasThanked
                ? "And you showed appreciation to"
                : "You showed appreciation to",
              image: COMMUNITY,
              value: toReadable(stats.thanksCount),
              qualifier: "other humans",
            },
            {
              type: CARD_TYPE.USER_STATS,
              messagePrefix: "Thank you caring!",
              messageSuffix: "We appreciate you!",
            },
          ]);
        }
        if (stats.topThanksTo.length) {
          this.pages = this.pages.concat([
            {
              type: CARD_TYPE.USER_STATS,
              messagePrefix: `@${stats.topThanksTo[0].title}`,
              //value: stats.topThanksTo[0].count,
              //qualifier: 'User'
              messageSuffix: "was the user you thanked the most",
            },
          ]);
        }
        
        if (stats.topThanksFrom.length) {
          this.pages = this.pages.concat([
            {
              type: CARD_TYPE.USER_STATS,
              messagePrefix: `@${stats.topThanksFrom[0].user}`,
              messageSuffix: "was your biggest fan",
            },
          ]);
        }

        if (this.pages.length > 0) {
          this.pages = this.pages.concat([
            {
              type: CARD_TYPE.USER_SUMMARY,
              messagePrefix: "@" + username,
              messageSuffix: previousYear,
              image: PUZZLE,
              shareStats: {
                  project: this.project,
                  editCount: toReadable(stats.totalEdits) ?? 0,
                  talkCount: toReadable(stats.talkEdits) ?? 0,
                  thanksCount: toReadable(stats.thanksCount) ?? 0,
                  thankedCount: toReadable(stats.thankedCount) ?? 0,
              }
            }
          ])
        }
        // const res = JSON.parse(JSON.stringify(this.pages));
        this.cards = this.pages;
        this.currentCardIndex = 0;
        this.activePage = this.pages[this.currentPage];
      }, err);
    },
    goNext() {
      if (this.currentCardIndex < this.cards.length - 1)
        this.currentCardIndex += 1;
    },
    goBack() {
      if (this.currentCardIndex > 0) {
        this.currentCardIndex -= 1;
      }
    },
    async copyToClipboard() {
      const SHARE_TEXT = `Here is how I have been contributing to Wikipedia in ${PREVIOUS_YEAR}!`;
      const share = (blob) => {
        let msg = "";
        try {
          navigator.clipboard.write([
            new ClipboardItem({
              "image/png": blob,
            }),
          ]);
          msg = "An image has been shared to your clipboard.";
        } catch (error) {
          console.log("ERROR1: ", error)
          // pass.
          try {
            navigator.clipboard.writeText(
              `${SHARE_TEXT} Edits: 10, Discussions: 1, Thanks: 2, Thanked: 4 #wikipediaYIR`
            );
            msg = "Text has been shared to your clipboard.";
          } catch (error) {
            console.log("ERROR2: ", error)
            console.log("clipboard text error", error);
          }
        }
        if (navigator.share) {
          const file = new File([blob], "share.png", blob);
          if (navigator.canShare({ files: [file] })) {
            const shareData = {
              title: `Wikipedia Year In Review (${PREVIOUS_YEAR})`,
              text: SHARE_TEXT,
              files: [file],
              url: `https://${location.host}`,
            };
            return navigator.share(shareData).then(
              () => msg,
              (err) => {
                console.log("share error", err);
              }
            );
          }
        }
        return msg ? Promise.resolve(msg) : Promise.reject();
      };
      this.error = false;
      this.feedback = "";
      const node = document.querySelector(".share-stat-box");
      try {
        const res = await htmlToImage
        .toBlob(node); 
      } catch (error) {
        console.log("ERROR3: ", error)
      }
      console.log("DEBUG: ", res)
      htmlToImage
        .toBlob(node)
        .then((blob) => {
          share(blob).then(
            (msg) => {
              this.feedback = msg;
              this.error = false;
            },
            (err) => {
              console.log(err);
              this.error = true;
            }
          );
        })
        .catch(function (error) {
          this.error = true;
        });
    },
  },
  data() {
    // api call here
    return {
      SCREEN_TYPE: SCREEN_TYPE,
      loading: false,
      currentPage: SCREEN_TYPE.USER_INPUT_SCREEN,
      currentCardIndex: -1,
      cards: []
    };
  },
};
</script>
