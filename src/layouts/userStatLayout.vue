<template>
	<UserCard
	  :type="this.cards[currentCardIndex] && this.cards[currentCardIndex].type"
	  :cardId="currentCardIndex"
	  :imageURL="this.cards[currentCardIndex] && this.cards[currentCardIndex].image ? this.cards[currentCardIndex].image.source : ''"
	  :cardTitle="this.cards[currentCardIndex] && this.cards[currentCardIndex].messagePrefix ? this.cards[currentCardIndex].messagePrefix : ''"
	  :cardEndText="this.cards[currentCardIndex] && this.cards[currentCardIndex].messageSuffix ? this.cards[currentCardIndex].messageSuffix : ''"
	  :cardEndLimit="this.cards.length"
	  :onNextClick="goNext"
	  :onPreviousClick="goBack"
	>
	  <template #userCardMiddle>
		<p style="font-size: 20px;" v-if="this.cards[currentCardIndex] && this.cards[currentCardIndex].type !== CARD_TYPE.USER_STATS">{{this.cards[currentCardIndex].shareStats.project}} </p>
		<div v-if="this.cards[currentCardIndex] && this.cards[currentCardIndex].type === CARD_TYPE.USER_STATS">
		  <div v-if="this.cards[currentCardIndex] && this.cards[currentCardIndex].value" style="font-size: 96px;"> {{this.cards[currentCardIndex].value}} </div>
		  <div v-if="this.cards[currentCardIndex] && this.cards[currentCardIndex].qualifier" style="font-size: 26px"> {{this.cards[currentCardIndex].qualifier}} </div>
		</div>
		<div v-else style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;">
		  <div v-if="this.cards[currentCardIndex] && this.cards[currentCardIndex].shareStats && this.cards[currentCardIndex].shareStats.editCount" class="stat-item">
			  <cdx-icon :icon="cdxIconEdit" />
			<br/><br/>
			{{this.cards[currentCardIndex].shareStats.editCount}} Edits
		  </div>
		  <div v-if="this.cards[currentCardIndex] && this.cards[currentCardIndex].shareStats && this.cards[currentCardIndex].shareStats.talkCount" class="stat-item">
			<cdx-icon :icon="cdxIconMessage" /><br /><br/>
			{{this.cards[currentCardIndex].shareStats.talkCount}} <span style="padding-top: 5px">talk page edits</span>
		  </div>
		  <div v-if="this.cards[currentCardIndex] && this.cards[currentCardIndex].shareStats && this.cards[currentCardIndex].shareStats.thanksCount" class="stat-item">
			  <cdx-icon :icon="cdxIconUserTalk" />
			<br/><br />
			{{this.cards[currentCardIndex].shareStats.thanksCount}} thanks
		  </div>
		  <div v-if="this.cards[currentCardIndex] && this.cards[currentCardIndex].shareStats && this.cards[currentCardIndex].shareStats.thankedCount" class="stat-item">
			  <cdx-icon :icon="cdxIconUserTalk" />
			<br/><br />
			{{this.cards[currentCardIndex].shareStats.thankedCount}} thanked
		  </div>
		</div>
		<p v-if="this.cards[currentCardIndex] && this.cards[currentCardIndex].type !== CARD_TYPE.USER_STATS">Generate your own Year in Review at <a href="https://yearinreview.toolforge.org/"> yearinreview.toolforge.org</a></p>
	  </template>
	</UserCard>
	<div class="buttons-area">
		<div class="card-nav-buttons">
			<Button 
				buttonText="Next"
				:onClick="goNext"
				v-if="currentCardIndex != this.cards.length - 1"
			/>

		</div>
		<p class="thankyou-para">Thank you for viewing your year in <br> review and for contributing to the <br> sum of all human knowledge.</p>
		<p class="base-para"> Happy 2024! </p>
		<Button v-if="this.cards[currentCardIndex] && this.cards[currentCardIndex].type === CARD_TYPE.USER_SUMMARY" :onClick="copyToClipboard" buttonText="Share" />
	</div>
</template>

<script>
	import UserCard from "../components/cards/UserCard";
	import Button from "../components/Button";
	import { CARD_TYPE } from "../helpers/consts";
	import { CdxIcon } from '@wikimedia/codex';
	import { cdxIconEdit, cdxIconMessage, cdxIconUserTalk } from '@wikimedia/codex-icons';

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
				cdxIconUserTalk
			}
		},
		data() {
			return {
				CARD_TYPE
			}
		}
	}
  </script>
  
<style scoped>
	.buttons-area {
		width: 50%;
		padding: 1rem;

		button {
			margin: 10px 0;
		}
	}
	.card-nav-buttons {
		margin: 0 auto;
		justify-content: center;
		gap: 10px;
	}
	.stat-wrapper {
		width: 100%;
		margin: 1rem auto;
		padding: 2rem;
	}
	.thankyou-para{
		color: white;
		text-align: center;
		font-size: 20px;
	 }
	.base-para{
	color: white;
	text-align: center;
	font-size: 30px;
	}
</style>
