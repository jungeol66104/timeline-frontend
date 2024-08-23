import Share from "@/components/modals/shareModal/share";
import Overlay from "@/components/layout/overlay";
import InformationModal from "@/components/modals/timelineModal/informationModal";
import EventModal from "@/components/modals/eventModal/eventModal";

const Modals = () => {

    return (
        <>
            <Overlay />
            <Share />
            <InformationModal />
            <EventModal />
        </>
    )
}
export default Modals;
