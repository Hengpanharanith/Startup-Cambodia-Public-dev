export default ({ $axios, store, $cookiz }) => {
    $axios.onRequest(({ headers }) => {
        let token = $cookiz.get("access_token");
        if (!token) return;
        headers.common["Authorization"] = "Bearer " + token;
    });

    $axios.onResponse((response) => { });

    $axios.onError((error) => {
        const responseCode = error.response?.status;
        if (responseCode === 403 || responseCode === 401) {
            $cookiz.remove("access_token");
            $cookiz.remove("refresh_token");
            if (process.browser) window.location.reload();
        }
    });
};
