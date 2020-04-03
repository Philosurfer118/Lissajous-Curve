const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const setupInfo = document.getElementById('setupInfo');
const submitButton = document.getElementById('submit');

let canWid = canvas.width;
let canHig = canvas.height;
let stpHig = setupInfo.height;
let interval;
let repeat;

function init() {
    let x = Math.floor(document.documentElement.clientWidth);
    let y = Math.floor(document.documentElement.clientHeight);

    if ( y < x ) {
        canvas.width = y;
        canvas.height = y;
    } else {
        canvas.width = x;
        canvas.height = x;
    };
};

window.addEventListener('load',init);

const nomi = document.getElementById('nomiInput');
const deno = document.getElementById('denoInput');

function animation() {
    let canWid = canvas.width;
    let canHig = canvas.height;
    let r = (canWid/4) - 25;
//    let stpHig = setupInfo.height;
    
    let nom = new Ellipse(r, (canWid/4)*3,canHig/4);
    let nomSpeed = Number(nomi.value);

    let dom = new Ellipse(r,canWid/4,(canHig/4)*3);
    let domSpeed = Number(deno.value);

    const lisa = new LissaCurve();
    let angle = 0;

    if (isNaN(domSpeed) || isNaN(nomSpeed)) {
        throw window.alert('zadajte čísla od 1 do 10');
        };
    if ((nomSpeed > 10)||(nomSpeed < 1)) {
        throw window.alert('zadajte len čísla od 1 do 10');
    };
    if ((domSpeed > 10)||(domSpeed < 1)) {
        throw window.alert('zadajte len čísla od 1 do 10');
    };

    function draw() {
        ctx.fillStyle = 'rgba(0,0,0,0.7)';
        ctx.fillRect(0,0,canWid,canHig); // nom

        nom.drawEllipse();
        nom.drawLineY(canHig);
        nom.addPoint();
        nom.updatePoint(angle,nomSpeed);
        lisa.setX(nom.point.x);

        dom.drawEllipse();
        dom.drawLineX(canWid);
        dom.addPoint();
        dom.updatePoint(angle,domSpeed);
        lisa.setY(dom.point.y);

        if (angle > Math.PI * 4) {
            angle = 0;
            //lisa.path = [];
            repeat = 1
        } else {
            angle += 0.01;
        };

        if (repeat == 1) {
            lisa.drawCurve();
        } else {
            lisa.addPoint();
            lisa.drawCurve();
        }
    };
    
    repeat = 0;
    window.clearInterval(interval);
    interval = window.setInterval(draw,20);
}

function resetCanvas() {
    repeat = 0;
    clearInterval(interval);
    init();
}

nomi.focus();
submitButton.addEventListener('click',animation);
window.addEventListener('resize',resetCanvas);
nomi.addEventListener('change',resetCanvas);
deno.addEventListener('change',resetCanvas);


