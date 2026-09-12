import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Self-hosted fonts - sem request externo ao Google Fonts
import '@fontsource/outfit/300.css'
import '@fontsource/outfit/400.css'
import '@fontsource/outfit/500.css'
import '@fontsource/outfit/600.css'
import '@fontsource/lora/400.css'
import '@fontsource/lora/400-italic.css'
import '@fontsource/lora/500.css'
import '@fontsource/lora/600.css'
import '@fontsource/lora/700.css'
import '@fontsource/cormorant-garamond/400.css'
import '@fontsource/cormorant-garamond/400-italic.css'
import '@fontsource/cormorant-garamond/600.css'
import '@fontsource/cormorant-garamond/700.css'
import '@fontsource/caveat/400.css'
import '@fontsource/caveat/500.css'
import '@fontsource/caveat/600.css'

import './index.css'
import App from './App.jsx'

/**
 * Depois de um deploy, o service worker novo assume o controle desta aba, mas
 * os chunks JS já baixados continuam em memória — foi assim que o mapa antigo
 * sobreviveu a um deploy inteiro. Recarrega uma única vez quando a troca
 * acontece, para que o visitante nunca fique preso numa versão velha.
 */
if ('serviceWorker' in navigator) {
  // Na primeira instalação o `controllerchange` também dispara, e aí não há
  // versão anterior para substituir — recarregar ali seria um flash inútil.
  const tinhaControlador = Boolean(navigator.serviceWorker.controller)
  let recarregando = false

  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (!tinhaControlador || recarregando) return
    recarregando = true
    window.location.reload()
  })
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
