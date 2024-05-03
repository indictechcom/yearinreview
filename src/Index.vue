<template>
	<div class="wrapper">
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
		<!-- first screen -->
		<input-taker></input-taker>
		<!-- second screen -->
		<user-stat></user-stat>
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

const thumbnailData = {
	width: 200,
	height: 150,
	url: 'https://upload.wikimedia.org/wikipedia/commons/e/ed/WP20Symbols_MediaWiki.svg'
};

export default {
	name: "Index",
	components: {
		InputTaker,
		UserStat,
		CdxCard
	},
	data() {
		return {
			loading: true,
			currentPage: "inputTaker",
			thumbnailData
		}
	}
}
</script>
<style>
</style>
