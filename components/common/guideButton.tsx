import React from 'react';
import Popup from "@/components/layout/popup";
import {useDispatch, useSelector} from "react-redux";
import {selectIsPopup, updateIsPopup} from "@/store/slices/appearanceSlice";

const GuideButton = ({type}: {type: string}) => {
    const dispatch = useDispatch()
    const isPopup = useSelector(selectIsPopup)

    return (
        <>
            <button onClick={() => dispatch(updateIsPopup(true))} className={'flex items-center gap-1 text-blue-700'}>
                <div className={'material-symbols-outlined text-[12px]'}>&#xe887;</div>
                <span className={'mt-[1px] text-[10px]'}>Guide</span>
            </button>
            {!isPopup &&
                <Popup title={'Guide'}>
                    <div className={'flex flex-col gap-5 font-medium'}>
                        <h1 className={'text-2xl font-bold'}>Date Format</h1>
                        <p>
                            Only YYYY-MM-DD HH:MM:SS BCE format is accepted in Timeline.
                        </p>
                        <p>
                            YYYY refers to years except 0.
                            MM refers to months from 1 to 12.
                            DD refers to dates from 1 to 31.
                            HH refers to hours from 0 to 23.
                            MM and SS refers to minutes and seconds from 0 to 59.
                            BCE is optional.
                        </p>
                        <p>
                            Table below shows some examples of allowed formats.
                        </p>
                        <div className="overflow-hidden text-sm font-normal border-[1px] border-gray-300 rounded-2xl bg-white">
                            <table className="w-full border-collapse rounded-2xl">
                                <thead className={'rounded-2xl'}>
                                    <tr className="bg-gray-100 rounded-t-2xl">
                                        <th className="py-2 border-b-[1px] border-r-[1px] border-gray-300">Example</th>
                                        <th className="py-2 border-b-[1px] border-gray-300">Acceptability</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="py-2 px-4 border-b-[1px] border-r-[1px] border-gray-300">583-06-23 23:15:00 BCE</td>
                                        <td className="py-2 px-4 text-center border-b-[1px] border-gray-300">Accepted</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2 px-4 border-b-[1px] border-r-[1px] border-gray-300">583-06-23 23:15</td>
                                        <td className="py-2 px-4 text-center border-b-[1px] border-gray-300">Accepted</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2 px-4 border-b-[1px] border-r-[1px] border-gray-300">583-06-23 23</td>
                                        <td className="py-2 px-4 text-center border-b-[1px] border-gray-300">Accepted</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2 px-4 border-b-[1px] border-r-[1px] border-gray-300">583-06-23 BCE</td>
                                        <td className="py-2 px-4 text-center border-b-[1px] border-gray-300">Accepted</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2 px-4 border-b-[1px] border-r-[1px] border-gray-300">583-06</td>
                                        <td className="py-2 px-4 text-center border-b-[1px] border-gray-300">Accepted</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2 px-4 border-b-[1px] border-r-[1px] border-gray-300">583</td>
                                        <td className="py-2 px-4 text-center border-b-[1px] border-gray-300">Accepted</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2 px-4 border-r-[1px] border-gray-300">583-06 23:15:00</td>
                                        <td className="py-2 px-4 text-center">Not Accepted</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </Popup>
            }
        </>
    );
};

export default GuideButton;
