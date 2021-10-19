import  axios, { AxiosPromise } from 'axios';
import { PhotosType, ProfileType, UserType } from '../types/types';



const instance = axios.create({
    withCredentials: true,
        headers: {
            "API-KEY": "2522ab72-2cb9-46ff-a415-53a5c1188e2f"},
    baseURL: "https://social-network.samuraijs.com/api/1.0/"
})

type GetUsersType = {
    items: Array<UserType>,
    totalCount: number,
    error: string | null
}





export const UsersAPI = {
    getUsers(currentPage: number, pageSize: number, term: string = "", friend: null | boolean = null) {
        return instance.get<GetUsersType>(`users?page=${currentPage}&count=${pageSize}&term=${term}`+(friend==null ? "" : `&friend=${friend}`)).then(response => response.data);     
    },
    unfollow(userID: number) {
        return instance.delete(`follow/${userID}`) as AxiosPromise<ResponseType>
                },
    follow(userID: number) {
        return instance.post<ResponseType>(`follow/${userID}`)
                                
    },
    /*
    getProfile(userID: number) {
     return instance.get<ProfileType>(`profile/`+userID)
     }*/
}

type SavePhotoResponseType = {
    photos: PhotosType
}

type messages = {
    messages: string
}

export const ProfileAPI = {
    getProfile(userId: number) {
     return instance.get<ProfileType & messages>(`profile/`+userId)
     },
     getStatus(userId: number) {
         return instance.get<string>('profile/status/'+userId)
     },
     updateStatus(status: string) {
         return instance.put<ResponseType>('profile/status/', {status: status})
     },
     savePhoto(photoFile: File) {
         let formData = new FormData
         formData.append("image",photoFile)
        return instance.put<ResponseType<SavePhotoResponseType>>('profile/photo/', formData, {
            headers: {
                "Content-type": "multipart/form-data"
            }
        } )
     },
     saveProfile(profle: ProfileType) {
        return instance.put<ResponseType>('profile', profle)
     }
}

export enum ResultCode  {
  Success = 0,
  Error = 1,
  CaptchaIsRequired = 10
}



type MeResponseDataType = {
    id: number,
    email: string,
    login: string
}

type LoginResponseDataType = {
    url: string
}

type ResponseType<D = {}, RC = ResultCode> = {
    data: D,
    resultCode: RC,
    messages: Array<string>
}

export const authAPI = {
    me() {
        return instance.get<ResponseType<MeResponseDataType>>(`auth/me`).then(res => res.data)
      },
      login(email: string, password: string, rememberme: boolean = false, captcha: null | string = null) {
        return instance.post<ResponseType<LoginResponseDataType>>(`auth/login`,{email, password, rememberme, captcha}).then(res => res.data)
      },
      logout() {
        return instance.delete<ResponseType>(`auth/login`)
      }

      

}

type securityAPIType = {
    url: string
}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get<securityAPIType>(`security/get-captcha-url`)
      }
}
