const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particleArray = [];
const numberOfParticles = 200;

// get mouse position

const mouse = {
    x: null,
    y: null
}

window.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y
    console.log(mouse.x, mouse.y)
})

setInterval(function() {
    mouse.x = undefined;
    mouse.y = undefined;
}, 200)

// Create particles
class Particle {
    constructor(x, y, size, color, weight) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.weight = weight
    }
    draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0 , Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill()
    }
    update() {
        this.size -= 0.05;
        if (this.size < 0) {
            this.x = (mouse.x + ((Math.random() * 20) - 10))
            this.y = (mouse.y + ((Math.random() * 20) - 10))
            this.size = (Math.random() * 15) + 2;
            this.weight = (Math.random() * 2) - 0.5
        }
        this.y += this.weight;
        this.weight += 0.2;

        if (this.y > canvas.height - this.size) {
            this.weight *= -1;
        };
    }
}


function init() {
    particleArray = [];
    for (let i =0; i<numberOfParticles; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let size = (Math.random() * 15) + 0;
        let color = 'pink';
        let weight = 1;
        particleArray.push(new Particle(x, y, size, color, weight))
    }
}
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    // ctx.fillStyle = 'rgba(0,0,0,0.05)';
    // ctx.fillRect(0,0, canvas.width, canvas.height)
    for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].update()
        particleArray[i].draw()
    }
    requestAnimationFrame(animate)
}

init();
animate();

// function dotU() {
//     let opacityValue = 1;
//     for(let a = 0; a < particleArray.length; a++) {
//         for (let b = a; b < particleArray.length; b++) {
//             let distance = ((particleArray[a].x - particleArray[b].x)
//             * (particleArray[a].x - particleArray[b].x))
//             +
//             ((particleArray[a].y) - particleArray[b].y)*
//             (particleArray[a].y - particleArray[b].y);
//             if (distance < 200){
//                 opacityValue = 1 -(distance/10000);
//                 ctx.strkeStyle = 'rgba(0,0,0' + opacityValue + ')';

//                 ctx.beginPath();
//                 ctx.lineWidth = 1;
//                 ctx.moveTo(particleArray[a].x, particleArray[a].y)
//                 ctx.lineTo(par)
//             }
//         }
//     }
// }