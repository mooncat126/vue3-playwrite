<template>
  <div v-if="user">
    <h1>{{ user.name }}</h1>
    <p>Email: {{ user.email }}</p>
  </div>
  <div v-else>
    <p>Loading user...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const user = ref(null);

// 获取用户信息的异步函数
const fetchUser = async () => {
  try {
    const response = await axios.get('/api/user');
    user.value = response.data;
  } catch (error) {
    console.error('Failed to load user:', error);
    user.value = { name: 'Error', email: 'N/A' };
  }
};

// 在组件挂载后调用 API
onMounted(fetchUser);
</script>
