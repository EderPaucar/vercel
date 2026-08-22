import { Routes, Route } from 'react-router';
import Mainlayout from '../layouts/Mainlayout';

import Home from '../pages/Home';
import About from '../pages/About';
import Service from '../pages/Services';
import Contact from '../pages/Contact';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard'; // <-- Importar

function AppRoutes() {
    return (
        <Routes>
            <Route element={<Mainlayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/nosotros" element={<About />} />
                <Route path="/servicios" element={<Service />} />
                <Route path="/contacto" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} /> {/* <-- Ruta */}
            </Route>
        </Routes>
    );
}

export default AppRoutes;