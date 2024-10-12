import ModalOverlay from "@/components/layout/modalOverlay";
import InformationModal from "@/components/modals/informationModal/informationModal";
import EventModal from "@/components/modals/eventModal/eventModal";
import BannerModal from "@/components/layout/bannerModal";

const Modals = () => {
    return (
        <>
            <ModalOverlay />
            <InformationModal />
            <EventModal />
            <BannerModal />
        </>
    )
}
export default Modals;
