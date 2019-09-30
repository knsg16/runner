var C = document.querySelector("canvas"), img = new Image(), c = C.getContext("2d"), W = C.width, H = C.height, S = 2, cell = 40,
  stroke = 2, gravity = 0.87, rand = (min, max) => Math.round(Math.random() * (max - min)) + min, score = 0, frame = 0,
  framesPerPt = 5, difficulty = 1
  , sq = {
    x: cell * 2 + 1,
    y: cell * 2,
    w: cell,
    h: cell,
    rot: 0,
    xVel: 4,
    yVel: 0,
    minYVel: -15,
    onGrnd: true,
    dead: false,
    jump: function () {
      this.yVel == 0 && this.onGrnd && !this.dead ? (this.yVel = this.minYVel, this.onGrnd = false) : (this.dead && this.y < -this.h ? (score = 0, frame = 0, difficulty = 1, this.x = cell * 2 + 1, this.y = cell, this.rot = 0, this.xVel = 4, this.yVel = 0, this.dead = false, walls = [firstWall]) : void 0);
    }
  },
  sqJump = sq.jump.bind(sq),
  wall = (x, y, w, h) => ({x: x, y: y, w: w, h: h}),
  firstWall = wall(-1, -1, W + 2, cell + 1),
  lastWall = firstWall,
  walls = [firstWall],
  bgFill = c.createLinearGradient(W / 2, 0, W / 2, H),
  floorLine = c.createLinearGradient(0, H / 2, W, H / 2),
  floorFill = c.createLinearGradient(W / 2, H - cell, W / 2, H + cell),
  wallFill,
  vectorX,
  vectorY,
  getVectorX = (a, b) => (a.x + a.w / 2) - (b.x + b.w / 2),
  getVectorY = (a, b) => (H - (a.y + a.h / 2)) - (H - (b.y + b.h / 2)),
  hWidths,
  hHeights,
  collideX,
  collideY,
  render = () => {
    ++frame,
      c.fillStyle = bgFill,
      c.fillRect(0, 0, W, H),
      sq.y -= sq.y >= -sq.h * Math.sqrt(2) ? sq.yVel : 0,
      sq.rot = sq.yVel / sq.minYVel * -90,
      sq.xVel = !sq.dead ? sq.xVel : 0,
      sq.yVel += gravity,
      walls = walls.filter(e => e.x > -e.w),
      c.lineWidth = stroke,
      walls.forEach((e, i) => {
        vectorX = getVectorX(sq, e),
          vectorY = getVectorY(sq, e),
          hWidths = sq.w / 2 + e.w / 2,
          hHeights = sq.h / 2 + e.h / 2,
          collideX = hWidths - Math.abs(vectorX),
          collideY = hHeights - Math.abs(vectorY),
          Math.abs(vectorX) <= hWidths && Math.abs(vectorY) <= hHeights && !sq.dead ? (collideX < collideY && collideX > 0 ? (sq.x -= sq.xVel, sq.dead = true) : (sq.y = e.y + e.h, sq.yVel = 0, sq.onGrnd = true)) : void 0,
          wallFill = c.createLinearGradient(e.x, H - e.h - e.y, e.x, H - e.y),
          wallFill.addColorStop(0, "#171717"),
          wallFill.addColorStop(1, "#0c48db"),
          i > 0 ? (c.fillStyle = wallFill, e.x -= sq.xVel) : c.fillStyle = floorFill,
          c.strokeStyle = i > 0 ? "#f1f1f1" : floorLine,
          c.beginPath(),
          c.rect(e.x, H - e.h - e.y, e.w, e.h),
          c.fill(),
          c.stroke(),
          c.closePath();
      }),
      lastWall = walls[walls.length - 1],
      frame % framesPerPt == 0 && lastWall.x + lastWall.w < W + stroke && !sq.dead ? walls.push(wall(W + rand(0, 9 - difficulty) * cell, cell, rand(1, 4) * cell, rand(1, 3) * cell)) : void 0,
      c.fillStyle = "#fff",
      c.strokeStyle = "#171717",
      c.save(),
      c.beginPath(),
      c.translate(sq.x + sq.w / 2, H - sq.h / 2 - sq.y),
      // c.rotate(sq.rot * Math.PI / 180),
      c.rect(-sq.w / 2, -sq.h / 2, sq.w, sq.h),
      c.globalAlpha = 0,
      c.fill(),
      c.stroke(),
      c.translate(-(sq.x + sq.w / 2), -(H - sq.h / 2 - sq.y)),
      c.closePath(),
      c.restore(),
      score += frame % framesPerPt == framesPerPt - 1 && !sq.dead,
      difficulty += frame % (100 * framesPerPt) == 0 && difficulty <= 9,
      c.fillStyle = "#f1f1f1",
      c.lineWidth = stroke * 2,
      c.font = "bold 40px Calibri, sans-serif",
      c.textAlign = "center",
      c.strokeText(score, W / 2, cell * 1.5),
      c.fillText(score, W / 2, cell * 1.5),
      c.font = "bold 20px Calibri, sans-serif",
      c.fillText("走れおかんちゃん", W / 2 - 150, cell * 1.5),
      img.src = "images/okanchan_reverse.png",
      c.drawImage(img, sq.x, H - sq.h - sq.y, sq.w, sq.h),
      requestAnimationFrame(render);
  };
bgFill.addColorStop(0, "#0c48db"), bgFill.addColorStop(1, "#5785f6"), floorLine.addColorStop(0, "#0c48db"), floorLine.addColorStop(0.5, "#f1f1f1"), floorLine.addColorStop(1, "#0c48db"), floorFill.addColorStop(0, "#0c48db"), floorFill.addColorStop(1, "#171717"), C.width = W * S, C.height = H * S, c.scale(S, S);

//画像オブジェクトを生成


//画像をcanvasに設定
img.onload = function(){
    //400x300に縮小表示
}

