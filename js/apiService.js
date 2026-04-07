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
        const data = await response.json();

        return data;
    } catch(error) {
        console.log(error);
        throw error; // rilancia, chi chiama gestisce
    }
}

//const response = await fetch(`${URL}?api_key=${KEY}&date=2024-08-12`);