<template lang="">
  <svg
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    :fill="fill"
    :stroke="stroke"
    :height="height"
    :width="width"
  >
    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier">
      <path
        d="M24.306 4.019h-4.806l-3.5 5.537-3-5.537h-11l14 23.981 14-23.981zM5.481 6.019h3.363l7.156 12.387 7.15-12.387h3.363l-10.512 18.012z"
      ></path>
    </g>
  </svg>
</template>
<script setup>
defineProps({
  width: {
    type: String,
    default: "24", // Default width
  },
  height: {
    type: String,
    default: "24", // Default height
  },
  fill: {
    type: String,
    default: "currentColor", // Default color
  },
  stroke: {
    type: String,
    default: "#ff", // Default color
  },
});
</script>
<style lang=""></style>
