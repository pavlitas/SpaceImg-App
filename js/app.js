// fetch()async 
const container = document.getElementById("container");

const service = new NasaService();

async function test() {
    try {
        const datiGrezzi = await service.getDailyData();
        const miaImmagine = new SpaceImage(datiGrezzi);
        container.innerHTML = miaImmagine.getHtmlTemplate();
        
    } catch (err) {
        console.log("App.js ha ricevuto l'allarme:", err.message);
        if(err.message.includes("429")) {
            container.innerHTML = "<h3>Troppe richieste! La NASA ci ha detto di calmarci. 🛑</h3>";
        } else {
            container.innerHTML = "<h3>Si è verificato un errore generico. 🛰️</h3>";

        }
    }
}

test();


/* Service Worker ---------------------------------------------------------------------------- */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js')
      .then(reg => console.log('Postino (Service Worker) registrato!', reg))
      .catch(err => console.log('Errore registrazione postino:', err));
  });
}

