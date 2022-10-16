import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { Box, Flex, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Textarea } from "@chakra-ui/react";
import React, { ChangeEvent, UIEvent } from "react";
import { tad2latex } from "../utils/utils";

const Home: NextPage = () => {
  const [output, setOutput] = React.useState("");
  const [fontSize, setFontSize] = React.useState(1.15);
  const [textAreaSize, setTextareaSize] = React.useState(50);
  const [ignoreScroll, setIgnoreScroll] = React.useState(false);

  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setOutput(tad2latex(e.target.value));
  }

  const handleScroll = (e: UIEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement;
    if (!ignoreScroll) {
      if (target.id === 'latex-textarea') {
        document.querySelector('#tad-textarea')!.scrollTo(0, target.scrollTop);
      } else {
        document.querySelector('#latex-textarea')!.scrollTo(0, target.scrollTop);
      }
    }
    setIgnoreScroll(!ignoreScroll);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>tad2latex</title>
        <meta name="description" content="Generated by create next app"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <main className={styles.main}>
        <Slider aria-label='slider-ex-1' defaultValue={50} marginBottom={6} step={0.1}
                onChange={setTextareaSize}>
          <SliderTrack height={2}>
            <SliderFilledTrack/>
          </SliderTrack>
          <SliderThumb height={4} width={4}/>
        </Slider>
        <Flex width='100%' height='100vh'
              fontFamily='Consolas,Monaco,Lucida Console,Liberation Mono,
                          DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New, monospace'
              fontSize={`${fontSize}rem`} color='whiteish'>
          <Textarea width={`${textAreaSize}%`} height='100%' id='tad-textarea'
                    resize='none'
                    backgroundColor='editor'
                    spellCheck={false}
                    fontSize='inherit'
                    color='inherit'
                    placeholder="TADs y módulos"
                    onChange={handleInput}
                    onScroll={handleScroll}/>
          <Textarea width={`${100 - textAreaSize}%`} height='100%' readOnly={true} resize='none' id='latex-textarea'
                    backgroundColor='editor'
                    spellCheck={false}
                    fontSize='inherit'
                    color='inherit'
                    placeholder="Pseudo-conversión a LaTeX"
                    onScroll={handleScroll}
                    value={output}/>
        </Flex>
      </main>

      {/*<footer className={styles.footer}>*/}
      {/*  <a*/}
      {/*    href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"*/}
      {/*    target="_blank"*/}
      {/*    rel="noopener noreferrer"*/}
      {/*  >*/}
      {/*    Powered by{' '}*/}
      {/*    <span className={styles.logo}>*/}
      {/*      <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />*/}
      {/*    </span>*/}
      {/*  </a>*/}
      {/*</footer>*/}
    </div>
  )
}

export default Home
