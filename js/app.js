import {renderSingleView} from './domRender.js';
import {renderGalleryView} from './domRender.js';
import { fetchApodData } from './apiService.js';

const appDiv = document.getElementById("app");
const dataDaCalendario = document.getElementById("data");
const oggi = new Date().toISOString().split('T')[0];
dataDaCalendario.setAttribute('max', oggi);

// test 1
renderSingleView(appDiv);

// test 2
//fetchApodData({ date: '2026-04-07' }).then(data => console.log(data));

// test 3
//fetchApodData({ startDate: '2026-04-01', endDate: '2026-04-07' }).then(data => console.log('Range data:', data));

//renderGalleryView(appDiv, { startDate: '2026-03-01', endDate: '2026-03-31' })

dataDaCalendario.addEventListener('input', function() {
    //const valore = this.value; // Formato: YYYY-MM-DD
    
    renderSingleView(appDiv, {date: this.value});
});