<template>
  <div>
    <div
      class="layout text-center pb-12 pt-12 md:pb-16 md:pt-36 flex flex-col justify-center"
    >
      <div class="flex flex-col gap-2">
        <div class="text-6xl font-rethink font-bold">
          <span> Fun </span>
          <BaseTextHighlight
            :duration="500"
            class="rounded-lg bg-gradient-to-r from-[#9E7AFF] to-[#FE8BBB]"
          >
            Facts
          </BaseTextHighlight>
        </div>
        <div class="text-muted-foreground">A story of growth and discovery</div>
      </div>
    </div>
    <div
      class="layout pb-12 pt-12 md:pb-16 md:pt-8 flex flex-col justify-center gap-10"
    >
      <div
        class="flex gap-8 items-start border border-zinc-50/[.05] rounded-xl px-6 py-8"
      >
        <div class="basis-[30%]">
          <div class="flex flex-col gap-3 items-start pb-2">
            <div
              class="text-xl border border-zinc-50/[.15] rounded-full h-10 w-10 flex items-center justify-center"
            >
              🎬
            </div>
            <div class="text-2xl font-bold font-rethink">
              So much like a Movie
            </div>
          </div>
          <div
            class="text-muted-foreground font-normal tracking-wide text-[13px] text-left"
          >
            Films often reflect experiences or emotions that the audience can
            relate to.
          </div>
        </div>
        <div class="basis-[70%]">
          <div>
            <div class="text-xl font-bold font-rethink pb-4">
              Favorite movies
            </div>
            <div class="grid grid-cols-3 gap-6">
              <template
                v-for="(movie, index) in listFavoriteMovies"
                :key="movie.title"
              >
                <div class="col-span-1">
                  <div
                    @mouseenter="onMouseEnter(index)"
                    @mouseleave="onMouseLeave(index)"
                  >
                    <template v-if="!moviesOnHover[index]">
                      <NuxtImg
                        :src="movie.image"
                        class="rounded-lg w-full h-[300px] border border-zinc-50/[.05] hover:border-zinc-50/[.15]"
                      />
                    </template>
                    <template v-else>
                      <div
                        class="border border-zinc-50/[.15] w-full h-[300px] rounded-lg p-4 relative overflow-hidden"
                      >
                        <div class="">
                          <div class="font-rethink font-bold text-2xl mb-3">
                            {{ movie.title }}
                          </div>
                          <div class="flex flex-col gap-[5px]">
                            <div
                              class="text-muted-foreground text-[14px] font-light"
                            >
                              Year:
                              <span class="text-foreground">{{
                                movie.year
                              }}</span>
                            </div>
                            <div
                              class="text-muted-foreground text-[14px] font-light"
                            >
                              Running time:
                              <span class="text-foreground">{{
                                movie.runtime
                              }}</span>
                            </div>
                            <div
                              class="text-muted-foreground text-[14px] font-light"
                            >
                              Directed by:
                              <span class="text-foreground">{{
                                movie.directedBy
                              }}</span>
                            </div>
                            <div
                              class="text-muted-foreground text-[14px] font-light"
                            >
                              Genre:
                              <span class="text-foreground">{{
                                movie.genre
                              }}</span>
                            </div>
                            <div
                              class="text-muted-foreground text-[14px] font-light"
                            >
                              Rating:
                              <span class="text-foreground">{{
                                movie.rating
                              }}</span>
                            </div>
                          </div>
                          <div
                            class="absolute bottom-[4px] left-[10px] text-left"
                          >
                            <div
                              class="text-4xl font-rethink font-bold uppercase text-zinc-50/[.05]"
                            >
                              {{ movie.title }}
                            </div>
                          </div>
                        </div>
                      </div>
                    </template>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
      <div
        class="flex flex-col gap-8 items-start border border-zinc-50/[.05] rounded-xl px-28 py-12"
      >
        <div class="flex gap-8 w-full pb-2">
          <div
            class="basis-[25%] border border-zinc-50/[.05] rounded-xl flex items-center justify-center"
          >
            <BaseIconSong width="150" height="150" fill="#a1a1a1" stroke="#a1a1a1" />
          </div>
          <div class="basis-[70%] flex flex-col justify-end gap-2">
            <div
              class="text-xl border border-zinc-50/[.15] rounded-full h-10 w-10 flex items-center justify-center"
            >
              🎧ྀི
            </div>
            <div class="text-4xl font-rethink font-bold">My Favorite Songs</div>
            <div class="text-[14px] text-muted-foreground font-light">
              Lorem ipsum odor amet, consectetuer adipiscing elit.
            </div>
            <div class="text-[14px] text-muted-foreground font-light">
              {{ totalSongs }} songs, {{ totalHourSongs }}
            </div>
            <div class="pt-2">
              <NuxtLink :to="myProfileSpotify" target="_blank">
                <Button variant="outline">Visit profile</Button>
              </NuxtLink>
            </div>
          </div>
        </div>
        <hr class="border-zinc-50/[.05] w-full" />
        <div class="w-full">
          <div class="text-xl font-rethink font-bold pb-6">List songs</div>

          <div
            class="flex flex-col justify-center gap-10 border border-zinc-50/[.05] rounded-xl py-6 px-4"
          >
            <template v-for="(song, index) in listFavoriteSongs" :key="index">
              <div class="flex gap-6">
                <div class="basis-[5%] flex items-center justify-center">
                  <div class="text-base">
                    {{ index + 1 }}
                  </div>
                </div>
                <div class="basis-[7.5%] flex items-center justify-center">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger as-child>
                        <NuxtImg
                          :src="song.url_img"
                          class="rounded w-[50px] h-[50px] border border-zinc-50/[.05]"
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p class="mb-0">Add to library</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div
                  class="basis-[35%] flex-col items-center justify-left gap-2"
                >
                  <div class="flex items-center gap-1">
                    <NuxtLink
                      class="text-base font-rethink hover:underline"
                      :to="song.song_url"
                      target="_blank"
                    >
                      {{ song.title }}
                    </NuxtLink>

                    <div class="text-[13px] text-muted-foreground">.</div>
                    <div class="text-[13px] text-muted-foreground">
                      {{ song.year }}
                    </div>
                  </div>
                  <NuxtLink
                    class="text-[13px] text-muted-foreground underline"
                    :to="song.album_url"
                    target="_blank"
                  >
                    {{ song.album }}
                  </NuxtLink>
                </div>
                <div class="basis-[20%] flex items-center justify-left">
                  <NuxtLink
                    class="text-[14px] text-muted-foreground hover:underline"
                    :to="song.artist_url"
                    target="_blank"
                  >
                    {{ song.artist }}
                  </NuxtLink>
                </div>
                <div class="basis-[5%] flex items-center justify-left">
                  <div class="text-[14px] text-muted-foreground">
                    {{ song.duration }}
                  </div>
                </div>
                <div class="basis-[5%] flex items-center justify-left">
                  <div class="text-[14px] text-muted-foreground">
                    {{ song.total_listeners }}
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
useHead({
  title: "Fun Facts",
  titleTemplate: "%s | Portofolio",
});

const moviesOnHover = ref([]);

const onMouseEnter = (index) => {
  setTimeout(() => {
    moviesOnHover.value[index] = true;
  }, 100);
};
const onMouseLeave = (index) => {
  setTimeout(() => {
    moviesOnHover.value[index] = false;
  }, 100);
};

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
  // {
  //   title: "Gala Bunga Matahari",
  //   artist: "Sal Priadi",
  //   album: "MARKERS AND SUCH PENS FLASHDISKS",
  //   year: "2024",
  //   duration: "3:29",
  //   total_listeners: "152,164,348",
  //   url_img: "",
  //   song_url: "",
  //   album_url: "",
  //   artist_url: "",
  // },
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
