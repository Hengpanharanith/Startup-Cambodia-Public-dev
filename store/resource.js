import VuexAction from "../util/vuex-utils/actions";
const path = "/public/api/v1/resource";
let vuexAction = new VuexAction(path, true);
const { setLoading } = vuexAction;

export const state = () => ({
    ...vuexAction.getInitialState(),
    resources: [],
});

export const mutations = {
    ...vuexAction.getCommonMutations(),
    SET_RESOURCE(state, payload) {
        state.resources = payload;
    },
};
export const actions = {
    ...vuexAction.getActions(),
    async getResourceByCategory({ commit }, options) {
        setLoading(commit, true, "isFetching");
        try {
            const response = await this.$axios.$get(path + "/", options);
            commit("SET_RESOURCE", response.data);
            setLoading(commit, false, "isFetching");
            return response;
        } catch (error) {
            setLoading(commit, false, "isFetching");
        }
    },
};
