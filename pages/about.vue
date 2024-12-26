<template>
  <div class="min-h-screen bg-zinc-950 relative overflow-y-scroll z-10">
    <div class="absolute bottom-0 left-8 z-[-1]">
      <div
        class="uppercase text-[10rem] font-rethink font-bold text-zinc-50/[.05]"
      >
        About Me
      </div>
    </div>
    <div
      class="layout text-center pb-12 pt-12 md:pb-16 md:pt-36 flex flex-col justify-center"
    >
      <div class="flex flex-col gap-2">
        <div class="text-6xl font-rethink font-bold">
          <span> About </span>
          <BaseTextHighlight
            :duration="500"
            class="rounded-lg bg-gradient-to-r from-[#9E7AFF] to-[#FE8BBB]"
          >
            Me
          </BaseTextHighlight>
        </div>
        <div class="text-muted-foreground">A story of growth and discovery</div>
      </div>
    </div>
    <section
      class="layout text-center pb-12 pt-12 md:pb-8 md:pt-8 flex flex-col justify-center"
    >
      <div class="grid grid-cols-12 gap-4">
        <div class="col-span-6 flex items-center justify-center">
          <NuxtImg
            src="/images/kucing-hijab.jpg"
            height="350px"
            width="350px"
            class="rounded-lg"
            densities="x1 x2"
          />
        </div>
        <div class="col-span-6 text-left">
          <div class="text-4xl font-rethink font-bold pb-2">
            Dimas Roger Widianto
          </div>
          <div class="text-muted-foreground">
            Front-end Developer at <span>Elabram</span>
          </div>
          <div class="pt-8 text-muted-foreground font-light">
            <p class="tracking-wide">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book
            </p>
            <p>
              It was popularised in the 1960s with the release of Letraset
              sheets containing Lorem Ipsum passages, and more recently with
              desktop publishing software like Aldus PageMaker including
              versions of Lorem Ipsum.
            </p>
            <p>
              Contrary to popular belief, Lorem Ipsum is not simply random text.
              It has roots in a piece of classical Latin literature from 45 BC,
              making it over 2000 years old.
            </p>
          </div>
        </div>
      </div>
    </section>
    <section
      class="layout text-center pb-12 pt-12 md:pb-12 md:pt-12 flex flex-col justify-center"
    >
      <div class="flex flex-col gap-12">
        <div class="flex flex-row gap-4 items-center">
          <div
            class="border border-zinc-50/10 px-2 bg-zinc-800/[.35] py-1 text-xl rounded-full"
          >
            🏹
          </div>
          <div class="text-2xl font-rethink font-bold">Skills</div>
        </div>
        <div class="grid grid-cols-12 gap-6">
          <template v-for="(skill, index) in listSkills" :key="index">
            <div class="col-span-3">
              <div
                class="border border-zinc-50/[.15] rounded-lg p-4 min-h-[200px] flex items-center justify-center flex-col gap-2"
              >
                <div class="text-2xl">
                  <component :is="skill.icon" v-bind="skill.iconProps" />
                </div>
                <div class="text-lg font-bold tracking-wide">
                  {{ skill.title }}
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </section>
    <section
      class="layout text-center pb-12 pt-12 md:pb-24 md:pt-12 flex flex-col justify-center"
    >
      <div class="flex flex-col gap-12">
        <div class="flex flex-row gap-4 items-center">
          <div
            class="border border-zinc-50/10 px-2 bg-zinc-800/[.35] py-1 text-xl rounded-full"
          >
            💼
          </div>
          <div class="text-2xl font-rethink font-bold">Experience</div>
        </div>
        <template v-for="exp in listExperiences" :key="exp">
          <div class="flex flex-col gap-4">
            <div class="grid grid-cols-12 gap-4">
              <div class="col-span-4 text-left">
                <div>SEP 2023 — PRESENT - {{ exp }}</div>
              </div>
              <div class="col-span-8 text-left">
                <div class="text-2xl font-rethink font-bold">
                  Front-end Developer
                </div>
                <div class="flex gap-[5px] pt-2 text-[14px] pb-5 font-light">
                  <div class="flex gap-3">
                    <div>
                      <NuxtImg
                        src="/images/gopay-logo.png"
                        height="20"
                        densities="x1 x2"
                      />
                    </div>
                    <div class="font-light">Gopay</div>
                  </div>
                  <div class="text-muted-foreground">-</div>
                  <div class="text-muted-foreground">United States, Remote</div>
                </div>
                <p class="text-muted-foreground font-light text-[14px]">
                  There are many variations of passages of Lorem Ipsum
                  available, but the majority have suffered alteration in some
                  form, by injected humour, or randomised words which don't look
                  even slightly believable
                </p>
                <ul
                  class="list-disc list-outside text-muted-foreground font-light text-[14px] pl-3"
                >
                  <li class="mb-2">
                    It is a long established fact that a reader will be
                    distracted by the readable content of a page when looking at
                    its layout.
                  </li>
                  <li class="mb-2">
                    Many desktop publishing packages and web page editors now
                    use Lorem Ipsum as their default model text, and a search
                    for 'lorem ipsum' will uncover many web sites still in their
                    infancy.
                  </li>
                  <li class="mb-2">
                    Contrary to popular belief, Lorem Ipsum is not simply random
                    text. It has roots in a piece of classical Latin literature
                    from 45 BC, making it over 2000 years old
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </template>
      </div>
    </section>
  </div>
</template>
<script>
import IconReact from "~/components/base/IconReact.vue";
import IconVue from "~/components/base/IconVue.vue";
import IconNuxt from "~/components/base/IconNuxt.vue";
import IconAngular from "~/components/base/IconAngular.vue";
import IconTypescript from "~/components/base/IconTypescript.vue";
import IconLaravel from "~/components/base/IconLaravel.vue";
import IconGolang from "~/components/base/IconGolang.vue";
import IconDatabase from "~/components/base/IconDatabase.vue";

export default {
  setup() {
    useHead({
      title: "About",
      titleTemplate: "%s | Portofolio",
    });

    const experiences = [1, 2, 3];
    const skill = [
      {
        title: "React Js",
        icon: IconReact,
        iconProps: {
          width: "50",
          height: "50",
        },
      },
      {
        title: "Vue Js",
        icon: IconVue,
        iconProps: {
          width: "50",
          height: "50",
        },
      },
      {
        title: "Nuxt Js",
        icon: IconNuxt,
        iconProps: {
          width: "50",
          height: "50",
        },
      },
      {
        title: "Angular Js",
        icon: IconAngular,
        iconProps: {
          width: "50",
          height: "50",
        },
      },
      {
        title: "Typescript",
        icon: IconTypescript,
        iconProps: {
          width: "50",
          height: "50",
        },
      },
      {
        title: "Laravel",
        icon: IconLaravel,
        iconProps: {
          width: "50",
          height: "50",
        },
      },
      {
        title: "Golang",
        icon: IconGolang,
        iconProps: {
          width: "50",
          height: "50",
        },
      },
      {
        title: "Database",
        icon: IconDatabase,
        iconProps: {
          width: "50",
          height: "50",
        },
      },
    ];

    return {
      listExperiences: experiences,
      listSkills: skill,
    };
  },
};
</script>
<style lang=""></style>
