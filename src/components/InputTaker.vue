<template>
	<cdx-select
		required
		v-model:selected="langselection"
		:menu-items="languagelist"
		default-label="Choose a language"
	/>
	<cdx-select
        required
        v-model:selected="projectselection"
		:menu-items="wikiprojectlist"
		default-label="Choose project"
	/>
	<cdx-text-input
        required
        pattern="^[^:]+$"
        @keyup.enter="start"
        type="text"
        v-model="username"
		placeholder="What's your username"
      ></cdx-text-input>
	  <cdx-button @click="statclickhandler">Show stats</cdx-button>
</template>
<script>

import {
	CdxTextInput,
	CdxButton,
	CdxSelect
} from "@wikimedia/codex";

import { WIKIMEDIA_COMMONS_DROPDOWN_WITH_LANGUAGE } from "../helpers/consts";

export default {
	name: "InputTaker",
	components: {
		CdxTextInput,
		CdxButton,
		CdxSelect
	},
	props: ["statclickhandler"],
	data() {
		return {
			languageCode: "en",
			project: "wikipedia",
			username: "",
			languagelist: [
				{ label: 'ml', value: 'ml' },
				{ label: 'en', value: 'en' },
			],
			langselection: null,
			wikiprojectlist: WIKIMEDIA_COMMONS_DROPDOWN_WITH_LANGUAGE,
			projectselection: null
		}
	}
}
</script>
