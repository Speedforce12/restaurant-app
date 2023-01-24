import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import Hero from "@/components/Hero";
import MenuContainer from "@/components/MenuContainer";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Bell Fresh</title>
        <meta name='description' content='Home page of Bell Fresh' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='mx-auto flex max-w-[1400px] flex-col  space-y-7 p-8'>
        <Hero />
        <MenuContainer />
      </main>
    </>
  );
}
