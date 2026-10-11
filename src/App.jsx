import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import IntroGallery from './IntroGallery';
import CircleNav from './CircleNav';
import TopLogo from './TopLogo';
import Work from './pages/Work';
import Editors from './pages/Editors';
import Shop from './pages/Shop';
import About from './pages/About';
import Contact from './pages/Contact';

// Split out from App because useLocation() only works INSIDE <BrowserRouter> —
// App itself renders the BrowserRouter, so the path-checking logic has to
// live in a child component like this one instead.
function AppLayout() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <>
      {!isHome && <TopLogo />}

      <Routes>
        <Route path="/" element={<IntroGallery />} />
        <Route path="/work" element={<Work />} />
        <Route path="/editors" element={<Editors />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      <CircleNav />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;