

export const getProfile = (state) => {
 return state.Wallpage.profile;
};

export const getStatusProfile = (state) => {
    return state.Wallpage.status;
};

export const getAutorizatedUserID = (state) => {
    return state.Auth.userID;
};

export const getisAuth= (state) => {
    return state.Auth.isAuth;
};

export const getfullName = (state) => {
    return state.Wallpage.profile.fullName
}

export const getMessageError = (state) => {
    return state.Wallpage.messageError
}

export const getTotalUsersCount = (state) => {
    return state.usersPage.totalUsersCount
}

export const getCurrentPage = (state) => {
    return state.usersPage.currentPage
}

export const getPageSize= (state) => {
    return state.usersPage.pageSize
}

export const getIsFetching = (state) => {
    return state.usersPage.isFetching
}

export const getFilter = (state) => {
    return state.usersPage.filter
}

export const getUsersSelector = (state) => {
    return state.usersPage.users
}

export const getFollowinginProgress = (state) => {
    return state.usersPage.followinginProgress
}