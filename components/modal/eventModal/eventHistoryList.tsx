import React from 'react';
import CompareButton from "@/components/modal/eventModal/compareButton";
import RevertButton from "@/components/modal/eventModal/revertButton";
import {useDispatch} from "react-redux";
import {updateHistoryType} from "@/store/slices/appearanceSlice";

const EventHistoryList = () => {
    const dispatch = useDispatch();
    const histories = [
        {order: 5, date: '2024-01-01', title:'Event Title', diff: '10', user: 'Nickname', comment: 'comment', type: 'Event'},
        {order: 4, date: '2024-01-01', title:'Event Title', diff: '10', user: 'Nickname', comment: 'comment', type: 'Event'},
        {order: 3, date: '2024-01-01', title:'Event Title', diff: '10', user: 'Nickname', comment: 'comment', type: 'Event'},
        {order: 2, date: '2024-01-01', title:'Event Title', diff: '10', user: 'Nickname', comment: 'comment', type: 'Event'},
        {order: 1, date: '2024-01-01', title:'Event Title', diff: '10', user: 'Nickname', comment: 'comment', type: 'Event'},
    ]

    const handleClick = () => {
        dispatch(updateHistoryType('view'))
    }

    return (
        <>
            <div className={'pb-3'}>
                <CompareButton/>
            </div>
            <hr/>
            <div className={'w-full'}>
                {histories.map((history, i) => {
                    return (
                        <div key={i} onClick={handleClick}>
                            <div className={'pt-3 pb-1.5 cursor-pointer'}>
                                <div className={'flex justify-between text-xs font-semibold'}>
                                    <div>{history.order} · <span className={`text-gray-500`}>{history.date}</span></div>
                                    <div className={'flex gap-1'}>
                                        <input className={'w-[14px]'} type={'radio'}/>
                                        <input className={'w-[14px]'} type={'radio'}/>
                                    </div>
                                </div>
                                <div className={'mt-1 text-sm'}><span className={'font-semibold'}>(+{history.diff})</span> {history.comment}</div>
                                <div className={'flex items-center justify-between'}>
                                    <div className={'py-1.5 flex items-center gap-1.5'}>
                                        <div className={'w-[26px] h-[26px] rounded-full flex items-center justify-center bg-gray-600 text-white text-xs border-[1px] border-white shrink-0'}
                                             style={{left: `${i * (26 - 7) + 10}px`}}>{history.user.substring(0, 2).toUpperCase()}</div>
                                        <div className={'text-sm font-medium'}>{history.user}</div>
                                    </div>
                                    <RevertButton/>
                                </div>
                            </div>
                            <hr/>
                        </div>
                    )
                })}
            </div>
        </>
    );
};

export default EventHistoryList;
