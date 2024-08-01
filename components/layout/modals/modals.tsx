import {useSelector} from "react-redux";
import Share from "@/components/layout/modals/shareModal/share";
import Overlay from "@/components/layout/modals/overlay";
import TimelineModal from "@/components/modal/timelineModal/timelineModal";
import EventModal from "@/components/modal/eventModal/eventModal";
import {selectModalType} from "@/store/slices/appearanceSlice";
import CenterModal from "@/components/layout/modals/centerModal";

const Modals = () => {
    const modalType = useSelector(selectModalType)

    return (
        <>
            <Overlay />
            <Share />
            <TimelineModal />
            <EventModal />
            {/*{modalType === 'center' && <CenterModal title={''} />}*/}
        </>
    )
}
export default Modals;
