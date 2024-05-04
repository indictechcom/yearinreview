<template>
  <img style="width: 24%; margin: 20px auto" src="../assets/images/WP20Symbols_MediaWiki.svg" />
  <BaseCard :id="cardId">
    <template #bCardTop>
      <h1 class="contribution-header">Wikimedia contributions</h1>
      <p class="contribution-subheader">
        Let's look back at all the good work you have been doing this year in
        helping build the best place on the Internet!
      </p>
    </template>
    <template #bCardMiddle>
      <div class="input-layout">
        <cdx-select
          required
          :menu-items="languagelist"
          :selected="selectedLang"
          @update:selected="handleLanguageChange"
          default-label="Choose a language"
        ></cdx-select>
        <cdx-select
          required
          :disabled="!selectedLang"
          :selected="selectedProject"
          :menu-items="wikiprojectlist"
          @update:selected="handleProjectChange"
          default-label="Choose project"
        />
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
    statclickhandler: Function
  },
  
  data() {
    return {
      project: "wikipedia",
      selectedProject: null,
      selectedLang: null,
      username: "",
      languagelist: [],
      wikiprojectlist: [],
    };
  },
  created() {
    this.updateLanguageList();
  },
  methods: {
    handleLanguageChange(modelValue) {
      this.selectedLang = modelValue;

      this.updateProjectList();
    },
    handleProjectChange(modelValue) {
      this.selectedProject = modelValue;
    },
    async updateLanguageList() {
      res = await Object.values(apiresponse.sitematrix);
      if (apiresponse && apiresponse.sitematrix) {
        this.languagelist = res
          .map((item) => {
            return { label: item.name, value: item.code };
          })
          .filter(
            (item) => item.label !== undefined && item.value !== undefined
          );
      } else {
        console.error("Invalid API response format");
      }
    },
    async updateProjectList() {
      console.log("updateProjectList");
      console.log(this.selectedLang);

      res = await Object.values(apiresponse.sitematrix);
      let projectListItem = res.find((item) => item.code === this.selectedLang);

      let projectList = projectListItem.site;
      if (projectList) {
        this.wikiprojectlist = projectList
          .map((item) => {
            return { label: item.sitename, value: item.code };
          })
          .filter(
            (item) => item.label !== undefined && item.value !== undefined
          );
      } else {
        console.error("Invalid API response format");
      }
    },
  },
};
</script>
<style scoped>
.input-layout {
	padding: 2rem;
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
	gap: 1rem;

	input {
		text-align: center;
	}

  @media only screen and (max-width: 640px) {
      padding: 1rem;
  }
}
.contribution-header{
  font-weight: 300;
  margin: 10px auto;
}
.contribution-subheader {
  width: 90%;
  margin: 20px auto;
  
}
</style>
