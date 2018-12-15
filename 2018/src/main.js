import './lib/tween';
import './style';
import Generator from './lib/particle';
import Show from './lib/show';

// 生成粒子
new Generator('#canvas').init();

// 开始表演
new Show().go();