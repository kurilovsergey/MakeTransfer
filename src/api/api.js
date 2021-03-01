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
    }
}




