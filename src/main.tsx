import { createRoot } from 'react-dom/client'
import { lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router'
import '@/styles/global.css'
import { AnimatePresence } from 'motion/react'
const Home = lazy(() => import('@/pages/Home'))
const AddTask = lazy(() => import('@/pages/AddTask'))
const ReorderTasks = lazy(() => import('@/pages/ReorderTasks'))
const Help = lazy(() => import('@/components/Shared/Help'))
const Alert = lazy(() => import('@/components/Shared/Alert'))

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
      <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                  <Route index element={<Home />} />
                  <Route path='/add-task' element={<AddTask />} />
                  <Route path='/reorder' element={<ReorderTasks />} />
            </Routes>
            <Alert key='alert-key'/>
            <Help key='help-key'/>
      </AnimatePresence>
  </BrowserRouter>
)
