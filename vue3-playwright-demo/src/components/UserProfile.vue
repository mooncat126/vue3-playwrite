<template>
    <div v-if="user">
      <h1>{{ user.name }}</h1>
      <p>Email: {{ user.email }}</p>
    </div>
    <div v-else>
      <p>Loading user...</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        user: null
      };
    },
    async mounted() {
      try {
        const response = await axios.get('/api/user');        this.user = response.data;
      } catch (error) {
        console.error('Failed to load user:', error);
        this.user = { name: 'Error', email: 'N/A' };
      }
    }
  }
  </script>
