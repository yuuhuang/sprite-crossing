export class Drawing {
    constructor() {
        this.showCanvas = null;
        this.sourceCanvas = null;

        this.size = 16;
        this.imageData = [];

        this.lastX = 0;
        this.lastY = 0;

        this.emptyColor = {
            r: 255, g: 255, b: 255, a: 0
        };
    }

    init (canvasArg, imageSize) {
        this.size = imageSize;

        this.showCanvas = canvasArg;
        this.showCanvasCtx = this.showCanvas.getContext('2d');
        this.showCanvasCtx.imageSmoothingEnabled = false;
        this.showCanvasCtx.webkitImageSmoothingEnabled = false;
        this.showCanvasCtx.mozImageSmoothingEnabled = false;
        this.showCanvasCtx.globalCompositeOperation = 'copy';

        this.sourceCanvas = document.createElement('canvas');
        this.sourceCanvas.width = this.sourceCanvas.height = imageSize;
        this.sourceCanvasCtx = this.sourceCanvas.getContext('2d');
        this.sourceCanvasCtx.imageSmoothingEnabled = false;
        this.sourceCanvasCtx.webkitImageSmoothingEnabled = false;
        this.sourceCanvasCtx.mozImageSmoothingEnabled = false;

        this.imageData = this.sourceCanvasCtx.getImageData(0, 0, imageSize, imageSize);
    }

    getIndex (x, y) {
        return (y * this.size + x) * 4;
    }

    getLast () {
        return {x: this.lastX, y: this.lastY}
    }

    setLast (position) {
        this.lastX = position.x;
        this.lastY = position.y;
    }

    getPixelColor (position) {
        return {
            r: this.imageData.data[this.getIndex(position.x, position.y)],
            g: this.imageData.data[this.getIndex(position.x, position.y) + 1],
            b: this.imageData.data[this.getIndex(position.x, position.y) + 2],
            a: this.imageData.data[this.getIndex(position.x, position.y) + 3] / 255
        };
    }

    setPixelColor (position, rgba) {
        this.imageData.data[this.getIndex(position.x, position.y)] = rgba.r;
        this.imageData.data[this.getIndex(position.x, position.y) + 1] = rgba.g;
        this.imageData.data[this.getIndex(position.x, position.y) + 2] = rgba.b;
        this.imageData.data[this.getIndex(position.x, position.y) + 3] = 255 * rgba.a;
    }

    drawPoint (position, rgba) {
        if (rgba) { // pencil
            this.setPixelColor(position, rgba);
            this.sourceCanvasCtx.globalCompositeOperation = 'copy';
        } else { // eraser
            this.setPixelColor(position, this.emptyColor);
            this.sourceCanvasCtx.globalCompositeOperation = 'destination-out';
        }
        this.sourceCanvasCtx.putImageData(this.imageData, 0, 0);
        this.showCanvasCtx.drawImage(this.sourceCanvas, 0, 0, this.showCanvas.width, this.showCanvas.height);

        this.setLast(position);
    }

    drawLine (current, rgba, last) {
        if (rgba) { // pencil
            this.sourceCanvasCtx.globalCompositeOperation = 'copy';
        } else { // eraser
            this.sourceCanvasCtx.globalCompositeOperation = 'destination-out';
            rgba = this.emptyColor;
        }
        last = last ?? this.getLast();

        let dx = Math.abs(current.x - last.x);
        let dy = Math.abs(current.y - last.y);

        const xDir = current.x - last.x >= 0 ? 1 : -1;
        const yDir = current.y - last.y >= 0 ? 1 : -1;

        let lineX = last.x;
        let lineY = last.y;

        const step = dx >= dy ? dx : dy;
        dx /= step;
        dy /= step;

        let i = 0
        while (i < step) {
            this.setPixelColor({x: Math.floor(lineX), y: Math.floor(lineY)}, rgba);
            lineX += (dx * xDir)
            lineY += (dy * yDir)
            i += 1
        }
        this.setPixelColor({x: Math.floor(lineX), y: Math.floor(lineY)}, rgba);
        this.sourceCanvasCtx.putImageData(this.imageData, 0, 0);
        this.showCanvasCtx.drawImage(this.sourceCanvas, 0, 0, this.showCanvas.width, this.showCanvas.height);

        this.lastX = current.x;
        this.lastY = current.y;
    }
}
