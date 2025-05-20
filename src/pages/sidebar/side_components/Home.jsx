import { useNavigate } from 'react-router-dom';
import Navbar from '../../../components/Navbar';
import Hero from '../../../components/Hero';
import Features from '../../../components/Features';
import News from '../../../components/News';
import Footer from '../../../components/Footer';

export default function Home() {
  const navigate = useNavigate();
  
  const handleGetStarted = () => {
    navigate('/login');
  };

  return (
    <>
      <Navbar onGetStarted={handleGetStarted} />
      <Hero onGetStarted={handleGetStarted} />
      <Features />
      <News />
      <Footer />
    </>
  );
}