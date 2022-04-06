import Vue from 'vue'

const req = require.context('./', false, /\.(svg)$/i);

export const tools = req.keys().map(key => {
    const [name] = key.match(/(\w+-?)+/);
    // console.log(name);

    return Vue.component(name, req(key))
});