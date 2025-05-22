import VuexAction from "../util/vuex-utils/actions";

const path = "/public/api/v1/startup-program-category";
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
};
