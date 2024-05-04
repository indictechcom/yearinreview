<template>
	<UserCard
		:cardId="currentCardIndex"
		:imageURL="this.cards[currentCardIndex] && this.cards[currentCardIndex].image ? this.cards[currentCardIndex].image.source : ''"
		:cardTitle="this.cards[currentCardIndex] && this.cards[currentCardIndex].messagePrefix ? this.cards[currentCardIndex].messagePrefix : ''"
		:cardEndText="this.cards[currentCardIndex] && this.cards[currentCardIndex].messageSuffix ? this.cards[currentCardIndex].messageSuffix : ''"
		:cardEndLimit="this.cards.length"
		:onNextClick="goNext"
		:onPreviousClick="goBack"
	>
		<template #userCardMiddle>
			<div v-if="this.cards[currentCardIndex] && this.cards[currentCardIndex].type === CARD_TYPE.USER_STATS">
				<div v-if="this.cards[currentCardIndex] && this.cards[currentCardIndex].value" style="font-size: 96px;"> {{this.cards[currentCardIndex].value}} </div>
				<div v-if="this.cards[currentCardIndex] && this.cards[currentCardIndex].qualifier" style="font-size: 26px"> {{this.cards[currentCardIndex].qualifier}} </div>
			</div>
			<div v-else>
				<div v-if="this.cards[currentCardIndex] && this.cards[currentCardIndex].shareStats && this.cards[currentCardIndex].shareStats.editCount"> Edit count: {{this.cards[currentCardIndex].shareStats.editCount}} </div>
				<div v-if="this.cards[currentCardIndex] && this.cards[currentCardIndex].shareStats && this.cards[currentCardIndex].shareStats.talkCount"> Talk count: {{this.cards[currentCardIndex].shareStats.talkCount}} </div>
				<div v-if="this.cards[currentCardIndex] && this.cards[currentCardIndex].shareStats && this.cards[currentCardIndex].shareStats.thanksCount"> Thanks count: {{this.cards[currentCardIndex].shareStats.thanksCount}} </div>
				<div v-if="this.cards[currentCardIndex] && this.cards[currentCardIndex].shareStats && this.cards[currentCardIndex].shareStats.thankedCount"> Thanked count: {{this.cards[currentCardIndex].shareStats.thankedCount}} </div>
			</div>
		</template>
	</UserCard>
</template>

<script>
	import UserCard from "../components/cards/UserCard";
	import Button from "../components/Button";
	import { CARD_TYPE } from "../helpers/consts";

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
			return {
				CARD_TYPE
			}
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
