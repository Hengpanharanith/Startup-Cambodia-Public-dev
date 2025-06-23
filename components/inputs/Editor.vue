<template>
  <div style="height: 680px">
    <quill-editor
      style="height: 600px; z-index: 999999 !important"
      class="program-detail__editor rounded blog-content"
      :value="detail"
      :options="editorOption"
      ref="quillEdit"
      @change="onEditorChange"
    >
    </quill-editor>
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
        // theme: "",
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

          // imageCompress: {
          //   quality: 0.9, // default
          //   maxWidth: 1000, // default
          //   maxHeight: 1000, // default
          //   imageType: "image/jpeg", // default
          //   debug: false, // default
          //   suppressErrorLogging: false, // default
          //   // keepImageTypes:['image/jpeg', 'image/png'],
          //   insertIntoEditor: (imageBase64URL, imageBlob) => {
          //     var file = new File([imageBlob], "image.jpg");
          //     const formData = new FormData();
          //     formData.append("upload", file);
          //
          //     const range = this.$refs.quillEdit.quill.getSelection();
          //     this.$refs.quillEdit.quill.insertEmbed(
          //       range.index,
          //       "image",
          //       imageBase64URL,
          //       "user"
          //     );
          //    this.createMedia({
          //         payload: formData,
          //         options: { headers: { "Content-Type": "multipart/form-data" } },
          //       })
          //       .then((res) => {
          //         this.$refs.quillEdit.quill.deleteText(
          //           range.index,
          //           range.length + 1,
          //           "user"
          //         );
          //         this.$refs.quillEdit.quill.insertEmbed(
          //           range.index,
          //           "image",
          //           `${res.url}`,
          //           "user"
          //         );
          //       })
          //       .catch((err) => {
          //         this.sweetAlertError(err);
          //         this.$refs.quillEdit.quill.deleteText(
          //           range.index,
          //           range.length + 1,
          //           "user"
          //         );
          //       });
          //   },
          // },
          clipboard: {
            // matchers: [[Node.ELEMENT_NODE, this.customQuillClipboardMatcher]],
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
    // customQuillClipboardMatcher(node, delta) {
    //   if (this.editorInit) {
    //       const plaintext = node.innerText;
    //       if(plaintext){
    //       const Delta = Quill.import("delta");
    //       return new Delta().insert(plaintext);
    //       }
    //   }
    //   return delta;
    // },
    onEditorChange(value) {
      this.eInit = true;
      this.$emit("editorDetail", value.html);
    },
  },
};
</script>
