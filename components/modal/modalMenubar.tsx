import ContributorsButton from "@/components/common/contributorsButton";
import ModalContentTypeButton from "@/components/modal/modalContentTypeButton";
import {useSelector} from "react-redux";
import {selectModalType} from "@/store/slices/appearanceSlice";
import ConnectedTimelinesButton from "@/components/modal/eventModal/ConnectedTimelinesButton";

const ModalMenubar = () => {
    const modalType = useSelector(selectModalType)

    return (
        <div className={'mt-3 w-full flex justify-between z-10'}>
            <div className={'w-full flex gap-3'}>
                <ContributorsButton/>
                {modalType === 'event' && <ConnectedTimelinesButton />}
            </div>
            <ModalContentTypeButton/>
        </div>
    );
};

export default ModalMenubar;
