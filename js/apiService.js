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
            let data = apodData;
            try {
                const response = await fetch('https://spaceimg-app-backend.onrender.com/', {method: "POST", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(msg) } );
                const translationData = await response.json();

                data.title = translationData.translated[0];
                data.explanation = translationData.translated[1];

                return data;

            } catch(error) {
                console.log(error);
            }
        }

        

    } catch(error) {
        console.log(error);
        throw error; // rilancia, chi chiama gestisce
    }
}

