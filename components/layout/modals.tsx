import Share from "@/components/modal/shareModal/share";
import Overlay from "@/components/layout/overlay";
import InformationModal from "@/components/modal/informationModal/informationModal";
import EventModal from "@/components/modal/eventModal/eventModal";

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
