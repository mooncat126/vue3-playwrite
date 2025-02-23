<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card class="pa-4 mb-8" elevation="3" >
          <v-card-title> Please Enter Your Name </v-card-title>
          <!-- Input field -->
          <v-text-field
            v-model="userName"
            label="Enter your name..."
            outlined
            clearable
          ></v-text-field>

          <!-- Confirm button -->
          <v-btn color="primary" class="mt-2" block @click="confirmName">
            Confirm
          </v-btn>
        </v-card>

        <v-card v-if="displayedUserName" class="pa-4 mb-8" elevation="3">
          <v-card-title>Confirm Your Name</v-card-title>
          <!-- Display user name -->
          <v-alert v-if="displayedUserName" type="success" class="mt-3">
            Your Name: {{ displayedUserName }}
          </v-alert>
        </v-card>

        <!-- Conditional button to navigate to user profile -->
          <v-card v-if="displayedUserName" class="pa-4 mb-8" elevation="3">
          <v-card-title> Go To User Profile </v-card-title>
          <v-btn color="secondary" class="mt-2" block @click="goToUserProfile">
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

const userName = ref("");
const displayedUserName = ref("");

const router = useRouter();

const confirmName = () => {
  displayedUserName.value = userName.value;
};

const goToUserProfile = () => {
  router.push({
    path: "/user-profile",
    query: { name: displayedUserName.value },
  });
};
</script>
