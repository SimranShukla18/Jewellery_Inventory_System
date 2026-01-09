import React, { useState, useEffect } from 'react';
import { DollarSign, ShoppingBag, Package, TrendingUp } from 'lucide-react';
import Navbar from './Navbar';
import KPICard from './KPICard';
import SalesChart from './Charts/SalesChart';
import InventoryChart from './Charts/InventoryChart';
import RevenueChart from './Charts/RevenueChart';

const AnalyticsDashboard = () => {
  const [activeTab, setActiveTab] = useState('Insights');
  
  // Live updating data
  const [salesData, setSalesData] = useState([
    { day: 'Mon', sales: 24500, orders: 45 },
    { day: 'Tue', sales: 32800, orders: 62 },
    { day: 'Wed', sales: 28900, orders: 54 },
    { day: 'Thu', sales: 41200, orders: 78 },
    { day: 'Fri', sales: 38600, orders: 71 },
    { day: 'Sat', sales: 52300, orders: 95 },
    { day: 'Sun', sales: 45700, orders: 83 }
  ]);

  const [inventoryData, setInventoryData] = useState([
    { name: 'Gold', value: 3450, color: '#F59E0B', percentage: 34 },
    { name: 'Silver', value: 2890, color: '#8B8B8D', percentage: 28 },
    { name: 'Diamond', value: 1560, color: '#38BDF8', percentage: 16 },
    { name: 'Platinum', value: 980, color: '#A3A3A3', percentage: 10 },
    { name: 'Gems', value: 1240, color: '#A855F7', percentage: 12 }
  ]);

  const [revenueData, setRevenueData] = useState([
    { month: 'Jan', revenue: 145000, target: 140000 },
    { month: 'Feb', revenue: 168000, target: 160000 },
    { month: 'Mar', revenue: 192000, target: 180000 },
    { month: 'Apr', revenue: 178000, target: 185000 },
    { month: 'May', revenue: 215000, target: 200000 },
    { month: 'Jun', revenue: 234000, target: 220000 }
  ]);

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSalesData(prev => prev.map(item => ({
        ...item,
        sales: Math.max(15000, item.sales + Math.floor(Math.random() * 4000 - 2000)),
        orders: Math.max(30, item.orders + Math.floor(Math.random() * 10 - 5))
      })));

      setInventoryData(prev => prev.map(item => ({
        ...item,
        value: Math.max(500, item.value + Math.floor(Math.random() * 100 - 50))
      })));
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  const kpiData = [
    { 
      title: 'Total Revenue', 
      value: '$1.13M', 
      change: '+12.4%',
      isPositive: true,
      icon: DollarSign,
      bgColor: 'bg-emerald-50',
      iconColor: 'bg-emerald-500',
      textColor: 'text-emerald-600'
    },
    { 
      title: 'Total Orders', 
      value: '2,847', 
      change: '+8.2%',
      isPositive: true,
      icon: ShoppingBag,
      bgColor: 'bg-blue-50',
      iconColor: 'bg-blue-500',
      textColor: 'text-blue-600'
    },
    { 
      title: 'Inventory Items', 
      value: '10,120', 
      change: '-2.1%',
      isPositive: false,
      icon: Package,
      bgColor: 'bg-purple-50',
      iconColor: 'bg-purple-500',
      textColor: 'text-purple-600'
    },
    { 
      title: 'Growth Rate', 
      value: '23.5%', 
      change: '+5.1%',
      isPositive: true,
      icon: TrendingUp,
      bgColor: 'bg-amber-50',
      iconColor: 'bg-amber-500',
      textColor: 'text-amber-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Analytics Page Content */}
      <div className="px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-4xl font-bold text-slate-800 mb-2">Analytics & Insights</h2>
              <p className="text-slate-600 text-lg">Monitor your jewellery business performance in real-time</p>
            </div>
            <div className="flex items-center space-x-3 bg-white border border-emerald-200 px-5 py-3 rounded-xl shadow-sm">
              <div className="relative">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <div className="absolute inset-0 w-2 h-2 bg-emerald-500 rounded-full animate-ping"></div>
              </div>
              <span className="text-sm font-bold text-emerald-600">LIVE DATA UPDATING</span>
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {kpiData.map((kpi, index) => (
            <KPICard key={index} {...kpi} />
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <SalesChart salesData={salesData} />
          <InventoryChart inventoryData={inventoryData} />
        </div>

        <RevenueChart revenueData={revenueData} />
      </div>
    </div>
  );
};

export default AnalyticsDashboard;