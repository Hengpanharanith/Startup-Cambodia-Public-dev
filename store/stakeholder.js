import VuexAction from "../util/vuex-utils/actions";
const path = "/api/v1/stakeholder";
let vuexAction = new VuexAction(path, true);
const { setLoading } = vuexAction;

export const state = () => ({
    ...vuexAction.getInitialState(),
    resources: [],
});

export const mutations = {
    ...vuexAction.getCommonMutations(),
};

export const actions = {
    ...vuexAction.getActions(),
    async getStakeholderByCategory({ commit }, { category, options }) {
        setLoading(commit, true, "isFetching");
        try {
            let uri = `${path}/${category}/`;
            const response = await this.$axios.$get(uri, options);
            setLoading(commit, false, "isFetching");
            return response;
        } catch (error) {
            setLoading(commit, false, "isFetching");
            throw error;
        }
    },
    async getStakeHolderDetail({ commit }, { category, id, options }) {
        setLoading(commit, true, "isFetching");
        try {
            let uri = `${path}/${category}/${id}/`;
            const response = await this.$axios.$get(uri, options);
            setLoading(commit, false, "isFetching");
            return response;
        } catch (error) {
            setLoading(commit, false, "isFetching");
            throw error;
        }
    },
    async getLatestClaimRequest({ commit }, payload) {

        // const payload = {
        //     type: type,
        //     stakeholder: id,
        //     option: option
        // };

        setLoading(commit, true, "isFetching");
        try {
            let uri = `${path}/claim-request/`;
            const response = await this.$axios.get(uri, payload);
            setLoading(commit, false, "isFetching");
            return response;
        } catch (error) {
            setLoading(commit, false, "isFetching");
            throw error;
        }
    },
    async claimRequest({ commit }, payload) {
        
        // const payload = {
        //     type: type,
        //     stakeholder: id,
        //     option: option
        // };

        setLoading(commit, true, "isFetching");
        try {
            let uri = `${path}/claim-request/`;
            const response = await this.$axios.$post(uri, payload);
            setLoading(commit, false, "isFetching");
            return response;
        } catch (error) {
            setLoading(commit, false, "isFetching");

            throw error;
        }
    },
    async matchProfile({ commit }, { email, type, options }) {
        const payload = new FormData();
        payload.append("email", email);

        setLoading(commit, true, "isFetching");
        try {
            let uri = "/api/v1/mentor/matching/";
            const response = await this.$axios.$post(uri, payload, options);
            setLoading(commit, false, "isFetching");

            return response;
        } catch (error) {
            setLoading(commit, false, "isFetching");

            throw error;
        }
    },
};
