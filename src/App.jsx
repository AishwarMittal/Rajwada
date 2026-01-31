import React, { useState, useEffect, useRef } from 'react';
import { 
  Utensils, Calendar, Clock, Star, X, Menu as MenuIcon, 
  MapPin, Phone, ArrowRight, ChevronDown, Cake, Sun, Moon, 
  ChefHat, ShoppingBag, Crown, Plus, Minus, Trash2, MessageSquare,
  Lock, Edit3, Save, LogOut, Image as ImageIcon, Sparkles, Send, Bot, AlertTriangle, QrCode, Copy
} from 'lucide-react';

// --- 🔴 IMPORTANT: PASTE YOUR GOOGLE GEMINI API KEY BELOW 🔴 ---
const apiKey = ""; 

// --- INITIAL DATA ---
const INITIAL_MENU = {
  'Chaat': [
    { name: "Aloo Tikki", price: "₹30", img: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=600&q=80", desc: "Spiced potato patties served with chutney." },
    { name: "Matar Tikki", price: "₹60", img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80", desc: "Crispy patties made with green peas." },
    { name: "Basket Chaat", price: "₹110", img: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=600&q=80", desc: "Crispy edible basket filled with tangy delights." },
    { name: "Paapdi Chaat", price: "₹60", img: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=600&q=80", desc: "Crisp wafers topped with potatoes and yogurt." },
    { name: "Suhal Chaat", price: "₹50", img: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=600&q=80", desc: "A crunchy and savory regional specialty." },
    { name: "Palak Chaat", price: "₹60", img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80", desc: "Fried spinach leaves with chutneys." },
    { name: "Raj Kochori", price: "₹75", img: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=600&q=80", desc: "The king of kochoris filled with yogurt and spices." },
    { name: "Pani Batasha (6pc)", price: "₹25", img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80", desc: "Hollow crispy balls filled with spicy water." },
    { name: "Dahi Batasha (5pc)", price: "₹40", img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80", desc: "Pani puri filled with sweetened yogurt." },
    { name: "Dahi Bada (2pc)", price: "₹60", img: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=600&q=80", desc: "Lentil fritters soaked in creamy yogurt." },
    { name: "Tamatar Chaat", price: "₹60", img: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&q=80", desc: "Spicy tomato based chaat specialty." },
    { name: "Dry Fruit Lassi", price: "₹60", img: "https://images.unsplash.com/photo-1598514983318-2f64f8f4796c?w=600&q=80", desc: "Rich yogurt drink loaded with dry fruits." }
  ],
  'Specials': [
    { name: "Soya Chaap Tikka", price: "₹229", img: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=600&q=80", desc: "Marinated soy chunks roasted to perfection." },
    { name: "Soya Chaap Malai Tikka", price: "₹239", img: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=600&q=80", desc: "Creamy, mild spiced soya bites." },
    { name: "Soya Chaap Masala", price: "₹239", img: "https://images.unsplash.com/photo-1585937421612-70a008356f36?w=600&q=80", desc: "Soya chaap cooked in rich gravy." },
    { name: "Paneer Angara", price: "₹345", img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&q=80", desc: "Smoked cottage cheese in spicy red gravy." },
    { name: "Kaju Paneer Masala", price: "₹450", img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&q=80", desc: "Rich cashew and paneer curry." },
    { name: "Kaju Curry", price: "₹400", img: "https://images.unsplash.com/photo-1585937421612-70a008356f36?w=600&q=80", desc: "Roasted cashews in spicy masala gravy." },
    { name: "Paneer Kaleji", price: "₹319", img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&q=80", desc: "Chef's special paneer preparation." },
    { name: "Rajwada Special Paneer", price: "₹349", img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&q=80", desc: "Our house signature paneer dish." },
    { name: "Triple Schezwan Rice", price: "₹299", img: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&q=80", desc: "Spicy fried rice with noodles and gravy." },
    { name: "Soya Chaap Biryani", price: "₹229", img: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=600&q=80", desc: "Aromatic rice cooked with spiced soya chaap." },
    { name: "Veg Jhal Pyazi", price: "₹230", img: "https://images.unsplash.com/photo-1585937421612-70a008356f36?w=600&q=80", desc: "Spicy vegetable stir fry with onions." },
    { name: "Veg Korma", price: "₹240", img: "https://images.unsplash.com/photo-1585937421612-70a008356f36?w=600&q=80", desc: "Mixed vegetables in a creamy sauce." },
    { name: "Navratan Korma", price: "₹250", img: "https://images.unsplash.com/photo-1585937421612-70a008356f36?w=600&q=80", desc: "Sweet and savory nine-gem vegetable curry." },
    { name: "Rajwada Special Thal", price: "₹400", img: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&q=80", desc: "The complete royal feast experience." }
  ]
};

const INITIAL_SWEETS = [
  { name: "Kaju Katli", image: "https://images.unsplash.com/photo-1589119908995-c6837fa14848?w=800", price: "₹950/kg" },
  { name: "Gulab Jamun", image: "https://images.unsplash.com/photo-1593701461250-d7b22dfd3a77?w=800", price: "₹550/kg" },
  { name: "Rasmalai", image: "https://images.unsplash.com/photo-1605197180423-275eec6948f7?w=800", price: "₹45/pc" },
  { name: "Motichoor Laddu", image: "https://images.unsplash.com/photo-1589948082697-393c8376f9d4?w=800", price: "₹600/kg" }
];

const App = () => {
  const [activeTab, setActiveTab] = useState('Home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  // --- DYNAMIC DATA ---
  const [menuData, setMenuData] = useState(() => {
    try {
      const saved = localStorage.getItem('rajwadaMenu');
      return saved ? JSON.parse(saved) : INITIAL_MENU;
    } catch {
      return INITIAL_MENU;
    }
  });
  
  const [sweetsData, setSweetsData] = useState(() => {
    try {
      const saved = localStorage.getItem('rajwadaSweets');
      return saved ? JSON.parse(saved) : INITIAL_SWEETS;
    } catch {
      return INITIAL_SWEETS;
    }
  });

  useEffect(() => { localStorage.setItem('rajwadaMenu', JSON.stringify(menuData)); }, [menuData]);
  useEffect(() => { localStorage.setItem('rajwadaSweets', JSON.stringify(sweetsData)); }, [sweetsData]);

  // Cart & Checkout
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutForm, setCheckoutForm] = useState({ 
    name: '', 
    phone: '', 
    type: 'Takeaway',
    paymentMethod: 'Cash',
    txnId: ''
  });

  // Admin & AI
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminPin, setAdminPin] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const theme = {
    bg: isDarkMode ? 'bg-[#0F0F0F]' : 'bg-[#FDFCFB]',
    text: isDarkMode ? 'text-[#E5E5E5]' : 'text-[#1A1A1A]',
    navScrolled: isDarkMode ? 'bg-[#1A1A1A]/95' : 'bg-white/95',
    cardBg: isDarkMode ? 'bg-[#1A1A1A]' : 'bg-white',
    border: isDarkMode ? 'border-white/10' : 'border-gray-200',
    subText: isDarkMode ? 'text-gray-400' : 'text-gray-600',
    accent: '#C5A059'
  };

  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(i => i.name === item.name);
      if (existing) return prev.map(i => i.name === item.name ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...item, qty: 1 }];
    });
    setIsCartOpen(true);
  };
  const removeFromCart = (itemName) => setCart(prev => prev.filter(i => i.name !== itemName));
  const updateQty = (itemName, change) => setCart(prev => prev.map(i => i.name === itemName ? { ...i, qty: Math.max(1, i.qty + change) } : i));
  const cartTotal = cart.reduce((total, item) => total + (parseInt(item.price.replace(/[^0-9]/g, '')) * item.qty), 0);

  // --- WHATSAPP CHECKOUT WITH UPI INTEGRATION ---
  const handleWhatsAppCheckout = (e) => {
    e.preventDefault();
    
    if (checkoutForm.paymentMethod === 'UPI' && !checkoutForm.txnId) {
      alert("⚠️ Payment Verification Needed!\nPlease enter the Transaction ID (UTR) from your payment app.");
      return;
    }

    let message = `*👑 New Order - Rajwada Restaurant*\n`;
    message += `--------------------------------\n`;
    message += `👤 *Name:* ${checkoutForm.name}\n`;
    message += `📱 *Phone:* ${checkoutForm.phone}\n`;
    message += `🥡 *Type:* ${checkoutForm.type}\n`;
    message += `💳 *Payment Mode:* ${checkoutForm.paymentMethod}\n`;
    
    if (checkoutForm.paymentMethod === 'UPI') {
      message += `🔢 *Transaction ID:* ${checkoutForm.txnId}\n`;
      message += `✅ *Status:* Paid Online\n`;
    } else {
      message += `💵 *Status:* Cash on Delivery/Pickup\n`;
    }
    
    message += `--------------------------------\n`;
    message += `*🛒 ORDER DETAILS:*\n`;
    cart.forEach(item => { message += `▪️ ${item.name} x ${item.qty} = ${item.price}\n`; });
    message += `--------------------------------\n`;
    message += `*💰 TOTAL AMOUNT: ₹${cartTotal}*\n`;
    message += `--------------------------------\n`;
    
    const phoneNumber = "919580463211";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
    
    // Clear cart after successful redirect
    setCart([]);
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
  };

  // --- ADMIN FUNCTIONS ---
  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminPin === '1234') {
      setIsAdminAuthenticated(true);
      setActiveTab('Admin');
      setShowAdminLogin(false);
    } else {
      alert("Invalid PIN");
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Menu': return <MenuSection theme={theme} addToCart={addToCart} menuData={menuData} />;
      case 'Sweets': return <SweetsSection theme={theme} addToCart={addToCart} sweetsData={sweetsData} />;
      case 'Events': return <EventsSection theme={theme} />;
      case 'Reviews': return <ReviewsSection theme={theme} />;
      case 'Contact': return <ContactSection theme={theme} />;
      case 'Admin': return isAdminAuthenticated ? 
          <AdminPanel 
            theme={theme} 
            menuData={menuData} 
            setMenuData={setMenuData} 
            sweetsData={sweetsData}
            setSweetsData={setSweetsData}
            onLogout={() => {setIsAdminAuthenticated(false); setActiveTab('Home');}} 
          /> : <HomeSection setActiveTab={setActiveTab} theme={theme} />;
      default: return <HomeSection setActiveTab={setActiveTab} theme={theme} />;
    }
  };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-500 ${theme.bg} ${theme.text}`}>
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? `${theme.navScrolled} shadow-lg py-3` : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => setActiveTab('Home')}>
            <div className="relative">
              <Crown size={32} className="text-[#C5A059] group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
              <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            </div>
            <span className={`text-2xl font-serif font-bold tracking-widest ${scrolled ? theme.text : 'text-white'}`}>RAJWADA</span>
          </div>

          <div className="hidden md:flex gap-8 items-center">
            {['Home', 'Menu', 'Sweets', 'Reviews', 'Events', 'Contact'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-sm tracking-[0.2em] uppercase font-medium transition-colors hover:text-[#C5A059] ${
                  activeTab === tab ? 'text-[#C5A059]' : (scrolled ? theme.text : 'text-white')
                }`}
              >
                {tab}
              </button>
            ))}
            <button onClick={() => setIsDarkMode(!isDarkMode)} className={`p-2 rounded-full border ${scrolled ? `border-gray-500 ${theme.text}` : 'border-white/50 text-white'} hover:bg-[#C5A059] hover:border-[#C5A059] transition-all`}>
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button onClick={() => setIsCartOpen(true)} className="relative p-2 text-[#C5A059] hover:text-white transition-colors">
              <ShoppingBag size={24} />
              {cart.length > 0 && <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">{cart.reduce((a, b) => a + b.qty, 0)}</span>}
            </button>
          </div>

          <div className="flex items-center gap-4 md:hidden">
            <button onClick={() => setIsCartOpen(true)} className={`p-2 relative ${scrolled ? theme.text : 'text-white'}`}>
              <ShoppingBag size={24} />
              {cart.length > 0 && <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">{cart.length}</span>}
            </button>
            <button onClick={() => setIsDarkMode(!isDarkMode)} className={`p-2 ${scrolled ? theme.text : 'text-white'}`}>
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className={scrolled ? theme.text : 'text-white'} /> : <MenuIcon className={scrolled ? theme.text : 'text-white'} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
          <div className={`relative w-full max-w-md h-full ${theme.cardBg} shadow-2xl p-6 flex flex-col animate-in slide-in-from-right duration-300`}>
            <div className="flex justify-between items-center mb-8">
              <h2 className={`text-2xl font-serif ${theme.text}`}>Your Order</h2>
              <button onClick={() => setIsCartOpen(false)} className="text-gray-500 hover:text-red-500"><X /></button>
            </div>
            <div className="flex-grow overflow-y-auto space-y-6">
              {cart.length === 0 ? <div className="text-center text-gray-500 mt-20"><ShoppingBag size={48} className="mx-auto mb-4 opacity-50" /><p>Your cart is empty</p></div> : 
                cart.map((item, idx) => (
                  <div key={idx} className={`flex items-center gap-4 border-b ${theme.border} pb-4`}>
                    <div className="flex-grow"><h4 className={`font-medium ${theme.text}`}>{item.name}</h4><p className="text-[#C5A059] text-sm">{item.price}</p></div>
                    <div className="flex items-center gap-3 bg-gray-800 rounded-lg px-2 py-1">
                      <button onClick={() => updateQty(item.name, -1)} className="text-white hover:text-[#C5A059]"><Minus size={14} /></button>
                      <span className="text-white text-sm w-4 text-center">{item.qty}</span>
                      <button onClick={() => updateQty(item.name, 1)} className="text-white hover:text-[#C5A059]"><Plus size={14} /></button>
                    </div>
                    <button onClick={() => removeFromCart(item.name)} className="text-gray-500 hover:text-red-500"><Trash2 size={18} /></button>
                  </div>
                ))
              }
            </div>
            <div className="mt-6 border-t border-gray-700 pt-6">
              <div className="flex justify-between mb-6"><span className={`text-lg ${theme.text}`}>Total</span><span className="text-2xl font-serif text-[#C5A059]">₹{cartTotal}</span></div>
              <button onClick={() => setIsCheckoutOpen(true)} className="w-full py-4 bg-[#C5A059] text-white font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-colors" disabled={cart.length === 0}>Proceed to Checkout</button>
            </div>
          </div>
        </div>
      )}

      {/* Checkout Modal with Dynamic QR & Payment Logic */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
           <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsCheckoutOpen(false)} />
           <div className={`relative w-full max-w-lg ${theme.cardBg} border ${theme.border} p-8 rounded-lg shadow-2xl animate-in zoom-in duration-300 max-h-[90vh] overflow-y-auto`}>
              <div className="flex justify-between items-center mb-6">
                <h3 className={`text-2xl font-serif text-center flex-grow ${theme.text}`}>Confirm Order</h3>
                <button onClick={() => setIsCheckoutOpen(false)}><X className="text-gray-500" /></button>
              </div>
              
              <form onSubmit={handleWhatsAppCheckout} className="space-y-6">
                <div><label className={`text-xs uppercase tracking-widest ${theme.subText} mb-2 block`}>Full Name</label><input required type="text" value={checkoutForm.name} onChange={e => setCheckoutForm({...checkoutForm, name: e.target.value})} className={`w-full bg-transparent border-b ${theme.border} py-3 focus:border-[#C5A059] outline-none ${theme.text}`} placeholder="Enter your name"/></div>
                <div><label className={`text-xs uppercase tracking-widest ${theme.subText} mb-2 block`}>Phone Number</label><input required type="tel" value={checkoutForm.phone} onChange={e => setCheckoutForm({...checkoutForm, phone: e.target.value})} className={`w-full bg-transparent border-b ${theme.border} py-3 focus:border-[#C5A059] outline-none ${theme.text}`} placeholder="Enter your mobile number"/></div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={`text-xs uppercase tracking-widest ${theme.subText} mb-2 block`}>Order Type</label>
                    <select value={checkoutForm.type} onChange={e => setCheckoutForm({...checkoutForm, type: e.target.value})} className={`w-full bg-transparent border-b ${theme.border} py-3 focus:border-[#C5A059] outline-none ${theme.text}`}><option className="text-black">Takeaway (Pickup)</option><option className="text-black">Dine-In (At Restaurant)</option></select>
                  </div>
                  <div>
                    <label className={`text-xs uppercase tracking-widest ${theme.subText} mb-2 block`}>Payment</label>
                    <select value={checkoutForm.paymentMethod} onChange={e => setCheckoutForm({...checkoutForm, paymentMethod: e.target.value})} className={`w-full bg-transparent border-b ${theme.border} py-3 focus:border-[#C5A059] outline-none ${theme.text}`}><option className="text-black">Cash</option><option className="text-black">UPI (Online)</option></select>
                  </div>
                </div>

                {/* DYNAMIC QR CODE SECTION */}
                {checkoutForm.paymentMethod === 'UPI' && (
                  <div className="bg-white p-6 rounded-lg text-center shadow-inner mt-4 border-2 border-[#C5A059]">
                    <p className="text-xs text-black font-bold mb-4 uppercase tracking-widest flex items-center justify-center gap-2"><QrCode size={14}/> Scan to Pay ₹{cartTotal}</p>
                    <div className="w-48 h-48 mx-auto bg-gray-200 mb-4 flex items-center justify-center overflow-hidden rounded-lg">
                       {/* Using UPI ID: aishwar.mittal11@oksbi */}
                       <img 
                         src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=aishwar.mittal11@oksbi&pn=RajwadaRestaurant&am=${cartTotal}&cu=INR`} 
                         alt="UPI QR Code" 
                         className="w-full h-full object-contain" 
                       />
                    </div>
                    <div className="flex items-center justify-center gap-2 mb-2 text-black text-xs">
                      <span>UPI ID: aishwar.mittal11@oksbi</span>
                      <button type="button" onClick={() => navigator.clipboard.writeText('aishwar.mittal11@oksbi')}><Copy size={12}/></button>
                    </div>
                    <input 
                      required 
                      type="text" 
                      value={checkoutForm.txnId} 
                      onChange={e => setCheckoutForm({...checkoutForm, txnId: e.target.value})} 
                      className="w-full bg-gray-100 border border-gray-300 py-3 px-4 rounded text-black text-center text-sm outline-none focus:border-[#C5A059] font-mono" 
                      placeholder="Enter Transaction ID / UTR No."
                    />
                    <p className="text-[10px] text-red-500 mt-2 font-bold">⚠️ IMPORTANT: Payment is not automatic. Scan QR &rarr; Pay &rarr; Enter ID here &rarr; Click Order.</p>
                  </div>
                )}

                <div className="bg-[#C5A059]/10 p-4 rounded mt-4"><div className="flex justify-between items-center mb-2"><span className={`text-sm ${theme.text}`}>Total Items:</span><span className={`font-bold ${theme.text}`}>{cart.reduce((a,b) => a + b.qty, 0)}</span></div><div className="flex justify-between items-center"><span className={`text-lg ${theme.text}`}>To Pay:</span><span className="text-xl font-bold text-[#C5A059]">₹{cartTotal}</span></div></div>
                <button type="submit" className="w-full py-4 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold tracking-widest uppercase transition-colors flex items-center justify-center gap-2"><MessageSquare size={20} /> Order via WhatsApp</button>
              </form>
           </div>
        </div>
      )}
      
      {/* Admin, Chatbot & Footer components */}
      {showAdminLogin && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={() => setShowAdminLogin(false)} />
          <div className={`relative w-full max-w-sm ${theme.cardBg} border ${theme.border} p-8 rounded-lg shadow-2xl animate-in zoom-in`}>
             <div className="text-center mb-6"><Lock size={40} className="mx-auto text-[#C5A059] mb-4" /><h3 className={`text-xl font-serif ${theme.text}`}>Admin Access</h3></div>
             <form onSubmit={handleAdminLogin}>
               <input type="password" value={adminPin} onChange={e => setAdminPin(e.target.value)} className={`w-full bg-transparent border-b ${theme.border} py-3 text-center text-xl tracking-widest outline-none ${theme.text} mb-8`} placeholder="Enter PIN" autoFocus />
               <button className="w-full py-3 bg-[#C5A059] text-white font-bold tracking-widest uppercase">Unlock Panel</button>
             </form>
          </div>
        </div>
      )}

      <RoyalConcierge theme={theme} isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} menuData={menuData} />
      
      {!isChatOpen && activeTab !== 'Admin' && (
        <button onClick={() => setIsChatOpen(true)} className="fixed bottom-6 right-6 z-50 bg-[#C5A059] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform animate-bounce"><Bot size={28} /></button>
      )}

      {isMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-[#111] text-white flex flex-col items-center justify-center gap-8 animate-in fade-in zoom-in duration-300">
          <button className="absolute top-8 right-8" onClick={() => setIsMenuOpen(false)}><X size={32} /></button>
          {['Home', 'Menu', 'Sweets', 'Reviews', 'Events', 'Contact'].map((tab) => (
            <button key={tab} className="text-2xl font-serif tracking-widest hover:text-[#C5A059]" onClick={() => { setActiveTab(tab); setIsMenuOpen(false); }}>{tab}</button>
          ))}
          <button onClick={() => { setIsMenuOpen(false); setShowAdminLogin(true); }} className="mt-8 flex items-center gap-2 text-gray-500"><Lock size={16} /> Admin</button>
        </div>
      )}

      <main>{renderContent()}</main>

      <footer className={`${isDarkMode ? 'bg-[#050505]' : 'bg-[#111]'} text-white py-20 px-6 border-t border-white/10`}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 text-sm">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6"><Crown className="text-[#C5A059]" size={24} /><h3 className="text-2xl font-serif font-bold tracking-widest text-[#C5A059]">RAJWADA</h3></div>
            <p className="text-gray-400 leading-relaxed">Experience the royal taste of tradition. Located in the heart of Jagdishpur.</p>
          </div>
          <div><h4 className="tracking-widest uppercase mb-6 font-bold text-[#C5A059]">Contact</h4><ul className="text-gray-400 space-y-3"><li>Near Maruti Showroom, Village- Kathaura</li><li>BHEL Jagdishpur, Distt.- Amethi</li><li>+91 95804 63211</li></ul></div>
          <div><h4 className="tracking-widest uppercase mb-6 font-bold text-[#C5A059]">Quick Links</h4><ul className="text-gray-400 space-y-3"><li className="hover:text-[#C5A059] cursor-pointer" onClick={() => setActiveTab('Menu')}>Royal Menu</li><li className="hover:text-[#C5A059] cursor-pointer" onClick={() => setActiveTab('Reviews')}>Reviews</li></ul></div>
          <div><h4 className="tracking-widest uppercase mb-6 font-bold text-[#C5A059]">Hours</h4><p className="text-gray-400">Open Daily: 10:00 AM - 10:00 PM</p></div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/10 flex justify-between items-center"><p className="text-xs text-gray-500 tracking-widest">&copy; {new Date().getFullYear()} RAJWADA RESTAURANT. ALL RIGHTS RESERVED.</p><button onClick={() => setShowAdminLogin(true)} className="text-gray-500 hover:text-[#C5A059] transition-colors p-2" title="Admin Login"><Lock size={16} /></button></div>
      </footer>
    </div>
  );
};

// --- SUB COMPONENTS ---
const RoyalConcierge = ({ theme, isOpen, onClose, menuData }) => {
  const [messages, setMessages] = useState([{ role: 'ai', text: 'Namaste! I am your Royal Concierge. How may I assist you with our menu today?' }]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);
  useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight; }, [messages]);
  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    if (!apiKey) { setMessages(prev => [...prev, { role: 'user', text: input }, { role: 'ai', text: '⚠️ SYSTEM ERROR: Please configure the Google Gemini API Key in the code (src/App.jsx) to enable AI features.' }]); setInput(''); return; }
    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsLoading(true);
    try {
      const menuContext = Object.entries(menuData).map(([cat, items]) => `${cat}: ${items.map(i => i.name + ' (' + i.price + ')').join(', ')}`).join('. ');
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ contents: [{ parts: [{ text: `You are the polite, regal Royal Concierge of Rajwada Restaurant in Jagdishpur, Amethi. Answer briefly in a helpful, friendly tone. Menu Context: ${menuContext}. Location: Near Maruti Showroom, Kathaura. User asked: ${userMsg}` }] }] }) });
      const data = await response.json();
      const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Apologies, I am momentarily distracted. Please ask again.";
      setMessages(prev => [...prev, { role: 'ai', text: aiText }]);
    } catch (error) { setMessages(prev => [...prev, { role: 'ai', text: "Forgive me, connection to the palace network is weak." }]); } finally { setIsLoading(false); }
  };
  if (!isOpen) return null;
  return (
    <div className={`fixed bottom-24 right-6 w-80 h-96 ${theme.cardBg} border ${theme.border} rounded-lg shadow-2xl z-50 flex flex-col animate-in slide-in-from-bottom-10`}>
      <div className="bg-[#C5A059] p-4 rounded-t-lg flex justify-between items-center text-white"><div className="flex items-center gap-2"><Bot size={20} /><span className="font-serif font-bold">Royal Concierge</span></div><button onClick={onClose}><X size={18} /></button></div>
      <div className="flex-grow overflow-y-auto p-4 space-y-3" ref={scrollRef}>{messages.map((msg, idx) => (<div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}><div className={`max-w-[80%] p-3 rounded-lg text-sm ${msg.role === 'user' ? 'bg-[#C5A059] text-white' : 'bg-gray-800 text-gray-200'} ${msg.text.includes('⚠️') ? 'bg-red-900 text-white' : ''}`}>{msg.text}</div></div>))}{isLoading && <div className="text-xs text-gray-500 italic ml-2">The Concierge is thinking...</div>}</div>
      <form onSubmit={handleSend} className="p-3 border-t border-gray-700 flex gap-2"><input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask about food..." className="flex-grow bg-transparent border border-gray-600 rounded px-3 py-2 text-sm text-gray-300 focus:border-[#C5A059] outline-none" /><button type="submit" className="bg-[#C5A059] text-white p-2 rounded hover:bg-[#a38446]"><Send size={16} /></button></form>
    </div>
  );
};

const AdminPanel = ({ theme, menuData, setMenuData, sweetsData, setSweetsData, onLogout }) => {
  const [adminTab, setAdminTab] = useState('menu');
  const [newItem, setNewItem] = useState({ category: 'Specials', name: '', price: '', desc: '', img: '' });
  const [isGenerating, setIsGenerating] = useState(false);
  const handleAddItem = (e) => { e.preventDefault(); if (adminTab === 'menu') { const updatedMenu = { ...menuData }; if (!updatedMenu[newItem.category]) updatedMenu[newItem.category] = []; updatedMenu[newItem.category].push({ ...newItem }); setMenuData(updatedMenu); } else { setSweetsData([...sweetsData, { ...newItem }]); } setNewItem({ category: 'Specials', name: '', price: '', desc: '', img: '' }); alert("Item Added Successfully!"); };
  const handleDeleteItem = (category, index) => { if(!window.confirm("Delete this item?")) return; const updatedMenu = { ...menuData }; updatedMenu[category].splice(index, 1); setMenuData(updatedMenu); };
  const handleDeleteSweet = (index) => { if(!window.confirm("Delete this sweet?")) return; const updated = [...sweetsData]; updated.splice(index, 1); setSweetsData(updated); };
  const generateDescription = async () => { if (!newItem.name) { alert("Please enter a dish name first."); return; } if (!apiKey) { alert("⚠️ API Key Missing! Please add your Google Gemini API Key in src/App.jsx"); return; } setIsGenerating(true); try { const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ contents: [{ parts: [{ text: `Write a short, mouth-watering, luxurious description (max 12 words) for a fine dining Indian dish named "${newItem.name}".` }] }] }) }); const data = await response.json(); const desc = data.candidates?.[0]?.content?.parts?.[0]?.text || "A royal delicacy prepared with the finest ingredients."; setNewItem(prev => ({ ...prev, desc: desc.trim() })); } catch (error) { alert("Failed to generate description. Please try again."); } finally { setIsGenerating(false); } };
  return (
    <div className={`pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-screen ${theme.text}`}>
      <div className="flex justify-between items-center mb-12 border-b border-gray-700 pb-6"><div><h2 className="text-3xl font-serif text-[#C5A059] mb-2">Admin Dashboard</h2><p className={`${theme.subText} text-sm`}>Manage your restaurant content live.</p></div><button onClick={onLogout} className="flex items-center gap-2 bg-red-600/20 text-red-500 px-4 py-2 rounded-lg hover:bg-red-600 hover:text-white transition-all"><LogOut size={18} /> Logout</button></div>
      <div className="flex gap-4 mb-8"><button onClick={() => setAdminTab('menu')} className={`px-6 py-2 rounded-lg font-bold ${adminTab === 'menu' ? 'bg-[#C5A059] text-white' : 'bg-gray-800 text-gray-400'}`}>Food Menu</button><button onClick={() => setAdminTab('sweets')} className={`px-6 py-2 rounded-lg font-bold ${adminTab === 'sweets' ? 'bg-[#C5A059] text-white' : 'bg-gray-800 text-gray-400'}`}>Sweets</button></div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className={`${theme.cardBg} p-8 border ${theme.border} rounded-lg h-fit`}><h3 className="text-xl font-bold mb-6 flex items-center gap-2"><Plus size={20} className="text-[#C5A059]"/> Add New Item</h3><form onSubmit={handleAddItem} className="space-y-4">{adminTab === 'menu' && (<div><label className="text-xs text-gray-500 block mb-1">Category</label><select value={newItem.category} onChange={e => setNewItem({...newItem, category: e.target.value})} className={`w-full p-2 rounded bg-transparent border ${theme.border} outline-none text-sm`}><option className="text-black">Chaat</option><option className="text-black">Specials</option></select></div>)}<div><input placeholder="Item Name" required value={newItem.name} onChange={e => setNewItem({...newItem, name: e.target.value})} className={`w-full p-3 rounded bg-transparent border ${theme.border} outline-none text-sm`} /></div><div><input placeholder="Price (e.g. ₹200)" required value={newItem.price} onChange={e => setNewItem({...newItem, price: e.target.value})} className={`w-full p-3 rounded bg-transparent border ${theme.border} outline-none text-sm`} /></div>{adminTab === 'menu' && (<div className="relative"><input placeholder="Description" required value={newItem.desc} onChange={e => setNewItem({...newItem, desc: e.target.value})} className={`w-full p-3 pr-10 rounded bg-transparent border ${theme.border} outline-none text-sm`} /><button type="button" onClick={generateDescription} disabled={isGenerating} className="absolute right-2 top-2 text-[#C5A059] hover:bg-[#C5A059]/10 p-1 rounded transition-colors" title="Generate with AI">{isGenerating ? <div className="animate-spin h-4 w-4 border-2 border-[#C5A059] border-t-transparent rounded-full" /> : <Sparkles size={18} />}</button></div>)}<div><input placeholder="Image URL (Optional)" value={newItem.img} onChange={e => setNewItem({...newItem, img: e.target.value})} className={`w-full p-3 rounded bg-transparent border ${theme.border} outline-none text-sm`} /></div><button className="w-full py-3 bg-[#C5A059] text-white font-bold rounded hover:bg-white hover:text-black transition-colors">Add to {adminTab === 'menu' ? 'Menu' : 'Shop'}</button></form></div>
        <div className="lg:col-span-2 space-y-8">{adminTab === 'menu' ? Object.keys(menuData).map(cat => (<div key={cat}><h3 className="text-[#C5A059] font-bold tracking-widest uppercase mb-4 text-sm border-b border-gray-800 pb-2">{cat}</h3><div className="space-y-4">{menuData[cat].map((item, idx) => (<div key={idx} className={`flex justify-between items-center p-4 ${theme.cardBg} border ${theme.border} rounded-lg group`}><div><h4 className="font-bold">{item.name}</h4><p className="text-sm text-[#C5A059]">{item.price}</p></div><button onClick={() => handleDeleteItem(cat, idx)} className="text-gray-600 hover:text-red-500 p-2"><Trash2 size={18} /></button></div>))}</div></div>)) : (<div className="grid grid-cols-2 gap-4">{sweetsData.map((item, idx) => (<div key={idx} className={`p-4 ${theme.cardBg} border ${theme.border} rounded-lg relative group`}><h4 className="font-bold">{item.name}</h4><p className="text-sm text-[#C5A059]">{item.price}</p><button onClick={() => handleDeleteSweet(idx)} className="absolute top-2 right-2 text-gray-600 hover:text-red-500"><Trash2 size={16} /></button></div>))}</div>)}</div>
      </div>
    </div>
  );
};
const HomeSection = ({ setActiveTab, theme }) => (<section className="relative"><div className="h-screen w-full relative overflow-hidden flex items-center justify-center"><div className="absolute inset-0 bg-cover bg-center transition-transform duration-[10000ms] hover:scale-110" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1585937421612-70a008356f36?q=80&w=2000&auto=format&fit=crop')` }} /><div className={`absolute inset-0 ${theme.bg === 'bg-[#0F0F0F]' ? 'bg-black/70' : 'bg-black/40'}`} /><div className="relative z-10 text-center px-6 max-w-4xl animate-in fade-in slide-in-from-bottom-10 duration-1000"><Crown size={64} className="mx-auto mb-8 text-[#C5A059]" /><h4 className="text-[#C5A059] tracking-[0.4em] uppercase text-sm mb-6 font-medium">Authentic Indian Cuisine</h4><h1 className="text-white text-5xl md:text-8xl font-serif mb-8 leading-tight">Royal Taste of <br/> Jagdishpur</h1><div className="flex flex-col md:flex-row gap-6 justify-center"><button onClick={() => setActiveTab('Menu')} className="px-10 py-4 bg-[#C5A059] text-white tracking-[0.2em] uppercase text-xs font-bold hover:bg-white hover:text-black transition-all">Order Now</button><button onClick={() => setActiveTab('Events')} className="px-10 py-4 border border-white text-white tracking-[0.2em] uppercase text-xs font-bold hover:bg-white hover:text-black transition-all">Book Table</button></div></div><div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white animate-bounce"><ChevronDown size={32} /></div></div><div className="grid grid-cols-1 md:grid-cols-3 -mt-20 relative z-20 max-w-6xl mx-auto px-6 gap-0 shadow-2xl"><div className={`${theme.cardBg} p-12 text-center border-r ${theme.border}`}><ChefHat className="mx-auto mb-6 text-[#C5A059]" size={40} /><h3 className={`text-xl font-serif mb-4 tracking-widest ${theme.text}`}>Rajwada Specials</h3><p className={`${theme.subText} text-sm`}>Try our Soya Chaap & Paneer Angara.</p></div><div className={`${theme.cardBg} p-12 text-center border-r ${theme.border}`}><Utensils className="mx-auto mb-6 text-[#C5A059]" size={40} /><h3 className={`text-xl font-serif mb-4 tracking-widest ${theme.text}`}>Famous Chaat</h3><p className={`${theme.subText} text-sm`}>Aloo Tikki, Pani Batasha & more.</p></div><div className={`${theme.cardBg} p-12 text-center`}><Cake className="mx-auto mb-6 text-[#C5A059]" size={40} /><h3 className={`text-xl font-serif mb-4 tracking-widest ${theme.text}`}>Mithai & Lassi</h3><p className={`${theme.subText} text-sm`}>Traditional sweets & Dry Fruit Lassi.</p></div></div></section>);
const MenuSection = ({ theme, addToCart, menuData }) => {const [filter, setFilter] = useState('Chaat'); return (<div className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-screen animate-in fade-in duration-700"><div className="text-center mb-16"><h4 className="text-[#C5A059] tracking-[0.3em] uppercase text-xs mb-4">The Royal Kitchen</h4><h2 className={`text-4xl md:text-5xl font-serif mb-8 ${theme.text}`}>Our Menu</h2><div className="flex flex-wrap justify-center gap-4">{Object.keys(menuData).map(cat => (<button key={cat} onClick={() => setFilter(cat)} className={`px-8 py-3 rounded-sm text-xs tracking-widest uppercase transition-all border font-bold ${filter === cat ? 'bg-[#C5A059] text-white border-[#C5A059]' : `${theme.border} ${theme.text} hover:border-[#C5A059]`}`}>{cat}</button>))}</div></div><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">{(menuData[filter] || []).map((item, idx) => (<div key={idx} className={`group flex gap-4 ${theme.cardBg} p-4 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border ${theme.border}`}><div className="w-24 h-24 md:w-32 md:h-32 shrink-0 overflow-hidden rounded-md relative bg-gray-800">{item.img ? <img src={item.img} alt={item.name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" /> : <div className="w-full h-full flex items-center justify-center text-gray-600"><ImageIcon /></div>}</div><div className="flex flex-col justify-between flex-grow"><div><div className="flex justify-between items-start mb-2"><h3 className={`text-lg font-serif tracking-wide group-hover:text-[#C5A059] transition-colors ${theme.text}`}>{item.name}</h3><span className="text-[#C5A059] font-bold font-serif ml-4">{item.price}</span></div><p className={`${theme.subText} text-xs leading-relaxed line-clamp-2`}>{item.desc}</p></div><button onClick={() => addToCart(item)} className="mt-4 self-start px-4 py-2 border border-[#C5A059] text-[#C5A059] text-xs font-bold uppercase hover:bg-[#C5A059] hover:text-white transition-colors">Add to Cart</button></div></div>))}</div></div>);};
const SweetsSection = ({ theme, addToCart, sweetsData }) => (<div className="pt-32 pb-20"><div className="max-w-7xl mx-auto px-6"><h4 className="text-[#C5A059] tracking-[0.3em] uppercase text-xs mb-4">Mithai Shop</h4><h2 className={`text-4xl md:text-5xl font-serif mb-12 ${theme.text}`}>Traditional Sweets</h2><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">{sweetsData.map((item, idx) => (<div key={idx} className="group cursor-pointer"><div className="relative overflow-hidden aspect-[4/5] mb-4 rounded-sm bg-gray-800">{item.img ? <img src={item.image || item.img} alt={item.name} className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-700" /> : <div className="w-full h-full flex items-center justify-center text-gray-500"><Cake /></div>}<div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" /><button onClick={() => addToCart(item)} className="absolute bottom-4 left-4 right-4 bg-white text-black py-3 text-xs tracking-widest uppercase font-bold opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">Add to Cart</button></div><h3 className={`text-lg font-serif mb-1 ${theme.text}`}>{item.name}</h3><p className="text-[#C5A059] text-sm font-medium">{item.price}</p></div>))}</div></div></div>);
const ReviewsSection = ({ theme }) => {const reviews = [{ name: "Rahul Singh", rating: 5, date: "2 days ago", text: "The Paneer Angara is absolutely world-class. Best family restaurant in Jagdishpur!" }, { name: "Priya Sharma", rating: 5, date: "1 week ago", text: "Celebrated my daughter's birthday here. The decoration and cake were perfect." }, { name: "Amit Verma", rating: 4, date: "3 weeks ago", text: "Great ambiance and very polite staff. The Soya Chaap is a must-try." }, { name: "Sneha Gupta", rating: 5, date: "1 month ago", text: "Authentic taste and royal vibes. Love the Kaju Katli from their sweet shop." }]; return (<div className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-screen"><div className="text-center mb-16"><h4 className="text-[#C5A059] tracking-[0.3em] uppercase text-xs mb-4">Guest Book</h4><h2 className={`text-4xl md:text-5xl font-serif mb-8 ${theme.text}`}>What Our Guests Say</h2></div><div className="grid grid-cols-1 md:grid-cols-2 gap-8">{reviews.map((review, idx) => (<div key={idx} className={`${theme.cardBg} p-8 border ${theme.border} rounded-lg shadow-sm`}><div className="flex justify-between items-start mb-4"><div className="flex gap-1 text-[#C5A059]">{[...Array(5)].map((_, i) => (<Star key={i} size={16} fill={i < review.rating ? "currentColor" : "none"} className={i < review.rating ? "text-[#C5A059]" : "text-gray-600"} />))}</div><span className={`text-xs ${theme.subText}`}>{review.date}</span></div><p className={`${theme.text} italic mb-6 leading-relaxed`}>"{review.text}"</p><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-full bg-[#C5A059]/20 flex items-center justify-center text-[#C5A059] font-bold font-serif">{review.name[0]}</div><span className={`font-medium ${theme.text}`}>{review.name}</span></div></div>))}</div></div>);};
const EventsSection = ({ theme }) => (<div className="pt-32 pb-20 px-6 max-w-7xl mx-auto"><div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center"><div><h4 className="text-[#C5A059] tracking-[0.3em] uppercase text-xs mb-4">Celebrations</h4><h2 className={`text-4xl md:text-6xl font-serif mb-8 ${theme.text}`}>Book Your Event</h2><p className={`${theme.subText} mb-8 leading-relaxed`}>From birthday parties with our special cakes to large family dinners, Rajwada provides the perfect royal setting in Jagdishpur.</p><div className="space-y-6"><div className={`flex items-center gap-4 ${theme.text}`}><div className="w-10 h-10 rounded-full bg-[#C5A059]/20 flex items-center justify-center text-[#C5A059]"><Cake size={20} /></div><span className="font-medium">Birthday Packages Available</span></div><div className={`flex items-center gap-4 ${theme.text}`}><div className="w-10 h-10 rounded-full bg-[#C5A059]/20 flex items-center justify-center text-[#C5A059]"><Calendar size={20} /></div><span className="font-medium">Priority Table Reservations</span></div></div></div><div className={`${theme.cardBg} p-8 md:p-12 shadow-2xl border ${theme.border} rounded-sm`}><h3 className={`text-2xl font-serif mb-8 text-center ${theme.text}`}>Reservation Form</h3><form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Thank you! A manager will call you shortly."); }}><input type="text" className={`w-full bg-transparent border-b ${theme.border} py-3 focus:border-[#C5A059] outline-none text-sm ${theme.text}`} placeholder="Your Name" /><input type="tel" className={`w-full bg-transparent border-b ${theme.border} py-3 focus:border-[#C5A059] outline-none text-sm ${theme.text}`} placeholder="Phone Number" /><div className="grid grid-cols-2 gap-6"><input type="date" className={`w-full bg-transparent border-b ${theme.border} py-3 focus:border-[#C5A059] outline-none text-sm ${theme.subText}`} /><select className={`w-full bg-transparent border-b ${theme.border} py-3 focus:border-[#C5A059] outline-none text-sm ${theme.subText}`}><option>Dinner Table</option><option>Birthday Party</option><option>Bulk Sweet Order</option></select></div><button className="w-full py-4 bg-[#C5A059] text-white tracking-[0.3em] uppercase text-xs font-bold hover:bg-white hover:text-black transition-all">Send Request</button></form></div></div></div>);
const ContactSection = ({ theme }) => (<div className="pt-32 pb-20 px-6 max-w-7xl mx-auto text-center"><h2 className={`text-4xl md:text-5xl font-serif mb-12 ${theme.text}`}>Visit Us</h2><div className="w-full h-[400px] mb-12 rounded-lg overflow-hidden border border-[#C5A059]/30 shadow-lg relative bg-gray-900"><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14316.837895028575!2d81.5471649!3d26.2223049!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399a6147171d9d4f%3A0x65675841d1a8e0!2sKathaura%2C%20Uttar%20Pradesh%20227817!5e0!3m2!1sen!2sin!4v1706640000000!5m2!1sen!2sin" width="100%" height="100%" style={{ border: 0, filter: theme.text === 'text-[#E5E5E5]' ? 'grayscale(1) contrast(1.2) invert(90%) hue-rotate(180deg)' : 'grayscale(0)' }} allowFullScreen="" loading="lazy" title="Rajwada Location"></iframe><div className="absolute bottom-4 right-4 bg-white/90 text-black px-4 py-2 text-xs font-bold rounded shadow">Near Maruti Showroom, Kathaura</div></div><div className={`p-8 border ${theme.border} ${theme.cardBg} shadow-sm mb-12`}><MapPin size={32} className="mx-auto text-[#C5A059] mb-6" /><p className={`${theme.subText} text-lg leading-relaxed`}>Near Maruti Showroom, Village- Kathaura,<br/>BHEL Jagdishpur, Distt.- Amethi</p></div><div className="grid grid-cols-1 md:grid-cols-2 gap-8"><div className={`p-8 border ${theme.border} ${theme.cardBg}`}><Phone size={24} className="mx-auto text-[#C5A059] mb-4" /><p className={theme.text}>+91 95804 63211</p></div><div className={`p-8 border ${theme.border} ${theme.cardBg}`}><Clock size={24} className="mx-auto text-[#C5A059] mb-4" /><p className={theme.text}>Open Daily: 10:00 AM - 10:00 PM</p></div></div></div>);

export default App;
