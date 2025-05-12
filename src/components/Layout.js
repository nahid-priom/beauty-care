// src/components/Layout.jsx
import { ProductsProvider } from '../providers/ProductProvider';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <ProductsProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </div>
    </ProductsProvider>
  );
};

export default Layout;