const NOME_CACHE = 'space-app-v1';
const fileDaSalvare = [
    '/',
    'index.html',
    'style.css',
    'app.js',
    'manifest.json'
];

// Evento INSTALL: Il postino prepara la borsa
self.addEventListener('install', (evento) => {
    evento.waitUntil(
        caches.open(NOME_CACHE).then((cache) => {
            console.log('Postino: sto riempiendo la borsa con i file base');
            return cache.addAll(fileDaSalvare);
        })
    );
});

// Evento FETCH: Il postino intercetta le richieste
self.addEventListener('fetch', (evento) => {
    evento.respondWith(
        caches.match(evento.request).then((risposta) => {
            // Se il file è nella borsa (cache), dallo subito!
            // Altrimenti, vai a cercarlo su internet (fetch)
            return risposta || fetch(evento.request);
        })
    );
});