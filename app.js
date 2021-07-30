const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

canvas.width = innerWidth * devicePixelRatio
canvas.height = innerHeight * devicePixelRatio

let x = 300 * Math.random()
let y = 150 * Math.random()

function loop() {
    context.fillStyle = 'white'
    context.fillRect(0, 0, canvas.width, canvas.height)
    x += 50 * Math.random()
    y += 50 * Math.random()
    context.strokeStyle = 'black'
    context.beginPath()
    context.arc(x, y, 20, 0, Math.PI * 2)
    context.stroke()        
    requestAnimationFrame(loop) // recursive function
}

loop()
