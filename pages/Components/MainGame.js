import { useEffect, useRef } from "react";
import { createPlayerObject, getKeyPresses } from "../Game components/MainGameLogic";
import styles from "./Styles/Game.module.css";
// import io from "socket.io-client";

function MainGame() {
  let mainGameCanvasRef = useRef();
  let canvasWidth = 700;
  let canvasHeight = 500;
  let playerList = [];

  let drawPlayer = function (player, canvas, ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.drawPlayer();
  };

  useEffect(() => {
    let socket = io();
    const canvas = mainGameCanvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let mainPlayer = createPlayerObject("main", ctx);
    playerList.push(mainPlayer);
    getKeyPresses(document, mainPlayer.keys, mainPlayer);

    socket.emit("i joined", mainPlayer.id);
    console.log("mainPlayer:", mainPlayer.id);

    socket.on("new player joined", function (id, connector) {
      let newPlayer = createPlayerObject("other", ctx);
      newPlayer.id = id;
      playerList.push(newPlayer);
      socket.emit("my info", { me: mainPlayer, connector: connector });
    });

    socket.on("other player", function (them) {
      let otherPlayer = createPlayerObject("other", ctx);
      otherPlayer.id = them.id;
      playerList.push(otherPlayer);
      playerList.forEach((player) => {
        if (player.id == them.id) {
          player.x = them.x;
          player.y = them.y;
          player.sx = them.sx;
          player.sy = them.sy;
        }
      });
    });

    socket.on("other players data", function (playerInformation) {
      for (let i in playerList) {
        let player = playerList[i];
        if (player.id == playerInformation.id) {
          player.x = playerInformation.x;
          player.y = playerInformation.y;
          player.sx = playerInformation.sx;
          player.sy = playerInformation.sy;
        }
      }
    });

    const render = () => {
      for (let i = 0; i < playerList.length; i++) {
        let player = playerList[i];
        drawPlayer(player, canvas, ctx);
      }

      socket.emit("player data", {
        id: mainPlayer.id,
        x: mainPlayer.x,
        y: mainPlayer.y,
        sx: mainPlayer.sx,
        sy: mainPlayer.sy,
      });

      setTimeout(() => {
        animationFrameId = window.requestAnimationFrame(render);
      }, 10000 / 150);
    };
    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div>
      <canvas
        className={styles.blackBorder}
        width={canvasWidth}
        height={canvasHeight}
        ref={mainGameCanvasRef}></canvas>
    </div>
  );
}

export default MainGame;
