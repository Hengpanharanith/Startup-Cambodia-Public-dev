import VuexAction from "../util/vuex-utils/actions";
const path = "/api/v1/filter-option";
let vuexAction = new VuexAction(path, true);
export const state = () => ({
    ...vuexAction.getInitialState(),
});

export const mutations = {
    ...vuexAction.getCommonMutations(),
};

export const actions = {
    ...vuexAction.getActions(),
};
