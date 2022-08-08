import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/index'
import Block from './pages/Block'
import TX from './pages/ts'
import Header from './component/header'
import Allblock from './pages/allBlock'
import Alltsx from './pages/allTx'

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/block/:idx" element={<Block />} />
                <Route path="/tranx/:idx" element={<TX />} />
                <Route path="/Blockall" element={<Allblock />} />
                <Route path="/Tsxall" element={<Alltsx />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
