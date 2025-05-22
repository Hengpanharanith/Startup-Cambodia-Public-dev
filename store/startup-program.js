import VuexAction from "../util/vuex-utils/actions";
const path = "/public/api/v1/startup-program";
let vuexAction = new VuexAction(path, true);
const { setLoading } = vuexAction;

export const state = () => ({
  ...vuexAction.getInitialState(),
  recentList: [],
  programPageList: [],
  pagesPagination: {
    listCount: 0,
    totalRecord: 0,
    currentPage: 1,
    totalPage: 1,
  },
});

export const mutations = {
  ...vuexAction.getCommonMutations(),
  SET_PAGE_LIST(state, payload) {
    state.programPageList = Object.assign([], payload.data);
    const pagination = {
      totalPage: payload.total_page,
      totalRecord: payload.item_count,
      currentPage: payload.current_page,
      listCount: payload.per_page,
    };
    state.pagesPagination = Object.assign({}, pagination);
  },
  SET_RECENT_LIST(state, payload) {
    state.recentList = Object.assign([], payload.data);
  },
  TOGGLE_SAVE(state, id) {
    const index = state.dataList.findIndex((item) => item.id == id);
    const recentIdx = state.recentList.findIndex((item) => item.id == id);
    if (index >= 0) {
      const item = state.dataList[index];
      item.is_saved = !item.is_saved;
      state.dataList.splice(index, 1, item);
    }
    if (recentIdx >= 0) {
      const item = state.recentList[index];
      item.is_saved = !item.is_saved;
      state.recentList.splice(index, 1, item);
    }
  },
};

export const actions = {
  ...vuexAction.getActions(),
  async getProgramPage({ commit }, params) {
    const { setLoading } = vuexAction;
    setLoading(commit, true, "isFetching");
    try {
      const response = await this.$axios.$get(path + "/program-page/", params);
      commit("SET_PAGE_LIST", response);
      setLoading(commit, false, "isFetching");
      return response;
    } catch (error) {
      setLoading(commit, false, "isFetching");
      throw error;
    }
  },
  async getRecentlyProgram({ commit }, params) {
    const { setLoading } = vuexAction;
    setLoading(commit, true, "isFetching");
    try {
      const response = await this.$axios.$get(path + "/", params);
      commit("SET_RECENT_LIST", response);
      setLoading(commit, false, "isFetching");
      return response;
    } catch (error) {
      setLoading(commit, false, "isFetching");
      throw error;
    }
  },
  toggleSaveProps({ commit }, { id }) {
    commit("TOGGLE_SAVE", id);
  },
};
