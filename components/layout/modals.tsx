import ModalOverlay from "@/components/layout/modalOverlay";
import InformationModal from "@/components/modals/timelineModal/informationModal";
import EventModal from "@/components/modals/eventModal/eventModal";

const Modals = () => {

    return (
        <>
            <ModalOverlay />
            <InformationModal />
            <EventModal />
        </>
    )
}
export default Modals;
