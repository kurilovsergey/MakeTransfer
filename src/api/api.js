import * as axios from 'axios';



const instance = axios.create({
    withCredentials:true,
        headers: {
            "API-KEY": "2522ab72-2cb9-46ff-a415-53a5c1188e2f"},
    baseURL: "https://social-network.samuraijs.com/api/1.0/"
})

export const UsersAPI = {
    getUsers(currentPage,pageSize) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`).then(response => response.data);     
    },
    unfollow(userID) {
        return instance.delete(`follow/${userID}`)
                },
    follow(userID) {
        return instance.post(`follow/${userID}`)
                                
    },
    getProfile(userID) {
     return instance.get(`profile/`+userID)
     }
}

export const ProfileAPI = {
    getProfile(userId) {
     return instance.get(`profile/`+userId)
     },
     getStatus(userId) {
         return instance.get('profile/status/'+userId)
     },
     updateStatus(status) {
         return instance.put('profile/status/',{status: status})
     },
     savePhoto(photoFile) {
         let formData = new FormData
         formData.append("image",photoFile)
        return instance.put('profile/photo/', formData, {
            headers: {
                "Content-type": "multipart/form-data"
            }
        } )
     }
}

export const authAPI = {
    me() {
        return instance.get(`auth/me`)
      },
      login(email, password, rememberme = false) {
        return instance.post(`auth/login`,{email,password,rememberme})
      },
      logout() {
        return instance.delete(`auth/login`)
      }

}


