import React from 'react';
import CompareButton from "@/components/common/compareButton";
import RevertButton from "@/components/common/contribution/revertButton";
import {useSelector} from "react-redux";
import {selectModalHistoryType} from "@/store/slices/appearanceSlice";
import EventHistoryList from "@/components/modals/eventModal/eventHistory/eventHistoryList";
import EventHistoryView from "@/components/modals/eventModal/eventHistory/eventHistoryView";
import EventHistoryDiff from "@/components/modals/eventModal/eventHistory/eventHistoryDiff";

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
