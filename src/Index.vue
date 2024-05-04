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
      :cards="cards"
    />
  </div>
</template>

<script>
import { CdxCard } from "@wikimedia/codex";
import InputTaker from "./layouts/userInputLayout";
import UserStat from "./layouts/userStatLayout";
import { SCREEN_TYPE } from "./helpers/consts";
import { CARD_TYPE } from "./helpers/consts";
import helper from "./utils/backend_helper";
import { getUserEdits } from "../src/utils/backend_helper";
import {
  WIKIPEDIA,
  PUZZLE,
  PUZZLE_COLLAB,
  PEN_PAPER,
  MEETING,
  FRIENDSHIP,
  COMMUNITY,
} from "./helpers/consts.js";

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
    statclickhandler(username, selectedLang, selectedProject, previousYear) {
      this.currentPage = SCREEN_TYPE.USER_STATS_SCREEN;
      this.currentCardIndex = 0;
      console.log(
        "[DEBUG] statclickhandler",
        username,
        selectedLang,
        selectedProject,
        previousYear
      );
      this.start(username, selectedLang, selectedProject, previousYear);
    },
    start(username, selectedLang, selectedProject, previousYear) {
      let project = (
        selectedLang +
        "." +
        selectedProject +
        ".org"
      ).toLowerCase();

      this.currentPage = 0;
      const loader = setInterval(() => {
        this.loading++;
      }, 1000);
      const err = (er) => {
        console.log("error", er);
        this.error = true;
        this.currentPage = -1;
        clearInterval(loader);
        this.loading = 0;
      };
      const statuschecker = setInterval(() => {
        this.status = helper.getStatus();
      }, 300);
      console.log("start", username, previousYear, project);

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
            image: WIKIPEDIA,
            messagePrefix: "You made",
            value: toReadable(stats.totalEdits),
            qualifier: "edits",
            messageSuffix: "across the project",
          });
        } else {
          this.pages.push({
            image: WIKIPEDIA,
            messagePrefix: "You didn't edit this project this year, but...",
            qualifier: YEAR,
            messageSuffix:
              "is another year to contribute to the sum of all human knowledge!",
          });
        }
        if (stats.paragraphs) {
          this.pages.push({
            image: PUZZLE,
            messagePrefix: "Editing approximately",
            value: toReadable(stats.paragraphs),
            qualifier: "paragraphs",
            messageSuffix: "of text!",
          });
        }
        if (stats.articleEdits > 0) {
          this.pages = this.pages.concat([
            {
              messagePrefix: "You made",
              value: toReadable(stats.articleEdits),
              qualifier: "edits",
              image: PEN_PAPER,
              messageSuffix: `in ${toReadable(
                stats.articlesNumber
              )} different articles`,
            },
            {
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
              messagePrefix: "You made contributions to",
              image: stats.thumbs[0],
              messageSuffix: `[[<a class="wikiLink" href="${wikiUrl(
                topTitle
              )}">${topTitle}</a>]]`,
            },
            ...stats.top5.slice(1).map((t, i) => {
              return {
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
              messagePrefix: wasThanked
                ? "And you showed appreciation to"
                : "You showed appreciation to",
              image: COMMUNITY,
              value: toReadable(stats.thanksCount),
              qualifier: "other humans",
            },
            {
              messagePrefix: "Thank you caring!",
              messageSuffix: "We appreciate you!",
            },
          ]);
        }
        if (stats.topThanksTo.length) {
          this.pages = this.pages.concat([
            {
              messagePrefix: `@${stats.topThanksTo[0].title}`,
              //value: stats.topThanksTo[0].count,
              //qualifier: 'User'
              messageSuffix: "was the user you thanked the most",
            },
          ]);
        }
        console.log(stats);
        if (stats.topThanksFrom.length) {
          this.pages = this.pages.concat([
            {
              messagePrefix: `@${stats.topThanksFrom[0].user}`,
              messageSuffix: "was your biggest fan",
            },
          ]);
        }
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
  },
  data() {
    // api call here
    return {
      SCREEN_TYPE: SCREEN_TYPE,
      loading: false,
      currentPage: SCREEN_TYPE.USER_INPUT_SCREEN,
      currentCardIndex: -1,
      cards: [
        {
          type: CARD_TYPE.USER_STATS,
          header: "header",
          extra: {},
          text: "text",
          end: "end",
        },
        {
          type: CARD_TYPE.USER_SUMMARY,
          header: "header2",
          extra: {
            summary: "abc",
          },
          text: "text2",
          end: "end2",
        },
      ],
    };
  },
};
</script>
