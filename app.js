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
        let windResistance = 0.5
        this.x += this.vx 
        this.y += this.vy
        if (this.vy < 0) {
            this.vy += windResistance
            console.log(this.vy)
            if (this.vy > 0) {
                this.vy = 0
            }
        }
    }

    bound () {
        if (this.y > 851) {
            this.x = canvas.width / 2 - this.size / 2
            this.y = 366
            this.vy = 0
        } else if (this.y < -900) {
            setTimeout(() => {
                this.x = canvas.width / 2 - this.size / 2
                this.y = 366
                camera.y = 0
                homerun = false
            }, 2*1000)
            this.vy = 0
            camera.vy = 0
            homerun = true
        }
    }

    draw () {
        context.drawImage(this.image, this.x - camera.x, this.y - camera.y, this.size , this.size)
    }
}

const homeRunSign = new Image(); 
homeRunSign.src = './homerunsign.png'
let homerun = false

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

        if (this.rotationSpeed !== 0 && ball.y > 760 && ball.y < 800 && this.rotation > Math.PI - Math.PI && this.rotation < Math.PI - Math.PI / 1.5) {
            ball.vy = - 42
        } else if (this.rotationSpeed !== 0 && ball.y > 700 && ball.y < 850 && this.rotation > Math.PI - Math.PI && this.rotation < Math.PI - Math.PI / 1.5) {
            ball.vy = - 15*Math.random() - 16
        } else if (this.rotationSpeed !== 0 && ball.y > 650 && ball.y < 870 && this.rotation > Math.PI - Math.PI && this.rotation < Math.PI - Math.PI / 1.5) {
            ball.vy = -10*Math.random() - 20
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
            this.x += ball.vx 
            this.y += ball.vy 
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
    if (inningSituation === false && ball.vy === 0 && homerun === false) {
        ball.y = 366 
        ball.x = canvas.width / 2 - ball.size / 2
        ball.vy = 15*Math.random() + 5
        camera.x = 0
        camera.y = 0
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
    if (homerun) context.drawImage(homeRunSign, 0, 0, 705, 564)
} 

function loop() {
    update()
    render()
    requestAnimationFrame(loop) // recursive function
}

loop()


