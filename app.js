const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

canvas.width = 1600
canvas.height = 900
class Ball {
    constructor() {
        this.x = canvas.width * Math.random()
        this.y = canvas.height * Math.random()
        this.vx = 10
        this.vy = 10
        this.size = 100
    }
}

const ball = new Ball()

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

const image = new Image()
image.src = './baseball.png'

function render() {
    context.fillStyle = 'white'
    context.fillRect(0, 0, canvas.width, canvas.height)
   context.drawImage(image, ball.x, ball.y, ball.size , ball.size)       
}

function loop() {
    update()
    render()
    requestAnimationFrame(loop) // recursive function
}

loop()
