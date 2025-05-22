import VuexAction from "../util/vuex-utils/actions";
const path = "/api/v1/investor/profile";
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

    async getInvestorProfile({ commit }, options) {
        setLoading(commit, true);
        try {
            const response = await this.$axios.$get(
                "/api/v1/investor/profile/",
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
            let uri = "/api/v1/investor/";
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
    async matchingProfile({ commit }, payload) {
        setLoading(commit, true)
        try {
            let uri = '/api/v1/investor/matching/'
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
    async addMember({ commit }, { payload, options }) {
        setLoading(commit, true, "isCreating");
        try {
            let uri = "/api/v1/investor/member/";
            const response = await this.$axios.$post(uri, payload, options);
            setLoading(commit, false, "isCreating");
            return response;
        } catch (error) {
            setLoading(commit, false, "isCreating");
            throw error;
        }
    },
    async updateMember({ commit }, { id, payload, options }) {
        setLoading(commit, true, "isUpdating");
        try {
            let uri = "/api/v1/investor/member/" + id + "/";
            const response = await this.$axios.$patch(uri, payload, options);
            setLoading(commit, false, "isUpdating");
            return response;
        } catch (error) {
            setLoading(commit, false, "isUpdating");
            throw error;
        }
    },
    async deleteMember({ commit }, { id, options }) {
        setLoading(commit, true, "isDeleting");
        try {
            let uri = "/api/v1/investor/member/" + id + "/";
            const response = await this.$axios.$delete(uri, options);
            setLoading(commit, false, "isDeleting");
            return response;
        } catch (error) {
            setLoading(commit, false, "isDeleting");
            throw error;
        }
    },
    async updateProfile({ commit }, formData) {


        setLoading(commit, true)
        try {
            let uri = `/api/v1/investor/profile/`
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
