import VuexAction from "../util/vuex-utils/actions";
const path = "/base-api/me/notification/";
let vuexAction = new VuexAction(path, true);
const { setLoading } = vuexAction;

export const state = () => ({
    ...vuexAction.getInitialState(),
    totalNotification:0,
    connectionReqNotification:0,
    teamInviteReqNotification:0
});

export const mutations = {
    ...vuexAction.getCommonMutations(),
    SET_TOTAL_NOTIFICATION(state, value) {
        state.totalNotification = value
    },
    SET_CONNECTION_REQ_NOTIFICATION(state, value) {
        state.connectionReqNotification = value
    },
    SET_TEAM_INVITE_REQUEST_NOTIFICATION(state, value) {
        state.teamInviteReqNotification = value
    },

};

export const actions = {
    ...vuexAction.getActions(),
    async getNotificationCount({commit}){
        //
        setLoading(commit,true,"isFetching")
        try{
            let {total, connectionRequest, teamInvite} = 0;
            await this.$axios.$get(path).then((response)=>{

                total = response['total']
                connectionRequest = response['connection_request_count']
                teamInvite = response['team_invite_request_count']

            }).catch((error)=>{
                
            })

            commit("SET_TOTAL_NOTIFICATION", total);
            commit("SET_CONNECTION_REQ_NOTIFICATION", connectionRequest);
            commit("SET_TEAM_INVITE_REQUEST_NOTIFICATION", teamInvite);

            setLoading(commit, false, "isFetching");

        }catch(error){
            setLoading(commit, false, "isFetching");
            throw error;
        }
    }
};
