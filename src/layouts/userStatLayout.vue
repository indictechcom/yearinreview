<template>
  <UserCard
    :type="cards[currentCardIndex] && cards[currentCardIndex].type"
    :cardId="currentCardIndex"
    :imageURL="cards[currentCardIndex]?.image?.source || ''"
    :cardTitle="cards[currentCardIndex]?.messagePrefix || ''"
    :cardEndText="cards[currentCardIndex]?.messageSuffix || ''"
    :cardEndLimit="cards.length"
    :onNextClick="goNext"
    :onPreviousClick="goBack"
  >
    <template #userCardMiddle>
      <p v-if="cards[currentCardIndex] && cards[currentCardIndex].type !== CARD_TYPE.USER_STATS" style="font-size: 20px;">
        {{ cards[currentCardIndex]?.shareStats.project }}
      </p>
      <div v-if="cards[currentCardIndex]?.type === CARD_TYPE.USER_STATS">
        <div v-if="cards[currentCardIndex]?.value" style="font-size: 96px;">
          {{ cards[currentCardIndex].value }}
        </div>
        <div v-if="cards[currentCardIndex]?.qualifier" style="font-size: 26px">
          {{ cards[currentCardIndex].qualifier }}
        </div>
      </div>
      <div v-else style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;">
        <div v-if="cards[currentCardIndex]?.shareStats?.editCount" class="stat-item">
          <cdx-icon :icon="cdxIconEdit" />
          <br/><br/>
          {{ cards[currentCardIndex].shareStats.editCount }} Edits
        </div>
        <div v-if="cards[currentCardIndex]?.shareStats?.talkCount" class="stat-item">
          <cdx-icon :icon="cdxIconMessage" /><br /><br/>
          {{ cards[currentCardIndex].shareStats.talkCount }} <span style="padding-top: 5px">talk page edits</span>
        </div>
        <div v-if="cards[currentCardIndex]?.shareStats?.thanksCount" class="stat-item">
          <cdx-icon :icon="cdxIconUserTalk" />
          <br/><br />
          {{ cards[currentCardIndex].shareStats.thanksCount }} thanks
        </div>
        <div v-if="cards[currentCardIndex]?.shareStats?.thankedCount" class="stat-item">
          <cdx-icon :icon="cdxIconUserTalk" />
          <br/><br />
          {{ cards[currentCardIndex].shareStats.thankedCount }} thanked
        </div>
      </div>
      <p v-if="cards[currentCardIndex]?.type !== CARD_TYPE.USER_STATS">
        Generate your own Year in Review at <a href="https://yearinreview.toolforge.org/">yearinreview.toolforge.org</a>
      </p>
    </template>
  </UserCard>
  <div class="buttons-area">
    <div class="card-nav-buttons">
      <Button 
        buttonText="Next"
        :onClick="goNext"
        v-if="currentCardIndex !== cards.length - 1"
      />
    </div>
    <div v-if="cards[currentCardIndex]?.type === CARD_TYPE.USER_SUMMARY">
      <p class="thankyou-para">
        Thank you for viewing your year in <br> review and for contributing to the <br> sum of all human knowledge.
      </p>
      <p class="base-para">Happy 2024!</p>
      <Button
        :onClick="copyToClipboard"
        buttonText="Share stats"
        :iconLink="cdxIconShare"
        :iconClass="'icon-class'"
      />
    </div>  
  </div>
</template>

<script>
import UserCard from "../components/cards/UserCard";
import Button from "../components/Button";
import { CARD_TYPE } from "../helpers/consts";
import { CdxIcon } from '@wikimedia/codex';
import { cdxIconEdit, cdxIconMessage, cdxIconUserTalk, cdxIconShare } from '@wikimedia/codex-icons';

export default {
  name: "UserStat",
  components: {
    UserCard,
    Button,
    CdxIcon
  },
  props: {
    currentCardIndex: Number,
    cards: Array,
    goNext: Function,
    goBack: Function,
    copyToClipboard: Function
  },
  setup() {
    return {
      cdxIconEdit,
      cdxIconMessage,
      cdxIconUserTalk,
      cdxIconShare // Include cdxIconShare in the setup
    };
  },
  data() {
    return {
      CARD_TYPE
    };
  }
};
</script>

<style scoped>
.buttons-area {
  width: 50%;
  padding: 1rem;
}
.card-nav-buttons {
  margin: 0 auto;
  justify-content: center;
  gap: 10px;
}
.thankyou-para {
  color: white;
  text-align: center;
  font-size: 20px;
}
.base-para {
  color: white;
  text-align: center;
  font-size: 30px;
}
</style>
