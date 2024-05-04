<template>
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
      :selected="selectedProject"
      :menu-items="wikiprojectlist"
      @update:selected="handleProjectChange"
      default-label="Choose project"
    />
    <cdx-text-input
      required
      pattern="^[^:]+$"
      type="text"
      v-model="username"
      placeholder="Whats your username"
    ></cdx-text-input>
    <cdx-button @click="statclickhandler">Show stats</cdx-button>
  </div>
</template>
<script>
import { CdxTextInput, CdxButton, CdxSelect } from "@wikimedia/codex";

import apiresponse from "../mocks/apiresponse.json";

export default {
  name: "InputTaker",
  components: {
    CdxTextInput,
    CdxButton,
    CdxSelect,
  },
  props: ["statclickhandler"],
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
