const OFFERS = [
  "🔥 50% OFF ON ALL HAIR CARE PRODUCTS 🔥",
  "🎉 FREE SHIPPING ON ORDERS OVER $50 🎉",
  "💝 BUY 1 GET 1 FREE ON SELECT ITEMS 💝",
];


const TopOffersBar = () => (
  <div className="bg-[#770504] text-white py-1 px-4">
    <div className="container mx-auto overflow-hidden">
      <div className="animate-marquee whitespace-nowrap">
        {[...OFFERS, ...OFFERS].map((offer, index) => (
          <span key={`offer-${index}`} className="inline-block mx-8 text-sm">
            {offer}
          </span>
        ))}
      </div>
    </div>
  </div>
);

export default TopOffersBar;