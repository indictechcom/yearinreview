<template>
  <p>User stat screen</p>
  <a class="cdx-card cdx-card--is-link" href="https://www.example.com">
    <span class="cdx-card__text">
      <span class="cdx-card__thumbnail cdx-thumbnail">
        <img
          class="cdx-thumbnail__image"
          src="../assets/images/WP20Symbols_MediaWiki.svg"
          alt="Thumbnail Image"
        />
      </span>
      <span class="cdx-card__text__title">You made</span>
      <span class="cdx-card__text__description" style="font-size: 32px"
        >11 edits</span
      >
      <span class="cdx-card__text__description">across this project</span>
      <cdx-button action="progressive" weight="primary"> Next </cdx-button>
      <cdx-button> Back </cdx-button>
    </span>
  </a>
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
export default {
  name: "UserStat",
  components: {
    CdxButton,
    CdxCard,
    CdxSelect,
    CdxIcon,
    CdxMessage,
    CdxTextInput,
  },
};
</script>

<style scoped>
.cdx-card {
  width: 450px;
  height: 500px;
  border-radius: 10%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: #f0f0f0; /* Add background color as needed */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Add shadow for depth */
}

.cdx-card__text {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.cdx-thumbnail__image {
  height: 150px;
  width: auto;
  max-width: 100%;
}
</style>
