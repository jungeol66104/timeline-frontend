import React, {useLayoutEffect} from 'react';
import {useRouter} from "next/router";
import {getTags} from "@/utils/global";
import TagButton from "@/components/layout/tagButton";

const TagBar = () => {
    const router = useRouter()
    const isIndex = router.pathname === '/'

    useLayoutEffect(() => {
        const hasQueryParams = Object.keys(router.query).length > 0;
        const tagBar: HTMLDivElement | null = typeof window !== 'undefined' ? document.querySelector('.tagBar') : null
        if (!tagBar || hasQueryParams) return

        tagBar.scrollLeft = 226.14
    });

    return (
        <div className={`tagBar fixed flex pt-2 pb-1.5 h-fit w-full border-b-[1px] bg-white z-[4999] ${!isIndex && 'hidden'} overflow-x-auto`}>
            <div className={'tagWrapper shrink-0 flex gap-2 px-4'}>
                {getTags().map((tag, i) => {
                    return (
                        <TagButton key={i} tagNum={i+1} />
                    )
                })}
            </div>
        </div>
    );
};


export default TagBar;
