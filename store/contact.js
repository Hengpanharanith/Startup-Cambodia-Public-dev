import VuexAction from "../util/vuex-utils/actions";
const path = "/api/v1/contact/";
let vuexAction = new VuexAction(path, true);
export const state = () => ({
    ...vuexAction.getInitialState(),
});

export const mutations = {
    ...vuexAction.getCommonMutations(),
};

export const actions = {
    ...vuexAction.getActions(),
    async submitContactForm({ commit }, payload) {
        try {
            const response = await this.$axios.post(`${path}`, payload);
            // 
            return response;
        } catch (error) {
            // 
            throw error;
        }
    }
};
