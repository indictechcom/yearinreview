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
import { CARD_TYPE } from "./helpers/consts"

export default {
	name: "Index",
	components: {
		InputTaker,
		UserStat,
		CdxCard
	},
	methods: {
		statclickhandler() {
			this.currentPage = SCREEN_TYPE.USER_STATS_SCREEN;
			this.currentCardIndex = 0;
		},
		goNext() {
			if(this.currentCardIndex < this.cards.length - 1)
				this.currentCardIndex += 1;
		},
		goBack() {
			if(this.currentCardIndex > 0){
				this.currentCardIndex -= 1;
			}
		}
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
					end: "end"
				},
				{
					type: CARD_TYPE.USER_SUMMARY,
					header: "header2",
					extra: {
						summary: "abc"
					},
					text: "text2",
					end: "end2"
				}
			]
		}
	}
}
</script>
