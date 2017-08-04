/**
 * Created by admin on 2017/8/3.
 */
require("babel-core/register")({
  presets: ['es2015', 'stage-0']
});
require("babel-polyfill");

module.exports = require('./app');