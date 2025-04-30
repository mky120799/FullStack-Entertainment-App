// from installed packages
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';

// importing media components 
import MediaImage from './MediaImage';
import MediaBookmark from './MediaBookmark';
import MediaBookmarked from './MediaBookmarked';
import MediaInfo from './MediaInfo';
import MediaPlay from './MediaPlay';

// context & base url 
import MyContext from '../../context/MyContext';
import baseUrl from '../../utils/baseUrl';

// media components 
function Media({ mediaData = [] }) {
    const { isAuthenticated, setToast, setToastMessage } = useContext(MyContext);
    const [isHovered, setIsHovered] = useState(null);
    const [bookmarkedIds, setBookmarkedIds] = useState([]);
    const [bookmarkStatus, setBookmarkStatus] = useState(null);

    // Fetching bookmark data
    useEffect(() => {
        if (isAuthenticated) {
            const fetchData = async () => {
                try {
                    const { data } = await axios.get(`${baseUrl}/media/bookmark/get`, {
                        headers: { "Content-Type": "application/json" },
                        withCredentials: true,
                    });
                    setBookmarkedIds(data.data.map((bookmark) => bookmark.id));
                } catch (error) {
                    console.error("Error fetching bookmark data:", error);
                }
            };
            fetchData();
        }
    }, [bookmarkStatus, isAuthenticated]);

    // Deleting bookmark
    const deleteBookmark = async (id) => {
        try {
            await axios.delete(`${baseUrl}/media/bookmark/delete/${id}`, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });
            setBookmarkStatus(id);
            setToast(true);
            setToastMessage("Bookmark Deleted Successfully");
        } catch (error) {
            console.error("Error in deleteBookmark:", error);
            setToast(true);
            setToastMessage("Error Happened");
        }
    };

    // Adding bookmark
    const postData = async (singleMediaData) => {
        if (isAuthenticated) {
            try {
                const { id, title, image, isAdult, mediaType, releaseDate } = singleMediaData;
                await axios.post(`${baseUrl}/media/bookmark/add`, {
                    id, title, image, isAdult, mediaType, releaseDate,
                }, {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                });
                setBookmarkStatus(id);
                setToast(true);
                setToastMessage("Bookmark added Successfully");
            } catch (error) {
                console.error("Error in postData:", error);
                setToast(true);
                setToastMessage("Error Happened");
            }
        } else {
            setToast(true);
            setToastMessage("No Account Found");
        }
    };

    // Render fallback if no media data
    if (!mediaData || mediaData.length === 0) {
        return <div>No media available</div>;
    }

    // Render media
    return (
        <>
            {mediaData.map((singleMediaData) => (
                <div key={singleMediaData.id} className="flex flex-col gap-2">
                    <div
                        className="relative"
                        onMouseEnter={() => setIsHovered(singleMediaData.id)}
                        onMouseLeave={() => setIsHovered(null)}
                    >
                        <MediaImage singleMediaData={singleMediaData} mediaType={"Movie"} />
                        {bookmarkedIds.includes(singleMediaData.id) ? (
                            <MediaBookmarked onClick={() => deleteBookmark(singleMediaData.id)} />
                        ) : (
                            <MediaBookmark onClick={() => postData(singleMediaData)} />
                        )}
                        {isHovered === singleMediaData.id && (
                            <MediaPlay singleMediaData={singleMediaData} />
                        )}
                    </div>
                    <MediaInfo singleMediaData={singleMediaData} />
                </div>
            ))}
        </>
    );
}

export default Media;