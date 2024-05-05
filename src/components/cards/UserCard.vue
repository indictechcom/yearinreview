<template>
	<BaseCard :id="cardId">
		<template #bCardTop>
			<img :src="imageURL" class="stat-card-image"/>
			<p style="font-size: 26px;">{{ cardTitle }}</p>
		</template>
		<template #bCardMiddle>
			<slot name="userCardMiddle"></slot>
		</template>
		<template #bCardEnd>
			<p style="font-size: 20px;">{{ cardEndText }}</p>
		</template>
	</BaseCard>
	<div class="card-buttons">
		<Button 
			buttonText="Previous" 
			weight="secondary" 
			:onClick="onPreviousClick"
			:disabled="cardId === 0"
		/>
		<Button 
			buttonText="Next" 
			:onClick="onNextClick"
			:disabled="cardId === cardEndLimit - 1"
		/>
	</div>
</template>
<script>
import BaseCard from "./BaseCard";
import Button from "../Button";
export default {
	name: "UserCard",
	components: {
		BaseCard,
		Button
	},
	props: {
		cardId: Number,
		cardTitle: String,
		imageURL: String,
		cardEndText: String,
		cardEndLimit: Number,
		onPreviousClick: Function,
		onNextClick: Function
	},
}
</script>
<style>
.card-buttons {
	width: 100px;
	padding: 1rem;
	margin: 0 auto;
	display: flex;
	justify-content: center;
	gap: 10px;
}
.stat-card-image {
	width: 60%;
}
</style>