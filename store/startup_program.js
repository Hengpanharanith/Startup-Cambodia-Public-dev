const startup_program_list = '/api/v1/startup-program/'
const startup_program_page = '/api/v1/startup-program/program-page/'

const startup_program_detail = '/api/v1/startup-program/%s/'
const path = '/public'

const startup_program = {
    namespaced: true,
    state: () => ({
        data: [],
        totalPage: 10,
        totalRecord: 0,
        currentPage: 1,
        listCount: 0,
        isLoading: false,
    }),
    mutations: {

        SET_DATA_LIST(state, payload) {
            state.data = payload.data
            state.totalPage = payload.total_page
            state.totalRecord = payload.item_count
            state.currentPage = payload.current_page
            state.listCount = payload.per_page
        },

        SET_DATA(state, payload) {
            state.data = payload
        },


        REQUESTING(state, { isLoading = false, action = '', inProgress = false }) {
            state.isLoading = isLoading
            if (action) {
                state[action] = inProgress
            }
        },
    },
    actions: {

        async getAllProgramCategory({ commit }, params) {
            commit('REQUESTING', {
                isLoading: true,
            })

            try {

                const response = await this.$axios.$get(
                    `${path}/api/v1/startup-program-category/`,
                    params
                )

                // response.data.listCount = params.listCount
                commit('SET_DATA_LIST', response)
                commit('REQUESTING', {
                    isLoading: false,
                })
                return response
            } catch (error) {
                commit('REQUESTING', {
                    isLoading: false,
                })
                throw error
            }
        },

        async getAllProgram({ commit }, params) {
            commit('REQUESTING', {
                isLoading: true,
            })

            try {

                const response = await this.$axios.$get(
                    startup_program_list,
                    {
                        params
                    }
                )

                // response.data.listCount = params.listCount
                commit('SET_DATA_LIST', response)
                commit('REQUESTING', {
                    isLoading: false,
                })
                return response
            } catch (error) {
                commit('REQUESTING', {
                    isLoading: false,
                })
                throw error
            }
        },

        async getProgramPage({ commit }, params) {
            commit('REQUESTING', {
                isLoading: true,
            })

            try {
                const response = await this.$axios.$get(
                    startup_program_page,
                    params
                )

                commit('SET_DATA_LIST', response)
                commit('REQUESTING', {
                    isLoading: false,
                })
                return response
            } catch (error) {
                commit('REQUESTING', {
                    isLoading: false,
                })
                throw error
            }
        },

        async getProgramDetail({ commit }, id) {
            commit('REQUESTING', {
                isLoading: true,
            })

            try {
                const response = await this.$axios.$get(
                    startup_program_detail.replace('%s', id),
                )

                commit('SET_DATA', response)
                commit('REQUESTING', {
                    isLoading: false,
                })
                return response
            } catch (error) {
                commit('REQUESTING', {
                    isLoading: false,
                })
                throw error
            }
        },






    },
}

export default startup_program
