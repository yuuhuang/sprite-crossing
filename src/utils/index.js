// Number
export const fixTwoDecimal = num => (Number.isInteger(num) ? num : num.toFixed(2));

export const restrict = (num, min, max) => Math.max(Math.min(num, max ?? Infinity), min ?? -Infinity);

export const isBetween = (x, min, max) => x >= min && x <= max

// Image
export const computePx = (val, func) => `${func(val.match(/[0-9]+/g)[0])}px`;

export const checkRGBAObj = val => {
    if (typeof val !== 'object') {
        return false;
    }
    if (isBetween(val?.r, 0, 255) &&
        isBetween(val?.g, 0, 255) &&
        isBetween(val?.b, 0, 255) &&
        isBetween(val?.a, 0, 1)) {
        return true;
    }

    return false;
}

export const rgba2hexa = rgba => {
    const rgb = rgba.slice(0, 3).map(item => {
        const hex = Number(item).toString(16);

        return hex.length > 1 ? hex : `0${hex}`;
    });
    const [a] = (/\w(.)?/).exec((rgba[3] * 255).toString(16));

    return `#${rgb.join('')}${a.length > 1 ? '' : '0'}${a}`;
}

export const hsla2hexa = hsla => {
    const a = hsla[1] * Math.min(hsla[2], 1 - hsla[2]);
    const f = (n, k = (n + hsla[0] / 30) % 12) => hsla[2] - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);

    return rgba2hexa([Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255), hsla[3]]);
}

// Event
export const debounce = (fn, delay) => {
    let timer;

    // eslint-disable-next-line func-names
    return function(...args) {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(fn.bind(null, ...args), delay);
    };
};

export const throttle = (fn, delay) => {
    let start = new Date();

    // eslint-disable-next-line func-names
    return function(...args) {
        const current = new Date();
        if (current - start >= delay) {
            start = current;
            fn(...args);
        }
    }
}