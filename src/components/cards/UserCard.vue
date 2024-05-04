<template>
	<BaseCard :id="cardId">
		<template #bCardTop>
			<img :src="imageURL"/>
			<p>{{ cardTitle }}</p>
		</template>
		<template #bCardMiddle>
			<slot name="userCardMiddle"></slot>
		</template>
		<template #bCardEnd>
			<p>{{ cardEndText }}</p>
			<div class="card-buttons">
				<Button 
					buttonText="Next" 
					:onClick="onNextClick"
					:disabled="cardId === cardEndLimit - 1"
				/>
				<Button 
					buttonText="Previous" 
					weight="secondary" 
					:onClick="onPreviousClick"
					:disabled="cardId === 0"
				/>
			</div>
		</template>
	</BaseCard>
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
	padding: 1rem;
	display: flex;
	flex-direction: column;
	gap: 10px;
}
</style>