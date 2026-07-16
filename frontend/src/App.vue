<template>
  <div class="min-h-screen bg-white pb-20 font-sans text-gray-800">
    <!-- Navbar (Orange) -->
    <nav class="bg-carsxOrange">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <!-- Fake Logo -->
          <div class="text-black font-bold text-3xl tracking-tighter italic flex items-center">
            CARS<span class="text-black text-4xl">X</span>
          </div>
        </div>
        
        <div class="hidden md:flex space-x-6 text-black text-sm font-medium">
          <a href="#" class="border-b-2 border-black pb-1">ค้นหารถมือสองทั้งหมด</a>
          <a href="#" class="hover:text-black/80 transition-colors">แลกเปลี่ยน-ขายรถ</a>
          <a href="#" class="hover:text-black/80 transition-colors">ตัวแทนขาย</a>
          <a href="#" class="hover:text-black/80 transition-colors">ข่าวสารและบทความ</a>
          <a href="#" class="hover:text-black/80 transition-colors">CARS X <span class="text-xs">▼</span></a>
        </div>
        
        <button @click="openAddModal" class="btn btn-sm bg-black text-carsxOrange hover:bg-gray-100 border-0 rounded-md shadow-sm">
          เพิ่มรถยนต์ (Demo)
        </button>
      </div>
    </nav>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
      <!-- Breadcrumb -->
      <div class="text-xs text-gray-500 mb-6 flex items-center gap-2">
        <a href="#" class="hover:text-carsxOrange">หน้าแรก</a>
        <span>›</span>
        <span class="text-gray-800 font-medium">ค้นหารถมือสองทั้งหมด</span>
      </div>

      <!-- Search Section -->
      <div class="flex flex-col md:flex-row gap-3 justify-center items-center mb-6">
        <div class="relative w-full max-w-md">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" /></svg>
          </div>
          <input type="text" v-model="filters.brand" class="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-carsxOrange focus:border-carsxOrange sm:text-sm" placeholder="ค้นหารุ่น/ยี่ห้อรถ">
        </div>
        
        <button class="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 w-full md:w-auto justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
          ค้นหาอย่างละเอียด
        </button>
        
        <button @click="fetchCars" class="px-8 py-2.5 border border-transparent rounded-lg shadow-sm text-sm font-medium text-black bg-carsxOrange hover:bg-[#e0631c] w-full md:w-auto justify-center">
          ค้นหา
        </button>
      </div>

      <!-- Filters pills (Demo) -->
      <div class="flex flex-wrap justify-center gap-2 mb-10">
        <span v-if="filters.brand" class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border border-carsxOrange text-carsxOrange bg-white">
          {{ filters.brand }}
          <button @click="filters.brand = ''; fetchCars()" class="ml-1.5 text-carsxOrange hover:text-red-500">×</button>
        </span>
        <span v-if="filters.status" class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border border-carsxOrange text-carsxOrange bg-white">
          {{ filters.status }}
          <button @click="filters.status = ''; fetchCars()" class="ml-1.5 text-carsxOrange hover:text-red-500">×</button>
        </span>
      </div>

      <!-- Content Header -->
      <div class="flex justify-between items-end border-b border-gray-200 pb-2 mb-6">
        <div>
          <h1 class="text-2xl font-bold text-gray-900 inline-block relative">
            ค้นหารถมือสองทั้งหมด
            <span class="absolute -bottom-2.5 left-0 w-16 h-1 bg-carsxOrange"></span>
          </h1>
          <span class="text-gray-500 text-sm ml-2 font-normal">({{ cars.length }}) คัน</span>
        </div>
        
        <div class="text-sm text-gray-600 flex items-center gap-2">
          เรียงตาม 
          <span class="text-carsxOrange cursor-pointer">รถเข้าใหม่ - เก่า <span class="text-xs">▼</span></span>
        </div>
      </div>
      
      <div v-if="loading" class="flex justify-center py-20">
        <span class="loading loading-spinner loading-lg text-carsxOrange"></span>
      </div>
      
      <template v-else>
        <!-- Car Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <CarCard v-for="car in cars" :key="car.id" :car="car" @edit="openEditModal(car)" @delete="handleDelete" />
        </div>
        
        <div v-if="cars.length === 0" class="text-center py-20 bg-gray-50 rounded-xl border border-gray-200">
          <p class="text-lg font-medium text-gray-600">ไม่พบรถยนต์ที่ค้นหา</p>
          <button class="mt-4 text-carsxOrange hover:underline" @click="clearFilters">ล้างการค้นหา</button>
        </div>
      </template>
    </main>

    <!-- Floating Chat Button (Decorative) -->
    <div class="fixed bottom-6 right-6 w-14 h-14 bg-carsxOrange rounded-full shadow-lg flex items-center justify-center cursor-pointer hover:bg-[#e0631c] transition-colors z-50">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
    </div>

    <!-- Edit/Add Modal -->
    <dialog id="edit_modal" class="modal modal-bottom sm:modal-middle">
      <div class="modal-box bg-white rounded-xl p-0 overflow-hidden shadow-2xl">
        <div class="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h3 class="font-bold text-lg text-gray-900">{{ editForm.id ? 'แก้ไขข้อมูลรถ' : 'เพิ่มรถยนต์' }}</h3>
          <form method="dialog">
            <button class="btn btn-sm btn-circle btn-ghost text-gray-500">✕</button>
          </form>
        </div>
        
        <div class="p-6 space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div class="form-control">
              <label class="label py-1"><span class="label-text text-xs text-gray-500">ยี่ห้อ/รุ่น</span></label>
              <input type="text" v-model="editForm.brand" class="input input-bordered input-sm bg-white border-gray-300 w-full" />
            </div>
            <div class="form-control">
              <label class="label py-1"><span class="label-text text-xs text-gray-500">สี</span></label>
              <input type="text" v-model="editForm.color" class="input input-bordered input-sm bg-white border-gray-300 w-full" />
            </div>
            <div class="form-control">
              <label class="label py-1"><span class="label-text text-xs text-gray-500">ปี</span></label>
              <input type="number" v-model="editForm.year" class="input input-bordered input-sm bg-white border-gray-300 w-full" />
            </div>
            <div class="form-control">
              <label class="label py-1"><span class="label-text text-xs text-gray-500">ราคา (บาท)</span></label>
              <input type="number" v-model="editForm.price" class="input input-bordered input-sm bg-white border-gray-300 w-full" />
            </div>
          </div>
          
          <div class="form-control w-full">
            <label class="label py-1"><span class="label-text text-xs text-gray-500">URL รูปภาพ</span></label>
            <input type="text" v-model="editForm.image_url" class="input input-bordered input-sm bg-white border-gray-300 w-full" />
          </div>

          <div class="form-control w-full">
            <label class="label py-1"><span class="label-text text-xs text-gray-500">สถานะ</span></label>
            <select v-model="editForm.status" class="select select-bordered select-sm bg-white border-gray-300 w-full">
              <option value="ว่าง">ว่าง</option>
              <option value="ขายแล้ว">ขายแล้ว</option>
              <option value="กำลังซ่อม">กำลังซ่อม</option>
            </select>
          </div>
        </div>
        
        <div class="bg-gray-50 px-6 py-4 border-t border-gray-100 flex justify-end gap-2">
          <form method="dialog">
            <button class="btn btn-sm btn-ghost text-gray-600" @click="closeModal">ยกเลิก</button>
          </form>
          <button class="btn btn-sm border-0 bg-carsxOrange text-white hover:bg-[#e0631c] px-6" @click.prevent="saveCar">
            บันทึก
          </button>
        </div>
      </div>
      <form method="dialog" class="modal-backdrop bg-black/50">
        <button>close</button>
      </form>
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

const openAddModal = () => {
  editForm.value = {
    id: null,
    brand: '',
    color: '',
    year: '',
    price: '',
    status: 'ว่าง',
    image_url: ''
  };
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