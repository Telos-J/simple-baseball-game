const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

canvas.width = 1600
canvas.height = 900

//true means you are pitching false is batting
let inningSituation = false 
let pitched = false
let pointsEarned = 0

class Ball {
    constructor() {
        this.size = 20
        this.x = canvas.width / 2 - this.size / 2
        this.y = 366
        this.speed = 0
        this.vx = 0
        this.vy = 0
        this.rotation = Math.PI / 2
        this.image = new Image()
        this.image.src = './baseball.png'
        this.timeoutset = false
    }

    move () {
        let windResistance = 0.1
        this.vx = this.speed * Math.cos(this.rotation)
        this.vy = this.speed * Math.sin(this.rotation)
        this.x += this.vx 
        this.y += this.vy
        if (this.vy < 0) {
            this.speed -= windResistance
            if (this.speed < 0) {
                this.speed = 0
            }
        }

        if (pitched === true && this.speed === 0 && this.timeoutset === false) {
            setTimeout(() => {
                this.x = canvas.width / 2 - this.size / 2
                this.y = 366
                camera.x = 0
                camera.y = 0
                pitched = false
            }, 2*1000)
            this.timeoutset = true
            score += pointsEarned
            console.log(pointsEarned)
            
        }
    }

    bound () {
        if (this.y > 851) {
            this.x = canvas.width / 2 - this.size / 2
            this.y = 366
            this.speed = 0
        } else if (this.y < -900) {
            setTimeout(() => {
                this.x = canvas.width / 2 - this.size / 2
                this.y = 366
                camera.y = 0
                homerun = false
            }, 2*1000)
            this.speed = 0
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

        if (this.rotationSpeed !== 0 && ball.y > 760 && ball.vy > 0 && ball.y < 780 && this.rotation > Math.PI - Math.PI && this.rotation < Math.PI - Math.PI / 1.5) {
            ball.speed = 6*Math.random() + 42
            ball.rotation = Math.PI / (0.4*Math.random() + 1.3)
            pointsEarned = 10
        } else if (this.rotationSpeed !== 0 && ball.y > 745 && ball.vy > 0 && ball.y < 810 && this.rotation > Math.PI - Math.PI && this.rotation < Math.PI - Math.PI / 1.5) {
            ball.speed = 20*Math.random() + 15 
            ball.rotation = Math.PI / (0.4*Math.random() + 1.3)
            pointsEarned = 5 
        } else if (this.rotationSpeed !== 0 && ball.y > 670 && ball.vy > 0 && ball.y < 900 && this.rotation > Math.PI - Math.PI && this.rotation < Math.PI - Math.PI / 1.5) {
            ball.speed = 10*Math.random() + 10
            ball.rotation = Math.PI * (0.4*Math.random() + 1.3)
            pointsEarned = 100
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
        if (ball.y < 366) {
            this.x += ball.vx 
            this.y += ball.vy 
        }
    }
}

let score = 0

class Scoreboard {
    contructor(){
        this.points = 0
        this.strikes = 0
        this.outs = 0
    }

    draw() {
        context.fillStyle = '#9d373a'
        context.fillRect(10, 10, 200, 300)
        context.fillStyle = '#991e23'
        context.fillRect(10, 160, 200, 150)
        context.font = '50px serif'
        context.fillStyle = 'White'
        context.fillText('Score', 50, 70)
        context.font = '50px serif'
        context.fillStyle = 'White'
        context.fillText(`${score}`, 90, 130)
    }
}

const bat = new Bat()
const ball = new Ball()
const stadium = new Stadium()
const camera = new Camera()
const scoreboard = new Scoreboard()

addEventListener('keydown', e => {
    if (e.code === 'Space') {
        if (inningSituation === true) {
            ball.vy = 15
        } else {
            bat.rotationSpeed = Math.PI /  10
        }
    } else if (e.code === 'ArrowUp') {s
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
    if (inningSituation === false && ball.vy === 0 && pitched === false) {
        pitched = true
        ball.speed = Math.random() + 5
        ball.timeoutset = false
        ball.rotation = Math.PI / 2
    }
},3*1000)



function update() {
    ball.move()
    ball.bound()
    bat.swing()
    camera.move()
}

function render() {
    context.fillStyle = '#ffc08b'
    context.fillRect(0, 0, canvas.width, canvas.height)
    stadium.draw()
    ball.draw()
    bat.draw()
    scoreboard.draw()
    if (homerun) context.drawImage(homeRunSign, 0, 0, 705, 564)
} 

function loop() {
    update()
    render()
    requestAnimationFrame(loop) // recursive function - Anonymous
}

loop()

