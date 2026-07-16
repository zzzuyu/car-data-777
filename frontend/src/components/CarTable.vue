<template>
  <div class="overflow-x-auto">
    <table class="table w-full">
      <thead>
        <tr>
          <th>ID</th>
          <th>Brand</th>
          <th>Color</th>
          <th>Year</th>
          <th>Price</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="car in cars" :key="car.id">
          <td>{{ car.id }}</td>
          <td>{{ car.brand }}</td>
          <td>{{ car.color }}</td>
          <td>{{ car.year }}</td>
          <td>฿{{ car.price.toLocaleString() }}</td>
          <td>
            <div class="badge" :class="{
              'badge-success': car.status === 'ว่าง',
              'badge-error': car.status === 'ขายแล้ว',
              'badge-warning': car.status === 'กำลังซ่อม'
            }">{{ car.status }}</div>
          </td>
          <td>
            <button class="btn btn-primary btn-xs" @click="$emit('edit', car)">Edit</button>
            <button class="btn btn-error btn-xs ml-2" @click="$emit('delete', car.id)">Delete</button>
          </td>
        </tr>
        <tr v-if="cars.length === 0">
          <td colspan="7" class="text-center py-4">No cars found.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
defineProps({
  cars: {
    type: Array,
    required: true
  }
});
defineEmits(['edit', 'delete']);
</script>
