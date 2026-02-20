class SpaceImage {
    constructor(dati) {
        this.titolo = dati.title;
        this.descrizione = dati.explanation;
        this.data = dati.date;
        this.tipo = dati.media_type;
        // Usiamo l'HD se disponibile, altrimenti l'URL normale
        this.url = dati.hdurl || dati.url;
    }

    // Metodo per generare l'HTML corretto
    getHtmlTemplate() {
        let contenutoMedia = '';

        if (this.tipo === 'image') {
            contenutoMedia = `<img src="${this.url}" alt="${this.titolo}" class="img-fluida">`;
        } else if (this.tipo === 'video') {
            contenutoMedia = `<iframe src="${this.url}" frameborder="0" allowfullscreen></iframe>`;
        } else {
            contenutoMedia = `<p>Formato media non supportato</p>`;
        }

        return `
        <div class="space-card">
            <h1>Immagini spaziali dalla NASA</h1>
            <div class="media-container">
                ${contenutoMedia}
            </div>
            <h2>${this.titolo}</h2>
            <p class="descrizione">${this.descrizione}</p>
        </div>
    `;
    }
}