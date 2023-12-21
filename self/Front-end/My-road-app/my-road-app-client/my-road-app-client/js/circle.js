const maksCircle = new MaksCircle({
    locationID: 'mask-circle',
    canvas: {
        width: 1600,
        height: 1200,
    },
    background: {
        colors: ['white', 'white', '#b8e1ffbb'],
        center: { x: 800, y: 600 },
        radius: 400,
    },
    border: {
        width: 2,
        color: '#3c8cba',
    },
    points: {
        radius: 20,
        colors: [
            "#FF6F61", // Карьера и бизнес
            "#6B4226", // Деньги
            "#FF9A8B", // Личностный рост
            "#005A87", // Здоровье и спорт
            "#9E2A2B", // Друзья и окружение
            "#F0C987", // Отношения
            "#006D77", // Яркость жизни
            "#F18F01"  // Духовный рост
        ],
    },
    line: {
        bgColors: [
            '#ff000066',
            '#ff880066',
            '#ffff0066',
            '#aaff0066',
            '#ff000066',
            '#00aa0066'
        ],
        color: '08354f',
        width: 10,
    },
    text: {
        range: 60,
        lineHeight: 70,
        fontsize: 60,
        fontstyle: 'Arial',
        color: 'white',
        catigories: [
            'Карьера и\nбизнес',
            'Деньги',
            'Личностный\nрост',
            'Здоровье и\nспорт',
            'Друзья и\nокружение',
            'Отношения',
            'Яркость\nжизни',
            'Духовный\nрост',
        ]
    }
});

maksCircle.drawText();

maksCircle.drawBackgroung();

maksCircle.drawPoints([3, 2, 5, 3, 5, 5, 3, 4]);

// console.log(maksCircle.getPoint(0));

function fillCategoriesContainer() {
    const categoriesContainer = document.querySelector('.catigories-container');
    const categoryData = [
        'Карьера и бизнес',
        'Деньги',
        'Личностный рост',
        'Здоровье и спорт',
        'Друзья и окружение',
        'Отношения',
        'Яркость жизни',
        'Духовный рост',
    ];
    for (let i = 0; i < categoryData.length; i++) {
        const categoryItem = document.createElement('div');
        categoryItem.id = `catigory-${i}`;
        categoryItem.className = 'catigory-item';
        const infoWrap = document.createElement('div');
        infoWrap.className = 'info-wrap';
        const score = document.createElement('div');
        score.className = 'score';
        score.textContent = '0.0';
        const stairs = document.createElement('div');
        stairs.className = 'stairs';
        const span = document.createElement('span');
        span.textContent = '❮❮';
        const prevScore = document.createElement('div');
        prevScore.className = 'prev-score';
        prevScore.textContent = '0.0';
        const categoryName = document.createElement('div');
        categoryName.className = 'catigory-name';
        categoryName.textContent = categoryData[i];
        stairs.appendChild(span);
        stairs.appendChild(prevScore);
        infoWrap.appendChild(score);
        infoWrap.appendChild(stairs);
        infoWrap.appendChild(categoryName);
        categoryItem.appendChild(infoWrap);
        categoriesContainer.appendChild(categoryItem);
    }
}

fillCategoriesContainer();