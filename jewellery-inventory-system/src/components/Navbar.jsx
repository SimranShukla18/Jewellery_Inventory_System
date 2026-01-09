import React from 'react';
import { Search, Bell, ChevronDown, Sparkles } from 'lucide-react';

const Navbar = ({ activeTab, setActiveTab }) => {
  const navItems = ['Overview', 'Ledgers', 'Payments', 'Operations', 'Insights', 'Connectors'];

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-slate-200 shadow-sm">
      <div className="px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-500 rounded-2xl blur-md opacity-40 group-hover:opacity-60 transition-opacity"></div>
              <div className="relative w-12 h-12 bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-xl">
                <Sparkles className="w-6 h-6 text-white" strokeWidth={2.5} />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">
                Lumière
              </h1>
              <p className="text-xs text-slate-500 font-semibold tracking-wide">JEWELLERY SYSTEM</p>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="flex items-center bg-slate-100 rounded-xl p-1.5">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => setActiveTab(item)}
                className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  activeTab === item
                    ? 'bg-white text-slate-800 shadow-lg'
                    : 'text-slate-600 hover:text-slate-800'
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-3">
            <button className="p-2.5 text-slate-600 hover:text-slate-800 hover:bg-slate-100 transition-all rounded-xl">
              <Search className="w-5 h-5" />
            </button>
            <button className="relative p-2.5 text-slate-600 hover:text-slate-800 hover:bg-slate-100 transition-all rounded-xl">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center space-x-2 px-3 py-2 hover:bg-slate-100 rounded-xl cursor-pointer transition-all group">
              <div className="w-9 h-9 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                JD
              </div>
              <ChevronDown className="w-4 h-4 text-slate-600 group-hover:text-slate-800 transition-colors" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;