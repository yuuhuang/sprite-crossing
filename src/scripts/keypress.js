// eslint-disable-next-line max-lines-per-function
export const toolsKeypress = that => {
    // eslint-disable-next-line max-lines-per-function
    window.addEventListener('keydown', e => {
        e.preventDefault ? e.preventDefault() : e.returnValue = false;

        if (!e.ctrlKey) {
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
                case ' ':
                    that.tool = 'move-board';
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
        }

        return false;
    })
}

export const swatchKeypress = that => {
    window.addEventListener('keydown', e => {
        e.preventDefault ? e.preventDefault() : e.returnValue = false;

        if ((e.key === 's' || e.key === 'S') && !e.ctrlKey && !e.shiftKey) {
            that.showSwatch = !that.showSwatch;
        }

        return false;
    })
}

export const colorsKeypress = that => {
    window.addEventListener('keydown', e => {
        e.preventDefault ? e.preventDefault() : e.returnValue = false;

        if ((e.key === 'c' || e.key === 'C') && !e.ctrlKey && !e.shiftKey) {
            that.showColors = !that.showColors;
        }

        return false;
    })
}

export const swapColorKeypress = that => {
    window.addEventListener('keydown', e => {
        e.preventDefault ? e.preventDefault() : e.returnValue = false;

        if ((e.key === 'x' || e.key === 'X') && !e.ctrlKey && !e.shiftKey) {
            that.swap();
        }

        return false;
    })
}

export const optionsKeypress = that => {
    window.addEventListener('keydown', e => {
        e.preventDefault ? e.preventDefault() : e.returnValue = false;
        if (e.ctrlKey && !e.shiftKey) {
            switch (e.key) {
                case 'f':
                    that.$refs.reset.click();
                    break;
                case 'g':
                    that.$refs.grid.click();
                    break;
                case 'z':
                    that.$refs.undo.click();
                    break;
                case 'y':
                    that.$refs.redo.click();
                    break;
                case 's':
                    that.$refs.save.click();
                    break;
                default:
                    break;
            }
        }

        return false;
    })
}