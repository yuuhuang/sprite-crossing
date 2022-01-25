export const computePx = (val, func) => `${func(val.match(/[0-9]+/g)[0])}px`;

export const fixTwoDecimal = num => (Number.isInteger(num) ? num : num.toFixed(2));

export const rgba2hexa = rgba => {
    const result = rgba.slice(0, 3).map(item => {
        const hex = Number(item).toString(16);

        return hex.length > 1 ? hex : `0${hex}`;
    });

    return `#${result.join('')}${(rgba[3] * 0xff).toString(16)}`
}

export const hsla2hexa = hsla => {
    const a = hsla[1] * Math.min(hsla[2], 1 - hsla[2]);
    const f = (n, k = (n + hsla[0] / 30) % 12) => hsla[2] - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);

    return rgba2hexa([Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255), hsla[3]]);
}