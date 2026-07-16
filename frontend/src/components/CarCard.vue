<template>
  <div class="card w-full bg-base-100 shadow-xl image-full">
    <figure><img :src="car.image_url || 'https://via.placeholder.com/400x200?text=No+Image'" alt="Car" /></figure>
    <div class="card-body">
      <h2 class="card-title">{{ car.brand }} ({{ car.year }})</h2>
      <p>Color: {{ car.color }}</p>
      <p>Price: ฿{{ car.price.toLocaleString() }}</p>
      <div class="card-actions justify-between items-center mt-4">
        <div class="badge" :class="{
          'badge-success': car.status === 'ว่าง',
          'badge-error': car.status === 'ขายแล้ว',
          'badge-warning': car.status === 'กำลังซ่อม'
        }">{{ car.status }}</div>
        <button class="btn btn-primary btn-sm" @click="$emit('edit', car)">Edit</button>
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
defineEmits(['edit']);
</script>
