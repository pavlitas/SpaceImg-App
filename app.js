// fetch()async 
const feedback = document.getElementById('feedback');
const media = document.getElementById('media-container');
const titoloDiv = document.querySelector('.titolo');
const descrizioneDiv = document.querySelector('.descrizione');
const dataDiv = document.querySelector('.data');

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => console.log('Postino (Service Worker) registrato!', reg))
      .catch(err => console.log('Errore registrazione postino:', err));
  });
}


async function caricaDatiNasa() {
    // PUNTO 1: Mostriamo il caricamento
     feedback.innerHTML = '<div class="loader"></div><p>In attesa di risposta dalla NASA...</p>';

    try {
        const risposta = await fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY');
        
        // Controlliamo se la risposta è "OK" (status 200)
        if (!risposta.ok) {
            throw new Error("Errore nel caricamento dei dati");
        }

        const dati = await risposta.json();
        console.log(dati);
        // PUNTO 2: Successo! I dati sono arrivati.
        // Adesso tocca a te ragionare: 

        // 1. Come nascondi il messaggio di feedback/caricamento?
        feedback.classList = "nascondiElemento";
        // 2. Come assegni l'URL dell'immagine (dati.url) al tag img?
        if (dati.media_type === "image") {
            // Cosa scrivi nel media.innerHTML?
            media.innerHTML = '<img src="' + dati.url + '" alt="spazio" />';
            media.style.display = "block";
        } else {
            // E se è un video (iframe)?
            media.innerHTML = '<iframe src="' + dati.url + '"></iframe>';
            media.style.display = "block";
        }
        // 3. Come inserisci il testo della descrizione (dati.explanation)?
        titoloDiv.innerHTML = '<h3>' + dati.title + '</h3>';
        dataDiv.textContent = dati.date;
        descrizioneDiv.innerHTML = '<p>' + dati.explanation + '</p>';
        /* SCRIVI QUI SOTTO COSA FARESTI (anche a parole o pseudo-codice) */

    } catch (errore) {
        // PUNTO 3: Qualcosa è andato storto (es. niente internet)
        /* Cosa scriveresti dentro il div feedback per avvisare l'utente? */
        feedback.textContent = "errore: " + errore;
    }
}

// Avviamo la funzione
caricaDatiNasa();

