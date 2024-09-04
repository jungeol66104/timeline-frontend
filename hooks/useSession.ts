import {useLayoutEffect} from "react";
import {useDispatch} from "react-redux";
import {updateSession} from "@/store/slices/privateSlice";
import axios from "axios";

export const useSession = () => {
    const dispatch = useDispatch()

    useLayoutEffect(() => {
        const setSession = async () => {
            try {
                // will this url work?
                const response = await axios.get('http://localhost:3000/api/user/session')
                dispatch(updateSession(response.data))
                return
            } catch (error) {
                console.error('Error fetching data in useEffect: ', error)
                return
            }
        }
        setSession()
    });
}