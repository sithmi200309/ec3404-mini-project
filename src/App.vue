<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import type { Product, ProductResponse } from './types/product'

import ProductCard from './components/ProductCard.vue'
import ProductDetailModal from './components/ProductDetailModal.vue'
import { useCart } from './composables/useCart'

/* CART */
const { cart } = useCart()

const removeFromCart = (index: number) => {
  cart.value.splice(index, 1)
}

const showCart = ref(false)

const openCart = () => {
  showCart.value = true
}

const closeCart = () => {
  showCart.value = false
}

const totalPrice = computed(() => {
  return cart.value.reduce((total, item) => total + item.price, 0)
})

const checkout = () => {
  alert('Order placed successfully! 🎉')
  cart.value = []
  showCart.value = false
}
/* WISHLIST BUTTON */
const wishlist = ref<number[]>([])

const toggleWishlist = (id: number) => {
  if (wishlist.value.includes(id)) {
    wishlist.value = wishlist.value.filter(item => item !== id)
  } else {
    wishlist.value.push(id)
  }
}

/* STATES */
const products = ref<Product[]>([])
const loading = ref(true)

const searchQuery = ref('')
const selectedCategory = ref('all')

/* DARK MODE */
const darkMode = ref(false)

const toggleDarkMode = () => {
  darkMode.value = !darkMode.value
}

/* MODAL */
const selectedProduct = ref<Product | null>(null)
const showModal = ref(false)

/* FETCH PRODUCTS */
const fetchProducts = async () => {
  try {
    const response = await fetch('https://dummyjson.com/products')
    const data: ProductResponse = await response.json()
    products.value = data.products
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

/* CATEGORY LIST */
const categories = computed(() => {
  const unique = new Set(
    products.value.map((p) => p.category)
  )
  return ['all', ...unique]
})

/* FILTER PRODUCTS */
const filteredProducts = computed(() => {
  return products.value.filter((product) => {

    const searchMatch =
      product.title
        .toLowerCase()
        .includes(searchQuery.value.toLowerCase())

    const categoryMatch =
      selectedCategory.value === 'all' ||
      product.category === selectedCategory.value

    return searchMatch && categoryMatch
  })
})

/* MODAL FUNCTIONS */
const openProduct = (product: Product) => {
  selectedProduct.value = product
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}

onMounted(fetchProducts)
</script>

<template>
  <div
    :class="
      darkMode
        ? 'min-h-screen bg-gray-900 text-white p-8'
        : 'min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-8'
    "
  >

    <!-- HEADER -->
    <div class="relative flex items-center mb-6">

  <!-- CENTER TITLE -->
  <h1 class="text-4xl font-bold mx-auto">
    Smart Product Explorer
  </h1>

  <!-- CART RIGHT -->
  <div class="absolute right-0">

  <!-- CART COUNT -->
  <div
  @click="openCart"
  class="bg-blue-600 text-white px-4 py-2 rounded-lg shadow mb-2 cursor-pointer"
>
  🛒 Cart: {{ cart.length }}
</div>

  <!-- CART ITEMS -->
  <!-- CART MODAL -->
<div
  v-if="showCart"
  @click.self="closeCart"
  class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center"
>
  <div class="bg-white p-6 rounded-xl w-[400px] relative text-black">

    <!-- CLOSE -->
    <button
      class="absolute top-2 right-3 text-xl"
      @click="closeCart"
    >
      ✖
    </button>

    <h2 class="text-xl font-bold mb-4">
      Your Cart
    </h2>
    
    <!-- ITEMS -->
    <div v-if="cart.length > 0">
      <div
        v-for="(item, index) in cart"
        :key="index"
        class="flex justify-between items-center mb-3"
      >
        <span>{{ item.title }}</span>

        <button
          @click="removeFromCart(index)"
          class="text-red-500 text-sm"
        >
          Remove
        </button>
      </div>
    </div>

    <!-- TOTAL -->
    <div
  v-if="cart.length > 0"
  class="mt-4 pt-2 border-t font-bold flex justify-between"
>
  <span>Total:</span>
  <span>$ {{ totalPrice }}</span>
</div>

<!-- CHECKOUT BUTTON -->
<button
  v-if="cart.length > 0"
  class="w-full mt-4 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
  @click="checkout"
>
  Checkout
</button>


    <!-- EMPTY -->
    <div v-else class="text-gray-500 text-center">
      Cart is empty 🛒
    </div>

  </div>
</div>

</div>

</div>

    <!-- DARK MODE -->
    <div class="flex justify-center mb-6">
      <button
        @click="toggleDarkMode"
        class="px-4 py-2 bg-black text-white rounded-lg"
      >
        Dark Mode
      </button>
    </div>

    <!-- SEARCH -->
    <div class="flex justify-center mb-6">
      <input
        v-model="searchQuery"
        placeholder="Search products..."
        class="w-full max-w-md p-2 border rounded-lg text-black"
      />
    </div>

    <!-- CATEGORY FILTER -->
    <div class="flex flex-wrap justify-center gap-2 mb-8">
      <button
        v-for="category in categories"
        :key="category"
        @click="selectedCategory = category"
        class="px-3 py-1 rounded border"
        :class="
          selectedCategory === category
            ? 'bg-blue-600 text-white'
            : 'bg-white text-black'
        "
      >
        {{ category.charAt(0).toUpperCase() + category.slice(1) }}
      </button>
    </div>

    <!-- LOADING -->
    <div v-if="loading" class="text-center">
      Loading products...
    </div>

    <!-- PRODUCTS -->
    <!-- PRODUCTS -->
<div v-else>

  <!-- IF PRODUCTS EXIST -->
  <div
    v-if="filteredProducts.length > 0"
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
  >
    <ProductCard
  v-for="product in filteredProducts"
  :key="product.id"
  :product="product"
  :isWishlisted="wishlist.includes(product.id)"
  @select="openProduct"
  @add-to-cart="cart.push($event)"
  @toggle-wishlist="toggleWishlist"
/>
  </div>

  <!-- IF NO PRODUCTS -->
  <div
    v-else
    class="text-center mt-10 text-gray-500 text-lg"
  >
    No products found!
  </div>

</div>

    <!-- MODAL -->
    <ProductDetailModal
      :product="selectedProduct"
      :show="showModal"
      @close="closeModal"
    />

  </div>
</template>