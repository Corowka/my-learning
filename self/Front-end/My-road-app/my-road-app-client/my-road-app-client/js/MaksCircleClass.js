class MaksCircle {

    static validateValue(value) {
        return Math.max(0, Math.min(value, 10));
    }

    getPoint(num) {
        return {
            name: this.text.catigories[num],
            color: this.points.colors[num],
            value: this.points.values[num],
        }
    }

    constructor(p = {
        locationID: 'myBlockID',
        canvas: {
            width: 200,
            height: 200,
        },
        background: {
            colors: ['black', 'white'],
            center: { x: 100, y: 100 },
            radius: 80,
        },
        border: {
            width: 1,
            color: 'gray',
        },
        points: {
            radius: 3,
            colors: ['green', 'red', 'blue', 'yellow', 'pink', 'purple', 'tan', 'orange'],
        },
        line: {
            bgColors: ['black', 'white'],
            color: 'black',
            width: 1,
        },
        text: {
            range: 20,
            lineHeight: 25,
            fontsize: 20,
            fontstyle: 'Arial',
            color: 'black',
            catigories: [
                'Карьера и бизнес',
                'Деньги',
                'Личностный рост',
                'Здоровье и спорт',
                'Друзья и окружение',
                'Отношения',
                'Яркость жизни',
                'Духовный рост. Творчкство',
            ]
        }
    }) {

        if (!p)
            return;

        // Create Canvas

        const canvasItem = document.createElement('canvas');
        canvasItem.width = p.canvas.width;
        canvasItem.height = p.canvas.height;
        const contextItem = canvasItem.getContext("2d");

        // Save Setting

        this.canvas = canvasItem;
        this.contex = contextItem;
        this.locationID = p.locationID;
        this.amount = p.amount;
        this.background = p.background;
        this.border = p.border;
        this.points = p.points;
        this.points.values = [0, 0, 0, 0, 0, 0, 0, 0];
        this.line = p.line;
        this.text = p.text;

        // Apply Canvas

        contextItem.fillStyle = this.text.color;
        contextItem.font = this.text.fontsize + 'px ' + this.text.fontstyle;

        this.showImg();
    }

    showImg() {
        const canvasItem = this.canvas;
        const locationItem = document.getElementById(this.locationID);
        const imageUrl = canvasItem.toDataURL("image/png");
        locationItem.src = imageUrl;
    }

    drawBackgroung() {

        const canvasItem = this.canvas;
        const contextItem = this.contex;

        for (let i = 10; i > 0; i--) {

            const radius = this.background.radius / 10 * i;

            contextItem.beginPath();
            contextItem.moveTo(this.background.center.x + radius, this.background.center.y);

            for (let j = 1; j <= 8; j++) {
                const angle = (j * Math.PI * 2) / 8;
                const x = this.background.center.x + radius * Math.cos(angle);
                const y = this.background.center.y + radius * Math.sin(angle);
                contextItem.lineTo(x, y);
            }

            if (i === 10) {
                const gradient = contextItem.createRadialGradient(
                    this.background.center.x, this.background.center.y, 0,
                    this.background.center.x, this.background.center.y, this.background.radius
                );

                let j = 0;
                for (let color of this.background.colors) {
                    j++;
                    gradient.addColorStop(j / this.background.colors.length, color);
                }

                contextItem.closePath();
                contextItem.fillStyle = gradient;
                contextItem.fill();
            }

            contextItem.lineWidth = this.border.width;
            contextItem.strokeStyle = this.border.color;
            contextItem.stroke();
        }

        this.showImg();
    }

    drawText() {
        const canvasItem = this.canvas;
        const contextItem = this.contex;

        for (let i = 0; i < 8; i++) {
            const text = this.text.catigories[i];
            const lines = text.split("\n");
            const [lineMaxLehgth, MaxLehgthIndex] =
                lines.map((item, index) =>
                    [contextItem.measureText(item).width, index])
                    .reduce((max, item) => {
                        if (max[0] < item[0]) return item;
                        else return max;
                    }, [contextItem.measureText(lines[0]).width, 0])
            const linesHeightPadding = (lines.length !== 1 && (i + 2) % 8 < 5)
                ? (this.text.fontsize + this.text.lineHeight - this.text.fontsize) *
                (lines.length - 1) / 2
                : 0;
            const textMetrics = contextItem.measureText(text);
            const textAngle = i * Math.PI / 4 - Math.PI / 2;
            const textRadius = this.background.radius + this.text.range;
            let textX = this.background.center.x + textRadius * Math.cos(textAngle);
            textX = (i === 0 || i === 4) ? textX - lineMaxLehgth / 2 : textX;
            textX = (i > 4) ? textX - lineMaxLehgth : textX;
            textX = (i > 4) ? textX + 0 : textX;
            let textY = this.background.center.y + textRadius * Math.sin(textAngle);
            textY = (i === 4) ? textY + this.text.fontsize / 2 : textY;
            textY = (i === 0) ? textY - this.text.fontsize / 2 : textY;
            for (let j = 0; j < lines.length; j++) {
                const linePadding = (j !== MaxLehgthIndex) ? lineMaxLehgth / 2 - contextItem.measureText(lines[j]).width / 2 : 0;
                contextItem.fillText(lines[j], textX + linePadding, textY - linesHeightPadding + j * this.text.lineHeight);
            }
        }

        this.showImg();
    }

    drawPoints(values) {
        values = values.map((item) => MaksCircle.validateValue(item));
        this.points.values = values;

        const canvasItem = this.canvas;
        const contextItem = this.contex;

        const sectorPointRadius = this.background.radius / 10;
        const numberOfSides = 8;

        contextItem.beginPath();

        for (let i = 0; i < numberOfSides; i++) {
            const angle = (i * Math.PI * 2) / numberOfSides;
            const radius = sectorPointRadius * this.points.values[i];

            const x = this.background.center.x + radius * Math.cos(angle - Math.PI / 2);
            const y = this.background.center.y + radius * Math.sin(angle - Math.PI / 2);

            if (i === 0) {
                contextItem.moveTo(x, y);
            } else {
                contextItem.lineTo(x, y);
            }
        }

        contextItem.closePath();

        const gradient = contextItem.createRadialGradient(
            this.background.center.x, this.background.center.y, 0,
            this.background.center.x, this.background.center.y, this.background.radius
        );

        let j = 0;
        for (let color of this.line.bgColors) {
            j++;
            gradient.addColorStop(j / this.line.bgColors.length, color);
        }

        contextItem.fillStyle = gradient;
        contextItem.fill();

        contextItem.strokeStyle = this.line.color;
        contextItem.lineWidth = this.line.width;
        contextItem.stroke();

        contextItem.beginPath();

        for (let i = 0; i < numberOfSides; i++) {
            const angle = (i * Math.PI * 2) / numberOfSides;
            const radius = sectorPointRadius * this.points.values[i];

            const x = this.background.center.x + radius * Math.cos(angle - Math.PI / 2);
            const y = this.background.center.y + radius * Math.sin(angle - Math.PI / 2);

            if (i === 0) {
                contextItem.moveTo(x, y);
            } else {
                contextItem.lineTo(x, y);
            }

            contextItem.beginPath();
            contextItem.arc(x, y, this.points.radius, 0, Math.PI * 2);
            contextItem.fillStyle = this.points.colors[i];
            contextItem.fill();
        }

        contextItem.closePath();

        this.showImg();
    }
}