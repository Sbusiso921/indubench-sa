import "./globals.css";

export const metadata = {
  title: "InduBench SA",
  description: "Industry Performance Benchmarking Tool",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}