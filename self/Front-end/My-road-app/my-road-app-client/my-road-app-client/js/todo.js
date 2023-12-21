class ToDo {

    constructor() {
        // Calendar

        this.today = new Date();
        this.choosedDate = this.today;

        this.drawCalendar(this.today);
        this.chooseDate(this.today);

        document.getElementById("toggle-calendar-btn").onclick = () => {
            this.toggleCalendar();
        };
        document.getElementById("prev-day-btn").onclick = () => {
            this.choosePrevDay();
        };
        document.getElementById("next-day-btn").onclick = () => {
            this.chooseNextDay();
        };
        document.getElementById("prev-month-btn").onclick = () => {
            this.choosePrevMonth();
        };
        document.getElementById("next-month-btn").onclick = () => {
            this.chooseNextMonth();
        };

        const menuItem = document.querySelector('.calendar > .calendar-menu');
        menuItem.style.marginTop = '-256px';

        // Progress

        // Task
        document.getElementById("add-task-btn").onclick = () => {
            this.addTask();
        };
        document.getElementById("remove-task-btn").onclick = () => {
            this.removeTask();
        };
        document.getElementById("move-up-task-btn").onclick = () => {
            this.moveUpTask();
        };
        document.getElementById("move-down-task-btn").onclick = () => {
            this.moveDownTask();
        };
    }

    toggleCalendar() {
        const todoWrapItem = document.querySelector('.todo-wrap');
        const menuItem = document.querySelector('.calendar > .calendar-menu');
        const padding = parseInt(window.getComputedStyle(menuItem).paddingTop)
        const height = menuItem.offsetHeight - padding;
        if (menuItem.style.marginTop === '48px') {
            todoWrapItem.style.paddingTop = '62px'
            menuItem.style.marginTop = -height + 'px';
        } else {
            todoWrapItem.style.paddingTop = height + 58 + 'px'
            menuItem.style.marginTop = '48px';
        }
    }

    drawCalendar(date) {
        const currentYear = date.getFullYear();
        const currentMonth = date.getMonth();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        const calendarContainer = document.querySelector('.calendar-container');
        const dayBlocks = calendarContainer.querySelectorAll('.day');
        dayBlocks.forEach(block => {
            calendarContainer.removeChild(block);
        });
        for (let day = 1; day <= daysInMonth; day++) {
            const tempDate = new Date(currentYear, currentMonth, day);
            const dayElement = document.createElement('button');
            dayElement.classList.add('day');
            dayElement.textContent = day;
            dayElement.onclick = () => {
                this.chooseDate(tempDate);
            }
            if (tempDate.getDay() === 0 || tempDate.getDay() === 6) {
                dayElement.classList.add('weekend');
            }
            if (day === this.today.getDate() && currentMonth === this.today.getMonth()) {
                dayElement.classList.add('today');
            }
            calendarContainer.appendChild(dayElement);
        }
        const tempDate = new Date(currentYear, currentMonth, 1);
        const uglyWeekDay = tempDate.getDay();
        const weekDay = (uglyWeekDay !== 0)
            ? (tempDate.getDay() - 1) % 6
            : 6;
        const mg = weekDay * 34;
        const spaceItem = document.querySelector('.space');
        spaceItem.style.width = mg + 'px';
        const months = [
            'January', 'February', 'March', 'April',
            'May', 'June', 'July', 'August',
            'September', 'October', 'November', 'December'
        ];
        const currentMonthName = months[currentMonth];
        const monthContainer = document.querySelector('.month');
        monthContainer.textContent = currentMonthName;
    }

    chooseDate(date) {
        this.choosedDate = date;
        const dateContainer = document.querySelector('.date');
        dateContainer.textContent = ToDo.formatDate(date);
        const choosedItem = document.querySelector('.choosed');
        if (choosedItem) {
            choosedItem.classList.remove('choosed');
        }
        const day = date.getDate() - 1;
        const days = document.querySelectorAll('.day');
        days[day].classList.add('choosed');
    }

    choosePrevDay() {
        const dateContainer = document.querySelector('.date');
        let prevDay = new Date(ToDo.parseDate(dateContainer.textContent));
        prevDay.setDate(prevDay.getDate() - 1)
        if (this.choosedDate.getMonth() !== prevDay.getMonth()) {
            this.drawCalendar(prevDay);
        }
        this.chooseDate(prevDay);
    }

    chooseNextDay() {
        const dateContainer = document.querySelector('.date');
        let nextDay = new Date(ToDo.parseDate(dateContainer.textContent));
        nextDay.setDate(nextDay.getDate() + 1)
        if (this.choosedDate.getMonth() !== nextDay.getMonth()) {
            this.drawCalendar(nextDay);
        }
        this.chooseDate(nextDay);
    }

    choosePrevMonth() {
        const dateContainer = document.querySelector('.date');
        let prevMonth = new Date(ToDo.parseDate(dateContainer.textContent));
        prevMonth.setMonth(prevMonth.getMonth() - 1)
        prevMonth.setDate(1);
        this.drawCalendar(prevMonth);
        this.chooseDate(prevMonth);
    }

    chooseNextMonth() {
        const dateContainer = document.querySelector('.date');
        let nextMonth = new Date(ToDo.parseDate(dateContainer.textContent));
        nextMonth.setMonth(nextMonth.getMonth() + 1)
        nextMonth.setDate(1);
        this.drawCalendar(nextMonth);
        this.chooseDate(nextMonth);
    }

    addTask() {
        const taskItem = document.createElement("div");
        taskItem.className = "task";
        const checkboxLabelItem = document.createElement("label");
        checkboxLabelItem.className = "custom-checkbox";
        const checkboxInputItem = document.createElement("input");
        checkboxInputItem.type = "checkbox";
        const checkboxSpanItem = document.createElement("span");
        checkboxSpanItem.className = "checkbox-icon";
        checkboxLabelItem.appendChild(checkboxInputItem);
        checkboxLabelItem.appendChild(checkboxSpanItem);
        const taskNameInputItem = document.createElement("input");
        taskNameInputItem.className = "task-name";
        taskNameInputItem.type = "text";
        const taskRedBtnItem = document.createElement("button");
        taskRedBtnItem.className = "red-task-btn";
        const imgElement = document.createElement('img');
        imgElement.src = './img/svg/red-icon.svg';
        taskRedBtnItem.appendChild(imgElement);
        taskRedBtnItem.addEventListener('click', () => {
            this.toggleMenu(taskItem);
        });
        taskItem.appendChild(checkboxLabelItem);
        taskItem.appendChild(taskNameInputItem);
        taskItem.appendChild(taskRedBtnItem);
        const taskContainer = document.querySelector(".task-container");
        taskContainer.appendChild(taskItem);
        window.scrollBy({
            top: 10000,
            behavior: "smooth",
        });
    }

    removeTask() {
        const selectedItem = document.querySelector('.selected');
        if (selectedItem) {
            selectedItem.remove();
        }
        this.toggleMenu();
    }

    moveUpTask() {
        const tasks = document.querySelectorAll('.task');
        let selectedIndex = 0;
        for (let task of [...tasks]) {
            if (task.classList.contains('selected')) {
                break;
            }
            selectedIndex++;
        }
        if (selectedIndex > 0) {
            const task1 = tasks[selectedIndex];
            const task2 = tasks[selectedIndex - 1];
            const task1ClickHandler = task1.querySelector('.red-task-btn').onclick;
            const task2ClickHandler = task2.querySelector('.red-task-btn').onclick;
            const temp1 = task1.cloneNode(true);
            const temp2 = task2.cloneNode(true);
            task1.parentNode.replaceChild(temp2, task1);
            task2.parentNode.replaceChild(temp1, task2);
            temp1.querySelector('.red-task-btn').onclick = () => {
                this.toggleMenu(temp1);
            };
            temp2.querySelector('.red-task-btn').onclick = () => {
                this.toggleMenu(temp2);
            };
        }
    }

    moveDownTask() {
        const tasks = document.querySelectorAll('.task');
        let selectedIndex = 0;
        for (let task of [...tasks]) {
            if (task.classList.contains('selected')) {
                break;
            }
            selectedIndex++;
        }
        if (selectedIndex < tasks.length - 1) {
            const task1 = tasks[selectedIndex];
            const task2 = tasks[selectedIndex + 1];
            const temp1 = task1.cloneNode(true);
            const temp2 = task2.cloneNode(true);
            task1.parentNode.replaceChild(temp2, task1);
            task2.parentNode.replaceChild(temp1, task2);
            temp1.querySelector('.red-task-btn').onclick = () => {
                this.toggleMenu(temp1);
            };
            temp2.querySelector('.red-task-btn').onclick = () => {
                this.toggleMenu(temp2);
            };
        }
    }

    toggleMenu(taskItem) {
        const addBtnItem = document.getElementById("add-task-btn");
        const menuItem = document.querySelector(".task-redartor-menu");
        if (addBtnItem.style.display !== 'none') {
            taskItem.classList.add('selected');
            addBtnItem.style.display = 'none';
            menuItem.style.display = 'block';
        } else {
            const selectedElements = document.querySelector('.selected');
            if (taskItem === undefined) {
                addBtnItem.style.display = 'block';
                menuItem.style.display = 'none';
                return;
            }
            if (taskItem.classList.contains('selected')) {
                addBtnItem.style.display = 'block';
                menuItem.style.display = 'none';
                selectedElements.classList.remove('selected');
            } else {
                taskItem.classList.add('selected');
                selectedElements.classList.remove('selected');
            }
        }
    };

    static formatDate(date) {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return date.toLocaleDateString(undefined, options).split('.').join('-');
    }

    static parseDate(dateString) {
        const parts = dateString.split('-');
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1;
        const year = parseInt(parts[2], 10);
        return new Date(year, month, day);
    }
}

const todo = new ToDo();
