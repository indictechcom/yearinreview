<template>
	<div class="wrapper">
		<img
			class="header-image"
			src="./assets/images/WP20Symbols_MediaWiki.svg"
			height="201"
		/>
		<h1>Wikimedia contributions</h1>
		<h2>Year in review</h2>
		<cdx-card>
			<template #title>
				How consistent have you been?
			</template>
			<template #description>
				Let's look back at all the good work you have been doing this year in helping build the best place on the Internet!
			</template>
		</cdx-card>
		<div v-if="loading">Loading</div>
		<!-- first screen -->
		<input-taker :statclickhandler="statclickhandler" v-if="currentPage === 'inputTaker'"></input-taker>
		<!-- second screen -->
		<user-stat v-if="currentPage === 'userStat'"></user-stat>
	</div>
</template>

<script>
import {
  CdxButton,
  CdxIcon,
  CdxTextInput,
  CdxMessage,
  CdxSelect,
  CdxCard,
} from "@wikimedia/codex";
import InputTaker from "./components/InputTaker"
import UserStat from "./components/UserStat"

export default {
	name: "Index",
	components: {
		InputTaker,
		UserStat,
		CdxCard
	},
	methods: {
		statclickhandler() {
			console.log("computing stats");
			this.currentPage = "userStat";
		}
	},
	data() {
		return {
			loading: false,
			currentPage: "inputTaker",
		}
	}
}
</script>
<style>
</style>
