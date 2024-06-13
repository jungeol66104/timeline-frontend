import React from 'react';
import CompareButton from "@/components/modal/eventModal/compareButton";
import RevertButton from "@/components/modal/eventModal/revertButton";
import {useSelector} from "react-redux";
import {selectHistoryType} from "@/store/slices/appearanceSlice";
import EventHistoryList from "@/components/modal/eventModal/eventHistoryList";
import EventHistoryView from "@/components/modal/eventModal/eventHistoryView";
import EventHistoryDiff from "@/components/modal/eventModal/eventHistoryDiff";

const EventHistory = () => {
    const historyType = useSelector(selectHistoryType)

    return (
        <div className={'flex flex-col'}>
            {historyType === 'list'
                ?   <EventHistoryList />
                : historyType === 'view'
                    ?   <EventHistoryView />
                    :   <EventHistoryDiff />
            }
        </div>
    );
};

export default EventHistory;
