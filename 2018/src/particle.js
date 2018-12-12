/*
 * @Author: KokoTa
 * @Date: 2018-12-12 15:11:11
 * @Last Modified by: KokoTa
 * @Last Modified time: 2018-12-12 17:57:07
 */

 /**
  * 粒子类
  */
class Ball {
  constructor(x, y, r, speed, color) {
    this.x = x;
    this.y = y;
    this.radius = r;
    this.speed = speed;
    this.color = color;
  }
  // TODO 改为移动一段距离后变换方向
  randomDistance(speed) {
    const dis = (Math.random() * speed * 2) - speed;
    if (dis === 0) return 1;
    return dis;
  }
  // 绘制小球
  draw(context) {
    // 改变位置
    const disX = this.randomDistance(this.speed);
    const disY = this.randomDistance(this.speed);
    this.x += disX;
    this.y += disY;

    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
    context.closePath();
    context.fillStyle = this.color;
    context.fill();
  }
}

/**
 * 生成器
 */
class Generator {
  constructor(id, number = 10, radiusRange = [4, 10],  speedRange = [0.5, 0.8], color = 'lightgray') {
    this.canvas = document.querySelector(id);
    this.context = this.canvas.getContext('2d');
    this.balls = [];
    this.number = number;
    this.radiusRange = radiusRange;
    this.speedRange = speedRange;
    this.color = color;
    this.clientWidth = this.canvas.clientWidth;
    this.clientHeight = this.canvas.clientHeight;
  }
  // 随机位置
  randomPosition() {
    const randomX = this.getFromRange(0, this.clientWidth);
    const randomY = this.getFromRange(0, this.clientHeight);
    return { x: randomX, y: randomY };
  }
  // 范围内随机取值
  getFromRange(min = 0, max = 100) {
    const value = (Math.random() * (max - min + 1)) + min;
    if (value === 0) return this.getFromRange(min, max);
    return value;
  }
  // 初始化
  init() {
    const number = this.number;
    // 获取小球列表
    for(let i = 0; i < number; i++) {
      const { x, y } = this.randomPosition();
      const speed = this.getFromRange(...this.speedRange);
      const radius = this.getFromRange(...this.radiusRange);
      const color = this.color;
      this.balls.push(new Ball(x, y, radius, speed, color));
    }
    // 开始绘制
    this.draw();
  }
  // 绘制
  draw() {
    // 清空画布
    this.context.fillStyle= 'black';
    this.context.fillRect(0, 0, this.clientWidth, this.clientHeight);
    // 绘制小球
    for(let i = 0; i < this.balls.length; i++) {
      const ball = this.balls[i];
      if (i === 1) {
        console.log(ball.speed);
      }
      ball.draw(this.context);
    }
    window.requestAnimationFrame(this.draw.bind(this));
  }
}

export default Generator;