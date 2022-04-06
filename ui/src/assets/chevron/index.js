import Vue from 'vue'

const req = require.context('./', false, /\.(svg)$/i);

export const chevrons = req.keys().map(key => {
  const [name] = key.match(/\w+-\w+/);
  // console.log(name);

  return Vue.component(name, req(key))
});