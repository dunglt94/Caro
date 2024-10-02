class Countdown {
    constructor(minutes, displayElement) {
        this.minutes = minutes;
        this.seconds = minutes * 60; // Số giây
        this.timerInterval = null;
        this.displayElement = displayElement;
        this.isRunning = false;
    }

    start() {
        this.isRunning = true;
        if (this.timerInterval) return;
        this.timerInterval = setInterval(() => {
            const minutesLeft = Math.floor(this.seconds / 60);
            const secondsLeft = this.seconds % 60;
            this.displayElement.innerHTML =
                `${String(minutesLeft).padStart(2, '0')}:${String(secondsLeft).padStart(2, '0')}`;

            if (this.seconds <= 0) {
                this.stop();
                this.displayElement.innerHTML = 'Hết Giờ!';
                caroBoard.isOver = true;
                this.timeout("Hoà");
            } else {
                this.seconds--;
            }
        }, 1000);
    }

    reset() {
        this.stop();
        this.seconds = this.minutes * 60;
        this.displayElement.innerHTML = '00:00';
    }

    stop() {
        clearInterval(this.timerInterval);
        this.timerInterval = null;
        this.isRunning = false;
    }

    // Hiển thị thông báo hết giờ vào một element
    timeout(message) {
        let result = document.getElementById("turn");
        result.innerHTML = message;
    }
}

let displayClock = document.getElementById("clock");
let clockCD = new Countdown(10, displayClock);