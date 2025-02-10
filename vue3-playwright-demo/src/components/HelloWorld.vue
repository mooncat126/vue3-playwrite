<template>
  <div>
    <input type="text" v-model="message" placeholder="输入点什么..." />
    <button @click="showMessage">显示消息</button>
    <p v-if="displayedMessage">消息：{{ displayedMessage }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// 定义响应式变量
const message = ref('');
const displayedMessage = ref('');

// 定义方法
const showMessage = () => {
  displayedMessage.value = message.value;
};
</script>
