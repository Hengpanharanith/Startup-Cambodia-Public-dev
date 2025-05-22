<template>
  <div
    class="avatar-picker"
    :class="{disabled: disabled}"
  >
    <label :for="imgId">
      <div
        class="avatar-image__wrapper"
        fit="cover"
      >
        <img
          draggable="false"
          slot="error"
          ondragstart="return false"
          class="avatar-image__inner"
          :src="thumbnail||fallback"
          alt="brand logo"
        />
      </div>
      <input
        type="file"
        ref="file"
        :id="imgId"
        :disabled="disabled"
        @input="pickImage"
        :accept="accept"
      />
      <div
        class="avatar-image__indicator"
        v-if="!disabled"
      >
        <v-icon>mdi-camera</v-icon>
      </div>
    </label>
  </div>
</template>

<script>
export default {
  name: "ImagePicker",
  props: {
    disabled: Boolean,
    hoverState: Boolean,
    accept: { type: String, default: "image/*" },
    thumbnail: {
      type: String,
      default: require("@/assets/images/default-image.png"),
    },
    fallback: {
      type: String,
      default: require("@/assets/images/default-image.png"),
    },
  },
  computed: {
    imgId() {
      return "imgPicker" + this._uid;
    },
  },
  methods: {
    pickImage(event) {
      event.preventDefault();
      let file = event.target.files[0];
      this.$emit("input", file);
      event.target.type = "text";
      event.target.type = "file";
    },
  },
};
</script>

<style scoped>
.avatar-picker {
  position: relative;
  width: 125px;
  height: 125px;
  margin-bottom: 0;
  background-color: #cccccc78;
  border-radius: 8px;
  overflow: hidden;
  user-select: none;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
}
.avatar-picker input {
  display: none;
}
.avatar-picker label {
  cursor: pointer !important;
}
.avatar-picker:active:not(.disabled) {
  transform: scale(0.98);
}
.avatar-picker .avatar-image__wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  display: inline-block;
  overflow: hidden;
}
.avatar-picker label {
  width: 100%;
  height: 100%;
}
.avatar-picker .avatar-image__inner {
  width: 100%;
  height: 100%;
  vertical-align: top;
  object-fit: cover;
}
.avatar-picker .avatar-image__indicator {
  position: absolute;
  left: 0;
  bottom: 0;
  height: 0;
  width: 100%;
  color: transparent;
  background-color: #00000078;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(0, #000000aa, #00000020);
  transition: 200ms;
}
.avatar-picker:hover .avatar-image__indicator {
  height: 100%;
  color: white;
  transition: 200ms;
}
</style>