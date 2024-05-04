<template>
	<div class="base-card">
		<img src="../../assets/images/WP20Symbols_MediaWiki.svg"/>
		<slot name="bCardTop"></slot>
		<slot name="bCardMiddle"></slot>
		<slot name="bCardEnd"></slot>
	</div>
</template>
<script>
export default {
	name: "BaseCard",
	props: {
		cid: String,
		image: String
	}
}
</script>
<style scoped>
	.base-card {
		background: white;
		width: 40%;
		margin: 0 auto;
		padding: 1rem 0;
		border-radius: 2rem;
		border: 1px solid grey;
		text-align: center;
		img {
			width: 90%;
		}
	}
</style>