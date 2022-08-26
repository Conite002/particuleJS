const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;
let particuleTab;

class Particule{
    constructor(x, y, directionX, directionY, taille, couleur){
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.taille = taille;
        this.couleur = couleur;
    }
    dessine(couleur){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.taille, 0, Math.PI * 2, false);
        ctx.fillStyle = (couleur == undefined) ? this.couleur : couleur;
        ctx.fill();
    }
    MAJ(){
        if(this.x + this.taille > canvas.width || this.x - this.taille < 0) {
            this.directionX = -this.directionX;
        }
        if(this.y + this.taille > canvas.height || this.y - this.taille < 0){
            this.directionY = -this.directionY;
        }
        this.x += this.directionX;
        this.y += this.directionY;
        this.dessine();
    }
    redraw(color){
        this.dessine(color);
    }

}


function init(){
    particuleTab = [];
    for(let i = 0; i < 100; i++){
        let taille = (Math.random() + 0.01) * 20;
        let x = Math.random() * (window.innerWidth - taille * 2)
        let y = Math.random() * (window.innerHeight - taille * 2)
        let directionX = (Math.random() * 0.4) - 0.2;
        // -0.2 / 0.2
        let directionY = (Math.random() * 0.4) - 0.2;
        let couleur = "white";
        particuleTab.push(new Particule(x,y,directionX,directionY,taille, couleur));
    }
}

function animation(){
    requestAnimationFrame(animation);
    ctx.clearRect(0,0,window.innerWidth, window.innerHeight);

    for(let i = 0; i < particuleTab.length; i++){
        particuleTab[i].MAJ();
        for(let j = 0; j < particuleTab.length; j++ ){
            if((particuleTab[i].x == particuleTab[j].x) && (particuleTab[i].y == particuleTab[j].y)){
                particuleTab[i].couleur = "#0000ff";
                particuleTab[j].couleur = "#0000ff";
            }else{
                particuleTab[i].couleur = "#ffffff";
                particuleTab[j].couleur = "#f3f6f3";
            }
        }

        
    }
}   

init();
animation();
console.log(particuleTab)


function resize(){
    init();
    animation();
}

let doit;
window.addEventListener('resize', () => {
    clearTimeout(doit);
    doit = setTimeout(resize, 100);
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
})


document.addEventListener("click",  ()=> {
    for(let j = 0; j < particuleTab.length; j++){
        const rgbColor = [Math.floor(Math.random()*1677)%256, Math.floor(Math.random()*1677)%256, Math.floor(Math.random()*1677)%256];
        particuleTab[j].couleur = "rgb(" + rgbColor[0]+ ","+ rgbColor[1]+ ","+ rgbColor[2]+ ")";
        let color = "rgb(" + rgbColor[0]+ ","+ rgbColor[1]+ ","+ rgbColor[2]+ ")";
        particuleTab[j].redraw(color);
        console.log(particuleTab[j].couleur)
    }
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
    document.body.style.backgroundColor= "#" + randomColor;
    console.log(Math.floor(Math.random()*1677)% 100)

});