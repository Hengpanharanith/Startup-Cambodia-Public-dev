<template>
  <div>
    <quill-editor
      style="height: 200px; z-index: 999999 !important"
      :class="editorClass"
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
    theme: { type: String, default: "bubble" },
    detail: { type: String, default: "" },
    editorInit: { type: Boolean, default: false },
  },
  computed: {
    editorOption() {
      let toolbar;
      if (this.theme == "bubble") {
        toolbar = [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline", "strike"],
          ["clean"],
        ];
      } else if (this.theme == "snow") {
        toolbar = [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline", "strike"],
          ["clean"],
          [{ color: [] }],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ align: [] }],
          ["link"],
        ];
      }
      return {
        theme: this.theme,
        placeholder: "Please write blog content here!",
        modules: {
          toolbar: { container: toolbar },
        },
      };
    },
    editorClass() {
      return {
        "program-detail__editor": true,
        rounded: true,
        "blog-content": true,
        "custom-quill-bubble": this.theme === "bubble",
        "custom-quill-snow": this.theme === "snow",
      };
    },
  },
  watch: {},
  mounted() {
    this.emitContent();
  },
  methods: {
    ...mapActions("media", {
      createMedia: "create",
    }),
    emitContent() {
      this.$emit("editorDetail", this.detail); // or the editor content value directly
    },
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
  padding: 16px;
  background-color: #fff;
  /* font-size: px; */
  min-height: 200px;
  color: #999;
}
.custom-quill-snow .ql-editor {
  min-height: 200px;
  color: #999;
}
.custom-quill-bubble .ql-editor::before,
.custom-quill-snow .ql-editor::before {
  color: #999 !important; /* or any color you want */
  opacity: 1; /* ensure it's visible */
}
.ql-bubble .ql-tooltip {
  top: 40px !important;
  width: 300px !important;
  align-content: center !important;
}

/* Example: Move it to the bottom of the editor */
.program-detail__editor .ql-bubble .ql-tooltip {
  left: 30% !important;
  transform: translateX(-50%) !important;
}
</style>
