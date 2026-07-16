<template>
  <div class="min-h-screen bg-base-200 p-4 md:p-8">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-4xl font-bold text-center mb-8">Car Record System</h1>
      
      <div class="flex flex-col lg:flex-row gap-6">
        <!-- Sidebar / Filters -->
        <div class="w-full lg:w-1/4">
          <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
              <h2 class="card-title mb-4">Filters</h2>
              
              <div class="form-control w-full mb-2">
                <label class="label"><span class="label-text">Brand</span></label>
                <input type="text" v-model="filters.brand" class="input input-bordered w-full" placeholder="e.g. Toyota" />
              </div>
              
              <div class="form-control w-full mb-2">
                <label class="label"><span class="label-text">Color</span></label>
                <input type="text" v-model="filters.color" class="input input-bordered w-full" placeholder="e.g. Red" />
              </div>
              
              <div class="form-control w-full mb-2">
                <label class="label"><span class="label-text">Year</span></label>
                <input type="number" v-model="filters.year" class="input input-bordered w-full" placeholder="e.g. 2021" />
              </div>
              
              <div class="flex gap-2 mb-2">
                <div class="form-control w-1/2">
                  <label class="label"><span class="label-text">Min Price</span></label>
                  <input type="number" v-model="filters.minPrice" class="input input-bordered w-full" />
                </div>
                <div class="form-control w-1/2">
                  <label class="label"><span class="label-text">Max Price</span></label>
                  <input type="number" v-model="filters.maxPrice" class="input input-bordered w-full" />
                </div>
              </div>
              
              <div class="form-control w-full mb-4">
                <label class="label"><span class="label-text">Status</span></label>
                <select v-model="filters.status" class="select select-bordered">
                  <option value="">All</option>
                  <option value="ว่าง">ว่าง</option>
                  <option value="ขายแล้ว">ขายแล้ว</option>
                  <option value="กำลังซ่อม">กำลังซ่อม</option>
                </select>
              </div>
              
              <button class="btn btn-primary w-full" @click="fetchCars">Apply Filters</button>
              <button class="btn btn-ghost w-full mt-2" @click="clearFilters">Clear</button>
            </div>
          </div>
        </div>
        
        <!-- Main Content -->
        <div class="w-full lg:w-3/4">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold">Results ({{ cars.length }})</h2>
            <div class="flex gap-2 items-center">
              <span class="text-sm font-medium">View:</span>
              <div class="join">
                <button class="btn join-item btn-sm" :class="{'btn-active': viewMode === 'card'}" @click="viewMode = 'card'">Card</button>
                <button class="btn join-item btn-sm" :class="{'btn-active': viewMode === 'table'}" @click="viewMode = 'table'">Table</button>
              </div>
            </div>
          </div>
          
          <div v-if="loading" class="flex justify-center my-12">
            <span class="loading loading-spinner loading-lg text-primary"></span>
          </div>
          
          <template v-else>
            <!-- Card View -->
            <div v-if="viewMode === 'card'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <CarCard v-for="car in cars" :key="car.id" :car="car" @edit="openEditModal(car)" />
              <div v-if="cars.length === 0" class="col-span-full text-center py-12 text-gray-500">No cars found matching your criteria.</div>
            </div>
            
            <!-- Table View -->
            <div v-if="viewMode === 'table'" class="bg-base-100 rounded-box shadow-xl p-4">
              <CarTable :cars="cars" @edit="openEditModal" @delete="handleDelete" />
            </div>
          </template>
        </div>
      </div>
    </div>

    <!-- Edit Modal (Simplified for demo) -->
    <dialog id="edit_modal" class="modal">
      <div class="modal-box">
        <h3 class="font-bold text-lg">Edit Car {{ editForm.id ? '#' + editForm.id : '' }}</h3>
        <div class="py-4 space-y-3">
          <input type="text" v-model="editForm.brand" class="input input-bordered w-full" placeholder="Brand" />
          <input type="text" v-model="editForm.color" class="input input-bordered w-full" placeholder="Color" />
          <input type="number" v-model="editForm.year" class="input input-bordered w-full" placeholder="Year" />
          <input type="number" v-model="editForm.price" class="input input-bordered w-full" placeholder="Price" />
          <select v-model="editForm.status" class="select select-bordered w-full">
            <option value="ว่าง">ว่าง</option>
            <option value="ขายแล้ว">ขายแล้ว</option>
            <option value="กำลังซ่อม">กำลังซ่อม</option>
          </select>
        </div>
        <div class="modal-action">
          <form method="dialog">
            <button class="btn mr-2" @click="closeModal">Cancel</button>
            <button class="btn btn-primary" @click.prevent="saveCar">Save</button>
          </form>
        </div>
      </div>
    </dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from './api';
import CarCard from './components/CarCard.vue';
import CarTable from './components/CarTable.vue';

const cars = ref([]);
const loading = ref(true);
const viewMode = ref('card');

const filters = ref({
  brand: '',
  color: '',
  year: '',
  minPrice: '',
  maxPrice: '',
  status: ''
});

const editForm = ref({
  id: null,
  brand: '',
  color: '',
  year: '',
  price: '',
  status: 'ว่าง',
  image_url: ''
});

const fetchCars = async () => {
  loading.value = true;
  try {
    const params = new URLSearchParams();
    Object.entries(filters.value).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });
    
    const response = await api.get(`/cars?${params.toString()}`);
    cars.value = response.data;
  } catch (error) {
    console.error('Error fetching cars:', error);
    alert('Failed to fetch cars');
  } finally {
    loading.value = false;
  }
};

const clearFilters = () => {
  filters.value = { brand: '', color: '', year: '', minPrice: '', maxPrice: '', status: '' };
  fetchCars();
};

const openEditModal = (car) => {
  editForm.value = { ...car };
  document.getElementById('edit_modal').showModal();
};

const closeModal = () => {
  document.getElementById('edit_modal').close();
};

const saveCar = async () => {
  try {
    if (editForm.value.id) {
      await api.put(`/cars/${editForm.value.id}`, editForm.value);
    } else {
      await api.post('/cars', editForm.value);
    }
    closeModal();
    fetchCars();
  } catch (error) {
    console.error('Error saving car:', error);
    alert('Failed to save car');
  }
};

const handleDelete = async (id) => {
  if (confirm('Are you sure you want to delete this car?')) {
    try {
      await api.delete(`/cars/${id}`);
      fetchCars();
    } catch (error) {
      console.error('Error deleting car:', error);
      alert('Failed to delete car');
    }
  }
};

onMounted(() => {
  fetchCars();
});
</script>