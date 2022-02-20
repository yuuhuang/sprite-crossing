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

        this.geometryLastX = 0;
        this.geometryLastY = 0;

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

    getGeometryLast () {
        return {x: this.geometryLastX, y: this.geometryLastY}
    }

    setGeometryLast (position) {
        this.geometryLastX = position.x;
        this.geometryLastY = position.y;
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
            this.imageData = new ImageData(Uint8ClampedArray.from(imageData), this.size, this.size);
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

        const width = Math.abs(cur.x - last.x), height = Math.abs(cur.y - last.y);
        const longSide = Math.max(width, height);
        const xDir = cur.x - last.x >= 0 ? 1 : -1, yDir = cur.y - last.y >= 0 ? 1 : -1;
        let {x, y} = last;
        const xStep = width / longSide, yStep = height / longSide;

        let i = 0
        while (i < longSide) {
            this.setPixelColor({x: Math.round(x), y: Math.round(y)}, rgba);
            x += (xStep * xDir);
            y += (yStep * yDir);
            i++;
        }
        this.setPixelColor({x: Math.round(x), y: Math.round(y)}, rgba);

        this.putImageData();
        this.setLast(cur);
    }

    drawRect (current, rgba, fill) {
        const pos = this.restrictPosition(current);
        const xLast = this.getGeometryLast().x, yLast = this.getGeometryLast().y;
        const height = Math.abs(pos.y - yLast) + 1,
            width = Math.abs(pos.x - xLast) + 1;
        const xDir = pos.x >= xLast > 0 ? 1 : -1,
            yDir = pos.y >= yLast > 0 ? 1 : -1;
        let drawn = 0;

        if (fill) {
            let drawnLine = 0;
            while (drawn < height * width) {
                this.setPixelColor({x: xLast + xDir * (drawn - drawnLine * width), y: yLast + yDir * drawnLine}, rgba);
                drawn++;
                if (drawn % width === 0) {
                    drawnLine++;
                }
            }
        } else {
            while (drawn < height || drawn < width) {
                if (drawn < height) {
                    this.setPixelColor({x: xLast, y: yLast + yDir * drawn}, rgba);
                    this.setPixelColor({x: pos.x, y: pos.y - yDir * drawn}, rgba);
                }
                if (drawn < width) {
                    this.setPixelColor({x: xLast + xDir * drawn, y: yLast}, rgba);
                    this.setPixelColor({x: pos.x - xDir * drawn, y: pos.y}, rgba);
                }
                drawn++;
            }
        }
        this.putImageData();
    }

    drawArc (current, rgba, fill) {
        const cur = this.restrictPosition(current);
        const xLast = this.getGeometryLast().x, yLast = this.getGeometryLast().y;
        const xCenter = (cur.x + xLast) / 2, yCenter = (cur.y + yLast) / 2;
        const hRadius = Math.abs(cur.y - yLast) / 2, wRadius = Math.abs(cur.x - xLast) / 2;
        let xh = 0, yh = hRadius, xw = wRadius, yw = 0;
        while (yh >= 0) {
            xh = Math.sqrt((1 - yh ** 2 / hRadius ** 2) * wRadius ** 2);
            if (Math.round(xCenter + xh) === Math.round(xCenter - xh)) {
                this.setPixelColor({x: Math.ceil(xCenter + xh), y: Math.round(yCenter + yh)}, rgba);
                this.setPixelColor({x: Math.ceil(xCenter + xh), y: Math.round(yCenter - yh)}, rgba);
                this.setPixelColor({x: Math.floor(xCenter - xh), y: Math.round(yCenter + yh)}, rgba);
                this.setPixelColor({x: Math.floor(xCenter - xh), y: Math.round(yCenter - yh)}, rgba);
                if (fill) {
                    for (let i = Math.floor(xCenter - xh); i <= Math.ceil(xCenter + xh); i++) {
                        this.setPixelColor({x: i, y: Math.round(yCenter + yh)}, rgba);
                        this.setPixelColor({x: i, y: Math.round(yCenter - yh)}, rgba);
                    }
                }
            } else {
                this.setPixelColor({x: Math.round(xCenter + xh), y: Math.round(yCenter + yh)}, rgba);
                this.setPixelColor({x: Math.round(xCenter + xh), y: Math.round(yCenter - yh)}, rgba);
                this.setPixelColor({x: Math.round(xCenter - xh), y: Math.round(yCenter + yh)}, rgba);
                this.setPixelColor({x: Math.round(xCenter - xh), y: Math.round(yCenter - yh)}, rgba);
                if (fill) {
                    for (let i = Math.round(xCenter - xh); i <= Math.round(xCenter + xh); i++) {
                        this.setPixelColor({x: i, y: Math.round(yCenter + yh)}, rgba);
                        this.setPixelColor({x: i, y: Math.round(yCenter - yh)}, rgba);
                    }
                }
            }
            yh--;
        }
        while (xw >= 0) {
            yw = Math.sqrt((1 - xw ** 2 / wRadius ** 2) * hRadius ** 2);
            if (Math.round(yCenter + yw) === Math.round(yCenter - yw)) {
                this.setPixelColor({x: Math.round(xCenter + xw), y: Math.ceil(yCenter + yw)}, rgba);
                this.setPixelColor({x: Math.round(xCenter + xw), y: Math.floor(yCenter - yw)}, rgba);
                this.setPixelColor({x: Math.round(xCenter - xw), y: Math.ceil(yCenter + yw)}, rgba);
                this.setPixelColor({x: Math.round(xCenter - xw), y: Math.floor(yCenter - yw)}, rgba);
            } else {
                this.setPixelColor({x: Math.round(xCenter + xw), y: Math.round(yCenter + yw)}, rgba);
                this.setPixelColor({x: Math.round(xCenter + xw), y: Math.round(yCenter - yw)}, rgba);
                this.setPixelColor({x: Math.round(xCenter - xw), y: Math.round(yCenter + yw)}, rgba);
                this.setPixelColor({x: Math.round(xCenter - xw), y: Math.round(yCenter - yw)}, rgba);
            }
            xw--;
        }
        this.putImageData();
    }

    clearBoard() {
        this.sourceCanvasCtx.clearRect(0, 0, this.size, this.size);
        this.putImageData(this.sourceCanvasCtx.getImageData(0, 0, this.size, this.size).data);
    }

    translate(position) {
        this.translateX += position.x - this.lastX;
        this.translateY += position.y - this.lastY;
        this.showCanvasCtx.translate((position.x - this.lastX) * this.scale, (position.y - this.lastY) * this.scale);
        this.showCanvasCtx.drawImage(this.sourceCanvas, 0, 0, this.showCanvas.width, this.showCanvas.height);
        this.setLast(position);
    }

    download(fileName, size) {
        const downloadCanvas = document.createElement('canvas');
        downloadCanvas.width = downloadCanvas.height = size;
        const downloadCanvasCtx = downloadCanvas.getContext('2d');
        downloadCanvasCtx.imageSmoothingEnabled = false;
        downloadCanvasCtx.webkitImageSmoothingEnabled = false;
        downloadCanvasCtx.mozImageSmoothingEnabled = false;
        downloadCanvasCtx.drawImage(this.showCanvas, 0, 0, size, size);

        const link = document.createElement('a');
        link.href = downloadCanvas.toDataURL();
        link.download = `${fileName}.png`;
        link.click();

        link.remove();
        downloadCanvas.remove();
    }
}
