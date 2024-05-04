<template>
	<div class="stat-wrapper">
		<UserCard
			:cardId="currentCardIndex"
			:type="cards[currentCardIndex].type"
			:cardTitle="cards[currentCardIndex].header"
			:cardEndText="cards[currentCardIndex].end"
			:cardEndLimit="cards.length"
			:onNextClick="goNext"
			:onPreviousClick="goBack"
		>
			<template v-if="Object.keys(cards[currentCardIndex].extra).length > 0" #userCardMiddle>
				<div v-for="(value, key) in cards[currentCardIndex].extra" :key="key">
					{{ key }}: {{ value }}
				</div>
			</template>
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
	  Button
	},
	props:{
		currentCardIndex: Number,
		cards: Array,
		goNext: Function,
		goBack: Function
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
