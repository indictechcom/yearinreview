<template>
  <div class="wrapper">
      <!-- first screen -->
      <input-taker
        :statclickhandler="statclickhandler"
        v-if="currentPage === 'inputTaker'"
      ></input-taker>
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
    CdxCard,
  },
  methods: {
    statclickhandler() {
      this.currentPage = "userStat";
    },
  },
  data() {
    return {
      loading: false,
      currentPage: "inputTaker",
    };
  },
};
</script>
