import { createRoot } from 'react-dom/client'
import '@fontsource-variable/noto-sans-sc'
import '@fontsource-variable/noto-serif-sc'
import '@fontsource/space-mono/400.css'
import '@fontsource/space-mono/700.css'
import './style.css'
import { App } from './App'

createRoot(document.getElementById('root')).render(<App />)
