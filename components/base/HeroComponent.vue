<template>
  <div
    class="layout text-center min-h-screen pb-12 pt-12 md:pb-24 md:pt-36 flex flex-col justify-center relative overflow-hidden"
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
        <div
          class="absolute top-14 -right-20 rotate-[45deg] fcc z-1 rotating-invert"
        >
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
        <div
          class="border border-solid border-zinc-50/[.1] rounded-full ml-2 mb-2 w-fit px-1 py-1 flex items-center justify-center shadow-md shadow-orange-400/50"
        >
          <NuxtImg
            src="/images/logo.png"
            height="60"
            width="60"
            :quality="40"
          />
        </div>
        <BaseSparklesText
          text="Dimas Roger W"
          class="text-foreground font-rethink text-5xl md:text-6xl"
          :colors="{ first: '#fb923c', second: '#f87171' }"
          :sparkles-count="8"
        >
        </BaseSparklesText>
        <div class="font-light text-muted-foreground text-sm md:text-base">
          As a Full-Stack Developer, I bridge the artistry of the interface with
          the power of the infrastructure, crafting seamless web solutions from
          front to back.
        </div>
        <div class="flex flex-start gap-4 pt-4">
          <Button
            severity="contrast"
            class="!text-[12px] md:!text-base shadow"
            @click="goToPageAboutMe"
            >More about me</Button
          >
          <Button
            severity="secondary"
            class="!text-[12px] md:!text-base shadow"
            @click="getMyResume"
          >
            <IconFileText class="size-4" />
            Get my resume
          </Button>
        </div>
        <ClientOnly>
          <template v-if="isMobile">
            <div
              class="absolute bottom-40 flex justify-center items-center w-full"
            >
              <div
                class="rounded-full p-4 flex justify-center items-center bg-zinc-50/[.05] border border-solid border-zinc-50/[.075] cursor-pointer animate-bounce"
                @click="exploreMore"
              >
                <IconArrowDown class="size-[1.25rem]" />
              </div>
            </div>
          </template>
        </ClientOnly>
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
import { IconFileText, IconArrowDown } from "@tabler/icons-vue";

const menuStore = useMenuStore();

const exploreMore = () => {
  const section = document.getElementById("section-project");
  if (section) {
    const yOffset = -40; // adjust this value for your desired offset (e.g., -80px for header)
    const y =
      section.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  }
};

const getMyResume = () => {
  window.open(
    "https://drive.google.com/file/d/1U3oV00jaxs73-xjrNFyrYd2CT0hFLfcK/view?usp=sharing",
    "_blank"
  );
};

const goToPageAboutMe = () => {
  menuStore.setActivePath("/about");
  navigateTo("/about");
}
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
