import {useEffect} from 'react';
import {getSession} from "@/utils/global";
import {updateSession} from "@/store/slices/privateSlice";
import {useDispatch} from "react-redux";
import api from "@/pages/api/api";
import axios from "axios";
import {updatePopupType} from "@/store/slices/appearanceSlice";

const SignInWithGoogleButton = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const loadGsiScript = () => {
            const script = document.createElement('script');
            script.src = 'https://accounts.google.com/gsi/client';
            script.async = true;
            script.onload = () => {
                window.google.accounts.id.initialize({
                    client_id: '776783695748-ts83rl08c9p801vkuvg2r56a45k3l4nm.apps.googleusercontent.com',
                    callback: handleCredentialResponse,
                });
                window.google.accounts.id.renderButton(document.getElementById('g_id_signin'), {
                    theme: 'filled_black',
                    size: 'large',
                    shape: 'pill',
                    logo_alignment: 'left',
                    text: 'continue_with',
                    width: '220'
                });
            };
            document.body.appendChild(script);
        };
        loadGsiScript();
    }, []);

    const handleCredentialResponse = async (res: any) => {
        const idToken = res.credential;
        try {
            const response = await axios.post('/api/user/login', { idToken });
            if (response.status === 200 && response.data.code !== 69999) {
                getSession().then((session) => {
                    dispatch(updateSession(session));
                    dispatch(updatePopupType('none'))
                })
            }
            console.log('Login successful', response);
        } catch (error) {console.error('Login failed', error);}
    };

    return (
        <div className={'h-[40px]'}><div id="g_id_signin"></div></div>
    );
};

export default SignInWithGoogleButton;

declare global {
    interface Window {
        google: any;
    }
}