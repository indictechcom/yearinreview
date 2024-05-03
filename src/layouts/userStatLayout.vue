<template>
	<div class="stat-wrapper">
		<user-card />
	</div>
</template>
  
  <script>
  import UserCard from "../components/UserCard";
  export default {
	name: "UserStat",
	components: {
	  UserCard
	},
  };
  </script>
  
  <style scoped>
  .stat-wrapper {
	margin: 1rem auto;
  }
  .cdx-card {
	width: 350px;
	height: 400px;
	border-radius: 12%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: center;
	background-color: #ffffff; /* Add background color as needed */
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Add shadow for depth */
  }
  
  .cdx-card__text {
	display: flex;
	flex-direction: column;
	align-items: center;
  }
  
  .cdx-thumbnail__image {
	border: none;
	height: 150px;
	width: auto;
	max-width: 100%;
  }
  </style>
  