import React from 'react';
import Loading from '../CssComponents/Loading';
import { useQuery } from '@tanstack/react-query';
import FallbackMedia from '../FallbackComponents/FallbackMedia';
import Media from '../MediaComponents/Media';
import fetchMultiMedia from '../../utils/fetchMultiMedia';

function MediaTrending() {
    const dataForTrending = useQuery({
        queryKey: [1, 'trending'],
        queryFn: () => fetchMultiMedia(1, "trending")
    });
    console.log("Data for trending:", dataForTrending);
    const { data: mediaData, isLoading, isError } = dataForTrending;
    console.log("Media data:", mediaData);
    // Debugging: Log states
    console.log("isLoading:", isLoading);
    console.log("isError:", isError);
    console.log("mediaData:", mediaData);

    // Render loading state
    if (isLoading) return <Loading/>

    // Render error state
    if (isError) {
        console.error("Error fetching data:", error);
        return <div>Error fetching data</div>;
    }

    // CSS styles
    const containerStyle = "p-4 mt-2 flex flex-col gap-6";
    const headingStyle = "text-2xl md:text-4xl font-bold";
    const wrapperStyle = "flex sm:grid grid-rows-1 grid-flow-col overflow-x-scroll gap-5 lg:gap-7 scrollbar-corner-transparent scrollbar scrollbar-thumb-cyan-500 scrollbar-track-transparent";

    return (
        <div className={containerStyle}>
            <h1 className={headingStyle}>Trending Movies & TV Shows</h1>
            <div
                className={wrapperStyle}
                style={{ gridAutoColumns: "minmax(230px, auto)" }}
            >
                <Media mediaData={mediaData} />
            </div>
        </div>
    );
}

export default MediaTrending;
