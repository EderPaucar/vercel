import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Planning from './pages/Planning'
import Costs from './pages/Costs'
import Infrastructure from './pages/Infrastructure'
import Security from './pages/Security'
import Network from './pages/Network'
import Services from './pages/Services'



const App = (): JSX.Element => {
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-4 md:p-6">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/planning" element={<Planning />} />
            <Route path="/costs" element={<Costs />} />
            <Route path="/infrastructure" element={<Infrastructure />} />
            <Route path="/security" element={<Security />} />
            <Route path="/network" element={<Network />} />
            <Route path="/services" element={<Services />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            </Routes>
        </main>
      </div>
    </div>
  )
}

export default App
