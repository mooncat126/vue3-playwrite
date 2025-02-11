<template>
  <v-container>
    <!-- 加载中 -->
    <v-row justify="center" v-if="loading">
      <v-col cols="12" md="6" class="text-center">
        <v-progress-circular indeterminate color="primary" size="50"></v-progress-circular>
        <p class="mt-2">Loading...</p>
      </v-col>
    </v-row>

    <!-- 用户信息 -->
    <v-row justify="center" v-else-if="user">
      <v-col cols="12" md="6">
        <v-card class="pa-4" elevation="3">
          <v-card-title class="text-h5 font-weight-bold d-flex align-center">
            <v-icon class="mr-2" color="primary" size="24">mdi-account</v-icon>
            {{ user.name }}
          </v-card-title>

          <v-card-subtitle class="d-flex align-center">
            <v-icon class="mr-2" color="primary" size="24">mdi-email</v-icon>
            {{ user.email }}
          </v-card-subtitle>

          <v-card-text>
            <p>Got Email and Username from API</p>
          </v-card-text>

          <v-card-actions>
            <v-btn color="primary" @click="fetchUser">
              Reload
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- 错误提示 -->
    <v-row justify="center" v-if="errorMessage">
      <v-col cols="12" md="6">
        <v-alert type="error" class="mt-3">
          <v-icon class="mr-2" color="error" size="24">mdi-alert-circle</v-icon>
          Error: {{ errorMessage }}
        </v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const user = ref(null);
const loading = ref(true);
const errorMessage = ref("");

// 获取用户信息的异步函数
const fetchUser = async () => {
  loading.value = true;
  errorMessage.value = "";

  try {
    const response = await axios.get('/api/user');
    user.value = response.data;
  } catch (error) {
    console.error('Failed to load user:', error);
    errorMessage.value = "Failed to fetch user data. Please try again.";
  } finally {
    loading.value = false;
  }
};

// 组件挂载后调用 API
onMounted(fetchUser);
</script>
