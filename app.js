const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

canvas.width = innerWidth * devicePixelRatio
canvas.height = innerHeight * devicePixelRatio

let x = canvas.width * Math.random()
let y = canvas.height * Math.random()
let vx = 10
let vy = 10

function loop() {
    context.fillStyle = 'white'
    context.fillRect(0, 0, canvas.width, canvas.height)
    x += vx * 10*Math.random()
    y += vy * 10*Math.random()
    if (x < 0) {
        x = 0
        vx *= -1
    } else if (y < 0) {
        y = 0
        vy *= -1
    } else if (x > canvas.width) {
        x = canvas.width
        vx *= -1
    } else if (y > canvas.height) {
        y = canvas.height
        vy *= -1
    }
    context.strokeStyle = 'black'
    context.beginPath()
    context.arc(x, y, 25, 0, Math.PI * 2)
    context.stroke()        
    requestAnimationFrame(loop) // recursive function
}

loop()
