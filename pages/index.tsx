import Head from 'next/head';
import React from "react";
import UploadImage from "../components/uploadImage";
import Header from "../components/header";

export default function Home() {
  return (
    <div className="App">
      <Head>
        <title>Misaki</title>
      </Head>
      <Header/>
      <UploadImage/>
    </div>
  )
}

