import VuexAction from "../util/vuex-utils/actions";
const path = "/base-api/me/connections";
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
