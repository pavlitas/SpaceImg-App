// Tutto il rendering DOM

import {fetchApodData} from './apiService.js';
import { extractYouTubeId } from './utils.js';


export async function renderSingleView(appDiv, params) {
    appDiv.innerHTML = "<h2>Caricamento in corso...</h2>";
    try {
        const data = await fetchApodData(params);
        if (!data) return;
        const {date, explanation, hdurl, media_type, title, url} = data;
        

        let html = "";
        let mediaElement = "";

        if(media_type === "image") {
            mediaElement = `<img src="${hdurl}" class="spaceImage" alt="${title}" />`;

        } else if(media_type === "video") {
            mediaElement = `
                <video controls width="100%">
                    <source src="${url}" type="video/mp4" />
                </video>
            `;

            /*
            const videoId = extractYouTubeId(url);

            if (!videoId) {
                mediaElement = `<p>Errore: impossibile caricare il video</p>`;
            } else {
                const embedUrl = `https://www.youtube.com/embed/${videoId}`;
                mediaElement = `<iframe class="spaceVideo" title="${title}" src="${embedUrl}" width="800px" height="500px"></iframe>`;
            }
            */
        }

        html = `
                <div class="dailyImage">
                    ${mediaElement}
                    <h2>${title}</h2>
                    <p>${explanation}</p>
                </div>
        `;

        appDiv.innerHTML = html;
    } catch(error) {
        appDiv.innerHTML = `<p>Errore: impossibile caricare i dati (${error.message})</p>`;

    }
}

export async function renderGalleryView(appDiv, params) {
    appDiv.innerHTML = "<h2>Caricamento in corso...</h2>";

    try {
        const data = await fetchApodData(params);
        if (!data) return;
        
        let html = ``;
        let mediaElement = "";

        html = `<h2>Marzo</h2><div class="gallery">`;
        for(let d of data) {
            const {date, explanation, hdurl, media_type, title, url} = d;
            console.log(url)

            if(media_type === "image") {
                mediaElement = `<img src="${hdurl}" class="spaceImage" alt="${title}" />`;

            } else if(media_type === "video") {
                mediaElement = `
                    <video controls width="100%">
                        <source src="${url}" type="video/mp4" />
                    </video>
                `;
            }
            
            
            html += `<div class="spaceImg">
                        ${mediaElement}
                        <h2>${title}</h2>
                        <p>${date}</p>
                        <p>${explanation}</p>
                    </div>
            `;
        }
        html += `</div>`;

        appDiv.innerHTML = html;

    }catch(error) {
        appDiv.innerHTML = `<p>Errore: impossibile caricare i dati (${error.message})</p>`;
    }
}