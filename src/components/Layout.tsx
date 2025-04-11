
import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen bg-white relative">
      {/* Logo in top right corner */}
      <div className="absolute top-4 right-4 z-10 hidden md:block">
        <img 
          src="/lovable-uploads/13d36f03-fdec-4b25-9d38-1d931e9d2006.png" 
          alt="Ummah Connects Logo" 
          className="w-16 h-16 object-contain"
        />
      </div>
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
