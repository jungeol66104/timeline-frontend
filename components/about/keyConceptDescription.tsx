import React from 'react';
import {useSelector} from "react-redux";
import {selectDemoKeyConcept} from "@/store/slices/appearanceSlice";

const KeyConceptDescription = () => {
    const demoKeyConcept = useSelector(selectDemoKeyConcept)

    const descriptions = {
        timeline: 'Timeline is the sum of events. But it also has its own title, description, content and image.',
        event: 'Event is an element that comprises the timeline. It includes date, title, description, content and image. It is possible to edit events independent of the timeline.',
        showMore: 'Show more button leads to detailed information about the timeline. Bigger image and full content are displayed. You can only edit the content of the timeline after clicking show more.',
        edit: 'Edit button simply switches the timeline to edit mode. In the wiki, anybody can change anything about the timeline except the title. This applies the same to the event.',
        contributors: 'Anybody who contributes to the wiki becomes a contributor of that timeline.',
        keynote: 'Keynote is the sum of important events. In edit mode, there is a keynote checkbox on each event. If checked, it shows up when you filter keynote events only.',
        private: 'You can make your timeline private, public or both. For private timeline, private flag is shown after the title of the timeline, publish button is included, contributors button is altered by owner button.',
    }

    return (
            <div className={'p-4 w-full bg-[#F2F2F259] border-[1px] border-gray-300 rounded-2xl font-medium'}>
                &#x1F4A1; {descriptions[demoKeyConcept]}
            </div>
    );
};

export default KeyConceptDescription;
