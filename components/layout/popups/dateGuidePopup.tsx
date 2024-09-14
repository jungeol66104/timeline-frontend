import React from 'react';
import Popup from "@/components/layout/popups/popup";

const DateGuidePopup = () => {
    return (
        <Popup title={'Guide'}>
            <div className={'flex flex-col gap-5 font-medium'}>
                <h1 className={'text-2xl font-bold'}>Date Format</h1>
                <p>
                    Table below shows some examples of accepted formats.
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
                <p>
                    Only <span className={'text-sm font-normal'}>YYYY-MM-DD HH:MM:SS BCE</span> format is accepted in Timeline.
                </p>
                <div className="overflow-hidden text-sm font-normal border-[1px] border-gray-300 rounded-2xl bg-white">
                    <table className="w-full border-collapse rounded-2xl">
                        <thead className={'rounded-2xl'}>
                        <tr className="bg-gray-100 rounded-t-2xl">
                            <th className="py-2 border-b-[1px] border-r-[1px] border-gray-300">Element</th>
                            <th className="py-2 border-b-[1px] border-gray-300">Description</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td className="py-2 px-4 border-b-[1px] border-r-[1px] border-gray-300">YYYY</td>
                            <td className="py-2 px-4 border-b-[1px] border-gray-300">Years. Any number except 0.</td>
                        </tr>
                        <tr>
                            <td className="py-2 px-4 border-b-[1px] border-r-[1px] border-gray-300">MM(Date)</td>
                            <td className="py-2 px-4 border-b-[1px] border-gray-300">Months. Any number from 1 to 12.</td>
                        </tr>
                        <tr>
                            <td className="py-2 px-4 border-b-[1px] border-r-[1px] border-gray-300">DD</td>
                            <td className="py-2 px-4 border-b-[1px] border-gray-300">Days. Any number from 1 to 31.</td>
                        </tr>
                        <tr>
                            <td className="py-2 px-4 border-b-[1px] border-r-[1px] border-gray-300">HH</td>
                            <td className="py-2 px-4 border-b-[1px] border-gray-300">Hours. Any number from 0 to 23. 0 to 11 for AM, 12 to 23 for PM.</td>
                        </tr>
                        <tr>
                            <td className="py-2 px-4 border-b-[1px] border-r-[1px] border-gray-300">MM(Time)</td>
                            <td className="py-2 px-4 border-b-[1px] border-gray-300">Minutes. Any number from 0 to 59.</td>
                        </tr>
                        <tr>
                            <td className="py-2 px-4 border-b-[1px] border-r-[1px] border-gray-300">SS</td>
                            <td className="py-2 px-4 border-b-[1px] border-gray-300">Seconds. Any number from 0 to 59.</td>
                        </tr>
                        <tr>
                            <td className="py-2 px-4 border-r-[1px] border-gray-300">BCE</td>
                            <td className="py-2 px-4">Era. Without BCE, the date is referred as CE automatically.</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </Popup>
    );
};

export default DateGuidePopup;
