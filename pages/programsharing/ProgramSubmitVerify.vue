<template>
  <div class="d-flex justify-center align-center fill-height">
    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="8" lg="6">
          <v-card v-if="loading" class="pa-8 text-center" elevation="2">
            <v-progress-circular indeterminate color="primary" size="40" />
            <div class="mt-4">Verifying token...</div>
          </v-card>

          <InvalidToken v-else-if="isInvalid" />

          <!-- <SuccessComponent v-else /> -->
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import InvalidToken from "@/components/TokenVerify/InvalidToken.vue";
// import SuccessComponent from "@/components/Success.vue";

const loading = ref(true);
const isInvalid = ref(false);

onMounted(async () => {
  const token = new URLSearchParams(window.location.search).get("token");

  if (!token) {
    isInvalid.value = true;
    loading.value = false;
    return;
  }

  try {
    await axios.post("/api/verify-token", { token });
    isInvalid.value = false;
  } catch (err) {
    isInvalid.value = true;
  } finally {
    loading.value = false;
  }
});
</script>
