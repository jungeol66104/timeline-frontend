import {useDispatch, useSelector} from "react-redux";
import {selectDemoKeyConcept, selectTimelineType, updateEventContentType, updateModalType} from "@/store/slices/appearanceSlice";
import {selectCurrentEvents, updateCurrentEvent, updateCurrentEventDraft} from "@/store/slices/contentsSlice";
import {getSession, getTodayDate} from "@/utils/global";
import {selectSession, updateSession} from "@/store/slices/privateSlice";

const AddEventButton = () => {
    const dispatch = useDispatch()
    const session = useSelector(selectSession)
    const timelineType = useSelector(selectTimelineType)
    const demoKeyConcept = useSelector(selectDemoKeyConcept)
    const currentEvents = useSelector(selectCurrentEvents)

    const isSession = Object.keys(session).length !== 0

    const handleClick = () => {
        const getNewId = () => {
            const negativeIds = currentEvents.map(event => event.id).filter(id => id < 0)
            const mostNegativeId = Math.min(...negativeIds)
            return mostNegativeId === Infinity ? -1 : mostNegativeId - 1
        }
        let newEvent = {id: getNewId(), title: '', content: '', date: '', ephemerisTime: 0, isKeynote: 1, timelineInfo: [], createdDt: getTodayDate(), imagePath: "base-image.png", cdnUrl: "https://cdn.timeline.vg/", contributors: {counts: 1, userId: 0, username: 'you', imagePath: "base-image.png", cdnUrl: "https://cdn.timeline.vg/"}}

        if (isSession) {
            dispatch(updateCurrentEvent(newEvent))
            dispatch(updateCurrentEventDraft(newEvent))
            dispatch(updateModalType('event'))
            dispatch(updateEventContentType('new'))
        } else {
            window.open(`/api/user/signin`, 'google-login-popup', `width=488, height=${window.screen.height}, top=0, left=${window.screen.width/2 - 244}, scrollbars=yes`);

            window.addEventListener('message', (event) => {
                if (event.origin !== window.location.origin) return;
                if (event.data.type === 'SIGNIN_SUCCESS') {
                    getSession().then((session) => {
                        dispatch(updateSession(session));
                        dispatch(updateCurrentEvent(newEvent))
                        dispatch(updateCurrentEventDraft(newEvent))
                        dispatch(updateModalType('event'))
                        dispatch(updateEventContentType('new'))
                    })
                }
            });
        }
    }

    return (
        <button onClick={handleClick} className={`pl-1.5 pr-2.5 flex items-center justify-center gap-1.5 h-[36px] border-[0.1px] border-gray-300 bg-white hover:bg-gray-100 drop-shadow-sm rounded-md ${timelineType === 'demo' && demoKeyConcept === 'edit' && 'outline outline-2 outline-blue-700'}`}>
            <div className={'material-symbols-outlined text-[20px]'}>&#xe145;</div>
            <div className={'text-sm font-semibold'}>Add Event</div>
        </button>
    )
}

export default AddEventButton;
