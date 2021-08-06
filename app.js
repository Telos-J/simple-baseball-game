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
        // if (this.x < 0) {
        //     this.x = 0
        //     this.vx *= -1
        // } else if (this.y < 0) {
        //     this.y = 0
        //     this.vy *= -1
        // } else if (this.x > canvas.width - this.size) {
        //     this.x = canvas.width - this.size
        //     this.vx *= -1
        // } else if (this.y > canvas.height - this.size) {
        //     this.y = canvas.height - this.size
        //     this.vy *= -1
        //}
        if (this.y > 851) {
            this.x = canvas.width / 2 - this.size / 2
            this.y = 366
            this.vy = 0
        } else if (this.y < -1200) {
            setTimeout(() => {
                this.x = canvas.width / 2 - this.size / 2
                this.y = 366
                camera.y = 0
            },2*1000)
            this.vy = 0
            camera.vy = 0
            context.drawImage(homeRunSign, 0, 0, 705, 564)

        }
    }

    draw () {
            context.drawImage(this.image, this.x - camera.x, this.y - camera.y, this.size , this.size)
    }
}

const homeRunSign = new Image(); 
homeRunSign.src = './homerunsign.png'

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

        if (this.rotationSpeed !== 0 && ball.y > 750 && ball.y < 790 && this.rotation > Math.PI - Math.PI && this.rotation < Math.PI - Math.PI / 1.5) {
            ball.vy = -30
            camera.vy = ball.vy
        }
    }

    draw () {
        context.save();
        context.translate(this.x - camera.x,this.y - camera.y);
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
        context.drawImage(this.image, this.x - camera.x, this.y - camera.y, this.size, this.size / 1.14)    
    }
}

class Camera {
    constructor() {
        this.x = 0
        this.y = 0
        this.vy = 0
        this.vx = 0
    }
    move () {
        if (ball.y < 377) {
            this.y += this.vy
        }
    }
}

const bat = new Bat()
const ball = new Ball()
const stadium = new Stadium()
const camera = new Camera()

addEventListener('keydown', e => {
    if (e.code === 'Space') {
        if (inningSituation === true) {
            ball.vy = 15
        } else {
            bat.rotationSpeed = Math.PI /  5
        }
    } else if (e.code === 'ArrowUp') {
        camera.y -= 10
    } else if (e.code === 'ArrowDown') {
        camera.y += 10
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
    if (inningSituation === false && ball.vy === 0) {
        ball.vy = 1 //15*Math.random()+5
    }
},3*1000)

function update() {
    ball.move()
    ball.bound()
    bat.swing()
    camera.move()
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


