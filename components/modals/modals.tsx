import Share from "@/components/modals/shareModal/share";
import Overlay from "@/components/modals/overlay";
import TimelineModal from "@/components/modals/timelineModal/timelineModal";
import EventModal from "@/components/modals/eventModal/eventModal";

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
