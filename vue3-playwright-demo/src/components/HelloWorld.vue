<template>
  <div>
    <input type="text" v-model="message" placeholder="输入点什么...">
    <button @click="showMessage">显示消息</button>
    <p v-if="displayedMessage">消息：{{ displayedMessage }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: '',
      displayedMessage: ''
    };
  },
  methods: {
    showMessage() {
      this.displayedMessage = this.message;
    }
  }
}
</script>
