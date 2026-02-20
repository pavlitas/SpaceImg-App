class NasaService {
    constructor() {
        this.apiKey = 'bWBXxKpScnNKdT0LaFb0flXxOa0Zkp5SlQtBAqOP'; // apikey momyna03@gmail.com -> bWBXxKpScnNKdT0LaFb0flXxOa0Zkp5SlQtBAqOP
        this.baseUrl = 'https://api.nasa.gov/planetary/apod';
    }

    async getDailyData() {
        try {
            // 1. Costruiamo l'URL (per ora senza data, poi la aggiungeremo)
            const url = `${this.baseUrl}?api_key=${this.apiKey}`;
            
            // 2. Chiamata fetch (Il "Postino" parte)
            const response = await fetch(url);

            // 3. Controllo sicurezza (Rete OK?)
            if (!response.ok) {
                throw new Error(`Errore NASA: ${response.status}`);
            }

            // 4. Trasformazione in JSON
            const data = await response.json();
            
            return data; // Restituisce l'oggetto "grezzo"
            
        } catch (error) {
            console.error("Il NasaService ha avuto un problema:", error);
            throw error; // Rilanciamo l'errore per farlo gestire ad app.js
        }
    }
}