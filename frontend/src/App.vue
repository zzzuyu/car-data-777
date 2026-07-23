<template>
  <div class="min-h-screen bg-white pb-20 font-sans text-gray-800">
    <!-- Navbar (Orange) -->
    <nav class="bg-carsxOrange">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div class="flex items-center gap-2">
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
        
        <div class="flex items-center gap-3">
          <div v-if="user" class="flex items-center gap-3 bg-white/70 rounded-full px-3 py-2 shadow-sm">
            <img v-if="profileForm.avatar_url" :src="profileForm.avatar_url" alt="avatar" class="w-9 h-9 rounded-full object-cover border border-gray-200" />
            <div class="flex flex-col text-right">
              <span class="text-sm font-semibold text-black">{{ profileForm.display_name || user.name || user.email }}</span>
              <span class="text-xs text-gray-600">สวัสดี</span>
            </div>
          </div>
          <button v-if="user" @click="openProfileModal" class="btn btn-sm bg-black text-carsxOrange hover:bg-gray-100 border-0 rounded-md shadow-sm">
            โปรไฟล์
          </button>
          <button v-if="user" @click="logout" class="btn btn-sm bg-black text-carsxOrange hover:bg-gray-100 border-0 rounded-md shadow-sm">
            Logout
          </button>
          <button v-else @click="showAuthModal = true" class="btn btn-sm bg-black text-carsxOrange hover:bg-gray-100 border-0 rounded-md shadow-sm">
            Login / Register
          </button>
          <button v-if="user" @click="openAddModal" class="btn btn-sm bg-black text-carsxOrange hover:bg-gray-100 border-0 rounded-md shadow-sm">
            เพิ่มรถยนต์
          </button>
        </div>
      </div>
    </nav>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
      <div v-if="errorMessage" class="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
        {{ errorMessage }}
      </div>
      <!-- Breadcrumb -->
      <div class="text-xs text-gray-500 mb-6 flex items-center gap-2">
        <a href="#" class="hover:text-carsxOrange">หน้าแรก</a>
        <span>›</span>
        <span class="text-gray-800 font-medium">ค้นหารถมือสองทั้งหมด</span>
      </div>

      <div v-if="user" class="mb-6 rounded-2xl border border-gray-200 bg-gray-50 p-6 shadow-sm">
        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <div class="text-sm text-gray-500">โปรไฟล์</div>
            <div class="mt-2 text-xl font-semibold text-gray-900">{{ profileForm.display_name || user.name || user.email }}</div>
            <div class="text-sm text-gray-600">{{ user.email }}</div>
          </div>
          <button @click="openProfileModal" class="btn btn-sm border-0 bg-black text-carsxOrange hover:bg-gray-100 rounded-md shadow-sm">
            แก้ไขโปรไฟล์
          </button>
        </div>
        <div class="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-600">
          <div>
            <div class="font-medium text-gray-900">เบอร์โทร</div>
            <div>{{ profileForm.phone || 'ยังไม่ได้ตั้งค่า' }}</div>
          </div>
          <div>
            <div class="font-medium text-gray-900">คำอธิบาย</div>
            <div>{{ profileForm.bio || 'ยังไม่มีข้อมูล' }}</div>
          </div>
          <div>
            <div class="font-medium text-gray-900">รูปโปรไฟล์</div>
            <div>{{ profileForm.avatar_url || 'ยังไม่มีข้อมูล' }}</div>
          </div>
        </div>
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

    <!-- Auth Modal -->
    <dialog id="auth_modal" class="modal modal-bottom sm:modal-middle" :open="showAuthModal">
      <div class="modal-box bg-white rounded-xl p-0 overflow-hidden shadow-2xl">
        <div class="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h3 class="font-bold text-lg text-gray-900">{{ isLoginMode ? 'เข้าสู่ระบบ' : 'สมัครสมาชิก' }}</h3>
          <form method="dialog">
            <button class="btn btn-sm btn-circle btn-ghost text-gray-500" @click="showAuthModal = false">✕</button>
          </form>
        </div>
        
        <div class="p-6 space-y-4">
          <div v-if="!isLoginMode" class="form-control">
            <label class="label py-1"><span class="label-text text-xs text-gray-500">ชื่อ</span></label>
            <input type="text" v-model="authForm.name" class="input input-bordered input-sm bg-white border-gray-300 w-full" />
          </div>
          <div class="form-control">
            <label class="label py-1"><span class="label-text text-xs text-gray-500">อีเมล</span></label>
            <input type="email" v-model="authForm.email" class="input input-bordered input-sm bg-white border-gray-300 w-full" />
          </div>
          <div class="form-control">
            <label class="label py-1"><span class="label-text text-xs text-gray-500">รหัสผ่าน</span></label>
            <input type="password" v-model="authForm.password" class="input input-bordered input-sm bg-white border-gray-300 w-full" />
          </div>
        </div>
        
        <div class="bg-gray-50 px-6 py-4 border-t border-gray-100 flex justify-end gap-2">
          <button class="btn btn-sm btn-ghost text-gray-600" @click="isLoginMode = !isLoginMode">
            {{ isLoginMode ? 'สมัครสมาชิก' : 'เข้าสู่ระบบ' }}
          </button>
          <button class="btn btn-sm border-0 bg-carsxOrange text-white hover:bg-[#e0631c] px-6" @click.prevent="submitAuth">
            {{ isLoginMode ? 'เข้าสู่ระบบ' : 'สมัครสมาชิก' }}
          </button>
        </div>
      </div>
      <form method="dialog" class="modal-backdrop bg-black/50">
        <button @click="showAuthModal = false">close</button>
      </form>
    </dialog>

    <!-- Profile Modal -->
    <dialog id="profile_modal" class="modal modal-bottom sm:modal-middle">
      <div class="modal-box bg-white rounded-xl p-0 overflow-hidden shadow-2xl">
        <div class="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h3 class="font-bold text-lg text-gray-900">แก้ไขโปรไฟล์</h3>
          <form method="dialog">
            <button class="btn btn-sm btn-circle btn-ghost text-gray-500" @click="showProfileModal = false">✕</button>
          </form>
        </div>
        <div class="p-6 space-y-4">
          <div class="form-control">
            <label class="label py-1"><span class="label-text text-xs text-gray-500">ชื่อที่แสดง</span></label>
            <input type="text" v-model="profileForm.display_name" class="input input-bordered input-sm bg-white border-gray-300 w-full" />
          </div>
          <div class="form-control">
            <label class="label py-1"><span class="label-text text-xs text-gray-500">URL รูปโปรไฟล์</span></label>
            <input type="text" v-model="profileForm.avatar_url" class="input input-bordered input-sm bg-white border-gray-300 w-full" />
          </div>
          <div class="form-control">
            <label class="label py-1"><span class="label-text text-xs text-gray-500">คำอธิบายตัวตน</span></label>
            <textarea v-model="profileForm.bio" class="textarea textarea-bordered textarea-sm bg-white border-gray-300 w-full" rows="3"></textarea>
          </div>
          <div class="form-control">
            <label class="label py-1"><span class="label-text text-xs text-gray-500">เบอร์โทร</span></label>
            <input type="text" v-model="profileForm.phone" class="input input-bordered input-sm bg-white border-gray-300 w-full" />
          </div>
        </div>
        <div class="bg-gray-50 px-6 py-4 border-t border-gray-100 flex justify-end gap-2">
          <form method="dialog">
            <button class="btn btn-sm btn-ghost text-gray-600" @click="closeProfileModal">ยกเลิก</button>
          </form>
          <button class="btn btn-sm border-0 bg-carsxOrange text-white hover:bg-[#e0631c] px-6" @click.prevent="saveProfile">
            บันทึกโปรไฟล์
          </button>
        </div>
      </div>
      <form method="dialog" class="modal-backdrop bg-black/50">
        <button @click="showProfileModal = false">close</button>
      </form>
    </dialog>

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
import { computed, ref, onMounted } from 'vue';
import api from './api';
import CarCard from './components/CarCard.vue';
import CarTable from './components/CarTable.vue';

const cars = ref([]);
const loading = ref(true);
const errorMessage = ref('');
const viewMode = ref('card');
const user = ref(null);
const showAuthModal = ref(false);
const showProfileModal = ref(false);
const isLoginMode = ref(true);
const authForm = ref({ name: '', email: '', password: '' });
const profileForm = ref({ display_name: '', avatar_url: '', bio: '', phone: '' });
const route = ref(window.location.pathname || '/');
const isProfilePage = computed(() => route.value === '/profile');

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
  errorMessage.value = '';
  try {
    const params = new URLSearchParams();
    Object.entries(filters.value).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });

    const response = await api.get(`/cars?${params.toString()}`);
    cars.value = Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error('Error fetching cars:', error);
    errorMessage.value = 'ไม่สามารถโหลดข้อมูลรถได้ในขณะนี้';
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

const openProfileModal = async () => {
  await loadProfile();
  document.getElementById('profile_modal').showModal();
};

const closeProfileModal = () => {
  document.getElementById('profile_modal').close();
  showProfileModal.value = false;
};

const goToProfile = () => {
  history.pushState({}, '', '/profile');
  route.value = '/profile';
};

const goHome = () => {
  history.pushState({}, '', '/');
  route.value = '/';
};

const loadProfile = async () => {
  if (!user.value) return;
  try {
    const response = await api.get('/profile');
    profileForm.value = {
      display_name: response.data.display_name || '',
      avatar_url: response.data.avatar_url || '',
      bio: response.data.bio || '',
      phone: response.data.phone || ''
    };
  } catch (error) {
    console.error('Error loading profile:', error);
  }
};

const saveProfile = async () => {
  try {
    const response = await api.post('/profile', profileForm.value);
    profileForm.value = {
      display_name: response.data.display_name || '',
      avatar_url: response.data.avatar_url || '',
      bio: response.data.bio || '',
      phone: response.data.phone || ''
    };
    document.getElementById('profile_modal').close();
    alert('บันทึกโปรไฟล์เรียบร้อยแล้ว');
  } catch (error) {
    console.error('Error saving profile:', error);
    alert('Failed to save profile');
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

const submitAuth = async () => {
  try {
    const endpoint = isLoginMode.value ? '/auth/login' : '/auth/register';
    const response = await api.post(endpoint, authForm.value);
    const { token, user: authUser } = response.data;
    localStorage.setItem('token', token);
    user.value = authUser;
    showAuthModal.value = false;
    authForm.value = { name: '', email: '', password: '' };
    await loadProfile();
    fetchCars();
  } catch (error) {
    console.error('Auth error:', error);
    alert(error.response?.data?.error || 'Authentication failed');
  }
};

const logout = () => {
  localStorage.removeItem('token');
  user.value = null;
  profileForm.value = { display_name: '', avatar_url: '', bio: '', phone: '' };
};

onMounted(async () => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const response = await api.get('/auth/me');
      user.value = response.data.user;
      await loadProfile();
    } catch (error) {
      localStorage.removeItem('token');
    }
  }
  fetchCars();
});
</script>