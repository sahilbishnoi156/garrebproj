import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AK-47 | Gallery",
  description: "Meet AK, an Indian-born hip-hop rapper and beat producer currently based in London, UK. With a passion for music that started at a young age, AK has been honing his skills in the rap game for years and has established himself as a rising star in the industry. Growing up in India, AK was heavily influenced by the vibrant hip-hop scene in the country and quickly developed a love for the genre. After moving to London, he started producing his own beats and crafting his own unique sound, fusing his Indian roots with the gritty, urban feel of the UK rap scene. With a smooth flow and hard-hitting lyrics, AK has been making waves in the underground hip-hop scene, collaborating with other artists and producers to create some of the most innovative and exciting beats in the game. His music is a testament to the power of music to transcend boundaries and bring people together, showcasing the best of both Indian and UK hip-hop cultures",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favic/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favic/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favic/favicon-16x16.png"
        />
        <link rel="manifest" href="/favic/site.webmanifest" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
