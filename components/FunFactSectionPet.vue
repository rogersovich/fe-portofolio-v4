<template>
  <div
    class="flex flex-col gap-8 items-start border border-solid border-zinc-950/[.05] dark:border-zinc-50/[.05] rounded-xl px-4 md:px-12 py-4 md:py-12"
  >
    <div class="grid grid-cols-12 gap-8 w-full">
      <div class="col-span-12">
        <div class="flex flex-row items-center justify-center gap-4 w-full">
          <div class="text-[3rem] md:text-[5rem] animated-ltr">👉</div>
          <div class="px-[2rem] md:px-[4rem]">
            <NuxtImg
              :src="
                MINIO_BASE_URL + 'pet/449D0FD5-6323-40F0-B33C-A0CF91039112.jpg'
              "
              class="rounded-full h-[150px] md:h-[300px] w-[150px] md:w-[300px] object-cover object-top"
            />
          </div>
          <div class="text-[3rem] md:text-[5rem] animated-rtl">👈</div>
        </div>
        <div class="max-w-[500px] mx-auto text-center">
          <div
            class="text-2xl md:text-3xl mt-2 text-foreground font-bold font-rethink mb-1"
          >
            Hello my name is <span class="text-orange-500">Bimbim</span>
          </div>
          <div class="text-[13px] md:text-base text-light">
            <div>
              I'm just a cat that who loves Eat 🍼, Play 🏀, and Sleep 😪.
            </div>
            <div>i was adopted by my owner, his name is Roger 👨‍💻</div>
            <div>nice to meet you all 👋</div>
          </div>
        </div>
      </div>
      <div class="col-span-12">
        <div
          class="grid grid-cols-4 md:grid-cols-6 grid-rows-4 md:grid-rows-9 gap-2 md:gap-4"
        >
          <div
            class="col-start-1 row-start-1 col-span-2 row-span-1 md:col-start-1 md:row-start-1 md:col-span-2 md:row-span-4 rounded-lg"
          >
          
            <NuxtImg
              :src="MINIO_BASE_URL + 'pet/IMG_7542_11zon.jpeg'"
              class="w-full h-full rounded-lg object-cover"
              style="height: -webkit-fill-available;"
            />
          </div>
          <div
            class="col-start-3 row-start-1 col-span-2 row-span-1 md:col-start-3 md:row-start-1 md:col-span-2 md:row-span-3 rounded-lg"
          >
            <NuxtImg
              :src="
                MINIO_BASE_URL + 'pet/C6C8435A-A0F7-49DE-8172-EBC868195976.jpg'
              "
              class="w-full h-full rounded-lg object-cover object-left-bottom"
            />
          </div>
          <div
            class="col-start-1 row-start-2 col-span-2 row-span-1 md:col-start-3 md:row-start-4 md:col-span-2 md:row-span-3 rounded-lg"
          >
            <NuxtImg
              :src="
                MINIO_BASE_URL + 'pet/AF8F302D-C930-4FA4-8E8F-B029459B34BE.jpg'
              "
              class="w-full h-full rounded-lg object-cover object-center"
            />
          </div>
          <div
            class="col-start-3 row-start-2 col-span-2 row-span-1 md:col-start-5 md:row-start-1 md:col-span-2 md:row-span-4 rounded-lg"
          >
            <NuxtImg
              :src="
                MINIO_BASE_URL + 'pet/EFDA4BCE-F878-471F-84CC-B4BA0FA7617D.jpg'
              "
              class="w-full h-full rounded-lg object-cover"
            />
          </div>
          <div
            class="col-start-1 row-start-3 col-span-2 row-span-1 md:col-start-1 md:row-start-5 md:col-span-2 md:row-span-4 rounded-lg"
          >
            <NuxtImg
              :src="
                MINIO_BASE_URL + 'pet/AA45CB48-D466-43BB-9828-340A8255C50F.jpg'
              "
              class="w-full h-full rounded-lg object-cover"
            />
          </div>
          <div
            class="col-start-3 row-start-3 col-span-2 row-span-1 md:col-start-5 md:row-start-5 md:col-span-2 md:row-span-4 rounded-lg"
          >
            <NuxtImg
              :src="
                MINIO_BASE_URL +
                'pet/65A24810-279C-4C0C-8C3A-C10740F8CED0_11zon.jpg'
              "
              class="w-full h-full rounded-lg object-cover object-top"
            />
          </div>
          <div
            class="col-start-1 row-start-4 col-span-2 row-span-1 md:col-start-3 md:row-start-7 md:col-span-2 md:row-span-3 rounded-lg"
          >
            <NuxtImg
              :src="
                MINIO_BASE_URL + 'pet/28084A7F-E19F-4ED7-A8DD-C7D0AFF3F433_11zon.jpg'
              "
              class="w-full h-full rounded-lg object-cover object-top max-h-[500px]"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const MINIO_BASE_URL = useMinioUrl();
</script>
<style lang="css">
@keyframes moveLeftRight {
  0% {
    transform: translateX(0); /* Start at original position */
  }
  50% {
    transform: translateX(40px); /* Move 50px to the left */
  }
  100% {
    transform: translateX(0); /* Back to original position */
  }
}

@keyframes moveRightLeft {
  0% {
    transform: translateX(0); /* Start at original position */
  }
  50% {
    transform: translateX(-40px); /* Move 50px to the left */
  }
  100% {
    transform: translateX(0); /* Back to original position */
  }
}

.animated-ltr {
  animation-name: moveLeftRight; /* Name of our keyframes */
  animation-duration: 1s;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite; /* Make it repeat forever */
  animation-fill-mode: forwards; /* Keep the final state (optional for infinite) */
}

.animated-rtl {
  animation-name: moveRightLeft; /* Name of our keyframes */
  animation-duration: 1s;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite; /* Make it repeat forever */
  animation-fill-mode: forwards; /* Keep the final state (optional for infinite) */
}
</style>
