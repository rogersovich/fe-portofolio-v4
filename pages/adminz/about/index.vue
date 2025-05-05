<template>
  <div>
    <div class="mb-6">
      <div class="text-3xl font-rethink font-bold">Page About</div>
      <div class="text-muted-foreground font-light mt-2">
        Create summary about your personality
      </div>
    </div>
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-12 2xl:col-span-10">
        <div class="border border-zinc-50/[.1] rounded-lg px-5 py-4">
          <div class="grid grid-cols-12 gap-8">
            <div class="col-span-3">
              <div class="flex flex-col items-start justify-center gap-4">
                <NuxtImg
                  src="/images/kucing-hijab.jpg"
                  height="350px"
                  width="350px"
                  class="rounded-lg"
                  densities="x1 x2"
                />
                <div class="flex items-center justify-center gap-3 w-full">
                  <router-link to="/adminz/about/edit">
                    <IconEdit class="size-11 border border-zinc-50/[.1] p-2 rounded-md cursor-pointer hover:border-orange-500" />
                  </router-link>
                  <IconArchive class="size-11 border border-zinc-50/[.1] p-2 rounded-md cursor-pointer hover:border-orange-500" />
                </div>
              </div>
            </div>
            <div class="col-span-9">
              <div>
                <div class="text-5xl text-zinc-50 font-rethink font-bold pb-2">
                  Dimas Roger Widianto
                </div>
                <div class="text-zinc-300 font-semibold text-lg">
                  Front-end Developer at <span>Elabram</span>
                </div>
                <div class="pt-8 text-muted-foreground font-light text-base">
                  <p class="tracking-wide">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book
                  </p>
                  <p>
                    It was popularised in the 1960s with the release of Letraset
                    sheets containing Lorem Ipsum passages, and more recently
                    with desktop publishing software like Aldus PageMaker
                    including versions of Lorem Ipsum.
                  </p>
                  <p>
                    Contrary to popular belief, Lorem Ipsum is not simply random
                    text. It has roots in a piece of classical Latin literature
                    from 45 BC, making it over 2000 years old.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import {
  IconEdit,
  IconArchive
} from "@tabler/icons-vue";

useHead({
  title: "Admin - About",
  titleTemplate: "%s | Portofolio",
});

definePageMeta({
  layout: "admin",
  middleware: "auth",
});
</script>
<style lang=""></style>
