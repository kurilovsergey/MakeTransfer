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
