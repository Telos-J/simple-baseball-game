const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

canvas.width = 1600
canvas.height = 900

class Ball {
    constructor() {
        this.size = 20
        this.x = canvas.width / 2 - this.size / 2
        this.y = 366
        this.vx = 0
        this.vy = 0
        this.status = true
        this.image = new Image()
        this.image.src = './baseball.png'
    }
}

class Bat {
    constructor() {
        this.size = 70
        this.x = 750
        this.y = 800
        this.image = new Image()
        this.image.src = './baseballbat.png'
        this.rotation = Math.PI
        this.rotationSpeed = 0
    }
}

class Stadium {
    constructor() {
        this.size = 2300
        this.x = canvas.width / 2 - this.size / 2
        this.y = canvas.height / 2 - this.size / 2  - 180
        this.image = new Image()
        this.image.src = './stadium.png'
    }
}

const bat = new Bat()
const ball = new Ball()
const stadium = new Stadium()

addEventListener('keydown', e => {
    if (e.code === 'Space') {
        if (inningSituation === true) {
            ball.vy = 15
        } else {
            bat.rotationSpeed = Math.PI / 10
        }
    }
})

addEventListener('click', e => {
    const box = canvas.getBoundingClientRect()
    if (e.clientX > box.left && e.clientX < box.right && e.clientY > box.top && e.clientY < box.bottom) {
        const x = (e.clientX - box.x) / canvas.clientWidth * canvas.width
        const y = (e.clientY - box.y) / canvas.clientHeight * canvas.height
        console.log(x.toFixed(2), y.toFixed(2))
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
    } else if (ball.y > 851) {
        ball.x = canvas.width / 2 - ball.size / 2
        ball.y = 366
        ball.vy = 0
    }

    bat.rotation -= bat.rotationSpeed
    if (bat.rotation < Math.PI - Math.PI * 2) {
        bat.rotation = Math.PI
        bat.rotationSpeed = 0
    }
}

function render() {
    context.fillStyle = 'white'
    context.fillRect(0, 0, canvas.width, canvas.height)
    context.drawImage(stadium.image, stadium.x, stadium.y, stadium.size, stadium.size / 1.14)    
    if (ball.status === true) {
        context.drawImage(ball.image, ball.x, ball.y, ball.size , ball.size)
    } 
    context.save();
    context.translate(bat.x,bat.y);
    context.rotate(bat.rotation)
    context.drawImage(bat.image, 0, -bat.size /2.4, bat.size, bat.size / 2.4)
    context.restore()

} 

function loop() {
    update()
    render()
    requestAnimationFrame(loop) // recursive function
}

loop()

//true means you are pitching false is batting
let inningSituation = false
