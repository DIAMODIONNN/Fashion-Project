import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThemeProvider } from '@material-tailwind/react'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
    <ThemeProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
    </ThemeProvider>
)
