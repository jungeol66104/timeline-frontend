import Share from "@/components/layout/modals/shareModal/share";
import Overlay from "@/components/layout/modals/overlay";
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
