import {AuthProvider} from "./components/contexts/auth-context.tsx";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from "react-router";
import './index.css'
import App from './App.tsx'
import { ProductsProvider } from './components/contexts/products-context.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
            <AuthProvider>
                <ProductsProvider>
                    <App />
                </ProductsProvider>
            </AuthProvider>
      </BrowserRouter>
  </StrictMode>,
)
