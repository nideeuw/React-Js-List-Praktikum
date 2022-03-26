import { Link, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Event from './pages/event';
import Keranjang from './pages/keranjang'
import './App.css';

function App() {
  return (
    <div className="flex justify-center p-6 w-screen h-screen bg-gray-200 overflow-y-auto">
      <div className="max-w-full">
        <div className="flex items-center justify-center mb-4 text-xs text-gray-600 font-semibold uppercase tracking-wide">
          <Link
          className="mx-2 px-4 py-2 rounded-xl hover:bg-gray-100 transition-all ease-in-out"
          to="/home"
          >
            Home
          </Link>

          <Link
          className="mx-2 px-4 py-2 rounded-xl hover:bg-gray-100 transition-all ease-in-out"
          to="/event"
          >
            Event
          </Link>

          <Link
          className="mx-2 px-4 py-2 rounded-xl hover:bg-gray-100 transition-all ease-in-out"
          to="/keranjang"
          >
            Keranjang
          </Link>
        </div>

        <div className="p-6 w-full bg-white rounded-xl shadow-lg">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/event" element={<Event />} />
            <Route path="/keranjang" element={<Keranjang />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
