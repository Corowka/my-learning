// Создайте карту и укажите начальные координаты и уровень масштабирования
var map = L.map('map').setView([51.505, -0.09], 13);

// Добавьте слой карты, например, OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Добавьте маркер на карту
var marker = L.marker([51.5, -0.09]).addTo(map);

// Добавьте всплывающее окно к маркеру
marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();