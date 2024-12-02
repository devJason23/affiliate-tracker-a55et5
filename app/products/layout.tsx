// app/products/layout.tsx

import React from 'react';

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <header className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold">Products Page</h1>
          </header>
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
