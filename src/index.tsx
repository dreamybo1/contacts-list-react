import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '@app/App'
import "@styles/style.css";
import StoreProvider from '@shared/store';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StoreProvider>
      <App />
    </StoreProvider>
  </StrictMode>,
)
