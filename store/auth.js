import VuexAction from "../util/vuex-utils/actions";
const path = "/public";
const user_register_path = `${path}/api/v1/auth/registration/`;
const user_refresh_token_path = `${path}/api/v1/token/refresh/`;
const LOGIN_URI = "/api/v1/camdigikey/login/";
const REQUEST_LOGIN_URI = "/api/v1/camdigikey/request-login/";
let vuexAction = new VuexAction(path, true);

const { setLoading } = vuexAction;

export const state = () => ({
    ...vuexAction.getInitialState(),
    isAuthenticating: false,
    authenticated: false,
    currentUser: null,
    email: null,
});

export const mutations = {
    SET_AUTH(state, payload) {
        state.auth = Object.assign({}, payload);
    },

    CLEAR_AUTH(state, payload) {
        state.auth = {};
    },
    REQUESTING(state, { isLoading = false, action = "", inProgress = false }) {
        state.isLoading = isLoading;
        if (action) {
            state[action] = inProgress;
        }
    },
    REQUEST_AUTH(state) {
        state.isAuthenticating = true;
    },
    SET_CURRENT_USER(state, payload) {
        state.currentUser = Object.assign({}, payload);
    },
};

export const actions = {
    ...vuexAction.getActions(),
    async getCamDigiKeyAuthURL({ commit }) {
        setLoading(commit, true, "gettingCamdigiKeyURL");
        try {
            const response = await this.$axios.$get(REQUEST_LOGIN_URI);
            setLoading(commit, false, "gettingCamdigiKeyURL");
            return response;
        } catch (error) {
            setLoading(commit, false, "gettingCamdigiKeyURL");
            throw error;
        }
    },

    async verifyCamDigiKeyToken({ commit }, { token }) {
        setLoading(commit, true, "verifyingCamdigiKeyToken");
        let auth = { authenticated: false };

        try {
            const uri = "/api/v1/camdigikey/login/";
            const response = await this.$axios.$post(uri, { token });
            setLoading(commit, false, "verifyingCamdigiKeyToken");

            const { access_token, refresh_token } = response;
            this.$axios.setToken(access_token, "Bearer");
            auth = { ...response.data, authenticated: true };
            commit("SET_AUTH", auth);
            this.$cookiz.set("access_token", access_token);
            this.$cookiz.set("refresh_token", refresh_token);
            setLoading(commit, false, "isFetching");

            return response;
        } catch (error) {
            setLoading(commit, false, "gettingCamdigiKeyURL");
            throw error;
        }
    },

    async getCurrentUser({ commit }, options) {
        setLoading(commit, true);
        try {
            const response = await this.$axios.$get(path, options);
            commit("SET_CURRENT_USER", response);
            setLoading(commit, false);
            return response;
        } catch (error) {
            setLoading(commit, false);
            throw error;
        }
    },

    async logout({ commit, state }) {
        setLoading(commit, true, "isFetching");
        const data = {
            refresh_token: state.auth ? state.auth.refresh : state.refresh,
        };
        try {
            const uri = "/api/v1/auth/logout/";
            const response = await this.$axios.post(uri, data);
            if (response.status < 400) {
                this.$cookiz.remove("access_token");
                this.$cookiz.remove("refresh_token");
                setLoading(commit, false, "isFetching");
                return response;
            }
            setLoading(commit, false, "isFetching");
            throw response;
        } catch (error) {
            setLoading(commit, false, "isFetching");
            throw error;
        }
    },

    async resetPassword({ commit }, payload) {
        setLoading(commit, true, "isFetching");
        let uri = `/public/api/v1/auth/password/reset/`;
        try {
            const data = {
                email: payload,
            };
            const response = await this.$axios.post(uri, data);
            if (response.status < 400) {
                setLoading(commit, false, "isFetching");
                return response;
            } else {
                setLoading(commit, false, "isFetching");
                throw response;
            }
        } catch (error) {
            setLoading(commit, false, "isFetching");
            throw error;
        }
    },

    async resetPasswordConfirm({ commit }, payload) {
        setLoading(commit, true, "isFetching");
        let uri = `/public/api/v1/auth/password/reset/confirm/`;
        try {
            const data = payload;
            const response = await this.$axios.post(uri, data);
            if (response.status < 400) {
                setLoading(commit, false, "isFetching");
                return response;
            } else {
                setLoading(commit, false, "isFetching");
                throw response;
            }
        } catch (error) {
            setLoading(commit, false, "isFetching");
            throw error;
        }
    },

    async verifyEmail({ commit }, payload) {
        setLoading(commit, true, "isFetching");

        let uri = `${user_register_path}verify-email/`;

        try {
            const data = {
                key: payload,
            };
            const response = await this.$axios.post(uri, data);
            if (response.status < 400) {
                setLoading(commit, false, "isFetching");
                return response;
            } else {
                setLoading(commit, false, "isFetching");
                throw response;
            }
        } catch (error) {
            setLoading(commit, false, "isFetching");
            throw error;
        }
    },

    async changePassword({ commit }, payload) {
        setLoading(commit, true, "isFetching");
        let uri = `/public/api/v1/auth/password/change/`;
        try {
            const response = await this.$axios.post(uri, payload);
            if (response.status < 400) {
                setLoading(commit, false, "isFetching");
                return response;
            } else {
                setLoading(commit, false, "isFetching");
                throw response;
            }
        } catch (error) {
            setLoading(commit, false, "isFetching");
            throw error;
        }
    },
};

export const getters = {
    // determine if the user is authenticated based on the presence of the access token
    isAuthenticated: (state) => {
        return state.authenticated;
    },

    getLoading: (state) => {
        return state.isLoading;
    },
};
