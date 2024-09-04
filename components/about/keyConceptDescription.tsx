import React from 'react';
import {useSelector} from "react-redux";
import {selectDemoKeyConcept} from "@/store/slices/appearanceSlice";

const KeyConceptDescription = () => {
    const demoKeyConcept = useSelector(selectDemoKeyConcept)

    const descriptions = {
        timeline: 'Timeline is the sum of events with its own title, description, content and image.',
        event: 'Event comprises the timeline. Each of the event has its own date, title, description, content and image. Clicking the event box leads to the detail.',
        information: 'Clicking the information box leads to the detail about the timeline. Bigger image and full content are displayed.',
        edit: 'In the wiki, anybody can edit anything about the timeline except the title. When you click information or event box, edit button is right there for you.',
        contributors: 'Anybody who contributes to the wiki becomes a contributor of that timeline.',
        keynote: 'Keynote is the sum of important events. In event edit mode, you can include in or exclude from the keynote. You can filter out keynote events with keynote toggle.',
        private: 'You can make your timeline private, public or both. For private timeline, private flag is shown after the title of the timeline, publish button is included, contributors button is altered by owner button.',
    }

    return (
            <div className={'p-4 w-full bg-[#F2F2F259] border-[1px] border-gray-300 rounded-2xl font-medium'}>
                &#x1F4A1; {descriptions[demoKeyConcept]}
            </div>
    );
};

export default KeyConceptDescription;
