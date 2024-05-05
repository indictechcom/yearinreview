<template>
	<UserCard
	  :cardId="currentCardIndex"
	  :imageURL="this.cards[currentCardIndex] && this.cards[currentCardIndex].image ? this.cards[currentCardIndex].image.source : ''"
	  :cardTitle="this.cards[currentCardIndex] && this.cards[currentCardIndex].messagePrefix ? this.cards[currentCardIndex].messagePrefix : ''"
	  :cardEndText="this.cards[currentCardIndex] && this.cards[currentCardIndex].messageSuffix ? this.cards[currentCardIndex].messageSuffix : ''"
	  :cardEndLimit="this.cards.length"
	  :onNextClick="goNext"
	  :onPreviousClick="goBack"
	>
	  <template #userCardMiddle>
		<p style="font-size: 20px;" v-if="this.cards[currentCardIndex] && this.cards[currentCardIndex].type !== CARD_TYPE.USER_STATS">{{this.cards[currentCardIndex].shareStats.project}} </p>
		<div v-if="this.cards[currentCardIndex] && this.cards[currentCardIndex].type === CARD_TYPE.USER_STATS">
		  <div v-if="this.cards[currentCardIndex] && this.cards[currentCardIndex].value" style="font-size: 96px;"> {{this.cards[currentCardIndex].value}} </div>
		  <div v-if="this.cards[currentCardIndex] && this.cards[currentCardIndex].qualifier" style="font-size: 26px"> {{this.cards[currentCardIndex].qualifier}} </div>
		</div>
		<div v-else style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;">
		  <div v-if="this.cards[currentCardIndex] && this.cards[currentCardIndex].shareStats && this.cards[currentCardIndex].shareStats.editCount" class="stat-item">
			<cdx-button action="destructive">
			  <cdx-icon :icon="cdxIconEdit" />
			</cdx-button>
			<br/>
			{{this.cards[currentCardIndex].shareStats.editCount}} Edits
		  </div>
		  <div v-if="this.cards[currentCardIndex] && this.cards[currentCardIndex].shareStats && this.cards[currentCardIndex].shareStats.talkCount" class="stat-item">
			<cdx-button action="destructive">
			  <cdx-icon :icon="cdxIconEdit" />
			</cdx-button>
			<br/>
			{{this.cards[currentCardIndex].shareStats.talkCount}} talk page edits
		  </div>
		  <div v-if="this.cards[currentCardIndex] && this.cards[currentCardIndex].shareStats && this.cards[currentCardIndex].shareStats.thanksCount" class="stat-item">
			<cdx-button action="destructive">
			  <cdx-icon :icon="cdxIconEdit" />
			</cdx-button>
			<br/>
			{{this.cards[currentCardIndex].shareStats.thanksCount}} thanks
		  </div>
		  <div v-if="this.cards[currentCardIndex] && this.cards[currentCardIndex].shareStats && this.cards[currentCardIndex].shareStats.thankedCount" class="stat-item">
			<cdx-button action="destructive">
			  <cdx-icon :icon="cdxIconEdit" />
			</cdx-button>
			<br/>
			{{this.cards[currentCardIndex].shareStats.thankedCount}} thanked
		  </div>
		</div>
		<p v-if="this.cards[currentCardIndex] && this.cards[currentCardIndex].type !== CARD_TYPE.USER_STATS">Generate your own Year in Review at <a href="https://yearinreview.toolforge.org/"> yearinreview.toolforge.org</a></p>
	  </template>
	</UserCard>
  </template>
  
  <script>
  import UserCard from "../components/cards/UserCard";
  import Button from "../components/Button";
  import { CARD_TYPE } from "../helpers/consts";
  import { CdxIcon } from '@wikimedia/codex';
  import { cdxIconEdit } from '@wikimedia/codex-icons';
  import USER_STATS_IMAGE from "../assets/images/WP20Symbols_MediaWiki.svg";

  export default {
	name: "UserStat",
	components: {
	  UserCard,
	  Button,
	  CdxIcon
	},
	setup() {
	  return {
		cdxIconEdit,
		USER_STATS_IMAGE
	  };
	},
	props: {
	  currentCardIndex: Number,
	  cards: Array,
	  goNext: Function,
	  goBack: Function
	},
	data() {
	  return {
		CARD_TYPE
	  }
	}
  }
  </script>
  
  <style scoped>

  .stat-item {
	padding: 10px;
	/* border: 1px solid #ccc; */
	border-radius: 5px;
  }
  </style>
  