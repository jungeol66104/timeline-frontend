import {useDispatch} from "react-redux";
import {useLayoutEffect} from "react";
import axios from "axios";
import {updateSession} from "@/store/slices/personalSlice";

export const useSession = () => {
    const dispatch = useDispatch()

    useLayoutEffect(() => {
        const setSession = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/auth/session')
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