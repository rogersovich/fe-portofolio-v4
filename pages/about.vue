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
        <div class="col-span-6">Kasih gambar atau illustrasi</div>
        <div class="col-span-6 text-left">
          <div class="text-4xl font-rethink font-bold pb-2">
            Dimas Roger Widianto
          </div>
          <div class="text-muted-foreground">
            Front-end Developer at <span>Elabram</span>
          </div>
          <div class="pt-8 text-muted-foreground font-light">
            <p class="tracking-wide">
              Hello! You can call me Clarence. I am a Software Engineer who
              works with the React ecosystem and writes to teach people how to
              rebuild and redefine fundamental concepts through mental models.
            </p>
            <p>
              I was born in 2001 in Jakarta, Indonesia. When the pandemic hit 4
              years ago, my university was closed for a few weeks, and I started
              to learn web development, especially front-end development, out of
              boredom.
            </p>
            <p>
              As part of my learning journey, I started writing blog articles as
              a way to solidify my knowledge. When I posted them here as
              documentation, I discovered that many people found them valuable.
              Hopefully, it can help you too.
            </p>
          </div>
        </div>
      </div>
    </section>
    <section
      class="layout text-center pb-12 pt-12 md:pb-24 md:pt-12 flex flex-col justify-center"
    >
      <div class="flex flex-col gap-12">
        <div class="flex flex-row gap-4 items-center">
          <div class="border border-zinc-50/15 px-2 py-1 text-xl rounded-full">
            🔥
          </div>
          <div class="text-2xl font-rethink font-bold">Experience</div>
        </div>
        <div class="grid grid-cols-12 gap-4">
          <div class="col-span-4 text-left">
            <div>SEP 2023 — PRESENT</div>
          </div>
          <div class="col-span-8 text-left">
            <div class="text-2xl font-rethink font-bold">
              Front-end Developer
            </div>
            <div class="flex gap-[5px] pt-2 text-[14px] pb-5 font-light">
              <div class="flex gap-3">
                <div>
                  <NuxtImg src="/images/gopay-logo.png" height="20" densities="x1 x2" />
                </div>
                <div class="font-light">
                  Gopay
                </div>
              </div>
              <div class="text-muted-foreground">
                -
              </div>
              <div class="text-muted-foreground">
                United States, Remote
              </div>
            </div>
            <p class="text-muted-foreground font-light text-[14px]">
              Dimension is a collaboration platform for modern engineering teams. It bridges the gap between communication, cloud, code, projects, and more—with an incredible developer experience.
            </p>
            <ul class="list-disc list-outside text-muted-foreground font-light text-[14px] pl-3">
              <li class="mb-2">
                Led the rewrite from the MVP version, which was previously fragile with numerous bugs and technical debt. Convinced the team to transition to a new monorepo project with a solid foundation, ensuring code quality and developing conventions to maintain consistency and reliability across the team.
              </li>
              <li class="mb-2">
                Developed a comprehensive front-end design system with well-structured and easy-to-use APIs, equipped with accessibility and keyboard navigation. This system has been praised by colleagues for enhancing the development experience and accelerating feature development.
              </li>
              <li class="mb-2">
                Led the hiring process for software engineers, including designing interview processes and evaluating candidates to build a strong development team.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  setup() {
    useHead({
      title: "About",
      titleTemplate: "%s | Portofolio",
    });
  },
};
</script>
<style lang=""></style>
