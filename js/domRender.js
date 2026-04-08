// Tutto il rendering DOM

import {fetchApodData} from './apiService.js';
import { extractYouTubeId } from './utils.js';
import {renderMediaElement} from './utils.js';


export async function renderSingleView(appDiv, params) {
    appDiv.innerHTML = "<h2>Caricamento in corso...</h2>";
    try {
        const data = await fetchApodData(params);
        if (!data) return;
        const {date, explanation, hdurl, media_type, title, url} = data;
        
        let mediaElement = renderMediaElement(media_type, url, hdurl, title);

        

        appDiv.innerHTML = `
            <div class="dailyImage">
            
                <div class="media-frame">
                    <div class="corner-top-left"></div>
                    <div class="corner-top-right"></div>
                    
                    ${mediaElement}
                    
                    <div class="scanline"></div>
                    <div class="corner-bottom-left"></div>
                    <div class="corner-bottom-right"></div>
                </div>
                
                <div class="language-selector">
                    <button id="btn-it" class="lang-btn active">EN</button>
                    <button id="btn-en" class="lang-btn">IT</button>
                </div>

                <div class="description-box">
                    <div class="text-header">
                        <span class="decor-line"></span>
                        <h2 class="apod-title">${title}</h2>
                    </div>
                    <div class="text-body">
                        <p class="apod-explanation">${explanation}</p>
                    </div>
                    <div class="text-footer">
                        <span class="corner-bracket-bl"></span>
                        <span class="corner-bracket-br"></span>
                    </div>
                </div>
            </div>
        `;
        // --- LOGICA DI CAMBIO LINGUA ---
        const titleEl = appDiv.querySelector('.apod-title');
        const descEl = appDiv.querySelector('.apod-explanation');
        const btnIt = appDiv.querySelector('#btn-it');
        const btnEn = appDiv.querySelector('#btn-en');

        const updateText = (lang) => {
            // Se la traduzione esiste usiamo quella, altrimenti torniamo all'originale
            const content = data.translations ? data.translations[lang] : { title: data.title, explanation: data.explanation };
            console.log(content)
            titleEl.innerText = content.title;
            descEl.innerText = content.explanation;

            // Gestione estetica tasti (opzionale)
            btnIt.classList.toggle('active', lang === 'it');
            btnEn.classList.toggle('active', lang === 'en');
        };

        btnIt.onclick = () => updateText('it');
        btnEn.onclick = () => updateText('en');

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