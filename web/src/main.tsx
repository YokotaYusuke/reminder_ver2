import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {DefaultReminderRepository} from './repository/ReminderRepository.ts'

const todoRepository = new DefaultReminderRepository()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App todoRepository={todoRepository}/>
  </React.StrictMode>,
)

