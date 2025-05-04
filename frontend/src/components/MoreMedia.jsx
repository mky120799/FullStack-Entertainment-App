// importing from installed packages 
import React from "react";
import { useQuery } from '@tanstack/react-query';

import Media from "./MediaComponents/Media";
import fetchMultiMedia from "../utils/fetchMultiMedia";
import FallbackMedia from "./FallbackComponents/FallbackMedia";
import Loading from "./CssComponents/Loading";


function MoreMedia({ currentPage, mediaType }) {
    const dataForTrending = useQuery({
        queryKey: [currentPage, mediaType],
        queryFn: () => fetchMultiMedia(currentPage, mediaType)
    });
    console.log("Data for moreMedia", dataForTrending);
    const { data: mediaData, isLoading, isError } = dataForTrending;
    
    console.log("More Media data:", mediaData);
    console.log("isloading data", isLoading);
    console.log("isError of moreMedia",isError);
    
    {/* fetching media 
    const {
        data: mediaData,
        isLoading,
        isError,
    } = useQuery([currentPage, mediaType], () => fetchMultiMedia(currentPage, mediaType));

    render loading or error */}
    
    if (isLoading) return <Loading />;
    if (isError) return <FallbackMedia />;

    // css style 
    const wrapperStyle = "grid gap-10 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"

    // Render Movie media 
    return (
        <div className={wrapperStyle}>
            <Media mediaData={mediaData} />
        </div>
    );
}

export default MoreMedia