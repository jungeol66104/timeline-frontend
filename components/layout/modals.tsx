import Share from "@/components/modals/shareModal/share";
import ModalOverlay from "@/components/layout/modalOverlay";
import InformationModal from "@/components/modals/timelineModal/informationModal";
import EventModal from "@/components/modals/eventModal/eventModal";

const Modals = () => {

    return (
        <>
            <ModalOverlay />
            <Share />
            <InformationModal />
            <EventModal />
        </>
    )
}
export default Modals;
