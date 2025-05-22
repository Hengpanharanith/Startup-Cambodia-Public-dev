import VuexAction from "../util/vuex-utils/actions";
const path = "/public/api/v1/partner";
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
