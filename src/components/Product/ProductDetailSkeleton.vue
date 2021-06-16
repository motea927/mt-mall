<template>
  <section
    class="
      flex flex-wrap
      mb-12
      overflow-hidden
      rounded
      shadow-2xl
      product-detail-skeleton
      min-h-[600px]
      animate-pulse
    "
  >
    <div
      class="order-last w-full p-5 text-white  md:order-first md:w-1/2 md:bg-transparent"
    >
      <h2 class="mb-12 bg-gray-300 rounded h-7 w-28"></h2>
      <h3 class="w-20 mb-5 bg-gray-300 rounded h-7"></h3>
      <p class="h-6 mb-2 bg-gray-300 rounded"></p>
      <p class="h-6 mb-2 bg-gray-300 rounded"></p>
      <p class="h-6 mb-12 bg-gray-300 rounded"></p>
      <p class="mb-12 bg-gray-300 rounded w-14 h-9"></p>
      <div class="flex justify-start w-56 bg-gray-300 rounded h-9"></div>
    </div>
    <div
      class="flex items-center justify-center w-full  md:p-5 md:w-1/2 bg-light-primary md:bg-transparent"
    >
      <div class="w-1/4 pb-[25%] bg-gray-300 rounded"></div>
    </div>
  </section>
</template>

<script lang="ts"></script>

<style>
.product-detail-skeleton {
  background: linear-gradient(115deg, #ccb 50%, transparent 50%) center center /
    100% 100%;
}
@media (max-width: 768px) {
  .product-detail-skeleton {
    background: transparent;
  }
}
</style>
