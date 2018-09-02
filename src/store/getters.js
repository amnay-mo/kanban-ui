const getters = {
    isAuthenticated(state) {
        return state.token != null
    }
}

export default getters
