import './globals.css';

export const metadata = {
  title: '速度转换工具 | 时速配速互换',
  description: '跑步机时速和户外配速的转换工具',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>
        <main className="flex justify-center items-center min-h-screen bg-gray-100">
          {children}
        </main>
      </body>
    </html>
  );
}
