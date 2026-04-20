<script setup lang="ts">
import { ref, onMounted } from 'vue'

const images = [
  '/images/banner1.jpg',
  '/images/banner2.jpg',
  '/images/banner3.jpg',
  '/images/banner4.jpg',
]

const currentIndex = ref(0)

// NEXT
const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % images.length
}

// PREVIOUS
const prevSlide = () => {
  currentIndex.value =
    (currentIndex.value - 1 + images.length) % images.length
}

// AUTO CHANGE
onMounted(() => {
  setInterval(nextSlide, 3000) // change every 3 sec
})
</script>

<template>
  <div class="relative w-full max-w-5xl mx-auto mb-8">

    <!-- IMAGE -->
    <img
      :src="images[currentIndex]"
      class="w-full h-[350px] object-cover rounded-xl"
    />

    <!-- LEFT BUTTON -->
    <button
      @click="prevSlide"
      class="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white px-3 py-1 rounded"
    >
      <
    </button>

    <!-- RIGHT BUTTON -->
    <button
      @click="nextSlide"
      class="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white px-3 py-1 rounded"
    >
      >
    </button>

  </div>
</template>