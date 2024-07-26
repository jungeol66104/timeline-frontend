import React from 'react';
import CompareButton from "@/components/modal/eventModal/eventHistory/compareButton";
import RevertButton from "@/components/common/contribution/revertButton";
import {useSelector} from "react-redux";
import {selectModalHistoryType} from "@/store/slices/appearanceSlice";
import EventHistoryList from "@/components/modal/eventModal/eventHistory/eventHistoryList";
import EventHistoryView from "@/components/modal/eventModal/eventHistory/eventHistoryView";
import EventHistoryDiff from "@/components/modal/eventModal/eventHistory/eventHistoryDiff";

const EventHistory = () => {
    const historyType = useSelector(selectModalHistoryType)

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
