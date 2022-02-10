import {restrict} from '@/utils'
import {history} from './history';

export class Drawing {
    constructor() {
        this.showCanvas = null;
        this.sourceCanvas = null;
        this.showCanvasCtx = null;
        this.sourceCanvasCtx = null;
        this.imageData = [];

        this.size = 16;
        this.scale = 160;

        this.lastX = 0;
        this.lastY = 0;

        this.translateX = 0;
        this.translateY = 0;

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
        this.scale = this.showCanvas.width / this.size;

        this.sourceCanvas = document.createElement('canvas');
        window.sourceCanvas = this.sourceCanvas;
        this.sourceCanvas.width = this.sourceCanvas.height = imageSize;
        this.sourceCanvasCtx = this.sourceCanvas.getContext('2d');
        this.sourceCanvasCtx.imageSmoothingEnabled = false;
        this.sourceCanvasCtx.webkitImageSmoothingEnabled = false;
        this.sourceCanvasCtx.mozImageSmoothingEnabled = false;

        this.imageData = this.sourceCanvasCtx.getImageData(0, 0, imageSize, imageSize);
        history.record(this.imageData.data);
    }

    getIndex (x, y) {
        return (y * this.size + x) * 4;
    }

    restrictPosition (position) {
        return {
            x: restrict(position.x, 0, this.size - 1),
            y: restrict(position.y, 0, this.size - 1)
        }
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
            r: this.imageData.data[this.getIndex(position.x - this.translateX, position.y - this.translateY)],
            g: this.imageData.data[this.getIndex(position.x - this.translateX, position.y - this.translateY) + 1],
            b: this.imageData.data[this.getIndex(position.x - this.translateX, position.y - this.translateY) + 2],
            a: this.imageData.data[this.getIndex(position.x - this.translateX, position.y - this.translateY) + 3] / 255
        };
    }

    setPixelColor (position, rgba) {
        this.imageData.data[this.getIndex(position.x - this.translateX, position.y - this.translateY)] = rgba.r;
        this.imageData.data[this.getIndex(position.x - this.translateX, position.y - this.translateY) + 1] = rgba.g;
        this.imageData.data[this.getIndex(position.x - this.translateX, position.y - this.translateY) + 2] = rgba.b;
        this.imageData.data[this.getIndex(position.x - this.translateX, position.y - this.translateY) + 3] =
            255 * rgba.a;
    }

    putImageData(imageData) {
        if (imageData) {
            this.imageData = new ImageData(Uint8ClampedArray.of(...imageData), this.size, this.size);
        }
        this.sourceCanvasCtx.putImageData(this.imageData, 0, 0);
        this.showCanvasCtx.drawImage(this.sourceCanvas, 0, 0, this.showCanvas.width, this.showCanvas.height);
    }

    drawPoint (position, rgba) {
        const pos = this.restrictPosition(position);

        if (rgba) { // pencil
            this.setPixelColor(pos, rgba);
            this.sourceCanvasCtx.globalCompositeOperation = 'copy';
        } else { // eraser
            this.setPixelColor(pos, this.emptyColor);
            this.sourceCanvasCtx.globalCompositeOperation = 'destination-out';
        }

        this.putImageData();
        this.setLast(pos);
    }

    drawLine (current, rgba, last) {
        const cur = this.restrictPosition(current);

        if (rgba) { // pencil
            this.sourceCanvasCtx.globalCompositeOperation = 'copy';
        } else { // eraser
            this.sourceCanvasCtx.globalCompositeOperation = 'destination-out';
            rgba = this.emptyColor;
        }
        last = last ?? this.getLast();

        let dx = Math.abs(cur.x - last.x);
        let dy = Math.abs(cur.y - last.y);

        const xDir = cur.x - last.x >= 0 ? 1 : -1;
        const yDir = cur.y - last.y >= 0 ? 1 : -1;

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

        this.putImageData();
        this.setLast(cur);
    }

    translate(position) {
        this.translateX += position.x - this.lastX;
        this.translateY += position.y - this.lastY;
        this.showCanvasCtx.translate((position.x - this.lastX) * this.scale, (position.y - this.lastY) * this.scale);
        this.showCanvasCtx.drawImage(this.sourceCanvas, 0, 0, this.showCanvas.width, this.showCanvas.height);
        this.setLast(position);
    }
}
