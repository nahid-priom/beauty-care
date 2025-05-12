
import Logo from "../../assets/logo.png"; 

const Preloader = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-screen bg-[#f8f1f1]">
      {/* Logo with gentle pulse animation */}
      <img 
        src={Logo} 
        alt="Loading..." 
        className="w-40 h-20 lg:w-60 lg:h-30 mb-8 animate-soft-pulse" // Custom animation defined below
      />
      
      {/* Loading indicator with your brand color */}
      <div className="flex items-center space-x-4">
        {/* Spinner with your brand's maroon color */}
        <div 
          className="w-8 h-8 border-4 border-[#770504] border-t-transparent rounded-full animate-spin"
          style={{ animationDuration: "0.8s" }}
        ></div>
        
        {/* Loading text with your brand's color scheme */}
        <span className="text-[#770504] font-medium text-base lg:text-lg">
          Loading your beauty experience...
        </span>
      </div>

      {/* Add these to your global CSS/tailwind config for custom animations */}
      <style jsx global>{`
        @keyframes soft-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(0.98); }
        }
        .animate-soft-pulse {
          animation: soft-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
};

export default Preloader;