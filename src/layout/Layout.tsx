import Footer from '../components/Footer/Footer';
import { Routers } from '../routes/Routers';
import Navbar from '../components/navbar/Navbar';

const Layout = () => {
  return (
    <div className=''>
      <Navbar />
      <main className='container hide-scrollbar'>
        <Routers />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
