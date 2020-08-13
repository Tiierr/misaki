import styles from './header.module.css'
import React from "react";

import Link from "next/link";

export default function Header(){
  return (
    <header>
      <h1><Link href="/"><a>Misaki</a></Link></h1>
      <p><a>A <span className={styles.simple}>simple</span> photo share web app forked by <Link href="https://github.com/7sDream/rikka"><a className={styles.rikka}>Rikka</a></Link>.</a></p>
    </header>
  )
}

