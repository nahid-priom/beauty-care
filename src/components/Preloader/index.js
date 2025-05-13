import Logo from "../../assets/logo.png"; 

const Preloader = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-screen bg-[#f8f1f1]">
      <img 
        src={Logo} 
        alt="Loading..." 
        className="w-40 h-20 lg:w-60 lg:h-30 mb-8 animate-soft-pulse"
      />
      
      <div className="flex items-center space-x-4">
        <div 
          className="w-8 h-8 border-4 border-[#770504] border-t-transparent rounded-full animate-spin"
          style={{ animationDuration: "0.8s" }}
        ></div>
        
        <span className="text-[#770504] font-medium text-base lg:text-lg">
          Loading your beauty experience...
        </span>
      </div>
    </div>
  );
};

export default Preloader;
