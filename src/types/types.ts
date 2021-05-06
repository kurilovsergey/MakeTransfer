//types for profile-reducer

export type PostType = {
    id: number,
    message: String
    likes: number
  }
  
  export type ProfileType = {
    userId : number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType
    photos: PhotosType
  }
  
  export type ContactsType =  {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
  }
  
  export type PhotosType = {
    small: string
    large: string
  }

//types for users-reducer

export type UserType = {
    id: number
    name: string
    uniqueUrlName: string
    status: string
    photos: PhotosType
    followed: boolean
}