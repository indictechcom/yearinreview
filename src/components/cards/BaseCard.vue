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
  padding: 2rem 1rem;
  border-radius: 1rem;
  text-align: center;
  width: 50%;

  @media only screen and (max-width: 640px) {
    width: 80%;
    padding: 2rem 10px;
  }
}
</style>
