// app/layout.tsx

import React from 'react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="root-layout">
          {children}
        </div>
      </body>
    </html>
  );
}
