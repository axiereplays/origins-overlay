import type { AppProps } from 'next/app';
import '@/styles/styles.css';
import { Roboto_Slab } from '@next/font/google';

// If loading a variable font, you don't need to specify the font weight
const roboto = Roboto_Slab({ subsets: ['latin'] });

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    // The font is applied to the main element
    <main className={roboto.className}>
      <Component {...pageProps} />
    </main>
  );
}
