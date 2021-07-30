const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

canvas.width = innerWidth * devicePixelRatio
canvas.height = innerHeight * devicePixelRatio
context.fillStyle = 'white'
context.fillRect(0, 0, canvas.width, canvas.height)
