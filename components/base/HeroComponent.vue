<template>
  <div
    class="layout text-center pb-12 pt-12 min-h-[calc(100vh-80px)] md:pb-20 md:pt-36 flex flex-col justify-center relative overflow-hidden"
  >
    <ClientOnly>
      <template v-if="isMobile">
        <div class="absolute -top-14 -left-14 rotate-[95deg] fcc z-1 rotating">
          <div
            class="h-[250px] w-[250px] border border-solid border-zinc-950/[.05] dark:border-zinc-50/[.05] rounded-full relative fcc"
          >
            <NuxtImg
              src="/images/icons/air.png"
              height="50"
              width="50"
              class="absolute -top-8 bg-green-100 dark:bg-green-800 rounded-full p-3"
            />
            <NuxtImg
              src="/images/icons/earth.png"
              height="50"
              width="50"
              class="absolute -left-6 bg-orange-100 dark:bg-orange-800 rounded-full p-3"
            />
            <NuxtImg
              src="/images/icons/fire.png"
              height="50"
              width="50"
              class="absolute -bottom-6 bg-red-100 dark:bg-red-800 rounded-full p-3"
            />
            <NuxtImg
              src="/images/icons/water.png"
              height="50"
              width="50"
              class="absolute -right-6 bg-blue-100 dark:bg-blue-800 rounded-full p-3"
            />
          </div>
        </div>
        <div class="absolute top-14 -right-20 rotate-[45deg] fcc z-1 rotating-invert">
          <div
            class="h-[200px] w-[200px] border border-solid border-zinc-950/[.05] dark:border-zinc-50/[.05] rounded-full relative fcc"
          >
            <NuxtImg
              src="/images/icons/air.png"
              height="50"
              width="50"
              class="absolute -top-8 bg-green-100 dark:bg-green-800 rounded-full p-3"
            />
            <NuxtImg
              src="/images/icons/earth.png"
              height="50"
              width="50"
              class="absolute -left-6 bg-orange-100 dark:bg-orange-800 rounded-full p-3"
            />
            <NuxtImg
              src="/images/icons/fire.png"
              height="50"
              width="50"
              class="absolute -bottom-6 bg-red-100 dark:bg-red-800 rounded-full p-3"
            />
            <NuxtImg
              src="/images/icons/water.png"
              height="50"
              width="50"
              class="absolute -right-6 bg-blue-100 dark:bg-blue-800 rounded-full p-3"
            />
          </div>
        </div>
      </template>
    </ClientOnly>
    <div class="grid grid-cols-12 md:gap-12">
      <div class="col-span-12 md:col-span-6 flex flex-col gap-4 text-left">
        <BaseSparklesText
          text="Dimas Roger W"
          class="text-foreground font-rethink text-5xl md:text-6xl"
          :colors="{ first: '#fb923c', second: '#f87171' }"
          :sparkles-count="8"
        >
        </BaseSparklesText>
        <div class="font-light text-muted-foreground text-sm md:text-base">
          I work with React Ecosystem, and write to teach people how to rebuild
          and redefine fundamental concepts through mental models.
        </div>
        <div class="flex flex-start gap-4 pt-4">
          <Button severity="contrast" class="!text-[12px] md:!text-base shadow"
            >Explore more</Button
          >
          <Button severity="secondary" class="!text-[12px] md:!text-base shadow"
            >More about me</Button
          >
        </div>
      </div>
      <ClientOnly>
        <div v-if="!isMobile" class="col-span-6 fcc">
          <div
            class="h-[300px] w-[300px] border border-solid border-zinc-950/[.05] dark:border-zinc-50/[.05] rounded-full relative fcc rotating"
          >
            <NuxtImg
              src="/images/icons/air.png"
              height="60"
              width="60"
              class="absolute -top-8 bg-green-100 dark:bg-green-800 rounded-full p-3"
            />
            <NuxtImg
              src="/images/icons/earth.png"
              height="60"
              width="60"
              class="absolute -left-6 bg-orange-100 dark:bg-orange-800 rounded-full p-3"
            />
            <NuxtImg
              src="/images/icons/fire.png"
              height="60"
              width="60"
              class="absolute -bottom-6 bg-red-100 dark:bg-red-800 rounded-full p-3"
            />
            <NuxtImg
              src="/images/icons/water.png"
              height="60"
              width="60"
              class="absolute -right-6 bg-blue-100 dark:bg-blue-800 rounded-full p-3"
            />
          </div>
        </div>
      </ClientOnly>
    </div>
  </div>
</template>
<script setup>
import { isMobile } from "~/composables/useBreakpoint";

import { ref, computed, onMounted } from "vue";

const rotation = ref(0);
const isRotating = ref(false);
const rotationStep = 1;
const frameDelay = 100;

// this computed builds the inline style object
const rotateStyle = computed(() => ({
  transform: `rotate(${rotation.value}deg)`,
  transition: "transform 0.3s ease-in-out",
}));

function animateRotation() {
  if (isRotating.value) return;
  isRotating.value = true;

  function rotate() {
    rotation.value = (rotation.value + rotationStep) % 360;
    frameDelay > 0
      ? setTimeout(rotate, frameDelay)
      : requestAnimationFrame(rotate);
  }

  rotate();
}

// onMounted(() => {
//   animateRotation();
// });
</script>
<style scoped>
@-webkit-keyframes rotating /* Safari and Chrome */ {
  from {
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes rotating {
  from {
    -ms-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -ms-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
.rotating {
  -webkit-animation: rotating 12s linear infinite;
  -moz-animation: rotating 12s linear infinite;
  -ms-animation: rotating 12s linear infinite;
  -o-animation: rotating 12s linear infinite;
  animation: rotating 12s linear infinite;
}
@-webkit-keyframes rotating-invert /* Safari and Chrome */ {
  from {
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
  to {
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
}
@keyframes rotating-invert {
  from {
    -ms-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
  to {
    -ms-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
}
.rotating-invert {
  -webkit-animation: rotating 12s linear infinite;
  -moz-animation: rotating 12s linear infinite;
  -ms-animation: rotating 12s linear infinite;
  -o-animation: rotating 12s linear infinite;
  animation: rotating 12s linear infinite;
}
</style>
