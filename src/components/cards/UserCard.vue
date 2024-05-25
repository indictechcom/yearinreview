<template>
	<BaseCard :id="cardId" :class="type  === 'user_summary' ? 'share-stat-box' : ''">
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
		imageURL: String,
		cardEndText: String,
		onPreviousClick: Function,
		onNextClick: Function
	},
}
</script>
<style>
.stat-card-image {
	width: 80%;
}
</style>