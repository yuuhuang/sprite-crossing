import {history} from '@/pages/Create/Board/history';

let toolsEventListener,
    swatchEventListener,
    colorsEventListener,
    swapColorEventListener,
    optionsEventListener;

// eslint-disable-next-line max-lines-per-function
export const toolsKeypress = that => {
    // eslint-disable-next-line max-lines-per-function
    toolsEventListener = e => {
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
                    that.tool = 'move-object';
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
    };
    window.addEventListener('keydown', toolsEventListener);
}

export const swatchKeypress = that => {
    swatchEventListener = e => {
        e.preventDefault ? e.preventDefault() : e.returnValue = false;

        if ((e.key === 's' || e.key === 'S') && !e.ctrlKey && !e.shiftKey) {
            that.showSwatch = !that.showSwatch;
        }

        return false;
    };
    window.addEventListener('keydown', swatchEventListener);
}

export const colorsKeypress = that => {
    colorsEventListener = e => {
        e.preventDefault ? e.preventDefault() : e.returnValue = false;

        if ((e.key === 'c' || e.key === 'C') && !e.ctrlKey && !e.shiftKey) {
            that.showColors = !that.showColors;
        }

        return false;
    };
    window.addEventListener('keydown', colorsEventListener);
}

export const swapColorKeypress = that => {
    swapColorEventListener = e => {
        e.preventDefault ? e.preventDefault() : e.returnValue = false;

        if ((e.key === 'x' || e.key === 'X') && !e.ctrlKey && !e.shiftKey) {
            that.swap();
        }

        return false;
    };
    window.addEventListener('keydown', swapColorEventListener);
}

export const optionsKeypress = that => {
    optionsEventListener = e => {
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
                    if (history.canUndo()) {
                        that.$refs.undo.click();
                    }
                    break;
                case 'y':
                    if (history.canRedo()) {
                        that.$refs.redo.click();
                    }
                    break;
                case 's':
                    that.$refs.save.click();
                    break;
                default:
                    break;
            }
        }

        return false;
    };
    window.addEventListener('keydown', optionsEventListener);
}

export const removeAllKeypress = () => {
    window.removeEventListener('keydown', toolsEventListener);
    window.removeEventListener('keydown', swatchEventListener);
    window.removeEventListener('keydown', colorsEventListener);
    window.removeEventListener('keydown', swapColorEventListener);
    window.removeEventListener('keydown', optionsEventListener);
}

export const addAllKeypress = () => {
    window.addEventListener('keydown', toolsEventListener);
    window.addEventListener('keydown', swatchEventListener);
    window.addEventListener('keydown', colorsEventListener);
    window.addEventListener('keydown', swapColorEventListener);
    window.addEventListener('keydown', optionsEventListener);
}

export const preventCtrlS = () => {
    window.addEventListener('keydown', e => {
        if (e.ctrlKey && e.key.toLowerCase() === 's') {
            e.preventDefault ? e.preventDefault() : e.returnValue = false;
        }
    })
}