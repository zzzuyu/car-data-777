<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow">
    <!-- Image Section -->
    <figure class="relative h-48 bg-gray-200 overflow-hidden group">
      <!-- Image -->
      <img :src="car.image_url || 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&q=80&w=600'" alt="Car" class="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
      
      <!-- Compare Pill -->
      <div class="absolute top-2 right-2 z-10">
        <label class="flex items-center gap-1.5 px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-full border border-gray-300 text-[10px] font-medium text-gray-700 cursor-pointer shadow-sm hover:bg-white">
          <input type="checkbox" class="w-3 h-3 border-gray-300 rounded-sm text-carsxOrange focus:ring-carsxOrange" />
          เปรียบเทียบ
        </label>
      </div>

      <!-- Watermark/Badge overlay (Decorative) -->
      <div class="absolute bottom-2 right-2 bg-carsxOrange text-white text-[8px] font-bold px-1.5 py-0.5 rounded shadow flex flex-col items-center leading-tight z-10 opacity-90">
        <span>CARS<span class="text-[10px]">X</span></span>
        <span class="text-[6px] opacity-80">QUALITY CARS</span>
      </div>
      
      <!-- Status overlay if not available -->
      <div v-if="car.status !== 'ว่าง'" class="absolute inset-0 bg-black/40 flex items-center justify-center z-20">
        <span class="bg-white px-4 py-1.5 rounded-full font-bold text-sm shadow-lg" :class="car.status === 'ขายแล้ว' ? 'text-red-500' : 'text-orange-500'">
          {{ car.status }}
        </span>
      </div>
    </figure>
    
    <!-- Details Section -->
    <div class="p-3.5 flex flex-col flex-grow">
      <!-- Title -->
      <h2 class="text-sm font-bold text-gray-800 leading-snug line-clamp-2 h-10 mb-1">
        {{ car.year }} {{ car.brand }}
      </h2>
      
      <!-- Badges row -->
      <div class="flex items-center gap-1.5 mb-2">
        <span class="border border-blue-400 text-blue-500 text-[9px] font-bold px-1 py-0.5 rounded-sm leading-none">AT</span>
        <!-- Color text instead of circle to match typical thai car site details -->
        <span class="text-xs text-gray-500">สี{{ car.color }}</span>
      </div>
      
      <!-- Location/Branch -->
      <div class="flex items-center gap-1 mb-4 text-xs text-gray-500">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
        <span class="truncate">สาขาหลัก (มีนบุรี)</span>
      </div>
      
      <!-- Price Area -->
      <div class="mt-auto border-b border-gray-100 pb-3 mb-3 flex flex-col">
        <div class="flex justify-between items-end mb-1">
          <p class="text-xl font-bold text-gray-900 leading-none">
            {{ car.price.toLocaleString() }}.-
          </p>
          <p class="text-[10px] text-gray-500 font-medium">
            ผ่อนเริ่มต้น {{ Math.round(car.price * 0.015).toLocaleString() }} /เดือน*
          </p>
        </div>
        <p class="text-[10px] text-gray-400 line-through">
          {{ Math.round(car.price * 1.07).toLocaleString() }}.- (รวม VAT 7%)
        </p>
      </div>
      
      <!-- Action Buttons -->
      <div class="grid grid-cols-2 gap-2">
        <button class="flex justify-center items-center gap-1 py-1.5 border border-carsxOrange rounded-full text-carsxOrange hover:bg-orange-50 text-xs font-semibold transition-colors" @click="$emit('edit', car)" title="แก้ไขข้อมูล">
          <!-- Using standard pencil icon since it's an edit action, but styled like the screenshot button -->
          <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
          แก้ไข
        </button>
        <button class="flex justify-center items-center gap-1 py-1.5 bg-red-500 hover:bg-red-600 rounded-full text-white text-xs font-semibold transition-colors" @click="$emit('delete', car.id)" title="ลบข้อมูล">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
          ลบข้อมูล
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  car: {
    type: Object,
    required: true
  }
});
defineEmits(['edit', 'delete']);
</script>
