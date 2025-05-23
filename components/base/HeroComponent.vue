<template>
  <div
    class="layout text-center pb-12 pt-12 min-h-[calc(100vh-80px)] md:pb-20 md:pt-36 flex flex-col justify-center"
  >
    <div class="grid grid-cols-12 gap-8">
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
      <div class="col-span-6">
        <!-- <ClientOnly>
          <Button
            @click="
              colorMode.preference =
                colorMode.preference === 'light' ? 'dark' : 'light'
            "
          >
            Switch Theme
          </Button>
        </ClientOnly> -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  setup() {
    const colorMode = useColorMode();

    return {
      colorMode,
    };
  },
};
</script>
<style lang=""></style>
