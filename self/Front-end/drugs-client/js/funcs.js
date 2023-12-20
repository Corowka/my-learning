"use strict"

function addPrizeItem(name, img) {
    const newItem = document.createElement('div');
    newItem.className = 'item';
    const heading = document.createElement('h2');
    heading.className = 'name';
    heading.textContent = name;
    const image = document.createElement('img');
    image.src = img; 
    image.alt = 'prize_logo';
    image.className = 'prev-img';
    newItem.appendChild(heading);
    newItem.appendChild(image);
    const prizesPage = document.getElementById('prizes-page');
    prizesPage.appendChild(newItem);
}

function addProfItem(name, img) {
    const newItem = document.createElement('div');
    newItem.className = 'item';
    const heading = document.createElement('h2');
    heading.className = 'name';
    heading.textContent = name;
    const image = document.createElement('img');
    image.src = img; 
    image.alt = 'prof_logo';
    image.className = 'prev-img';
    newItem.appendChild(heading);
    newItem.appendChild(image);
    const prizesPage = document.getElementById('prof-page');
    prizesPage.appendChild(newItem);
}

function addAppItem(name, img) {
    const newItem = document.createElement('div');
    newItem.className = 'item';
    const heading = document.createElement('h2');
    heading.className = 'name';
    heading.textContent = name;
    const image = document.createElement('img');
    image.src = img; 
    image.alt = 'app_logo';
    image.className = 'prev-img';
    newItem.appendChild(heading);
    newItem.appendChild(image);
    const prizesPage = document.getElementById('apps-page');
    prizesPage.appendChild(newItem);
}

addPrizeItem('Билеты в брестский театр "Белая Вежа"', './img/m1.png');
addAppItem('Подозрительные надписи', './img/drug1.jpg');
addProfItem('Ни шагу назад, МОЛОДЕЖЬ-это будущее', './img/prof1.png');
addPrizeItem('Сеанс в ледовом дворце', './img/m2.png');
addAppItem('Реклама наркотиков', './img/drug2.jpg');
addProfItem('Академия MMA SPARTA-FAMILY', './img/prof2.png');
addPrizeItem('Кинотеатр Мир', './img/m3.png');
addAppItem('Пропаганда вредных веществ', './img/drug3.jpg');
addProfItem('Проект «Закон Чисто Ты» профилактика наркопотребления', './img/prof3.png');