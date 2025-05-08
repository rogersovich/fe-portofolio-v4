<template>
  <div
    class="flex flex-col justify-start gap-2 min-h-screen relative py-4"
    :class="{
      'gap-2': sidebarExpanded,
      'gap-3': !sidebarExpanded,
    }"
  >
    <template v-if="sidebarExpanded">
      <div
        class="flex justify-between items-center gap-3 px-4 cursor-pointer mt-1 mb-1"
      >
        <div class="flex items-center gap-3">
          <NuxtImg src="/images/logo.png" class="w-[60px] h-[60px]" />
          <div class="font-bold text-2xl font-rethink">Zeraphi</div>
        </div>
        <div class="absolute -right-3">
          <IconChevronLeft
            @click="toggleSidebar()"
            class="size-6 cursor-pointer text-white bg-zinc-50/[.2] p-1 rounded-full"
          />
        </div>
      </div>

      <template v-for="item in menuList" :key="item.title">
        <div
          class="flex gap-4 mx-4 text-[13px]"
          :class="{
            'items-center': !item.is_active,
            'items-start flex-col': item.is_active,
          }"
        >
          <div
            class="flex items-center justify-between w-full cursor-pointer px-5 py-3 group"
            :class="{
              'bg-zinc-50/5 rounded-full': item.is_active,
            }"
            @click="toggleMenu(item)"
          >
            <div class="flex items-center gap-4">
              <component
                :is="item.icon"
                class="size-5"
                :class="{
                  'text-orange-500': item.is_active,
                  'text-white': !item.is_active,
                }"
              />
              <div
                :class="{
                  'text-orange-500 font-bold': item.is_active,
                  'text-white': !item.is_active,
                }"
                class="group-hover:font-bold"
              >
                {{ item.title }}
              </div>
            </div>
            <div v-if="item.children.length > 0">
              <IconChevronDown
                class="size-6 text-white"
                v-if="!item.is_active"
              />
              <IconChevronUp class="size-6 text-orange-500" v-else />
            </div>
          </div>
          <div
            class="flex items-start gap-2 flex-col pl-14 w-full"
            v-if="item.children.length > 0 && item.is_active"
          >
            <div
              class="py-2 cursor-pointer hover:text-white hover:font-bold w-full"
              v-for="child in item.children"
              :key="child.title"
              :class="{
                'font-bold text-white': child.is_active,
                'font-light text-zinc-50/50': !child.is_active,
              }"
              @click="toggleMenuChild(item, child)"
            >
              {{ child.title }}
            </div>
          </div>
        </div>
      </template>

      <div class="absolute bottom-5 left-0 px-4 w-full">
        <div class="flex flex-col gap-5 py-3">
          <div
            class="flex items-center gap-2 px-3 bg-zinc-50/[.05] border border-zinc-50/[.1] rounded-md py-1"
          >
            <NuxtImg
              src="/images/logo.png"
              class="w-[50px] h-[50px rounded-full"
            />
            <div class="flex flex-col gap-0">
              <div class="text-[13px] font-bold">
                {{ auth.user?.username }}
              </div>
              <div class="text-[12px] font-light">Super Admin</div>
            </div>
          </div>
          <div
            class="flex items-center gap-4 px-6 cursor-pointer group"
            @click="handleLogout()"
          >
            <IconLogout
              class="size-5 text-zinc-50 group-hover:text-orange-500"
            />
            <div class="text-[14px] text-zinc-50 group-hover:text-orange-500">
              Sign Out
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div
        class="flex justify-center items-center gap-3 px-4 cursor-pointer mt-1 relative"
      >
        <NuxtImg src="/images/logo.png" class="w-[70px] h-[70px]" />
        <div class="absolute -right-3">
          <IconChevronRight
            @click="toggleSidebar()"
            class="size-6 cursor-pointer text-white bg-zinc-50/[.2] p-1 rounded-full"
          />
        </div>
      </div>
      <template v-for="item in menuList" :key="item.title">
        <div class="flex justify-center items-center gap-3 px-4">
          <div
            class="w-10 h-10 flex items-center justify-center"
            :class="{
              'bg-zinc-50/[.05] rounded-full': item.is_active,
            }"
          >
            <component
              :is="item.icon"
              class="w-6 h-6 cursor-pointer hover:text-orange-500"
              :class="{
                'text-orange-500': item.is_active,
                'text-white': !item.is_active,
              }"
              @click="toggleMenu(item)"
            />
          </div>
        </div>
      </template>
      <div class="absolute bottom-5 left-0 px-4 w-full">
        <div class="flex flex-col gap-6 py-3">
          <div class="flex items-center justify-center">
            <NuxtImg
              src="/images/logo.png"
              class="w-[50px] h-[50px bg-zinc-50/[.05] p-2 rounded-full"
            />
          </div>
          <div
            class="flex items-center justify-center px-6 cursor-pointer group"
          >
            <IconLogout
              class="size-5 text-zinc-50 group-hover:text-orange-500"
            />
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
<script setup lang="ts">
import {
  IconChevronDown,
  IconChevronUp,
  IconChevronLeft,
  IconChevronRight,
  IconLogout,
} from "@tabler/icons-vue";
import { storeToRefs } from "pinia";
import { useConfirm } from "primevue/useconfirm";

import { useSidebarStore } from "~/stores/useSidebar";
import { useAuthStore } from "~/stores/useAuth";

const confirm = useConfirm();

const { logout, auth } = useAuthStore();
const sidebarStore = useSidebarStore();
const { sidebarExpanded } = storeToRefs(sidebarStore);

const { menuList, toggleMenu, toggleMenuChild, toggleSidebar } =
  useSidebarStore();

const handleLogout = () => {
  confirm.require({
    message: "Are you sure you want to logout?",
    header: "Logout Confirmation",
    icon: "pi pi-exclamation-triangle",
    acceptClass: "btn-accept-dialog",
    rejectClass: "btn-reject-dialog",
    acceptLabel: "Yes",
    rejectLabel: "Cancel",
    accept: () => {
      logout();
      navigateTo("/authz/login");
    },
    reject: () => {
      // Handle the rejection logic here
    },
  });
};
</script>
<style lang=""></style>
