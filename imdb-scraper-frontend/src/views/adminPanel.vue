<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">IMDb Scraper Admin Panel</h1>

    <div class="flex gap-4 mb-6">
      <input
        v-model="url"
        type="text"
        placeholder="Enter IMDb URL"
        class="flex-1 border p-2"
      />
      <button
        @click="scrapeNow"
        class="bg-green-500 text-white px-4 py-2 rounded"
      >
        {{ loading ? "Scraping..." : "Scrape Now" }}
      </button>
      <download-excel
        class="bg-gray-700 text-white px-4 py-2 rounded"
        :data="movies"
        name="imdb-movies.csv"
      >
        Download CSV
      </download-excel>
    </div>

    <table class="w-full border text-left">
      <thead class="bg-gray-200">
        <tr>
          <th class="p-2">Title</th>
          <th class="p-2">Rating</th>
          <th class="p-2">Genres</th>
          <th class="p-2">Summary</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="m in movies" :key="m._id" class="border-t">
          <td class="p-2">{{ m.title }}</td>
          <td class="p-2">{{ m.rating }}</td>
          <td class="p-2">{{ m.genres.join(", ") }}</td>
          <td class="p-2">{{ m.summary }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import DownloadExcel from "vue3-json-excel";

const url = ref("");
const movies = ref([]);
const loading = ref(false);
const api = "https://imdb-scraper-z9hk.onrender.com";

async function fetchMovies() {
  const res = await axios.get(`${api}/movies`);
  movies.value = res.data;
}

async function scrapeNow() {
  if (!url.value) return alert("Enter a valid URL.");
  loading.value = true;
  try { 
    await axios.post(`${api}/scrape`, { url: url.value });
    await fetchMovies();
    url.value = "";
  } catch {
    alert("Scraping failed.");
  }
  loading.value = false;
}
onMounted(fetchMovies);
</script>
