import type { Metadata } from "next";
import StyledComponentsRegistry from './_lib/styledComponentsRegistry'
import "./globals.css";
import localFont from "next/font/local";
import { GameContextProvider } from "./_hooks/useGameContext";
import { ScoreContextProvider } from "./_hooks/useScoreContext";

const retroGamingRegular = localFont({
  src: '../../public/retro-gaming.ttf',
  variable: '--font-retro-regular',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Tetris",
  description: "Retro Tetris game with React",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <GameContextProvider>
            <ScoreContextProvider>
              {children}
            </ScoreContextProvider>
          </GameContextProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
