import React from 'react';
import {useSelector} from "react-redux";
import {selectCurrentSeries} from "@/store/slices/contentsSlice";
import {selectIsBottomEnd} from "@/store/slices/appearanceSlice";

const SeriesBottom = () => {
    const currentSeries = useSelector(selectCurrentSeries)
    const isBottomEnd = useSelector(selectIsBottomEnd)

    return (
        <div className={'w-full mt-2.5 h-[60px] shrink-0 flex justify-center items-center'}>
            {isBottomEnd
                ?   <div className={'text-sm text-center italic pb-[10px]'}>
                        End of the Series<br/>
                        <b>{currentSeries.name}</b>
                    </div>
                :   <></>
            }
        </div>
    );
};

export default SeriesBottom;
