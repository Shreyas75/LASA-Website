import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import OurActivities from './pages/OurActivities';
import FoodAndNourishment from './pages/FoodAndNourishment';
import HealthAndWellness from './pages/HealthAndWellness';
import MedicalClinic from './pages/MedicalClinic';
import UpcomingEvents from './pages/UpcomingEvents';
import PastEvents from './pages/PastEvents';
import ContactUs from './pages/ContactUs';
import Donate from './pages/Donate';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="pt-24">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/our-activities" element={<OurActivities />} />
          <Route path="/our-activities/food-and-nourishment" element={<FoodAndNourishment />} />
          <Route path="/our-activities/health-and-wellness" element={<HealthAndWellness />} />
          <Route path="/our-activities/medical-clinic" element={<MedicalClinic />} />
          <Route path="/events/upcoming" element={<UpcomingEvents />} />
          <Route path="/events/past" element={<PastEvents />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/donate" element={<Donate />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
