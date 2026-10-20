import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import ScrollToTop from './components/common/ScrollToTop';
import Home from './pages/Home';
import Predict from './pages/Predict';
import Login from './pages/Login';
import Signup from './pages/Signup';
import GemGuide from './pages/GemGuide';
import AIAdvisor from './pages/AIAdvisor';
import About from './pages/About';
import PredictionHistory from './pages/PredictionHistory';

// Pages that should NOT have the shared Navbar + Footer (they manage their own layout)
const AUTH_ROUTES = ['/login', '/signup'];

const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center text-3xl text-red-400">
    404 — Page Not Found
  </div>
);

// Wrapper that includes Navbar + Footer for most routes,
// but skips them for auth pages
const AppLayout = ({ children }) => {
  const [hasNav, setHasNav] = React.useState(true);

  // Check on every render (React Router doesn't need useLocation here — handled per route)
  return (
    <div className="flex flex-col min-h-screen bg-brand-bg">
      <Navbar />
      <main className="flex-grow pt-16">
        {children}
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        

        {/* All other pages use the shared layout */}
        <Route path="/*" element={
          <AppLayout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/predict" element={<Predict />} />
              <Route path="/gem-guide" element={<GemGuide />} />
              <Route path="/ai-advisor" element={<AIAdvisor />} />
              <Route path="/about" element={<About />} />
              <Route path="/history" element={<PredictionHistory />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
            </Routes>
          </AppLayout>
        } />
      </Routes>
    </Router>
  );
}

export default App;
