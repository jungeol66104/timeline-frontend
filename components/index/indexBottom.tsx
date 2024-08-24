import React from 'react';
import {useSelector} from "react-redux";
import {selectIsBottomEnd, selectCurrentTagNum} from "@/store/slices/appearanceSlice";
import {getCurrentTag} from "@/utils/global";

const IndexBottom = () => {
    const tagNum = useSelector(selectCurrentTagNum)
    const currentTopic = getCurrentTag(tagNum) || ''
    const isBottomEnd = useSelector(selectIsBottomEnd)

    return (
        <div className={'seriesBottom w-full mt-2.5 h-[60px] shrink-0 flex justify-center items-center'}>
            {isBottomEnd
                ?   <div className={'text-sm text-center italic pb-[10px]'}>
                        End of the Topic<br/>
                        <b>{currentTopic.charAt(0).toUpperCase() + currentTopic.slice(1)}</b>
                    </div>
                :   <></>
            }
        </div>
    );
};

export default IndexBottom;
