import { type ReactNode } from 'react';
import { render, type RenderOptions } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { AuthProvider } from './components/contexts/auth-context.tsx';
import { ProductsProvider } from './components/contexts/products-context.tsx';

function AllProviders({ children }: { children: ReactNode }) {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProductsProvider>{children}</ProductsProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export function renderWithProviders(
  ui: ReactNode,
  options?: Omit<RenderOptions, 'wrapper'>,
) {
  return render(ui, { wrapper: AllProviders, ...options });
}
