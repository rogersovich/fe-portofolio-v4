<template>
  <div
    class="min-h-screen bg-zinc-50 dark:bg-zinc-950 relative overflow-y-scroll z-10 overflow-x-hidden"
  >
    <div class="absolute bottom-0 left-8 z-[-1]">
      <div
        class="uppercase text-[5rem] md:text-[10rem] font-rethink font-bold text-zinc-950/[.05] dark:text-zinc-50/[.05]"
      >
        Fun Facts
      </div>
    </div>
    <div
      class="layout text-center pb-12 pt-12 md:pb-16 md:pt-36 flex flex-col justify-center"
    >
      <div
        class="flex flex-col items-center justify-center md:justify-start gap-3 md:gap-2"
      >
        <ClientOnly>
          <div
            v-if="isMobile"
            class="border border-solid border-zinc-950/[.1] dark:border-zinc-50/[.1] rounded-lg p-2 flex items-center justify-center mb-2"
          >
            <IconComet class="size-6" />
          </div>
        </ClientOnly>
        <div class="text-4xl md:text-6xl font-rethink font-bold">
          <span> Fun </span>
          <BaseTextHighlight :duration="500" class="text-head-highlight">
            Facts
          </BaseTextHighlight>
        </div>
        <div class="text-muted-foreground text-sm md:text-base md:mt-3">
          Discovery my Hobbies and Fun facts
        </div>
      </div>
    </div>
    <div
      class="layout pb-8 pt-8 md:pb-16 md:pt-8 flex flex-col justify-center gap-10"
    >
      <div
        class="flex flex-col md:flex-row gap-6 md:gap-8 items-start border border-solid border-zinc-950/[.05] dark:border-zinc-50/[.05] rounded-xl px-4 md:px-6 py-6 md:py-8"
      >
        <div class="md:basis-[30%]">
          <div class="flex flex-col gap-3 items-start pb-2">
            <div
              class="text-xl border border-solid border-zinc-950/[.15] dark:border-zinc-50/[.15] rounded-full h-10 w-10 flex items-center justify-center"
            >
              🎬
            </div>
            <div class="text-2xl md:text-3xl font-bold font-rethink">
              So much like a Movie
            </div>
          </div>
          <div
            class="text-muted-foreground font-normal tracking-wide text-[12px] md:text-[13px] text-left"
          >
            Films often reflect experiences or emotions that the audience can
            relate to.
          </div>
        </div>
        <div class="md:basis-[70%] basis-auto w-full">
          <div>
            <div class="text-2xl md:text-3xl font-bold font-rethink pb-4">
              Favorite movies
            </div>
            <FunFactListMovie :list-favorite-movies="listFavoriteMovies" />
          </div>
        </div>
      </div>
      <div
        class="flex flex-col gap-8 items-start border border-solid border-zinc-950/[.05] dark:border-zinc-50/[.05] rounded-xl px-4 md:px-28 py-4 md:py-12"
      >
        <div class="flex flex-col md:flex-row gap-8 w-full pb-2">
          <div
            class="basis-[25%] border border-solid border-zinc-950/[.05] dark:border-zinc-50/[.05] rounded-xl md:flex items-center justify-center hidden"
          >
            <ClientOnly>
              <BaseIconSong
                width="150"
                height="150"
                :fill="$colorMode.preference == 'light' ? '#52525b' : '#a1a1a1'"
                :stroke="
                  $colorMode.preference == 'light' ? '#52525b' : '#a1a1a1'
                "
              />
            </ClientOnly>
          </div>
          <div class="basis-[70%] flex flex-col justify-end gap-2">
            <div
              class="text-xl border border-solid border-zinc-950/[.15] dark:border-zinc-50/[.15] rounded-full h-10 w-10 flex items-center justify-center"
            >
              🎧ྀི
            </div>
            <div class="text-2xl md:text-4xl font-rethink font-bold">
              My Favorite Songs
            </div>
            <div
              class="text-[12px] md:text-[14px] text-muted-foreground font-light"
            >
              This is my favofite songs from spotify, maybe you like it too.
            </div>
            <div
              class="text-[12px] md:text-[14px] text-muted-foreground font-light"
            >
              {{ totalSongs }} songs, {{ totalHourSongs }}
            </div>
            <div class="pt-2">
              <NuxtLink :to="myProfileSpotify" target="_blank">
                <Button
                  severity="secondary"
                  class="!text-[12px] md:!text-sm shadow"
                  >Visit profile</Button
                >
              </NuxtLink>
            </div>
          </div>
        </div>
        <ClientOnly>
          <hr
            v-if="!isMobile"
            class="border-zinc-950/[.05] dark:border-zinc-50/[.05] w-full !border-x-0 !border-t-0 h-4"
          />
        </ClientOnly>
        <FunFactListSong :listFavoriteSongs="listFavoriteSongs" />
      </div>
      <FunFactSectionPet />
    </div>
  </div>
</template>
<script setup>
import { IconComet } from "@tabler/icons-vue";
import { isMobile } from "~/composables/useBreakpoint";

useHead({
  title: "Fun Facts",
  titleTemplate: "%s | Portofolio",
});

const moviesOnHover = ref([]);

const listFavoriteMovies = [
  {
    title: "The Maze Runner",
    image: "/images/movies/maze-runner.jpg",
    rating: "8/10",
    genre: "Mystery, Thriller",
    runtime: "2h 4m",
    directedBy: "susane bier",
    year: "2018",
  },
  {
    title: "Bird Box",
    image: "/images/movies/bird-box.jpg",
    rating: "8/10",
    genre: "Mystery, Thriller",
    runtime: "2h 4m",
    directedBy: "susane bier",
    year: "2018",
  },
  {
    title: "Stranger Things",
    image: "/images/movies/stranger-things.jpg",
    rating: "8/10",
    genre: "Mystery, Thriller",
    runtime: "2h 4m",
    directedBy: "susane bier",
    year: "2018",
  },
];

const myProfileSpotify =
  "https://open.spotify.com/user/ency6m9rfx4wnd6lxkxbo664s";

const listFavoriteSongs = [
  {
    title: "Nina",
    artist: ".Feast",
    album: "Membangun & Menghancurkan",
    year: "2024",
    duration: "4:37",
    total_listeners: "83,324,463",
    url_img: "https://i.scdn.co/image/ab67616d00001e0239695d4c16489cdf60bef536",
    song_url: "https://open.spotify.com/track/1zFaLYA10ImwEejge3F5nm",
    album_url: "https://open.spotify.com/album/0y9i2KHDYh2gKfbpUNiM86",
    artist_url: "https://open.spotify.com/artist/7Gy1PxqrgsiqWF6JNYPHeB",
  },
  {
    title: "Gala Bunga Matahari",
    artist: "Sal Priadi",
    album: "MARKERS AND SUCH PENS FLASHDISKS",
    year: "2024",
    duration: "3:29",
    total_listeners: "152,164,348",
    url_img: "https://i.scdn.co/image/ab67616d00001e02686acaaa87bfc6ebb42b3bd2",
    song_url: "https://open.spotify.com/track/5eBk8ZXcd0pb0AO4a5PpOg",
    album_url: "https://open.spotify.com/album/5uAcLj2EJLtQtKMyDYCI0Q",
    artist_url: "https://open.spotify.com/artist/1NjxFrpEGZTV2Ny0OJxeWu",
  },
  {
    title: "Disenchanted",
    artist: "My Chemical Romance",
    album: "The Black Parade",
    year: "2006",
    duration: "4:55",
    total_listeners: "226,046,296",
    url_img: "https://i.scdn.co/image/ab67616d00001e0217f77fab7e8f18d5f9fee4a1",
    song_url: "https://open.spotify.com/track/6T7MAQCekVb3UnCykjX3BP",
    album_url: "https://open.spotify.com/album/0FZK97MXMm5mUQ8mtudjuK",
    artist_url: "https://open.spotify.com/artist/7FBcuc1gsnv6Y1nwFtNRCb",
  },
  {
    title: "Kisah Dari Selatan Jakarta",
    artist: "White Shoes & The Couples Company",
    album: "Together Whatever Sessions",
    year: "2018",
    duration: "4:15",
    total_listeners: "12,175,672",
    url_img: "https://i.scdn.co/image/ab67616d0000b2737d81d49764e4eb156f1039a9",
    song_url: "https://open.spotify.com/track/20qm0yBgr7ylY91vKp7SpY",
    album_url: "https://open.spotify.com/album/0eXX7sZMrUItp9FT6FTWdl",
    artist_url: "https://open.spotify.com/artist/5wm369wshLgPTaW2TDwkus",
  },
  {
    title: "33x",
    artist: "Perunggu",
    album: "Memorandum",
    year: "2022",
    duration: "7:14",
    total_listeners: "15,852,789",
    url_img: "https://i.scdn.co/image/ab67616d0000b2737b75822516f485d6fc90b60e",
    song_url: "https://open.spotify.com/track/0I3I9hgBRat6HR5Gzy26jx",
    album_url: "https://open.spotify.com/album/2ZI3XeIrCM1PsOtK3rlMth",
    artist_url: "https://open.spotify.com/artist/0NbKRRBuiIUwS9irPvi7wD",
  },
];

const totalHourSongs = computed(() => {
  let totalMinutes = 0;
  listFavoriteSongs.forEach((song) => {
    const [minutes, seconds] = song.duration.split(":").map(Number);
    totalMinutes += minutes;
  });
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return hours > 0 ? `${hours} hr ${minutes} min` : `${minutes} min`;
});

const totalSongs = computed(() => {
  return listFavoriteSongs.length;
});

onMounted(() => {
  listFavoriteMovies.forEach((_, index) => {
    moviesOnHover.value.push(false);
  });
});
</script>
<style lang="css">
/* .text-outline-effect {
  text-shadow: -2px -2px -1px #fff;
  color: #000;
} */
</style>
