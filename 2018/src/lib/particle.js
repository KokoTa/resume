/*
 * @Author: KokoTa
 * @Date: 2018-12-12 15:11:11
 * @Last Modified by: KokoTa
 * @Last Modified time: 2018-12-15 20:52:19
 */

class Ball {
  /**
   * 粒子构造参数
   * @param {Number} x 粒子的 X 轴坐标
   * @param {Number} y 粒子的 Y 轴坐标
   * @param {Number} r 粒子半径
   * @param {Number} speedX 粒子 X 轴速度
   * @param {Number} speedY 粒子 Y 轴速度
   * @param {String} color 粒子颜色
   * @param {Number} acX 粒子 X 轴加速度
   * @param {Number} acY 粒子 Y 轴加速度
   */
  constructor(x, y, r, speedX, speedY, color, acX, acY) {
    this.x = x;
    this.y = y;
    this.radius = r;
    this.originSpeedX = speedX;
    this.originSpeedY = speedY;
    this.originAcX = acX;
    this.originAcY = acY;
    this.speedX = speedX;
    this.speedY = speedY;
    this.color = color;
    this.acX = acX;
    this.acY = acY;
  }
  // 获取 -originSpeed ~ originSpeed 范围内的某个值
  randomSpeed(originSpeed) {
    const speed = (Math.random() * originSpeed * 2) - originSpeed;
    // 速度不能太小，否则粒子会抽搐
    if (speed < 0.1 && speed > -0.1) return this.randomSpeed(originSpeed);
    return speed;
  }
  // 绘制小球
  draw(context) {
    // 改变位置
    this.x += this.speedX;
    this.y += this.speedY;

    // 通过加速度来改变速度
    this.speedX -= this.acX;
    this.speedY -= this.acY;

    // 当速度大于最大速度时，改变加速度方向
    if (this.speedX > this.originSpeedX) {
      this.acX = this.originAcX;
    }
    // 当速度小于最小速度时，改变加速度方向
    else if (this.speedX < -this.originSpeedX) {
      this.acX = -this.originAcX;
    }
    if (this.speedY > this.originSpeedY) {
      this.acY = this.originAcY;
    }
    else if (this.speedY < -this.originSpeedY) {
      this.acY = -this.originAcY;
    }

    // 当其中一个方向的速度接近 0 时，重新赋予速度，速度是随机的
    if (Math.abs(this.speedX) - 0.01 < 0 || Math.abs(this.speedY) - 0.01 < 0) {
      this.speedX = this.randomSpeed(this.originSpeedX);
      this.speedY = this.randomSpeed(this.originSpeedY);
    }

    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
    context.closePath();
    context.fillStyle = this.color;
    context.fill();
  }
}

class Generator {
  /**
   * 生成器构造函数
   * @param {String} id 指向画布的选择器
   * @param {Number} number 粒子数量
   * @param {Array} radiusRange 粒子半径范围
   * @param {Array} speedRange 粒子初始速度范围
   * @param {String} color 粒子颜色
   * @param {Number} acX 粒子 X 轴加速度
   * @param {Number} acY 粒子 Y 轴加速度
   */
  constructor(id, number=500, radiusRange=[2, 5], speedRange=[-0.5, 0.5], color='rgba(255, 255, 255, .3)', acX=0.01, acY=0.01) {
    this.canvas = document.querySelector(id);
    this.context = this.canvas.getContext('2d');
    this.balls = [];
    this.number = number; // 粒子数量
    this.radiusRange = radiusRange; // 半径范围
    this.speedRange = speedRange; // 移动速度
    this.color = color; // 粒子颜色
    this.acX = acX; // X 方向加速度
    this.acY = acY; // Y 方向加速度
    this.clientWidth = document.documentElement.clientWidth; // 画布宽度
    this.clientHeight = document.documentElement.clientHeight; // 画布高度
    this.animation = null; // 动画定时器
    this.timer = null; // 窗口大小改变节流定时器
  }
  // 随机位置
  randomPosition() {
    const randomX = this.getFromRange(0, this.clientWidth);
    const randomY = this.getFromRange(0, this.clientHeight);
    return { x: randomX, y: randomY };
  }
  // 获取 min ~ max 内的某个值
  getFromRange(min, max) {
    const value = (Math.random() * (max - min + 1)) + min;
    // 速度不能太小，否则粒子会抽搐
    if (value < 0.1 && value > -0.1) return this.getFromRange(min, max);
    return value;
  }
  // 初始化
  init() {
    // 画布大小自适应
    window.addEventListener('resize', () => {
      this.clientWidth = document.documentElement.clientWidth; // 画布宽度
      this.clientHeight = document.documentElement.clientHeight; // 画布高度
      // 节流
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.balls = [];
        window.cancelAnimationFrame(this.animation);
        this.init();
      }, 500);
    });

    // 设置画布大小为全屏（不要设置成百分比）
    this.canvas.width = this.clientWidth;
    this.canvas.height = this.clientHeight;

    const number = this.number;
    // 获取小球列表
    for(let i = 0; i < number; i++) {
      const { x, y } = this.randomPosition();
      const speedX = this.getFromRange(...this.speedRange);
      const speedY = this.getFromRange(...this.speedRange);
      const radius = this.getFromRange(...this.radiusRange);
      const acX = this.acX;
      const acY = this.acY;
      const color = this.color;
      this.balls.push(new Ball(x, y, radius, speedX, speedY, color, acX, acY));
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
      ball.draw(this.context);
    }
    this.animation = window.requestAnimationFrame(this.draw.bind(this));
  }
}

export default Generator;