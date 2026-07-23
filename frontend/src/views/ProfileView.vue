<template>
  <div class="min-h-screen bg-white pb-20 font-sans text-gray-800">
    <nav class="bg-carsxOrange">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div class="text-black font-bold text-3xl tracking-tighter italic flex items-center">
          CARS<span class="text-black text-4xl">X</span>
        </div>
        <div class="flex items-center gap-2">
          <router-link to="/" class="btn btn-sm bg-black text-carsxOrange hover:bg-gray-100 border-0 rounded-md shadow-sm">กลับหน้าแรก</router-link>
        </div>
      </div>
    </nav>

    <main class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
      <div class="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
        <h1 class="text-3xl font-bold text-gray-900 mb-4">โปรไฟล์ของฉัน</h1>

        <div v-if="user" class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="flex flex-col items-center gap-4 p-6 rounded-3xl border border-gray-100 bg-gray-50">
            <img v-if="profileForm.avatar_url" :src="profileForm.avatar_url" alt="avatar" class="w-28 h-28 rounded-full object-cover border border-gray-200" />
            <div v-else class="w-28 h-28 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">คน</div>
            <div class="text-center">
              <div class="text-xl font-semibold text-gray-900">{{ profileForm.display_name || user.name || user.email }}</div>
              <div class="text-sm text-gray-600">{{ user.email }}</div>
            </div>
          </div>

          <div class="md:col-span-2 space-y-4">
            <div class="rounded-3xl border border-gray-100 bg-gray-50 p-6">
              <div class="text-sm text-gray-500">ชื่อที่แสดง</div>
              <div class="mt-2 text-lg font-medium text-gray-900">{{ profileForm.display_name || 'ยังไม่ได้ตั้งค่า' }}</div>
            </div>
            <div class="rounded-3xl border border-gray-100 bg-gray-50 p-6">
              <div class="text-sm text-gray-500">เบอร์โทร</div>
              <div class="mt-2 text-lg font-medium text-gray-900">{{ profileForm.phone || 'ยังไม่ได้ตั้งค่า' }}</div>
            </div>
            <div class="rounded-3xl border border-gray-100 bg-gray-50 p-6">
              <div class="text-sm text-gray-500">คำอธิบายตัวตน</div>
              <div class="mt-2 text-lg text-gray-900">{{ profileForm.bio || 'ยังไม่มีข้อมูล' }}</div>
            </div>
          </div>
        </div>

        <div v-else class="rounded-3xl border border-gray-100 bg-gray-50 p-6 text-center text-gray-600">
          กรุณาเข้าสู่ระบบเพื่อดูข้อมูลโปรไฟล์
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '../api';

const user = ref(null);
const profileForm = ref({ display_name: '', avatar_url: '', bio: '', phone: '' });

const loadProfile = async () => {
  const token = localStorage.getItem('token');
  if (!token) return;

  try {
    const auth = await api.get('/auth/me');
    user.value = auth.data.user;
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

onMounted(loadProfile);
</script>
