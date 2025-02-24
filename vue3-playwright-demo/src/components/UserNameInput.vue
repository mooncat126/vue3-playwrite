<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <!-- Input Card -->
        <v-card class="pa-4 mb-8" elevation="3">
          <v-card-title>Please Enter Your Name</v-card-title>
          <v-text-field
            v-model="userName"
            label="Enter your name..."
            outlined
            clearable
          ></v-text-field>
          <v-btn color="primary" class="mt-2" block @click="validateName">
            Confirm
          </v-btn>
        </v-card>

        <!-- Result Card -->
        <v-card v-if="displayedUserName" class="pa-4 mb-8" elevation="3">
          <v-card-title>Confirm Your Name</v-card-title>
          <v-alert type="info" class="mt-3">
            {{ confirmedName }}
          </v-alert>
          <v-alert :type="alertType" class="mt-3">
            {{ message }}
          </v-alert>
          <v-btn
            v-if="alertType === 'success'"
            color="secondary"
            class="mt-2"
            block
            @click="goToUserProfile"
          >
            Click Here
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { userService } from "@/services/UserService.ts";

const userName = ref("");
const displayedUserName = ref(false);
const message = ref("");
const alertType = ref("info");
const confirmedName = ref("")

const router = useRouter();

const validateName = async () => {
  const result = await userService.validateName(userName.value);
  displayedUserName.value = true;
  message.value = result.message;
  confirmedName.value = result.name;
  alertType.value = result.success ? "success" : "error";
};

const goToUserProfile = () => {
  router.push({
    path: "/user-profile",
    query: { name: userName.value },
  });
};
</script>
