<template>
  <v-btn color="secondary mt-4 mb-5 custom-shadow" rounded x-large>{{
    title
  }}</v-btn>
</template>

<script>
export default {
  props: ["title"],
  name: "ButtonSecondary",
};
</script>
<style>
.cta-one__btn {
  padding: 15px 39px;
  cursor: pointer;
  color: white;
  /* text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.25); */
  box-shadow: 10px 10px 14px 1px rgb(0 0 0 / 20%);
}
.cta-one__btn:hover {
  box-shadow: none;
}
</style>
