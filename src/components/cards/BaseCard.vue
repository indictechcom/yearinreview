<template>
  <div class="base-card">
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
    image: String,
  },
};
</script>
<style scoped>
.base-card {
  background: white;
  margin: 0 auto;
  padding: 2rem 1rem;
  border-radius: 5rem;
  text-align: center;
  width: 30%;

  @media only screen and (max-width: 640px) {
    width: 80%;
    padding: 2rem 10px;
  }
}
</style>
