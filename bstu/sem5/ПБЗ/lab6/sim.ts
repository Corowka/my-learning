function randInt(a: number, b: number): number {
    return Math.floor(Math.random() * (b - a + 1)) + a;
}

class CarParking {
    private time: number;
    private cars: number;

    constructor() {
        this.time = 0;
        this.cars = 0;
    }

    simulateStep() {
        if (this.time >= 2 && this.time <= 7) {
            console.log(`Time: ${this.time} cars: ${this.cars} arrived: 0 left 0`);
            this.time++;
            return;
        }
        let arrived: number;
        let left: number;
        if (this.time <= 22 && this.time >= 18) {
            [arrived, left] = [randInt(300, 500), randInt(100, 300)];
        } else {
            [arrived, left] = [randInt(0, 200), randInt(0, 50)];
        }
        arrived = Math.min(arrived, 500 - this.cars);
        left = Math.min(left, this.cars);
        this.cars -= left;
        this.cars += arrived;
        console.log(`Time: ${this.time} cars: ${this.cars} arrived: ${arrived} left ${left}`);
        this.time++;
    }
}

const parking = new CarParking();
for (let h = 0; h < 24; h++) {
    parking.simulateStep();
}