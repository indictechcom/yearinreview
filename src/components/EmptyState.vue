<template>
    <BaseCard :id="cardId">
        <template #bCardTop>
            <h1 class="contribution-header-error">Oops!!</h1>
            <p class="contribution-subheader">
                Something went wrong. Please try again later.
            </p>
        </template>
  </BaseCard>
</template>
 
<script>
    import BaseCard from "../components/cards/BaseCard";
    export default {
        name: 'EmptyState',
        components: {
            BaseCard,
        },
    }
</script>

<style>
    .contribution-header-error {
        font-weight: 300;
        margin: 10px auto;
        color: #cc0000
    }
    .contribution-subheader {
        width: 90%;
        margin: 20px auto;
    }
</style>