<template>
  <div
    class="layout pt-12 md:pt-24 grid md:grid-cols-[1.2fr,1.6fr] gap-8 md:gap-16"
  >
    <div class="flex flex-col gap-4">
      <NuxtImg
        src="/images/logo.png"
        height="50"
        width="50"
        class="rounded-lg"
        densities="x1 x2"
      />
      <div class="text-2xl font-bold font-rethink">Dimas Roger W</div>
      <div class="text-muted-foreground font-light text-[13px]">
        <div class="mb-1">Dont waste your time to create website.</div>
        <div>Just hit me on social media.</div>
      </div>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-3">
      <div class="text-[14px]">
        <div class="font-semibold text-muted-foreground mb-[12px] text-base">
          General
        </div>
        <div class="flex flex-col gap-[12px]">
          <div @click="onClickMenu('/')" class="text-link">Home</div>
          <div @click="onClickMenu('/project')" class="text-link">Projects</div>
          <div @click="onClickMenu('/blog')" class="text-link">Blogs</div>
          <div @click="onClickMenu('/about')" class="text-link">About</div>
          <div @click="onClickMenu('/fun-fact')" class="text-link">
            Fun Facts
          </div>
        </div>
      </div>
      <div class="text-[14px]">
        <div class="font-light text-muted-foreground mb-[12px]">Other</div>
        <div class="flex flex-col gap-[10px]">
          <div @click="handleWriteMessage" class="text-link">Write Message</div>
          <div @click="onClickMenu('/useful-website')" class="text-link">
            Useful Website
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="layout py-8">
    <div class="w-full">
      <hr class="hr-border" />
    </div>
  </div>
  <div
    class="layout pb-12 md:pb-24 flex flex-col md:flex-row justify-between gap-6"
  >
    <div class="text-muted-foreground font-light text-[14px]">
      Copyright © {{ new Date().getFullYear() }} Dimas Roger W. All rights
      reserved.
    </div>
    <div class="flex gap-4">
      <IconMail
        class="cursor-pointer size-5 hover:text-orange-400"
        @click="onClickIcon('mail')"
        v-tooltip.top="'Email'"
      />
      <IconBrandGithub
        class="cursor-pointer size-5 hover:text-orange-400"
        @click="onClickIcon('github')"
        v-tooltip.top="'Github'"
      />
      <IconBrandLinkedin
        class="cursor-pointer size-5 hover:text-orange-400"
        @click="onClickIcon('linkedin')"
        v-tooltip.top="'Linkedin'"
      />
      <!-- <IconBrandUpwork class="cursor-pointer size-5 hover:text-orange-400" v-tooltip.top="'Upwork'" /> -->
    </div>
  </div>
</template>
<script setup lang="ts">
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconMail,
  IconBrandUpwork,
} from "@tabler/icons-vue";

const menuStore = useMenuStore();

const onClickIcon = (type: string) => {
  switch (type) {
    case "github":
      window.open("https://github.com/rogersovich", "_blank");
      break;
    case "linkedin":
      window.open("https://www.linkedin.com/in/dimasrogerw/", "_blank");
      break;
    case "mail":
      window.open("mailto:dimasroger89@gmail.com", "_blank");
      break;
  }
};

const onClickMenu = (path: string) => {
  menuStore.setActivePath(path);
  navigateTo(path);
};

const handleWriteMessage = () => {
  window.open("https://forms.gle/sGrVntiG7itXn5QF6", "_blank");
};
</script>
<style lang=""></style>
