let showCanvas, sourceCanvas;
let showCanvasCtx, sourceCanvasCtx;

let size = 16;
let imageData;

let lastX = 0;
let lastY = 0;

const getIndex = (x, y) => (y * size + x) * 4;

export const drawing = {
    init(canvasArg, imageSize) {
        size = imageSize;

        showCanvas = canvasArg;
        showCanvasCtx = showCanvas.getContext('2d');
        showCanvasCtx.imageSmoothingEnabled = false;
        showCanvasCtx.webkitImageSmoothingEnabled = false
        showCanvasCtx.mozImageSmoothingEnabled = false

        sourceCanvas = document.createElement('canvas');
        sourceCanvas.width = sourceCanvas.height = imageSize;
        sourceCanvasCtx = sourceCanvas.getContext('2d');
        sourceCanvasCtx.imageSmoothingEnabled = false;
        sourceCanvasCtx.webkitImageSmoothingEnabled = false
        sourceCanvasCtx.mozImageSmoothingEnabled = false

        imageData = sourceCanvasCtx.getImageData(0, 0, imageSize, imageSize);
    },
    colorPixel(position, rgba) {
        imageData.data[getIndex(position.x, position.y)] = rgba.r;
        imageData.data[getIndex(position.x, position.y) + 1] = rgba.g;
        imageData.data[getIndex(position.x, position.y) + 2] = rgba.b;
        imageData.data[getIndex(position.x, position.y) + 3] = 255 * rgba.a;
    },
    drawPoint(position, rgba) {
        this.colorPixel(position, rgba);
        sourceCanvasCtx.putImageData(imageData, 0, 0);
        showCanvasCtx.drawImage(sourceCanvas, 0, 0, showCanvas.width, showCanvas.height);

        lastX = position.x;
        lastY = position.y;
    },
    drawLine(current, rgba, last) {
        last = last ?? {x: lastX, y: lastY};
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
            this.colorPixel({x: Math.floor(lineX), y: Math.floor(lineY)}, rgba);
            lineX += (dx * xDir)
            lineY += (dy * yDir)
            i += 1
        }
        sourceCanvasCtx.putImageData(imageData, 0, 0);
        showCanvasCtx.drawImage(sourceCanvas, 0, 0, showCanvas.width, showCanvas.height);

        lastX = current.x;
        lastY = current.y;
    },
    pencil(position, rgba) {
        this.drawLine(position, rgba, {x: lastX, y: lastY});
    }
};
