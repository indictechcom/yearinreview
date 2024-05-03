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
import { CdxCard } from "@wikimedia/codex";
import InputTaker from "./layouts/userInputLayout";
import UserStat from "./layouts/userStatLayout";

export default {
	name: "Index",
	components: {
		InputTaker,
		UserStat,
		CdxCard
	},
	methods: {
		statclickhandler() {
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
