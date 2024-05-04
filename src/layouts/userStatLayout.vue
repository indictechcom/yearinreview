<template>
	<UserCard
		:cardId="currentCardIndex"
		:cardTitle="this.cards[currentCardIndex].messagePrefix"
		:cardEndText="this.cards[currentCardIndex].messageSuffix"
		:cardEndLimit="this.cards.length"
		:onNextClick="goNext"
		:onPreviousClick="goBack"
	>
		<template #userCardMiddle>
			<div v-if="this.cards[currentCardIndex].value"> {{this.cards[currentCardIndex].value}} </div>
			<div v-if="this.cards[currentCardIndex].qualifier"> {{this.cards[currentCardIndex].qualifier}} </div>
		</template>
	</UserCard>
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
		props: {
			currentCardIndex: Number,
			cards: Array,
			goNext: Function,
			goBack: Function
		},
		data() {
			console.log(this.cards)
		}
	}
</script>
  
<style scoped>
	.stat-wrapper {
	width: 100%;
	margin: 1rem auto;
	padding: 2rem;
	}
</style>
