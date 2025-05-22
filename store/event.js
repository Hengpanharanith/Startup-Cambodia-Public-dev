import VuexAction from "../util/vuex-utils/actions";
const path = "/public/api/v1/event";
let vuexAction = new VuexAction(path, true);
const { setLoading } = vuexAction;

export const state = () => ({
    ...vuexAction.getInitialState(),
    events: [],
    upComingEvents: [],
    pastEvents: [],
    spotlights: [],
});

export const mutations = {
    ...vuexAction.getCommonMutations(),
    SET_EVENT(state, payload) {
        state.events = payload;
    },
    SET_SPOTLIGHT_EVENT(state, payload) {
        state.spotlights = payload;
    },
    SET_UPCOMING_EVENT(state, payload) {
        state.upComingEvents = payload;
    },
    SET_PAST_EVENT(state, payload) {
        state.pastEvents = payload;
    },
};

export const actions = {
    ...vuexAction.getActions(),
    async getSpotlights({ commit }) {
        setLoading(commit, true, "isFetching");
        try {
            let uri = `/public/api/v1/event/`;

            const response = await this.$axios.$get(uri);

            commit("SET_SPOTLIGHT_EVENT", response.spotlights);

            setLoading(commit, false, "isFetching");
            return response;
        } catch (error) {
            setLoading(commit, false, "isFetching");
        }
    },
};
