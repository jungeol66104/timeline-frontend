import React from 'react';
import Link from "next/link";
import Image from "next/image";
import {mapStrToNum} from "@/utils/global";
import EditButton from "@/components/personal/editButton";
import {useSelector} from "react-redux";
import {selectIsEdit} from "@/store/slices/appearanceSlice";
import PersonalSaveButton from "@/components/personal/personalSaveButton";
import DeleteAccountButton from "@/components/personal/deleteAccountButton";
import {useSession} from "next-auth/react";
import {useRouter} from "next/router";

const PersonalSectionPrimary = () => {
    const contributions = [
        {order: 1, date: '2024-01-01', title:'Event Title', diff: '10', user: 'Nickname', comment: 'comment', type: 'Event'},
        {order: 1, date: '2024-01-01', title:'Event Title', diff: '10', user: 'Nickname', comment: 'comment', type: 'Event'},
        {order: 1, date: '2024-01-01', title:'Event Title', diff: '10', user: 'Nickname', comment: 'comment', type: 'Event'},
        {order: 1, date: '2024-01-01', title:'Event Title', diff: '10', user: 'Nickname', comment: 'comment', type: 'Event'},
        {order: 1, date: '2024-01-01', title:'Event Title', diff: '10', user: 'Nickname', comment: 'comment', type: 'Event'},
    ]
    const isBaseImage = true

    const {data: session} = useSession()
    const isEdit = useSelector(selectIsEdit)
    const router = useRouter()
    const query = router.query.user?.slice(1)

    return (
        <div className={'relative p-4 pb-0 flex flex-col gap-10 w-full min-h-full min-[852px]:min-w-[500px] max-w-[630px]'}>
            <div className={`w-fit h-full flex gap-10`}>
                <div className={'w-[104px] h-[104px] rounded-full bg-gray-600 shrink-0'}></div>
                <div className={'flex flex-col gap-4'}>
                    {session && session.user
                        ?
                            <div>
                                <div className={'text-[20px] font-bold'}>{session.user.name}</div>
                                <div>{session.user.email}</div>
                            </div>
                        :   <div>
                                <div className={'text-[20px] font-bold'}>{query}</div>
                            </div>
                    }
                    {isEdit
                        ?   <div className={'flex gap-3 max-[852px]:flex-col'}>
                                <PersonalSaveButton />
                                <DeleteAccountButton />
                            </div>
                        :   <EditButton/>
                    }
                </div>
            </div>
            <div>
                <div className={'text-2xl font-bold pb-3'}>Contribution</div>
                <hr/>
                <div className={'w-full'}>
                    {contributions.map((contribution, i) => {
                        return (
                            <div key={i}>
                                <div className={'pt-3 pb-1.5 cursor-pointer'}>
                                    <div className={'flex justify-between text-xs font-semibold'}>
                                        <div>{contribution.order} · <span className={`text-gray-500`}>{contribution.date}</span></div>
                                        <div className={'text-gray-600'}>{contribution.type}</div>
                                    </div>
                                    <div className={'mt-0.5 font-bold'}>{contribution.title}</div>
                                    <div className={'mt-1 text-sm'}><span className={'font-semibold'}>(+{contribution.diff})</span> {contribution.comment}</div>
                                    <div className={'py-1.5 flex items-center gap-1.5'}>
                                        <div className={'w-[26px] h-[26px] rounded-full flex items-center justify-center bg-gray-600 text-white text-xs border-[1px] border-white shrink-0'} style={{left: `${i * (26 - 7) + 10}px`}}>{contribution.user.substring(0, 2).toUpperCase()}</div>
                                        <div className={'text-sm font-medium'}>{contribution.user}</div>
                                    </div>
                                </div>
                                <hr/>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
export default PersonalSectionPrimary