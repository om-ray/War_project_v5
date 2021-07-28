import Head from "next/head";
import MainGame from "./Components/MainGame";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>War project</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <script src="/socket.io/socket.io.js"></script>
      <MainGame></MainGame>
    </div>
  );
}
