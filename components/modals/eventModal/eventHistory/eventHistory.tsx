import React from 'react';
import CompareButton from "@/components/modals/compareButton";
import RevertButton from "@/components/common/contributions/revertButton";
import {useSelector} from "react-redux";
import {selectEventHistoryType} from "@/store/slices/appearanceSlice";
import EventHistoryList from "@/components/modals/eventModal/eventHistory/eventHistoryList";
import EventHistoryView from "@/components/modals/eventModal/eventHistory/eventHistoryView";
import EventHistoryDiff from "@/components/modals/eventModal/eventHistory/eventHistoryDiff";

const EventHistory = () => {
    const eventHistoryType = useSelector(selectEventHistoryType)

    return (
        <div className={'flex flex-col'}>
            {eventHistoryType === 'list'
                ?   <EventHistoryList />
                : eventHistoryType === 'view'
                    ?   <EventHistoryView />
                    :   <EventHistoryDiff />
            }
        </div>
    );
};

export default EventHistory;
