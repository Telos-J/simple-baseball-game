const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')
console.log(canvas.width, canvas.height)
context.fillStyle = 'turquoise'
context.fillRect(0, 0, 300, 100)
