// see fraction.js for canvas and ctx, and other values

class Ellipse {
    constructor(r, cx, cy) {
        this.r = r
        this.cx = cx;
        this.cy = cy;
        this.point = {
            x : r + cx,
            y : cy
        }
    }

    drawEllipse() {
        ctx.beginPath();
        ctx.strokeStyle = 'rgb(255,255,255)';
        ctx.arc(this.cx,this.cy,this.r, 0, Math.PI * 2, false);
        ctx.stroke();
    }

    addPoint() {
        ctx.beginPath();
        ctx.strokeStyle = 'rgb(255,255,255)';
        ctx.fillStyle =  'rgb(0,0,0)';
        ctx.arc(this.point.x, this.point.y,5, 0, Math.PI * 2, false);
        ctx.fill();
        ctx.stroke();
    }

    updatePoint(angle = 0,speed = 1) {
        if(speed < 1) {speed = 1; window.alert('speed cannot be smaller than 1')}
        this.point.x = this.cx + Math.floor(this.r * Math.cos(angle * speed));
        this.point.y = this.cy + Math.floor(this.r * Math.sin(angle * speed));
    }

    drawLineY(y) {
        ctx.beginPath();
        ctx.moveTo(this.point.x,this.point.y);
        ctx.lineTo(this.point.x,y);
        ctx.strokeStyle = 'rgba(255,255,255,0.5)';
        ctx.closePath();
        ctx.stroke()
    }

    drawLineX(x) {
        ctx.beginPath();
        ctx.moveTo(this.point.x,this.point.y);
        ctx.lineTo(x,this.point.y);
        ctx.strokeStyle = 'rgba(255,255,255,0.5)';
        ctx.closePath();
        ctx.stroke()
    }
}

class Vector {
    constructor() {
        this.x;
        this.y
    }

    colorArray(r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;
    }
}

class LissaCurve {
    constructor() {
        this.path = [];
        this.current = new Vector();
    }

    setX(x) {
        return this.current.x = x;
    }

    setY(y) {
        return this.current.y = y;
    }

    addPoint() {
        this.path.push(this.current);
        this.current = new Vector();
    }
    
    addColor() {
        let r = Math.floor(Math.random()*(255 - 1) + 1);
        let g = Math.floor(Math.random()*(255 - 1) + 1);
        let b = Math.floor(Math.random()*(255 - 1) + 1);
        this.current.colorArray(r,g,b);
    }

    drawCurve() {
        for (let i = 0; i < this.path.length; i++){

            ctx.strokeStyle = `
            rgb(${this.path[i].r},
                ${this.path[i].g},
                ${this.path[i].b})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();

            try {
                ctx.moveTo(this.path[i].x,this.path[i].y);
                ctx.lineTo(this.path[i-1].x,this.path[i-1].y);
            }
            catch {
                ctx.moveTo(this.path[i].x,this.path[i].y);
                ctx.lineTo(this.path[i].x,this.path[i].y);
            }

            ctx.closePath();
            ctx.stroke();
        }
    }
}
