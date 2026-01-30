import React, { useState, useEffect } from 'react';
import { 
  Utensils, 
  Calendar, 
  ShoppingBag, 
  Clock, 
  Star, 
  ChevronRight, 
  Menu as MenuIcon, 
  X, 
  Cake, 
  MapPin, 
  Phone,
  ArrowRight,
  ChevronDown
} from 'lucide-react';

// --- Theme Constants ---
const COLORS = {
  primary: '#C5A059', // Champagne Gold
  secondary: '#1A1A1A', // Charcoal
  accent: '#2D2D2D',
  textLight: '#F5F5F5',
  textDark: '#333333',
  goldGradient: 'linear-gradient(135deg, #C5A059 0%, #E2C68E 100%)'
};

const App = () => {
  const [activeTab, setActiveTab] = useState('Home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'Menu': return <MenuSection />;
      case 'Sweets': return <SweetsSection />;
      case 'Events': return <EventsSection />;
      case 'Contact': return <ContactSection />;
      default: return <HomeSection setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-[#333] font-sans overflow-x-hidden">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white shadow-lg py-3' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2 group cursor-pointer" onClick={() => setActiveTab('Home')}>
            <div className="w-10 h-10 border-2 border-[#C5A059] flex items-center justify-center transform group-hover:rotate-45 transition-transform duration-500">
              <span className="text-[#C5A059] font-serif text-2xl font-bold -rotate-45 group-hover:rotate-0 transition-transform">R</span>
            </div>
            <span className={`text-2xl font-serif font-bold tracking-widest ${scrolled ? 'text-[#1A1A1A]' : 'text-white'}`}>RAJWADA</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-8 items-center">
            {['Home', 'Menu', 'Sweets', 'Events', 'Contact'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-sm tracking-[0.2em] uppercase font-medium transition-colors ${
                  activeTab === tab ? 'text-[#C5A059]' : (scrolled ? 'text-[#1A1A1A] hover:text-[#C5A059]' : 'text-white hover:text-[#C5A059]')
                }`}
              >
                {tab}
              </button>
            ))}
            <button 
              onClick={() => setActiveTab('Events')}
              className="px-6 py-2 bg-[#C5A059] text-white text-xs tracking-widest uppercase hover:bg-[#A88846] transition-all rounded-sm"
            >
              Book A Table
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className={scrolled ? 'text-black' : 'text-white'} /> : <MenuIcon className={scrolled ? 'text-black' : 'text-white'} />}
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-[#1A1A1A] text-white flex flex-col items-center justify-center gap-8 animate-in fade-in zoom-in duration-300">
          <button className="absolute top-8 right-8" onClick={() => setIsMenuOpen(false)}><X size={32} /></button>
          {['Home', 'Menu', 'Sweets', 'Events', 'Contact'].map((tab) => (
            <button key={tab} className="text-2xl font-serif tracking-widest" onClick={() => { setActiveTab(tab); setIsMenuOpen(false); }}>{tab}</button>
          ))}
          <button className="mt-4 px-10 py-4 border border-[#C5A059] text-[#C5A059] tracking-widest" onClick={() => { setActiveTab('Events'); setIsMenuOpen(false); }}>RESERVATIONS</button>
        </div>
      )}

      <main>
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="bg-[#1A1A1A] text-white py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-2xl font-serif font-bold mb-6 tracking-widest text-[#C5A059]">RAJWADA</h3>
            <p className="text-gray-400 leading-relaxed text-sm">
              Experience the pinnacle of Indian culinary heritage with a modern royal touch. Every dish tells a story of tradition and luxury.
            </p>
          </div>
          <div>
            <h4 className="text-sm tracking-widest uppercase mb-6 font-bold">Hours</h4>
            <ul className="text-gray-400 text-sm space-y-3">
              <li className="flex justify-between"><span>Breakfast:</span> <span>7:00 AM - 11:00 AM</span></li>
              <li className="flex justify-between"><span>Lunch/Dinner:</span> <span>12:00 PM - 11:30 PM</span></li>
              <li className="flex justify-between"><span>Sweet Shop:</span> <span>8:00 AM - 10:00 PM</span></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm tracking-widest uppercase mb-6 font-bold">Contact</h4>
            <ul className="text-gray-400 text-sm space-y-3">
              <li className="flex items-center gap-3"><MapPin size={16} className="text-[#C5A059]" /> 123 Heritage Lane, Indore</li>
              <li className="flex items-center gap-3"><Phone size={16} className="text-[#C5A059]" /> +91 98765 43210</li>
              <li className="flex items-center gap-3"><Clock size={16} className="text-[#C5A059]" /> Open 7 Days a week</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm tracking-widest uppercase mb-6 font-bold">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-4 font-light">Join our royalty list for exclusive updates.</p>
            <div className="flex">
              <input type="email" placeholder="Email Address" className="bg-[#2D2D2D] border-none px-4 py-3 text-sm flex-grow focus:ring-1 focus:ring-[#C5A059] outline-none" />
              <button className="bg-[#C5A059] px-4 py-3"><ArrowRight size={18} /></button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-gray-800 text-center text-xs text-gray-500 tracking-widest">
          &copy; {new Date().getFullYear()} RAJWADA HOSPITALITY GROUP. ALL RIGHTS RESERVED.
        </div>
      </footer>
    </div>
  );
};

const HomeSection = ({ setActiveTab }) => (
  <section className="relative">
    {/* Hero */}
    <div className="h-screen w-full relative overflow-hidden flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-[10000ms] hover:scale-110" 
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=2000')` }}
      />
      <div className="absolute inset-0 bg-black/50" />
      
      <div className="relative z-10 text-center px-6 max-w-4xl animate-in fade-in slide-in-from-bottom-10 duration-1000">
        <div className="w-20 h-[1px] bg-[#C5A059] mx-auto mb-8" />
        <h4 className="text-[#C5A059] tracking-[0.4em] uppercase text-sm mb-6 font-medium">Modern Indian Culinary Excellence</h4>
        <h1 className="text-white text-5xl md:text-8xl font-serif mb-8 leading-tight">Taste the Royal <br/> Heritage</h1>
        <p className="text-white/80 text-lg md:text-xl font-light mb-12 tracking-wide max-w-2xl mx-auto leading-relaxed">
          From the kitchens of kings to your table. Experience a symphony of flavors curated with royal precision.
        </p>
        <div className="flex flex-col md:flex-row gap-6 justify-center">
          <button 
            onClick={() => setActiveTab('Menu')}
            className="px-10 py-4 bg-[#C5A059] text-white tracking-[0.2em] uppercase text-xs font-bold hover:bg-white hover:text-black transition-all"
          >
            Explore Menu
          </button>
          <button 
             onClick={() => setActiveTab('Events')}
             className="px-10 py-4 border border-white text-white tracking-[0.2em] uppercase text-xs font-bold hover:bg-white hover:text-black transition-all"
          >
            Book a Celebration
          </button>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white animate-bounce">
        <ChevronDown size={32} />
      </div>
    </div>

    {/* Quick Info Grid */}
    <div className="grid grid-cols-1 md:grid-cols-3 -mt-20 relative z-20 max-w-6xl mx-auto px-6 gap-0 shadow-2xl">
      <div className="bg-[#1A1A1A] p-12 text-white text-center border-r border-white/5">
        <Clock className="mx-auto mb-6 text-[#C5A059]" size={40} />
        <h3 className="text-xl font-serif mb-4 tracking-widest">Timings</h3>
        <p className="text-gray-400 text-sm leading-relaxed">Open daily for Breakfast (7AM) <br/> until Dinner (11:30PM)</p>
      </div>
      <div className="bg-[#212121] p-12 text-white text-center border-r border-white/5">
        <Utensils className="mx-auto mb-6 text-[#C5A059]" size={40} />
        <h3 className="text-xl font-serif mb-4 tracking-widest">Dine-In Only</h3>
        <p className="text-gray-400 text-sm leading-relaxed">Authentic experience served fresh. <br/> We focus on on-site hospitality.</p>
      </div>
      <div className="bg-[#1A1A1A] p-12 text-white text-center">
        <Cake className="mx-auto mb-6 text-[#C5A059]" size={40} />
        <h3 className="text-xl font-serif mb-4 tracking-widest">Sweet Shop</h3>
        <p className="text-gray-400 text-sm leading-relaxed">Iconic Mithais and Gift Boxes <br/> available for pre-order pickup.</p>
      </div>
    </div>
  </section>
);

const MenuSection = () => {
  const [filter, setFilter] = useState('Dinner');
  
  const menuData = {
    Breakfast: [
      { name: "Royal Poha", price: "₹240", desc: "Classic Indori Poha topped with pomegranate and special Jeeravan." },
      { name: "Misal Pav Royale", price: "₹310", desc: "Spiced sprout curry served with buttered artisan pav." },
      { name: "Saffron Kachori", price: "₹180", desc: "Flaky crust stuffed with spiced dal and hint of pure saffron." }
    ],
    Dinner: [
      { name: "Dal Baati Heritage", price: "₹650", desc: "Slow-cooked dal with ghee-soaked baatis and Churma." },
      { name: "Shahi Paneer Tikka", price: "₹550", desc: "Clay oven roasted cottage cheese marinated in royal spices." },
      { name: "Royal Thali", price: "₹1200", desc: "A curated 12-dish experience served in silver-plated platters." }
    ],
    'Fast Food': [
      { name: "Maharaja Burger", price: "₹450", desc: "Double patty with tandoori mayo and royal chutney blend." },
      { name: "Palace Club Sandwich", price: "₹380", desc: "Stacked with grilled veggies and our secret herb spread." },
      { name: "Spiced Masala Fries", price: "₹210", desc: "Crispy fries tossed in house-made Rajwada spices." }
    ]
  };

  return (
    <div className="pt-32 pb-20 px-6 max-w-5xl mx-auto min-h-screen animate-in fade-in duration-700">
      <div className="text-center mb-16">
        <h4 className="text-[#C5A059] tracking-[0.3em] uppercase text-xs mb-4">Curated Flavors</h4>
        <h2 className="text-4xl md:text-5xl font-serif mb-8">Our Signature Menu</h2>
        
        <div className="flex flex-wrap justify-center gap-4">
          {Object.keys(menuData).map(cat => (
            <button 
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-8 py-2 rounded-full text-xs tracking-widest uppercase transition-all border ${filter === cat ? 'bg-[#C5A059] text-white border-[#C5A059]' : 'border-gray-200 hover:border-[#C5A059]'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
        {menuData[filter].map((item, idx) => (
          <div key={idx} className="group cursor-default border-b border-gray-100 pb-6">
            <div className="flex justify-between items-baseline mb-2">
              <h3 className="text-xl font-serif tracking-wide group-hover:text-[#C5A059] transition-colors">{item.name}</h3>
              <span className="text-[#C5A059] font-medium">{item.price}</span>
            </div>
            <p className="text-gray-500 text-sm italic font-light leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
      
      <div className="mt-20 p-12 bg-[#F5F5F5] rounded-lg text-center">
        <p className="text-gray-600 text-sm mb-6 max-w-xl mx-auto">All our dishes are prepared using locally sourced organic ingredients and traditional techniques passed down through generations.</p>
        <button className="flex items-center gap-2 mx-auto text-[#C5A059] text-xs font-bold tracking-widest uppercase hover:gap-4 transition-all">
          Download Full Menu <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

const SweetsSection = () => {
  const sweets = [
    { name: "Kaju Katli Royale", image: "https://images.unsplash.com/photo-1589119908995-c6837fa14848?auto=format&fit=crop&q=80&w=800", price: "₹950/kg" },
    { name: "Saffron Jalebi", image: "https://images.unsplash.com/photo-1621612045558-8687313a30a2?auto=format&fit=crop&q=80&w=800", price: "₹600/kg" },
    { name: "Gulab Jamun Mix", image: "https://images.unsplash.com/photo-1593701461250-d7b22dfd3a77?auto=format&fit=crop&q=80&w=800", price: "₹550/box" },
    { name: "The Heritage Box", image: "https://images.unsplash.com/photo-1577390731057-3f303f83120b?auto=format&fit=crop&q=80&w=800", price: "₹1,200/set" }
  ];

  return (
    <div className="pt-32 pb-20 animate-in slide-in-from-right duration-500">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <h4 className="text-[#C5A059] tracking-[0.3em] uppercase text-xs mb-4">Gifting Tradition</h4>
            <h2 className="text-4xl md:text-5xl font-serif">Royal Sweet Shop</h2>
            <p className="text-gray-600 mt-6 leading-relaxed">Pre-order our signature sweets for pickup. We craft each piece with pure ghee, organic sugar, and premium nuts.</p>
          </div>
          <button className="flex items-center gap-2 bg-[#1A1A1A] text-white px-8 py-4 text-xs tracking-widest uppercase hover:bg-[#C5A059] transition-all">
            Browse All Boxes
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {sweets.map((item, idx) => (
            <div key={idx} className="group">
              <div className="relative overflow-hidden aspect-[4/5] mb-4">
                <img src={item.image} alt={item.name} className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                <button className="absolute bottom-4 left-4 right-4 bg-white text-black py-3 text-xs tracking-widest uppercase font-bold opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  Pre-Order Pickup
                </button>
              </div>
              <h3 className="text-lg font-serif mb-1">{item.name}</h3>
              <p className="text-[#C5A059] text-sm font-medium">{item.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const EventsSection = () => {
  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto animate-in zoom-in duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div>
          <h4 className="text-[#C5A059] tracking-[0.3em] uppercase text-xs mb-4">Celebrations</h4>
          <h2 className="text-4xl md:text-6xl font-serif mb-8">Host a Royal Birthday</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Make your special day unforgettable. From custom-designed royal cakes to dedicated seating zones with live folk music, we manage every detail.
          </p>
          
          <div className="space-y-6 mb-12">
            {[
              { title: "Custom Royal Cakes", icon: <Cake size={20} /> },
              { title: "Themed Decor & Seating", icon: <Utensils size={20} /> },
              { title: "Priority Reservation", icon: <Calendar size={20} /> },
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#C5A059]/10 flex items-center justify-center text-[#C5A059]">
                  {feature.icon}
                </div>
                <span className="font-medium tracking-wide">{feature.title}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-8 md:p-12 shadow-2xl border border-gray-100 rounded-sm">
          <h3 className="text-2xl font-serif mb-8 text-center">Reservation Inquiry</h3>
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block mb-2">Guest Name</label>
                <input type="text" className="w-full border-b border-gray-300 py-2 focus:border-[#C5A059] outline-none text-sm" placeholder="Full Name" />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block mb-2">Contact</label>
                <input type="text" className="w-full border-b border-gray-300 py-2 focus:border-[#C5A059] outline-none text-sm" placeholder="Phone Number" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block mb-2">Event Date</label>
                <input type="date" className="w-full border-b border-gray-300 py-2 focus:border-[#C5A059] outline-none text-sm" />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block mb-2">Event Type</label>
                <select className="w-full border-b border-gray-300 py-2 focus:border-[#C5A059] outline-none text-sm bg-transparent">
                  <option>Table Reservation</option>
                  <option>Birthday Party</option>
                  <option>Catering / Bulk Order</option>
                  <option>Anniversary</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block mb-2">Additional Requests</label>
              <textarea className="w-full border-b border-gray-300 py-2 focus:border-[#C5A059] outline-none text-sm resize-none" rows="2" placeholder="Tell us about the cake or special seating..."></textarea>
            </div>

            <button className="w-full py-4 bg-[#C5A059] text-white tracking-[0.3em] uppercase text-xs font-bold hover:bg-[#1A1A1A] transition-all">
              Request Booking
            </button>
            <p className="text-[10px] text-gray-400 text-center uppercase tracking-widest">Our Concierge will call you within 2 hours</p>
          </form>
        </div>
      </div>
    </div>
  );
};

const ContactSection = () => (
  <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto text-center animate-in fade-in duration-500">
     <h4 className="text-[#C5A059] tracking-[0.3em] uppercase text-xs mb-4">Location</h4>
     <h2 className="text-4xl md:text-5xl font-serif mb-12">Visit The Palace</h2>
     
     <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
        <div className="p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <MapPin size={32} className="mx-auto text-[#C5A059] mb-6" />
          <h4 className="text-lg font-serif mb-4">Address</h4>
          <p className="text-gray-500 text-sm leading-relaxed">Near the Historic Square,<br/> Heritage District, Indore 452001</p>
        </div>
        <div className="p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <Phone size={32} className="mx-auto text-[#C5A059] mb-6" />
          <h4 className="text-lg font-serif mb-4">Reservations</h4>
          <p className="text-gray-500 text-sm leading-relaxed">+91 98765 43210<br/>+91 98765 43211</p>
        </div>
        <div className="p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <Star size={32} className="mx-auto text-[#C5A059] mb-6" />
          <h4 className="text-lg font-serif mb-4">Reviews</h4>
          <div className="flex justify-center gap-1 text-[#C5A059]">
            <Star size={14} fill="currentColor" />
            <Star size={14} fill="currentColor" />
            <Star size={14} fill="currentColor" />
            <Star size={14} fill="currentColor" />
            <Star size={14} fill="currentColor" />
          </div>
          <p className="text-gray-500 text-sm mt-4">4.9/5 stars based on 10,000+ guests</p>
        </div>
     </div>

     <div className="h-[400px] w-full bg-gray-200 relative rounded-sm overflow-hidden grayscale">
       <div className="absolute inset-0 flex items-center justify-center bg-black/5">
          <div className="bg-white p-6 shadow-xl text-center">
            <h5 className="font-serif mb-2">Interactive Map</h5>
            <p className="text-xs text-gray-500 tracking-widest uppercase">Visit us for the full experience</p>
          </div>
       </div>
       <img src="https://images.unsplash.com/photo-1524230572899-a752b3835840?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover" alt="Location Map Placeholder" />
     </div>
  </div>
);

export default App;
