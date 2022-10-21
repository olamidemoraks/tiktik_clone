import create from "zustand";
import {persist} from "zustand/middleware"
import axios from "axios";
import { BASE_URL } from "../utils";

const authStore =(set: any) =>({
    userProfile: null,
    allUsers: [],

    addUser:(user: any) => set({userProfile : user}),
    removeUser:() => set({userProfile: null}),
    fetchAllUser:async () => {
        const response = await axios.get(`${BASE_URL}/api/users`)
        set({allUsers: response.data})
    }
})

const useAuthstore = create(
    persist(authStore, {
        name: "auth"
    })
)

export default useAuthstore