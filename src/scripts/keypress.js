export const toolKeypress = that => {
    window.addEventListener('keypress', e => {
        switch (e.key) {
            case 'b':
            case 'B':
                that.tool = 'pencil';
                break;
            case 'e':
            case 'E':
                that.tool = 'eraser';
                break;
            case 'i':
            case 'I':
                that.tool = 'eyedropper';
                break;
            case 'g':
            case 'G':
                that.tool = 'bucket';
                break;
            case 'u':
            case 'U':
                that.tool = e.shiftKey ? 'rectangle-outline' : 'rectangle-fill';
                break;
            case 'o':
            case 'O':
                that.tool = e.shiftKey ? 'ellipse-outline' : 'ellipse-fill';
                break;
            case 'v':
            case 'V':
                that.tool = 'move';
                break;
            case 'z':
            case 'Z':
                that.tool = e.shiftKey ? 'zoom-out' : 'zoom-in';
                break;
            case 't':
            case 'T':
                that.showTools = !that.showTools;
                break;
            default:
                break;
        }
    })
}

export const swapColorKeypress = that => {
    window.addEventListener('keypress', e => {
        if (e.key === 'x' || e.key === 'X') {
            that.swap();
        }
    })
}