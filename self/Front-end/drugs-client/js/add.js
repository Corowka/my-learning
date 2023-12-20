document.addEventListener('DOMContentLoaded', function () {
    const categorySelect = document.getElementById('category');
    const cityFields = document.getElementById('cityFields');
    const coordinatesInput = document.getElementById('coordinates');
    const publishButton = document.getElementById('publish');

    // Обработчик изменения выбранной категории
    categorySelect.addEventListener('change', function () {
        if (categorySelect.value === 'в_городе') {
            cityFields.style.display = 'block';
            // Здесь можно добавить код для автоматической генерации GPS координат
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    const coordinates = `Широта: ${latitude}, Долгота: ${longitude}`;
                    coordinatesInput.value = coordinates;
                }, function (error) {
                    // Обработка ошибок получения геолокации
                    console.error('Ошибка геолокации: ' + error.message);
                });
            } else {
                // Браузер не поддерживает геолокацию
                console.error('Геолокация не поддерживается в этом браузере.');
            }
        } else {
            cityFields.style.display = 'none';
        }
    });

    // Обработчик выбора фото
    const photoInput = document.getElementById('photo');
    photoInput.addEventListener('change', function () {
        // Здесь можно добавить код для обработки выбранного фото
    });

    // Обработчик нажатия на кнопку Опубликовать
    publishButton.addEventListener('click', function () {
        // Здесь можно добавить код для отправки данных формы на сервер
    });
});