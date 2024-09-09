import axios from "axios";
import {useLayoutEffect} from "react";
import {useDispatch} from "react-redux";
import {updateSession} from "@/store/slices/privateSlice";

export const useSession = () => {
    const dispatch = useDispatch()

    useLayoutEffect(() => {
        const setSession = async () => {
            try {
                const response = await axios.get('/api/user/session')
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