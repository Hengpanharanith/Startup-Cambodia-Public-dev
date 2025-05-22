<template>
  <div
    class="container mt-100"
    style="width: 50%"
  >
    <div class="row">
      <div class="col-md-12">
        <div class="card border-0">
          <div class="card-body cart">
            <div class="col-sm-12 empty-cart-cls text-center text-muted">
              <img
                v-bind:src="imgSrc"
                width="130"
                height="130"
                class="img-fluid mb-4 mr-3"
              />
              <h3>
                <strong>{{ title }}</strong>
              </h3>

              <button
                class="btn btn-secondary cart-btn-transform m-3 d-none"
                data-abc="true"
                @click="refresh"
                v-if="showButton"
              >
                <v-icon>mdi-sync</v-icon>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "CardViewInfo",
  props: {
    title: String,
    imgSrc: {
      type: String,
      default: require("@/assets/images/default-image.png"),
    },
    showButton: Boolean,
  },
  methods: {
    refresh() {
      this.$nextTick(() => {
        this.$nuxt.$loading.start();
        this.$nuxt.refresh();
        setTimeout(() => this.$nuxt.$loading.finish(), 500);
      });
    },
  },
};
</script>
<style scoped>
.mt-100 {
  margin-top: 100px;
}

.card {
  margin-bottom: 30px;
  border: 0;
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
  letter-spacing: 0.5px;
  border-radius: 8px;
  -webkit-box-shadow: 1px 5px 24px 0 rgba(68, 102, 242, 0.05);
  box-shadow: 1px 5px 24px 0 rgba(68, 102, 242, 0.05);
}

.card .card-header {
  background-color: #fff;
  border-bottom: none;
  padding: 24px;
  border-bottom: 1px solid #f6f7fb;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.card-header:first-child {
  border-radius: calc(0.25rem - 1px) calc(0.25rem - 1px) 0 0;
}

.card .card-body {
  padding: 30px;
  background-color: transparent;
}

.btn-primary,
.btn-primary.disabled,
.btn-primary:disabled {
  background-color: #4466f2 !important;
  border-color: #4466f2 !important;
}
</style>