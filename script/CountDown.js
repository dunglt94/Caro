class Countdown {
    constructor(minutes, displayElement) {
        this.minutes = minutes;
        this.seconds = minutes * 60; // Số giây
        this.timerInterval = null;
        this.displayElement = displayElement;
    }

    start() {
        if (this.timerInterval) return;
        this.timerInterval = setInterval(() => {
            const minutesLeft = Math.floor(this.seconds / 60);
            const secondsLeft = this.seconds % 60;
            this.displayElement.innerHTML =
                `${String(minutesLeft).padStart(2, '0')}:${String(secondsLeft).padStart(2, '0')}`;

            if (this.seconds <= 0) {
                this.stop();
                this.displayElement.innerHTML = 'Hết Giờ!';
                gameBoard.isOver = true;
                this.timeout("Kết quả hoà do hết giờ");
            } else {
                this.seconds--;
            }
        }, 1000);
    }

    reset() {
        this.stop();
        this.seconds = this.minutes * 60;
        this.displayElement.innerHTML = 'PLAY!';
    }

    stop() {
        clearInterval(this.timerInterval);
        this.timerInterval = null;
    }

    // Hiển thị thông báo hết giờ vào 1 element
    // timeout(message) {
    //     if (this.seconds <=0) {
    //         this.stop();
    //         let messageDisplay = document.getElementById('messageDisplay');
    //         messageDisplay.innerHTML = message;
    //     }
    // }

    // Hiển thị thông báo hết giờ bằng alert
    timeout(message) {
            alert(message);
    }
}

let displayClock = document.getElementById("clock");
let clockCD = new Countdown(10, displayClock);