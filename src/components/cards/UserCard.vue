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
				<Button buttonText="Next"></Button>
				<Button buttonText="Previous" weight="secondary">Previous</Button>
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
		cardId: String,
		type: String,
		cardTitle: String,
		imageURL: String,
		cardEndText: String
	},
	methods: {
		gonext() {
			console.log("going next")
		},
		goback() {
			console.log("going back")
		}
	}
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