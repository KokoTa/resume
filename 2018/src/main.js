import './style';
import Generator from './particle';

// 设置画布大小（不要设置成百分比）
const canvas = document.querySelector('#canvas')
const clientWidth = document.documentElement.clientWidth;
const clientHeight = document.documentElement.clientHeight;
canvas.width = clientWidth
canvas.height = clientHeight

// 生成粒子
new Generator('#canvas').init();

