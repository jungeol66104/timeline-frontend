import Share from "@/components/layout/modals/shareModal/share";
import Overlay from "@/components/layout/modals/overlay";
import TimelineModal from "@/components/modal/timelineModal/timelineModal";
import EventModal from "@/components/modal/eventModal/eventModal";

const Modals = () => {
    return (
        <>
            <Overlay />
            <Share />
            <TimelineModal />
            <EventModal />
        </>
    )
}
export default Modals;
