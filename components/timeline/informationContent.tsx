import React from 'react';
import InformationContentImage from "@/components/timeline/informationContentImage";
import Link from "next/link";
import {useSelector} from "react-redux";
import {selectCurrentTimeline} from "@/store/slices/contentsSlice";

const InformationContent = () => {
    const currentTimeline = useSelector(selectCurrentTimeline)

    return (
        <div className={'mt-2.5'}>
            <InformationContentImage timeline={currentTimeline}/>
            <div className={'h-[120px]'}>
                <p className={`text-sm line-clamp-5`}>
                    Muhammad Ali, born Cassius Marcellus Clay Jr., was a legendary heavyweight boxer and activist. Renowned for his boxing skills and charismatic personality, he won numerous titles and awards. Ali&apos;s refusal to be drafted into the military during the Vietnam War and his advocacy for civil rights made him an iconic figure in history.
                </p>
                <Link className={'text-sm text-blue-700 hover:underline'} href={`/information/${currentTimeline.id}`}>Show more</Link>
            </div>
        </div>
    )
}

export default InformationContent;
