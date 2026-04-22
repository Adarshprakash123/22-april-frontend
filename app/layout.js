import "./globals.css";

export const metadata = {
  title: "StoryBoard Blog",
  description: "A simple blogging web app with reader and admin tools",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
