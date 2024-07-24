import ContributorsDropdown from "@/components/common/contributorsDropdown";
import ModalContentTypeButton from "@/components/modal/modalContentTypeButton";
import {useSelector} from "react-redux";
import {selectModalContentType, selectModalType, selectTimelineContentType} from "@/store/slices/appearanceSlice";
import UsernameButton from "@/components/common/usernameButton";

const ModalMenubar = () => {
    const timelineContentType = useSelector(selectTimelineContentType);
    const modalContentType = useSelector(selectModalContentType)

    return (
        <div className={'mt-3 w-full flex justify-between z-10'}>
            <div className={'w-full flex gap-3'}>
                {modalContentType === 'new' || timelineContentType === 'new'
                    ?   <UsernameButton />
                    :   <ContributorsDropdown/>
                }
            </div>
            {modalContentType !== 'new' && <ModalContentTypeButton/>}
        </div>
    );
};

export default ModalMenubar;
