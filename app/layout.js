import "./globals.css";
import Script from "next/script";

export const metadata = {
  title: "StoryBoard Blog",
  description: "A simple blogging web app with reader and admin tools",
  other: {
    "google-adsense-account": "ca-pub-5787589281140429",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">

      <body className="min-h-full flex flex-col">
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5787589281140429"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        {children}
      </body>
    </html>
  );
}
