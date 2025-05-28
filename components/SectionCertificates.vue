<template>
  <section
    class="layout pb-6 pt-6 md:pb-12 md:pt-12 flex flex-col justify-center"
  >
    <div class="flex flex-col gap-6 md:gap-12">
      <div class="flex flex-row gap-4 items-center">
        <div
          class="border border-solid border-zinc-950/10 dark:border-zinc-50/10 px-2 bg-zinc-400/[.35] dark:bg-zinc-800/[.35] py-1 text-xl rounded-full"
        >
          🏹
        </div>
        <div class="text-2xl font-rethink font-bold">Certificates</div>
      </div>
      <div class="grid grid-cols-12 gap-6">
        <template v-for="(cert, i) in LIST_CERTIFICATES" :key="i">
          <div class="col-span-12 md:col-span-6">
            <div
              class="border border-solid border-zinc-950/10 dark:border-zinc-50/10 rounded-xl p-6"
            >
              <div class="bg-zinc-50 w-fit px-5 pb-1 pt-2 rounded-lg mb-4">
                <template v-if="cert.cert_type == 'Udemy'">
                  <NuxtImg src="/images/udemy.png" class="h-[20px]" />
                </template>
              </div>
              <a
                :href="cert.cert_url"
                target="_blank"
                class="font-rethink font-bold text-4xl text-foreground no-underline hover:text-orange-500 cursor-pointer"
                >{{ cert.title }}</a
              >
              <div class="mt-3.5">
                <div
                  class="text-muted-foreground text-base mb-1"
                  v-if="cert.instructor"
                >
                  Instructor:
                  <span class="text-foreground">
                    {{ cert.instructor }}
                  </span>
                </div>
                <div class="text-muted-foreground text-base">
                  Certificate ID:
                  <span class="text-foreground"> {{ cert.cert_id }}</span>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
const LIST_CERTIFICATES = [
  {
    title: "React - The Complete Guide with React Hook Redux",
    instructor: "Kim Chen",
    cert_id: "UC-52a04eac-7795-4ae8-a796-b8997e729593",
    cert_type: "Udemy",
    cert_url: "https://ude.my/UC-52a04eac-7795-4ae8-a796-b8997e729593",
  },
  {
    title: "Complete Progressive Web App Bootcamp",
    instructor: "Kim Chen",
    cert_id: "UC-fbffc884-b5e4-4a2b-8bf2-8f25a714332a",
    cert_type: "Udemy",
    cert_url: "https://ude.my/UC-fbffc884-b5e4-4a2b-8bf2-8f25a714332a",
  },
  {
    title: "Vue JS and Firebase:Build an iOS and Android chat app",
    instructor: "Kim Chen",
    cert_id: "UC-515a5d75-6796-4cb7-accd-7487d1a85a4b",
    cert_type: "Udemy",
    cert_url: "https://ude.my/UC-515a5d75-6796-4cb7-accd-7487d1a85a4b",
  },
];
</script>
<style lang=""></style>
