import { useState } from "react";
import { AppHeader } from "./components/header.tsx";
import { Routes, Route } from 'react-router';
import { Home } from "./components/pages/home/home.tsx";
import Signin from "./components/pages/signin.tsx";
import './App.css'
import Signup from "./components/pages/signup.tsx";
import { AdminDashboard } from "./components/pages/admin-dashboard.tsx";
import { ViewProduct } from "./components/pages/view-product.tsx";
import { CartPage } from "./components/pages/cart.tsx";

function App() {
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <div className="h-full bg-gray-100 grid grid-rows-[70px_1fr] overflow-hidden">
            <AppHeader onSearch={setSearchQuery} />
            <div className="h-full flex flex-row justify-center overflow-y-scroll">
                {/* Route Views */}
                <Routes>
                    <Route path="/" element={<Home searchQuery={searchQuery} />} />
                    <Route path="/signin" element={<Signin />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path='/admin' element={<AdminDashboard />} />
                    <Route path='/view-product' element={<ViewProduct />} />
                    <Route path='/cart' element={<CartPage />} />
                </Routes>
            </div>
        </div>
    )
}

export default App;
