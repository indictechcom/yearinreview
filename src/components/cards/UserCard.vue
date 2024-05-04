<template>
	<BaseCard :id="cardId">
		<template #bCardTop>
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
				/>
				<Button 
					buttonText="Previous" 
					weight="secondary" 
					:onClick="onPreviousClick"
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
		type: String,
		cardTitle: String,
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