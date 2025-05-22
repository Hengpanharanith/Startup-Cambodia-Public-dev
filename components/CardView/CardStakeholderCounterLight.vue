<template>
  <div
    class="border-0 card network-counter-light bg-transparent "
    ref="test"
  >
    <div
      class="d-flex flex-column flex-sm-row align-items-center align-items-sm-start"
      style="gap:1rem"
    >
      <div class="counter__icon mr-2 flex-shrink-0">
        <span
          v-html="icon"
          cla
        ></span>
        <!-- <img
          :src="icon"
          :alt="label"
        > -->
      </div>
      <div class="counter__content flex-fill">
        <p class="counter__amount">
          <countTo
            :startVal='0'
            :endVal='amount'
            :duration='3000'
            ref="numbCountTo"
          ></countTo>
        </p>
        <div class="counter__title line-clamp-2">{{label}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import countTo from "vue-count-to";
export default {
  name: "CardStakeholderCounter",
  components: { countTo },
  props: {
    label: String,
    refresh: Boolean,
    amount: { type: Number, default: 0 },
    icon: { type: String, default: "/icons/rocket.svg" },
  },
  watch: {
    refresh(v) {
      if (v) {
        this.$refs.numbCountTo.start();
        return;
      }
    },
  },
};
</script>

<style>
.network-counter-light {
  padding: 0.5rem;
  border-radius: 1rem;
  text-align: center;
  min-height: 112px;
}

.network-counter-light .counter__icon {
  width: 60px;
  height: 60px;
  border-radius: 60px;
  background-color: #0000001a;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: none;
}
.network-counter-light .counter__icon svg {
  width: 40px;
}
.network-counter-light .counter__icon svg path,
.network-counter-light .counter__icon svg rect {
  fill: #ffffff;
}

.network-counter-light .counter__amount {
  font-size: 1.5rem;
  margin-bottom: 0;
  font-weight: bold;
  color: #2e3d62;
  color: #ffffff;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
}

.network-counter-light .counter__title {
  color: #2e3d62dd;
  color: #ffffffbf;
  margin-bottom: 0;
}

@media screen and (min-width: 576px) {
  .network-counter-light {
    text-align: left;
    flex-direction: row;
    align-items: flex-start;
  }

  .network-counter-light .counter__amount {
    font-size: 2rem;
  }
  .network-counter-light .counter__icon {
    margin-top: 0.5rem;
  }
}
</style>