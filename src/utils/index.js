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

// User Agent
export const mobileCheck = () => {
    let check = false;
    // eslint-disable-next-line
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);

    return check;
}