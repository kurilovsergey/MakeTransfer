import  axios from 'axios';
import { ProfileType } from '../types/types';



const instance = axios.create({
    withCredentials:true,
        headers: {
            "API-KEY": "2522ab72-2cb9-46ff-a415-53a5c1188e2f"},
    baseURL: "https://social-network.samuraijs.com/api/1.0/"
})

export const UsersAPI = {
    getUsers(currentPage: number,pageSize: number) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`).then(response => response.data);     
    },
    unfollow(userID: number) {
        return instance.delete(`follow/${userID}`)
                },
    follow(userID: number) {
        return instance.post(`follow/${userID}`)
                                
    },
    getProfile(userID: number) {
     return instance.get(`profile/`+userID)
     }
}

export const ProfileAPI = {
    getProfile(userId: number) {
     return instance.get(`profile/`+userId)
     },
     getStatus(userId: number) {
         return instance.get('profile/status/'+userId)
     },
     updateStatus(status: string) {
         return instance.put('profile/status/',{status: status})
     },
     savePhoto(photoFile: File) {
         let formData = new FormData
         formData.append("image",photoFile)
        return instance.put('profile/photo/', formData, {
            headers: {
                "Content-type": "multipart/form-data"
            }
        } )
     },
     saveProfile(profle: ProfileType) {
        return instance.put('profile', profle)
     }
}

export enum ResultCode  {
  Success = 0,
  Error = 1,
  CaptchaIsRequired = 10
}

type MeResponseType = {
    data: {id: number, email: string, login: string}
    resultCode: ResultCode,
    messages: Array<string>
}

type LoginResponseType = {
    data: {userId: number}
    resultCode: ResultCode,
    messages: Array<string>
}


export const authAPI = {
    me() {
        return instance.get<MeResponseType>(`auth/me`).then(res => res.data)
      },
      login(email: string, password: string, rememberme: boolean = false, captcha: null | string = null) {
        return instance.post<LoginResponseType>(`auth/login`,{email, password, rememberme, captcha}).then(res => res.data)
      },
      logout() {
        return instance.delete(`auth/login`)
      }

}
export const securityAPI = {
    getCaptchaUrl() {
        return instance.get(`security/get-captcha-url`)
      }
}
