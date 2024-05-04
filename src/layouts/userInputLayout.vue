<template>
  <BaseCard :id="cardId">
    <template #bCardTop>
      <h1>Wikimedia contributions</h1>
      <p>
        Let's look back at all the good work you have been doing this year in
        helping build the best place on the Internet!
      </p>
    </template>
    <template #bCardMiddle>
      <div class="input-layout">
        <cdx-select
          required
          :disabled="!selectedLang"
          :selected="selectedProject"
          :menu-items="wikiprojectlist"
          @update:selected="handleProjectChange"
          default-label="Choose project"
        />
        <cdx-select
          required
          :menu-items="languagelist"
          :selected="selectedLang"
          @update:selected="handleLanguageChange"
          default-label="Choose a language"
        ></cdx-select>
        <cdx-text-input
          required
          :disabled="!selectedProject"
          pattern="^[^:]+$"
          type="text"
          v-model="username"
          placeholder="Whats your username"
        ></cdx-text-input>
        <Button buttonText="Show stats" @click="statclickhandler"
          >Show stats</Button
        >
      </div>
    </template>
  </BaseCard>
</template>
<script>
import { CdxTextInput, CdxButton, CdxSelect } from "@wikimedia/codex";
import Button from "../components/Button.vue";

import apiresponse from "../mocks/apiresponse.json";
import BaseCard from "../components/cards/BaseCard";

import { WIKIMEDIA_COMMONS_DROPDOWN_WITH_LANGUAGE } from "../helpers/consts";
import { WIKIMEDIA_COMMONS_DROPDOWN_WITHOUT_LANGUAGE} from "../helpers/consts"

export default {
  name: "InputTaker",
  components: {
    CdxTextInput,
    CdxButton,
    CdxSelect,
    Button,
    BaseCard,
  },
  props: {
    statclickhandler: Function,
  },

  data() {
    return {
      project: "wikipedia",
      selectedProject: null,
      selectedLang: "en",
      username: "",
      languagelist: [],
      wikiprojectlist: [...WIKIMEDIA_COMMONS_DROPDOWN_WITH_LANGUAGE, ...WIKIMEDIA_COMMONS_DROPDOWN_WITHOUT_LANGUAGE]
    };
  },

  // watch for changes in selectedProject, and calls updateLanguageList
  watch: {
    selectedProject: {
      handler: 'updateLanguageList',
      immediate: true
    }
  },

  methods: {
    handleLanguageChange(modelValue) {
      this.selectedLang = modelValue;
    },
    handleProjectChange(modelValue) {
      this.selectedProject = modelValue;
    },

    async updateLanguageList() {
      res = await Object.values(apiresponse.sitematrix);
      // use try - catch here
      if (apiresponse && apiresponse.sitematrix && this.selectedProject) {

         this.languagelist = res.map(mainItem => {

          const matchedSite = mainItem && typeof mainItem === "object" && mainItem.site.find(item => {
            return item.sitename.toLowerCase().trim() === this.selectedProject.toLowerCase().trim();
          });
          
          if (matchedSite && typeof matchedSite === "object") {
            return { label: mainItem.name, value: mainItem.code };
          } else {
            return null; 
          }
        }).filter(item => item !== null && item !== undefined);
      } else {
        console.error("Invalid API response format");
      }
    },
  },
};
</script>
