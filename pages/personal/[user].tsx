import React from 'react';

// export const getServerSideProps = storeWrapper.getServerSideProps((store) => async ({query}) => {
//     try {
//         const tagNum = Number(query.tagNum || 3)
//         const type = tagNum < 4 ? 'features' : 'tags'
//         const id = tagNum < 4 ? tagNum : tagNum - 3
//         const response = await api.get(`/timeline/${type}/${id}?pageNum=1&pageSize=20`, {headers: {lang: 'en'}})
//         const data = response.data.data
//         store.dispatch(updateCurrentTimelines(data.timelineList))
//         store.dispatch(updateTagNum(tagNum))
//         store.dispatch(updateCurrentPage(1))
//         store.dispatch(updateTotalPage(data.totalPage))
//         store.dispatch(updateIsBottomEnd(data.totalPage === 1))
//         return {props: {}}
//     } catch (error) {
//         console.error('Error fetching initial data during SSR: ', error);
//         return {props: {}}
//     }
// })

const ProfilePage = () => {
    return (
        <div>
            profile
        </div>
    );
};

export default ProfilePage;
