<template>
  <div>
    <quill-editor
      style="height: 200px; z-index: 999999 !important"
      class="program-detail__editor rounded blog-content custom-quill-bubble"
      :value="detail"
      :options="editorOption"
      ref="quillEdit"
      @change="onEditorChange"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
export default {
  components: {},
  props: {
    detail: { type: String, default: "" },
    editorInit: { type: Boolean, default: false },
  },
  data() {
    let _this = this;
    return {
      editorDetail: "",
      editorOption: {
        theme: "bubble",
        placeholder: "Please write blog content here!",

        modules: {
          toolbar: {
            container: [
              [{ header: [1, 2, 3, false] }],
              ["bold", "italic", "underline", "strike"],
              ["clean"],
              [{ color: [] }],
              [{ list: "ordered" }, { list: "bullet" }],
              [{ align: [] }],
              ["link"],
            ],
          },
        },
      },
    };
  },
  computed: {},
  watch: {},
  methods: {
    ...mapActions("media", {
      createMedia: "create",
    }),

    onEditorChange(value) {
      this.eInit = true;
      this.$emit("editorDetail", value.html);
    },
  },
};
</script>
<style>
.custom-quill-bubble .ql-editor {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  background-color: #fff;
  font-size: 16px;
  min-height: 200px;
  color: #333;
}

.custom-quill-bubble .ql-editor::before {
  font-style: italic;
  color: #999;
}
.ql-bubble .ql-tooltip {
  top: 40px !important;
  width: 500px !important;
}

/* Example: Move it to the bottom of the editor */
.program-detail__editor .ql-bubble .ql-tooltip {
  left: 30% !important;
  transform: translateX(-50%) !important;
}
</style>
