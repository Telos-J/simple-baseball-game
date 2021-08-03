const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

canvas.width = 1600
canvas.height = 900
class Ball {
    constructor() {
        this.size = 100
        this.x = canvas.width / 2 - this.size / 2
        this.y = canvas.height / 2 - this.size / 2
        this.vx = 0
        this.vy = 0
        this.status = true
        this.image = new Image()
        this.image.src = './baseball.png'
    }
}

class Bat {
    constructor() {
        this.size = 500
        this.x = canvas.width - this.size
        this.y = canvas.height / 2
        this.image = new Image()
        this.image.src = './baseballbat.png'
    }
}

const bat = new Bat()
const ball = new Ball()

addEventListener('keydown', e => {
    if (e.code === 'Space') {
        ball.vx = 25
    } else if (e.code === 'KeyD') {
        if (ball.status === true) {
            ball.status = false
        } else {
            ball.status = true
        }
    }
})

function update() {
    ball.x += ball.vx 
    ball.y += ball.vy 
    if (ball.x < 0) {
        ball.x = 0
        ball.vx *= -1
    } else if (ball.y < 0) {
        ball.y = 0
        ball.vy *= -1
    } else if (ball.x > canvas.width - ball.size) {
        ball.x = canvas.width - ball.size
        ball.vx *= -1
    } else if (ball.y > canvas.height - ball.size) {
        ball.y = canvas.height - ball.size
        ball.vy *= -1
    }
}

function render() {
    context.fillStyle = 'white'
    context.fillRect(0, 0, canvas.width, canvas.height)    
    if (ball.status === true) {
        context.drawImage(ball.image, ball.x, ball.y, ball.size , ball.size)
    } 
    context.drawImage(bat.image, bat.x, bat.y, bat.size, bat.size / 2.4)
} 

function loop() {
    update()
    render()
    requestAnimationFrame(loop) // recursive function
}

loop()
