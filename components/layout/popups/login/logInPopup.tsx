import React from 'react';
import Popup from "@/components/layout/popups/popup";
import SignInWithGoogleButton from "@/components/layout/popups/login/signInWithGoogleButton";


const LogInPopup = () => {
    return (
        <Popup title={''}>
            <div className={'flex flex-col items-center gap-5'}>
                <div className={'text-2xl font-[800]'}>timeline wiki</div>
                <div className={'text-lg font-medium text-center'}>We believe editors like you <br/> make the internet better.</div>
                <SignInWithGoogleButton/>
                <div className={'p-3 w-full flex flex-col gap-3 items-center bg-[#F2F2F259] border-[1px] border-gray-300 rounded-2xl'}>
                    <div className={'w-full'}>
                        <div className={'flex items-center gap-1.5'}>
                            <span className={'text-md'}>&#x1F340;</span>
                            <span className={'text-lg font-semibold'}>Free</span>
                        </div>
                        <div className={'text-sm text-gray-500'}>USD $0 for all features after sign up</div>
                    </div>
                    <div className={'w-full flex flex-col gap-2'}>
                        <div className={'flex gap-2'}>
                            <span className={'material-symbols-outlined text-[16px]'}>&#xe5ca;</span>
                            <span className={'text-sm font-medium'}>Create infinite number of private timelines</span>
                        </div>
                        <div className={'flex gap-2'}>
                            <span className={'material-symbols-outlined text-[16px]'}>&#xe5ca;</span>
                            <span className={'text-sm font-medium'}>Publish timelines to the wiki</span>
                        </div>
                        <div className={'flex gap-2'}>
                            <span className={'material-symbols-outlined text-[16px]'}>&#xe5ca;</span>
                            <span className={'text-sm font-medium'}>Edit public timelines in the wiki</span>
                        </div>
                    </div>
                </div>
            </div>
        </Popup>
    );
};

export default LogInPopup;
