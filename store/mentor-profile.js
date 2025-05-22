import VuexAction from "../util/vuex-utils/actions";
const path = "/api/v1/mentor/profile";
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
    async getMentorProfile({ commit }, options) {
        setLoading(commit, true);
        try {
            const response = await this.$axios.$get(
                "/api/v1/mentor/profile/",
                options
            );

            setLoading(commit, false);
            return response;
        } catch (error) {
            setLoading(commit, false);
            throw error;
        }
    },
    async createProfile({ commit },payload) {
        setLoading(commit, true, "isFetching");
        
        try {
            let uri = "/api/v1/mentor/";
            const response = await this.$axios.post(
                uri,
                payload);
            setLoading(commit, false, "isFetching");
            return response;
        } catch (error) {
            setLoading(commit, false, "isFetching");
            throw error.response;
        }

    },

    async updateMentor({ commit }, { payload, options }) {
        setLoading(commit, true, "isFetching");
        
        try {

            const response = await this.$axios.patch(path, payload, options);
            setLoading(commit, false, "isFetching");
            return response;
        } catch (error) {
            setLoading(commit, false, "isFetching");
            throw error;
        }

    },

    async matchingProfile({ commit }, payload) {
        setLoading(commit, true)
        try {
            let uri = '/api/v1/mentor/matching/'
            const response = await this.$axios.$post(
                uri,
                payload
            )
            setLoading(commit, false)
            return response
        } catch (error) {
            setLoading(commit, false)
            throw error.response
        }
    },

    async updateProfile({ commit }, formData) {
        
        setLoading(commit, true)
        try {
            let uri = `/api/v1/mentor/profile/`
            const response = await this.$axios.$patch(
                uri, formData
            )
            setLoading(commit, false)
            return response
        } catch (error) {
            setLoading(commit, false)
            throw error.response
        }
    },
};
