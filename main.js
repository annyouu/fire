'use strict';
{
  (() => {
    class Ball {
      constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.vx = rand(-10, 10);
        this.vy = rand(-10, 10);
        this.color = 'hsla(' + rand(50, 100) + ',' + rand(40, 80) + '%, ' + rand(50, 60) + '%,' + Math.random() + ')';
        this.draw();
        this.move();
      };

      draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fill();
      }

      move() {
        if (this.x + this.r > canvas.width || this.x - this.r < 0) {
          this.vx *= -1;
        }

        if (this.y + this.r > canvas.height || this.y - this.r < 0) {
          this.vy *= -1;
        }
        this.x += this.vx;
        this.y += this.vy;
      } 
    }

    class Stage {
      constructor() {
        this.update();
      }

    }

    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    if (typeof canvas.getContext === 'undefined') {
      return;
    }

    let balls = [];

    function adjustPosition(pos, r, max) {
      // if (x - r < 0) {
      //   x = r;
      // }
      // if (y - r < 0) {
      //   y = r;
      // }
      // if (x + r > canvas.width) {
      //   x = canvas.width - r;
      // }
      // if (y + r > canvas.height) {
      //   y = canvas.height -  r;
      // }
     if (pos - r < 0) {
      return r;
     } else if (pos + r > canvas.width) {
        return max - r;
     } else {
      return pos;
     }
    }

    

    canvas.addEventListener('click', (e) => {
      let x, y, r;
      // x = rand(100, 400);
      // y = rand(100, 200);
      const rect = e.target.getBoundingClientRect();
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
      r = rand(0, 100) < 20 ? rand(50, 80) : rand(10, 35);
      
      //クリックした位置、つまりxからrを引いてみて0より小さかったらcanvas内に押し上げる
      
      x = adjustPosition(x, r, canvas.width); 
      y = adjustPosition(y, r, canvas.height); 
      balls.push(new Ball(x, y, r));
    });

    function rand(min, max) {
      //min - max
      //Math.floor(Math.randow())
      return Math.floor(Math.random() * (max - min) + min);
    }

     function update() {
        let i;
        ctx.fillStyle = '#ecf0f1';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        for (i = 0; i < balls.length; i++) {
          balls[i].draw();
          balls[i].move();
        }
        requestAnimationFrame(() => {
          update();
        });  //なぜrequestAnimationFrame()をなくすとボールが動かなくなるのか
      }

    new Ball(rand(50, canvas.width - 50), rand(50, canvas.height - 50), rand(10, 50));
    update();

    stage = new Stage();
    stage.update();
  })();
}