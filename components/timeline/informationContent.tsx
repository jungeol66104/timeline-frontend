import React, {useLayoutEffect, useState} from 'react';
import InformationContentImage from "@/components/timeline/informationContentImage";
import Link from "next/link";
import {useSelector} from "react-redux";
import {selectCurrentTimeline} from "@/store/slices/contentsSlice";
import {getIsBaseImage, ratioToImageSizeType} from "@/utils/global";

const InformationContent = () => {
    const currentTimeline = useSelector(selectCurrentTimeline)
    const [imageSizeType, setImageSizeType] = useState('initial')

    useLayoutEffect(() => {
        ratioToImageSizeType(currentTimeline.image, (ratio) => {setImageSizeType(ratio)})
    }, [currentTimeline.image])

    return (
        <div className={'mt-2.5'}>
            <InformationContentImage timeline={currentTimeline} imageSizeType={imageSizeType}/>
            <div className={'h-[120px]'}>
                <p className={`text-sm line-clamp-5`}>
                    Muhammad bin Salman, born in 1985, is a prominent Saudi Arabian royal and politician, known for his ambitious reform agenda and his role as Crown Prince since 2017.
                    He has spearheaded the Vision 2030 program aimed at diversifying the Saudi economy and modernizing society.
                    While praised for his efforts, he has also faced criticism for alleged human rights abuses and his involvement in controversial incidents, such as the murder of journalist Jamal Khashoggi in 2018.
                    Nonetheless, he remains a significant figure both domestically and internationally, shaping Saudi Arabia&apos;s future trajectory and its relations with the global community.
                </p>
                <Link className={'text-sm text-blue-700 hover:underline'} href={`/information/${currentTimeline.id}`}>Show more</Link>
            </div>
        </div>
    )
}

export default InformationContent;
