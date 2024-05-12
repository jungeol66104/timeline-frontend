import React from 'react';
import Link from "next/link";
import Image from "next/image";
import {getIsBaseImage, mapStrToNum} from "@/utils/global";

const onThisDayEventList = () => {
    const events = [
        {id: 368, name: 'German Car Sales and General Motors\' European Plants', date: '2009-05-05', timeline: {id: 6, name: 'Global Financial Crisis', description:'Worldwide economic collapse of 2008', image: 'https://cdn.timeline.vg/d37898c806a5b3c81f56.jpeg'}},
        {id: 497, name: 'Freddie Mac Reports Net Loss and Requests Treasury Funds', date: '2010-05-05', timeline: {id: 6, name: 'Global Financial Crisis', description:'Worldwide economic collapse of 2008', image: 'https://cdn.timeline.vg/d37898c806a5b3c81f56.jpeg'}},
        {id: 650, name: 'Student protests in Indonesia', date: '1998-05-05', timeline: {id: 8, name: 'Asian Financial Crisis', description:'Financial crisis in East and Southeast Asia', image: 'https://cdn.timeline.vg/fef09d7c6ed3e3806eec.jpeg'}},
        {id: 1123, name: 'Great Collar of the Order of the Quetzal from Guatemala', date: '2022-05-05', timeline: {id: 15, name: 'Andrés Manuel López Obrador', description:'Mexican politician and current president of Mexico', image: 'https://cdn.timeline.vg/base-image.png'}},
        {id: 2347, name: 'Joint interview by international media', date: '2017-05-05', timeline: {id: 63, name: 'Tsai Ing-wen', description:'Taiwanese politician and president since 2016', image: 'https://cdn.timeline.vg/base-image.png'}},
    ]

    return (
        <div className={'relative mb-3'}>
            <h3 className={'text-[20px] font-bold py-3'}>On This Day</h3>
            {events.map((event, i) => {
                const isBaseImage = getIsBaseImage(event.timeline.image)
                return (
                    <div key={i} className={'relative flex flex-col py-2'}>
                        <div>
                            <div className={'font-medium'}>{event.name}</div>
                            <div className={'pt-1 flex gap-2.5 items-center'}>
                                <div className={'text-sm text-gray-500'}>{event.date}</div>
                                <Link href={`/timelines/${event.timeline.id}`} className={'line-clamp-1 text-sm text-blue-700 hover:underline'}>{event.timeline.name}</Link>
                            </div>
                        </div>
                        {/*<Link key={i} href={`/timelines/${event.timeline.id}`} className={'h-[65px] w-fit max-w-[300px] bg-white shadow-md rounded-lg border-[1px] flex gap-2.5 items-center px-2.5'}>*/}
                        {/*    <div className={'relative shrink-0 w-[45px] h-[45px]'}>*/}
                        {/*        {isBaseImage*/}
                        {/*            ?   <>*/}
                        {/*                <div className={'relative w-full h-full rounded-md bg-gray-500 text-white flex items-center justify-center text-lg font-medium'}>*/}
                        {/*                    <span className={'absolute'}>{event.timeline.name.charAt(0).toUpperCase()}</span>*/}
                        {/*                    <Image src={`/images/base-image/base-image${mapStrToNum(event.timeline.name)}.jpg`} alt={'base-image'} width={45} height={45} priority={true} className={'rounded-md'} />*/}
                        {/*                </div>*/}
                        {/*            </>*/}
                        {/*            :   <Image src={event.timeline.image} alt={event.timeline.name} className={'rounded-md'} fill={true} priority={true} style={{objectFit: "cover", objectPosition: "top"}}/>*/}
                        {/*        }*/}
                        {/*    </div>*/}
                        {/*    <div>*/}
                        {/*        <div className={'font-semibold line-clamp-1 text-md'}>{event.timeline.name}</div>*/}
                        {/*        <div className={'text-sm line-clamp-1 opacity-90'} style={{}}>{event.timeline.description}</div>*/}
                        {/*    </div>*/}
                        {/*</Link>*/}
                    </div>
                )
            })}
        </div>
    );
};

export default onThisDayEventList;
