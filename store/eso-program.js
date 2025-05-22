import VuexAction from "../util/vuex-utils/actions";
const path = "/api/v1/eso-program";
let vuexAction = new VuexAction(path, true);

const { setLoading } = vuexAction;
export const state = () => ({
  ...vuexAction.getInitialState(),
});

export const mutations = {
  ...vuexAction.getCommonMutations(),
};

export const actions = {
  ...vuexAction.getActions(),
};
