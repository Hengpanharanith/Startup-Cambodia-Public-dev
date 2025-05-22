import Vue from "vue";
const options = {
  success: {
    position: "center",
    type: "success",
    title: "Success",
    showConfirmButton: false,
    timer: 0
  },
  failed: {
    position: "center",
    type: "error",
    title: "Error",
    confirmButtonColor: "orange",
    timer: 0
  }
};
Vue.mixin({
  methods: {
    sweetAlert(status, message, timer = 1000) {
      if (status == 1) {
        this.$swal({ ...options.success, timer });
        return;
      }
      this.$swal({ ...options.failed, timer:0, text: message });
    },
    sweetAlertLoading() {
      this.$swal({
        title: 'Please Wait !',
        html: 'Loading...',
        confirmButtonColor: "orange",
        allowOutsideClick: false,
        onBeforeOpen: () => {
          this.$swal.showLoading();
        },
        timer: 0,
      });
    },
    sweetAlertLoadingClose() {
      this.$swal.close();
    },
    sweetAlertError(e) {
      const text = e?.response?.data?.message || e?.response?.status || e;
      this.$swal({ ...options.failed, text });
    },
    async sweetAlertConfirmation(message = "You won't be able to revert this!", title = "Are you sure?"){
      return this.$swal({
        title: title,
        text: message,
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "orange",
        cancelButtonColor: "grey",
        confirmButtonText: "Yes",
        reverseButtons: true,
        timer: 0
      });
    },
    async sweetAlertRemoveConfirmation(message = "You won't be able to revert this!", title = "Are you sure?"){
      return  this.$swal({
        title: title,
        text: message,
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "red",
        cancelButtonColor: "grey",
        confirmButtonText: "Yes",
        reverseButtons: true,
        timer: 0
      });
    },
    async sweetAlertMessageConfirmation(message = "You won't be able to revert this!", title = "Message", value = ''){
      return  this.$swal({
        title: title,
        text: message,
        input: 'textarea',
        inputPlaceholder: 'Type your return here...',
        inputValue: value,
        inputAttributes: {'aria-label': 'Type your message here'},
        inputValidator: (value) => {
            if (!value) {
                return 'You need to write a return message!'
            }
        },
        showCancelButton: true,
        confirmButtonColor: "orange",
        cancelButtonColor: "grey",
        confirmButtonText: "Yes",
        reverseButtons: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
        stopKeydownPropagation: false,
        focusConfirm: false,
        inputAutoFocus: false,
        inputAutoTrim: false,
        timer: 0
      });
    }
  }
});
