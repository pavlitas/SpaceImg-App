// Qui tutte le chiamate API
import { APOD_BASE_URL, NASA_API_KEY } from './config.js';

export async function fetchApodData(params = {}) {
    try {
        const { date, startDate, endDate } = params;

        let url = `${APOD_BASE_URL}?api_key=${NASA_API_KEY}`;

        if (date) url += `&date=${date}`;
        if (startDate) url += `&start_date=${startDate}`;
        if (endDate) url += `&end_date=${endDate}`;

        const response = await fetch(url);
        const apodData = await response.json();
        
        if(apodData) {
            let msg = [{message: apodData.title}, {message: apodData.explanation}];
            
            try {
                const response = await fetch('https://spaceimg-app-backend.onrender.com/translate', {
                    method: "POST", 
                    headers: { 'Content-Type': 'application/json' }, 
                    body: JSON.stringify(msg) 
                });

                const translationData = await response.json();

                apodData.translations = {
                    en: { title: apodData.title, explanation: apodData.explanation },
                    it: { title: translationData.translated[0], explanation: translationData.translated[1] }
                };

                return apodData;

            } catch(error) {
                console.log(error);
            }
        }

        

    } catch(error) {
        console.log(error);
        throw error; // rilancia, chi chiama gestisce
    }
}

