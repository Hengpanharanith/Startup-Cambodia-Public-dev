<template>
  <v-card class="flex-md-row" rounded="lg" :outlined="outlined" flat>
    <v-layout style="min-height: 13.25rem" justify-center align-center>
      <v-card class="text-center" color="transparent" flat>
        <v-card-text>
          <img
            src="~/assets/icons/info.png"
            height="75px"
            class="mb-4"
            alt=""
          />
          <h4>
            {{ $t("network.ecosystem.detail.login_to_view") }}
          </h4>
        </v-card-text>
        <v-card-actions>
          <v-btn
            block
            elevation
            color="primary"
            @click="setAuthDialogVisibility(true)"
          >
            Login
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-layout>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "CardAuthorizationInfo",
  props: {
    outlined: Boolean,
  },
  methods: {
    ...mapActions("app", ["setAuthDialogVisibility"]),
  },
};
</script>

<style></style>
