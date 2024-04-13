import React, {useEffect} from 'react';
import {selectAllTimelinesType, updateAllTimelinesType} from "@/store/slices/appearanceSlice";
import {useDispatch, useSelector} from "react-redux";
import {TimelineEvent, updateCurrentTimelines} from "@/store/slices/contentsSlice";
import api from "@/utils/api";

const AllTimelinesTypeButtons = () => {
    const dispatch = useDispatch()
    const allTimelinesType = useSelector(selectAllTimelinesType)

    useEffect(() => {
        const typeButtons: NodeListOf<HTMLButtonElement> | null = typeof window !== 'undefined' ? document.querySelectorAll('.typeButton') : null
        if (!typeButtons) return

        const fetchTimelines = async (type: string) => {
            const typeNum = type === 'recent' ? 0 : 1
            try {
                const response = await api.get(`/timeline/all?searchType=${typeNum}&pageNum=1&pageSize=20`, {headers: {lang: 'en'}})
                return response.data.data.events as TimelineEvent[]
            } catch (error) {
                console.error('Error fetching data in useEffect: ', error)
                return []
            }
        }
        const handleClick = async (e: MouseEvent) => {
            const typeButton = e.currentTarget as HTMLButtonElement
            const classNames = typeButton.classList
            if (classNames.contains('recent')) {
                fetchTimelines('recent').then((fetchedTimelines) => {
                    dispatch(updateCurrentTimelines(fetchedTimelines))
                    dispatch(updateAllTimelinesType('recent'))
                })
            } else {
                fetchTimelines('popular').then((fetchedTimelines) => {
                    dispatch(updateCurrentTimelines(fetchedTimelines))
                    dispatch(updateAllTimelinesType('popular'))
                })
            }
        }
        typeButtons?.forEach(typeButton => typeButton.addEventListener('click', handleClick))
        return () => {
            typeButtons?.forEach(typeButton => typeButton.removeEventListener('click', handleClick))
        }
    });

    return (
        <div className={'flex gap-2.5 w-full'}>
            <button className={`typeButton recent h-8 px-3 border-[1px] ${allTimelinesType === 'recent' ? 'border-black' : 'border-gray-200 hover:bg-gray-100'} text-sm rounded-3xl font-semibold max-[525px]:h-6 max-[525px]:px-2 max-[525px]:text-xs`}>Recently Added</button>
            <button className={`typeButton popular h-8 px-3 border-[1px] ${allTimelinesType === 'popular' ? 'border-black' : 'border-gray-200 hover:bg-gray-100'} text-sm rounded-3xl font-semibold max-[525px]:h-6 max-[525px]:px-2 max-[525px]:text-xs`}>Popular</button>
        </div>
    );
};

export default AllTimelinesTypeButtons;
