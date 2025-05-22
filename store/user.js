import VuexAction from "../util/vuex-utils/actions";

const path = "/user-api";
let vuexAction = new VuexAction(path, true);
const { setLoading } = vuexAction;
export const state = () => ({
    ...vuexAction.getInitialState(),
    currentUser: null,
});

export const mutations = {
    ...vuexAction.getCommonMutations(),
    SET_CURRENT_USER(state, payload) {
        state.currentUser = Object.assign({}, payload);
    },
};

export const actions = {
    ...vuexAction.getActions(),
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
    async updateUserProfile({ commit }, { payload, options }) {
        setLoading(commit, true, "isUpdating");
        try {
            const response = await this.$axios.$patch(
                "/user-api/",
                payload,
                options
            );
            setLoading(commit, false, "isUpdating");
            return response;
        } catch (error) {
            setLoading(commit, false, "isUpdating");
            throw error;
        }
    },
    async getUserInformation({ commit }, { id }) {
        setLoading(commit, true, "isUpdating");
        try {
            const _URI = `/base-api/users/${id}/`;
            const response = await this.$axios.$get(_URI);
            setLoading(commit, false, "isUpdating");
            return response;
        } catch (error) {
            setLoading(commit, false, "isUpdating");
            throw error;
        }
    },
};
