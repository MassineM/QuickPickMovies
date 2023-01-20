<template>
  <button class="primary-btn" @click.prevent="eventHandler">{{ text }}</button>
</template>

<script>
export default {
  props: {
    text: String,
    eventHandler: Function,
  },
};
</script>

<style></style>
