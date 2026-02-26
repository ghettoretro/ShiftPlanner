/**
 * @PATH [src/main.jsx]
 * @REV [20260226-0907]
 * @MODULE [ShiftPlanner]
 * @STATUS [DEV]
 * @FILETYPE [UTL|CFG|HOK|SVC|CTX|CMP|WDG|LYT|SCH|STY|RDE|MDL|LST|DSH|KBN|CUI|PUB|LND|MDQ|ADM|CAL|NVZ|NDG|ING|NCA]
 * @DESC [Description (max 80 chars)]
 * @COMPLIANCE [None]
 * -------------------------------------
 * @TODO_START
 * [?] Basic Vite build initialization-created file.
 * @TODO_END
 * =====================================*/

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
