import "./globals.css";

export const metadata = {
  title: "AI Video Studio",
  description: "One prompt to video with AI visuals and audio"
};

export default function RootLayout({ children }) {
  return <html lang="en"><body>{children}</body></html>;
}