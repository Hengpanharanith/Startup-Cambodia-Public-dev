<template>
  <v-card
    class="network-counter"
    :class="{ compact: compact }"
    :style="{ border: `2px solid ${color}` }"
    flat

  >
    <div class="card-backdrop"></div>
    <div class="card-backdrop2" :style="{ backgroundColor: color }"></div>

    <span class="counter__icon" v-html="icon || defaultIcon"></span>
    <v-card-text>
      <div class="counter__content flex-grow-1 pt-2">
        <div class="mb-2">
          <countTo
            :startVal="0"
            :endVal="amount"
            :duration="3000"
            ref="numbCountTo"
            class="counter__amount"
          ></countTo>
        </div>
        <div>
          <span class="counter__title mb-4 rounded">
            {{ label }}
          </span>
        </div>
      </div>
    </v-card-text>
  </v-card>
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
    icon: {
      type: String,
      default: "",
    },
    color: { type: String, default: "#93ccfc" },
    compact: Boolean,
  },
  computed: {
    defaultIcon() {
      return require("@/static/icons/ecosystem/Rocket.svg?raw");
    },
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

<style lang="scss">
$border-radius: 0.5rem;
$bg-margin: -0.75rem;

.v-card.network-counter {
  border-radius: $border-radius;

  .card-backdrop,
  .card-backdrop2 {
    position: absolute;
    border-radius: $border-radius;
    margin-top: $bg-margin;
    margin-left: $bg-margin;
    width: 100%;
    height: 100%;
    z-index: -1;
  }
  .card-backdrop {
    background-color: white;
  }

  .card-backdrop2 {
    opacity: 0.4;
  }

  .counter__icon {
    width: 36px;
    height: 36px;
    position: absolute;
    right: 1rem;
    top: 1rem;

    svg path,
    svg rect {
      fill: #f79b36;
    }

    &.compact {
      width: 24px;
      height: 24px;
      right: 0.5rem;
      top: 0.5rem;
    }
  }

  .counter__amount {
    font-size: 1.75rem;
    margin-bottom: 0;
    color: #2e3d62;
    font-weight: bold;
  }

  .counter__title {
    color: #2e3d62dd;
    line-height: 1.5;
    // background-color: white;
    font-size: 1em;
    text-transform: uppercase;
  }
}

@media screen and (min-width: 576px) {
  .v-card.network-counter:not(.compact) {
    .counter__amount {
      font-size: 2.25rem;
    }
    .counter__title {
      font-size: 1.25em;
    }
  }
}
</style>
