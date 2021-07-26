import Player from "./Player";

export function createPlayerObject(ctx) {
  return new Player({
    healthMax: 100,
    health: 100,
    damage: 10,
    x: 10,
    y: 10,
    width: 32,
    height: 48,
    speed: 7,
    score: 0,
    bulletList: [],
    ammoLeft: [],
    attacking: false,
    reloading: false,
    keys: { up: "w", left: "a", down: "s", right: "d", shoot: " ", reload: "r" },
    needsToReload: false,
    ctx: ctx,
    sx: 0,
    sy: 0,
  });
}

function handleKeydown(keydownEvent, listOfKeysForAction, player) {
  if (keydownEvent.key == listOfKeysForAction.up) {
    player.direction.up = true;
    player.lastFacingDirection = "up";
    player.direction.down = false;
  }
  if (keydownEvent.key == listOfKeysForAction.down) {
    player.direction.down = true;
    player.lastFacingDirection = "down";
    player.direction.up = false;
  }
  if (keydownEvent.key == listOfKeysForAction.right) {
    player.direction.right = true;
    player.lastFacingDirection = "right";
    player.direction.left = false;
  }
  if (keydownEvent.key == listOfKeysForAction.left) {
    player.direction.left = true;
    player.lastFacingDirection = "left";
    player.direction.right = false;
  }
  if (keydownEvent.key == listOfKeysForAction.shoot) {
    player.attacking = true;
  }
}

function handleKeyup(keyUpEvent, listOfKeysForAction, player) {
  if (keyUpEvent.key == listOfKeysForAction.up) {
    player.direction.up = false;
  }
  if (keyUpEvent.key == listOfKeysForAction.down) {
    player.direction.down = false;
  }
  if (keyUpEvent.key == listOfKeysForAction.right) {
    player.direction.right = false;
  }
  if (keyUpEvent.key == listOfKeysForAction.left) {
    player.direction.left = false;
  }
  if (keyUpEvent.key == listOfKeysForAction.shoot) {
    player.attacking = false;
  }
}

export function getKeyPresses(document, listOfKeysForAction, player) {
  document.addEventListener("keydown", (keydownEvent) => {
    handleKeydown(keydownEvent, listOfKeysForAction, player);
  });
  document.addEventListener("keyup", (keyupEvent) => {
    handleKeyup(keyupEvent, listOfKeysForAction, player);
  });
  return () => {
    document.removeEventListener("keydown", (keydownEvent) => {
      handleKeydown(keydownEvent, listOfKeysForAction, player);
    });
    document.removeEventListener("keyup", (keyupEvent) => {
      handleKeyup(keyupEvent, listOfKeysForAction, player);
    });
  };
}

export function checkCollison(firstObjectToCheckCollisionFor, secondObjectToCheckCollisionFor) {
  let obj1 = firstObjectToCheckCollisionFor;
  let obj2 = secondObjectToCheckCollisionFor;
  let obj1X = obj1.collisionBox.x;
  let obj1Y = obj1.collisionBox.y;

  let obj2X = obj2.collisionBox.x;
  let obj2Y = obj2.collisionBox.y;

  if (obj1X.x <= obj2X.xMax && obj1X.xMax >= obj2X.x && obj1Y.y <= obj2Y.yMax && obj1Y.yMax >= obj2Y.y) {
    console.log("colliding");
  }
}
