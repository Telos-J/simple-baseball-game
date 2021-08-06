const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

canvas.width = 1600
canvas.height = 900

//true means you are pitching false is batting
let inningSituation = false

class Ball {
    constructor() {
        this.size = 20
        this.x = canvas.width / 2 - this.size / 2
        this.y = 366
        this.vx = 0
        this.vy = 0
        this.image = new Image()
        this.image.src = './baseball.png'
    }

    move () {
        this.x += this.vx 
        this.y += this.vy 
    }

    bound () {
        if (this.x < 0) {
            this.x = 0
            this.vx *= -1
        } else if (this.y < 0) {
            this.y = 0
            this.vy *= -1
        } else if (this.x > canvas.width - this.size) {
            this.x = canvas.width - this.size
            this.vx *= -1
        } else if (this.y > canvas.height - this.size) {
            this.y = canvas.height - this.size
            this.vy *= -1
        } else if (this.y > 851) {
            this.x = canvas.width / 2 - this.size / 2
            this.y = 366
            this.vy = 0
        }
    }

    draw () {
            context.drawImage(this.image, this.x, this.y, this.size , this.size)
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

    swing () {
        this.rotation -= this.rotationSpeed
        if (this.rotation < Math.PI - Math.PI * 2) {
            this.rotation = Math.PI
            this.rotationSpeed = 0
        }
    }

    draw () {
        context.save();
        context.translate(this.x,this.y);
        context.rotate(this.rotation)
        context.drawImage(this.image, 0, -this.size /2.4, this.size, this.size / 2.4)
        context.restore()
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
    draw () {
        context.drawImage(this.image, this.x, this.y, this.size, this.size / 1.14)    
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
            bat.rotationSpeed = Math.PI /  5
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

setInterval(() => {
    if (inningSituation === false) {
        ball.vy = 15*Math.random()+5
    }
},7*1000)

function update() {
    ball.move()
    ball.bound()
    bat.swing()
}

function render() {
    context.fillStyle = 'white'
    context.fillRect(0, 0, canvas.width, canvas.height)
    stadium.draw()
    ball.draw()
    bat.draw()
} 

function loop() {
    update()
    render()
    requestAnimationFrame(loop) // recursive function
}

loop()


