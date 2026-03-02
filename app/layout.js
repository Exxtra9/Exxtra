export const metadata = {
  title: "Headline Hero",
  description: "AI Headline Game"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{fontFamily:"sans-serif", background:"#f4f4f4"}}>
        {children}
      </body>
    </html>
  );
}
