import type { AppProps } from 'next/app';
import '@/styles/styles.css';
import { Roboto_Slab } from '@next/font/google';
import Head from 'next/head';

// If loading a variable font, you don't need to specify the font weight
const roboto = Roboto_Slab({ subsets: ['latin'] });

export default function MyApp({ Component, pageProps }: AppProps) {
  return (<>
    <Head>
      <title>Axie Replays - Origins overlay</title>
      <meta name="description" content="This is a web overlay meant to generate a web overlay for axie infinity origins battle replays, it can create an overlay with battle axies, cards, runes and charms." key="desc" />
      <meta property="og:title" content="Axie Replays - Origins overlay" />
      <meta property="og:description" content="This is a web overlay meant to generate a web overlay for axie infinity origins battle replays, it can create an overlay with battle axies, cards, runes and charms." />
      <meta property="og:image" content="https://origins-overlay.alexpedersen.dev/apple-icon.png" />
      <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png" />
      <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png" />
      <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png" />
      <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png" />
      <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png" />
      <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png" />
      <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png" />
      <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png" />
      <link rel="icon" type="image/png" sizes="192x192" href="/android-icon-192x192.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/manifest.json" />
      <meta name="msapplication-TileColor" content="#000" />
      <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
      <meta name="theme-color" content="#000" />
    </Head>
    <main className={roboto.className}>
      <Component {...pageProps} />
    </main>
  </>
  );
}
