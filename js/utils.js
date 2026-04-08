// utils.js
export function extractYouTubeId(url) {
    const regex = /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

export function renderMediaElement(media_type, url, hdurl, title) {
    let mediaElement = "";


    if(media_type === "image") {
        mediaElement = `<img src="${hdurl}" class="spaceImage" alt="${title}" />`;

    } else if(media_type === "video") {
        const videoId = extractYouTubeId(url);

        if(videoId) {

            if (!videoId) {
                mediaElement = `<p>Errore: impossibile caricare il video</p>`;
            } else {
                const embedUrl = `https://www.youtube.com/embed/${videoId}`;
                mediaElement = `<iframe class="spaceVideo" title="${title}" src="${embedUrl}" width="800px" height="500px"></iframe>`;
            }

        } else {
            mediaElement = `
                <video controls width="100%">
                    <source src="${url}" type="video/mp4" />
                </video>
            `;
        }
    }

    return mediaElement;
}