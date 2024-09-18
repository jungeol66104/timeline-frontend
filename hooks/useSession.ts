import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {selectIsSession, updateSession} from "@/store/slices/privateSlice";
import {useIsomorphicLayoutEffect} from "@/utils/global";
import {useEffect, useLayoutEffect} from "react";

export const useSession = () => {
    const dispatch = useDispatch()
    const isSession = useSelector(selectIsSession)

    useEffect(() => {
        const setSession = async () => {
            try {
                if (isSession) return
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