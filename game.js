import kaboom from "https://unpkg.com/kaboom/dist/kaboom.mjs";

kaboom({
  global: true,
  fullscreen: true,
  scale: 1,
  debug: true,
  background: [51, 151, 255],
});
loadSprite("bird", "sprites/bird.png");
loadSprite("base", "sprites/base.png");
loadSprite("pipe", "sprites/pipe-green.png");
loadSprite("pipeUp", "sprites/pipe-green-up.png");
loadSprite("gameover", "sprites/gameover.png");
loadSound("wing", "audio/wing.ogg");
loadSound("hit", "audio/hit.ogg");

scene("game", () => {
  // adding base
  const base = add([
    sprite("base"),
    pos(0, height()),
    area(),
    origin("botleft"),
    scale(6, 1),
    solid(),
    color(127, 200, 255),
    "base",
  ]);
  //   adding bird
  const bird = add([
    sprite("bird"),
    pos(80, 40),
    scale(2),
    area(),
    body(),
    "birds",
  ]);
  bird.action(() => {
    if (bird.pos.y < -30) {
      shake();
      addKaboom(bird.pos);
      const music = play("hit", {});

      go("lose");
    }
  });

  function spawnPipe() {
    add([
      sprite("pipe"),
      area(),
      pos(width(), height() + rand(0, 30)),
      origin("botleft"),
      move(LEFT, 240),
      z(-1),
      "pipeBottom",
    ]);
    add([
      sprite("pipeUp"),
      area(),
      pos(width(), height() - (height() + rand(140, 175))),
      move(LEFT, 240),
      z(-1),
      "pipeUP",
    ]);

    wait(rand(0.5, 1.5), spawnPipe);
  }
  spawnPipe();

  bird.onCollide("pipeBottom", () => {
    shake();
    addKaboom(bird.pos);
    const music = play("hit", {});

    wait(0.1, () => {
      go("lose");
    });
  });
  bird.onCollide("pipeUP", () => {
    shake();
    addKaboom(bird.pos);
    const music = play("hit", {});

    wait(0.1, () => {
      go("lose");
    });
  });
  bird.onCollide("base", () => {
    shake();
    addKaboom(bird.pos);
    const music = play("hit", {});

    wait(0.1, () => {
      go("lose");
    });
  });
  onKeyPress("space", () => {
    bird.jump();
    const music = play("wing", {});
  });
  onMousePress("left", () => {
    bird.jump();
    const music = play("wing", {});
  });
});
scene("menu", () => {
  add([text("flappy bird"), pos(700, 80), scale(2), origin("center")]);
  add([
    text("press space or left click to start"),
    pos(center()),
    scale(0.5),
    origin("center"),
  ]);
  onKeyPress("space", () => {
    go("game");
  });
  onMousePress("left", () => {
    go("game");
  });
});

scene("lose", () => {
  add([sprite("gameover"), pos(700, 80), scale(2), origin("center")]);
  add([
    text("press space or left or left click to try again"),
    pos(center()),
    scale(0.5),
    origin("center"),
  ]);
  onKeyPress("space", () => {
    go("game");
  });
  onMousePress("left", () => {
    go("game");
  });
});
go("menu");
