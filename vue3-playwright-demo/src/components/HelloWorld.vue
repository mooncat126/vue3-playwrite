<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <!-- 输入框 -->
        <v-text-field
          v-model="message"
          label="输入点什么 ..."
          outlined
          clearable
        ></v-text-field>

        <!-- 按钮 -->
        <v-btn
          color="primary"
          class="mt-2"
          block
          @click="showMessage"
        >
          显示消息
        </v-btn>

        <!-- 显示消息 -->
        <v-alert v-if="displayedMessage" type="info" class="mt-3">
          消息：{{ displayedMessage }}
        </v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from "vue";

// 定义响应式变量
const message = ref("");
const displayedMessage = ref("");

// 定义方法
const showMessage = () => {
  displayedMessage.value = message.value;
};
</script>
