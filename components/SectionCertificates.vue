<template>
  <section
    class="layout pb-6 pt-6 md:pb-12 md:pt-12 flex flex-col justify-center"
  >
    <div class="flex flex-col gap-6 md:gap-12">
      <div class="flex flex-row gap-4 items-center">
        <div
          class="border border-solid border-zinc-950/10 dark:border-zinc-50/10 px-2 bg-zinc-400/[.35] dark:bg-zinc-800/[.35] py-1 text-xl rounded-full"
        >
          🏆
        </div>
        <div class="text-2xl font-rethink font-bold">Certificates</div>
      </div>
      <div class="grid grid-cols-12 gap-6">
        <template v-for="(cert, i) in LIST_CERTIFICATES.reverse()" :key="i">
          <CardCertificate :cert="cert" />
        </template>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
const LIST_CERTIFICATES: {
  title: string;
  instructor: string;
  cert_id: string;
  cert_type: string;
  cert_url: string;
}[] = [
  {
    title: "Ruby Fundamental Programming",
    instructor: "",
    cert_id: "",
    cert_type: "School",
    cert_url:
      "https://files.dimasroger.com/portofolio-v4/certificate/Sertifikat_Ruby.pdf",
  },
  {
    title: "React - The Complete Guide with React Hook Redux",
    instructor: "Kim Chen",
    cert_id: "UC-52a04eac-7795-4ae8-a796-b8997e729593",
    cert_type: "Udemy",
    cert_url:
      "https://udemy-certificate.s3.amazonaws.com/image/UC-52a04eac-7795-4ae8-a796-b8997e729593.jpg",
  },
  {
    title: "Complete Progressive Web App Bootcamp",
    instructor: "Kim Chen",
    cert_id: "UC-fbffc884-b5e4-4a2b-8bf2-8f25a714332a",
    cert_type: "Udemy",
    cert_url:
      "https://udemy-certificate.s3.amazonaws.com/image/UC-fbffc884-b5e4-4a2b-8bf2-8f25a714332a.jpg",
  },
  {
    title: "Vue JS and Firebase:Build an iOS and Android chat app",
    instructor: "Kim Chen",
    cert_id: "UC-515a5d75-6796-4cb7-accd-7487d1a85a4b",
    cert_type: "Udemy",
    cert_url:
      "https://udemy-certificate.s3.amazonaws.com/image/UC-515a5d75-6796-4cb7-accd-7487d1a85a4b.jpg",
  },
  {
    title: "The Nuxt 3 Bootcamp - The Complete Developer Guide",
    instructor: "Laith Harb",
    cert_id: "UC-b32efdca-c239-4ded-9c22-b4132048f84d",
    cert_type: "Udemy",
    cert_url:
      "https://udemy-certificate.s3.amazonaws.com/image/UC-b32efdca-c239-4ded-9c22-b4132048f84d.jpg",
  },
  {
    title: "Next.js 15 & React - The Complete Guide",
    instructor: "Maximilian Schwarzmuller",
    cert_id: "UC-b7792167-e304-400e-902d-f7b8fad30133",
    cert_type: "Udemy",
    cert_url:
      "https://udemy-certificate.s3.amazonaws.com/image/UC-b7792167-e304-400e-902d-f7b8fad30133.jpg",
  },
  {
    title: "Clean Code",
    instructor: "Maximilian Schwarzmüller",
    cert_id: "UC-3e59f876-d846-4ea9-88e7-a18a06b9adbd",
    cert_type: "Udemy",
    cert_url:
      "https://udemy-certificate.s3.amazonaws.com/image/UC-3e59f876-d846-4ea9-88e7-a18a06b9adbd.jpg",
  },
  {
    title: "Pemograman Go-Lang : Pemula sampai Mahir",
    instructor: "Programmer Zaman Now",
    cert_id: "UC-d9c65a4c-5d27-4a10-b1e0-8cee03ef2b94",
    cert_type: "Udemy",
    cert_url:
      "https://udemy-certificate.s3.amazonaws.com/image/UC-d9c65a4c-5d27-4a10-b1e0-8cee03ef2b94.jpg",
  },
];
</script>
<style lang=""></style>
