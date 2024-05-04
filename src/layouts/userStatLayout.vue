<template>
  <div class="stat-wrapper">
    <UserCard
      cardId="1"
      type="single-stat"
      cardTitle="Card Title"
      cardEndText="End text"
    >
      <template #userCardMiddle> Single stat content </template>
    </UserCard>
    <UserCard
      cardId="2"
      type="stat-summary"
      cardTitle="Card Title"
      cardEndText="End text"
    >
      <template #userCardMiddle> Stat summary card content </template>
    </UserCard>
  </div>
</template>

<script>
import UserCard from "../components/cards/UserCard";
import Button from "../components/Button";

export default {
  name: "UserStat",
  components: {
    UserCard,
    Button,
  },
  data() {
    return {
      cards: [
        {
          type: "single-stat",
          header: "header",
          extra: {},
          text: "text",
          end: "end",
        },
        {
          type: "stat-summary",
          header: "header2",
          extra: {
            sumary: "abc",
          },
          text: "text2",
          end: "end2",
        },
      ],
    };
  },
};
</script>

<style scoped>
.stat-wrapper {
  width: 100%;
  margin: 1rem auto;
  padding: 2rem;
}
</style>
