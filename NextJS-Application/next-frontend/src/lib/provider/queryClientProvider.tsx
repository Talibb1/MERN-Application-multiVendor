'use client'
// import { Provider } from 'react-redux'
// import { store } from '@/lib/store/store'
// import { ReactNode } from 'react'

// interface StoreProviderProps {
//   children: ReactNode
// }

// export default function StoreProvider({ children }: StoreProviderProps) {
//   return <Provider store={store}>{children}</Provider>
// }'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
