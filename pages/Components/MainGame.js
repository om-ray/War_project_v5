import { useEffect, useRef } from "react";
import { createPlayerObject, getKeyPresses } from "../Game components/MainGameLogic";
import styles from "./Styles/Game.module.css";
import io from "socket.io-client";

function MainGame() {
  let mainGameCanvasRef = useRef();
  let canvasWidth = 700;
  let canvasHeight = 500;

  let drawPlayer = function (player, canvas, ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.drawPlayer();
  };

  useEffect(() => {
    let socket = io();
    const canvas = mainGameCanvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let newPlayer = createPlayerObject(ctx);
    getKeyPresses(document, newPlayer.keys, newPlayer);

    const render = () => {
      drawPlayer(newPlayer, canvas, ctx);
      setTimeout(() => {
        animationFrameId = window.requestAnimationFrame(render);
      }, 10000 / 150);
    };
    render();

    socket.on("hello", function (text) {
      console.log(text);
    });

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
