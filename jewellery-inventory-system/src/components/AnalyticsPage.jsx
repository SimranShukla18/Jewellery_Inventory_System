import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Users, ShoppingBag, MoreVertical, Download, Filter } from 'lucide-react';

const AnalyticsPage = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [chartData, setChartData] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  const [metrics, setMetrics] = useState({
    totalRevenue: 12480,
    newCustomers: 342,
    orders: 189,
    avgOrderValue: 66.0,
    revenueChange: 12.5,
    customerChange: 8.2,
    ordersChange: -3.4,
    avgOrderChange: 5.7,
  });

  // Simulate live data updates
  useEffect(() => {
    const generateData = () => {
      const baseData = [];
      const revenue = [];
      const categories = ['Diamond', 'Gold', 'Silver', 'Platinum', 'Gemstone'];
      const categoryRevenue = {};
      let totalRevenue = 0;

      // Generate 7 days of data
      for (let i = 0; i < 7; i++) {
        const dailyRevenue = Math.floor(Math.random() * 3000) + 2000;
        baseData.push({
          day: `Day ${i + 1}`,
          revenue: dailyRevenue,
          customers: Math.floor(Math.random() * 50) + 30,
          orders: Math.floor(Math.random() * 40) + 20,
        });

        // Distribute revenue across categories
        categories.forEach(category => {
          if (!categoryRevenue[category]) categoryRevenue[category] = 0;
          const categoryAmount = Math.floor(dailyRevenue * 0.2 * Math.random());
          categoryRevenue[category] += categoryAmount;
          totalRevenue += categoryAmount;
        });
      }

      // Generate pie chart data
      Object.keys(categoryRevenue).forEach(category => {
        const percentage = (categoryRevenue[category] / totalRevenue) * 100;
        revenue.push({
          category,
          value: categoryRevenue[category],
          percentage: percentage.toFixed(1),
          color: getCategoryColor(category),
        });
      });

      setChartData(baseData);
      setRevenueData(revenue);
    };

    generateData();

    // Update data every 5 seconds for live effect
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        totalRevenue: prev.totalRevenue + Math.floor(Math.random() * 200) - 100,
        orders: prev.orders + Math.floor(Math.random() * 10) - 5,
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getCategoryColor = (category) => {
    const colors = {
      Diamond: '#60a5fa',
      Gold: '#fbbf24',
      Silver: '#d1d5db',
      Platinum: '#94a3b8',
      Gemstone: '#f472b6',
    };
    return colors[category] || '#6b7280';
  };

  const timeRanges = [
    { label: '24h', value: '24h' },
    { label: '7d', value: '7d' },
    { label: '30d', value: '30d' },
    { label: '90d', value: '90d' },
  ];

  // Calculate chart dimensions
  const chartHeight = 200;
  const maxRevenue = Math.max(...chartData.map(d => d.revenue), 1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Analytics Dashboard</h1>
          <p className="text-slate-600 mt-2">Real-time insights into your jewelry business performance</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors text-sm">
            <Download className="w-4 h-4" />
            Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors text-sm">
            <Filter className="w-4 h-4" />
            Filter
          </button>
          <div className="flex bg-white rounded-lg p-1 border border-slate-200">
            {timeRanges.map((range) => (
              <button
                key={range.value}
                onClick={() => setTimeRange(range.value)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  timeRange === range.value
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl p-4 shadow border border-slate-200">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-500 text-sm">Total Revenue</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">${metrics.totalRevenue.toLocaleString()}</p>
            </div>
            <div className="p-2 bg-emerald-50 rounded-lg">
              <DollarSign className="w-5 h-5 text-emerald-600" />
            </div>
          </div>
          <div className="flex items-center mt-3">
            <TrendingUp className="w-4 h-4 text-emerald-600 mr-2" />
            <span className="text-emerald-600 text-sm font-medium">{metrics.revenueChange}%</span>
            <span className="text-slate-500 text-xs ml-2">vs last period</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow border border-slate-200">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-500 text-sm">New Customers</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">{metrics.newCustomers}</p>
            </div>
            <div className="p-2 bg-blue-50 rounded-lg">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <div className="flex items-center mt-3">
            <TrendingUp className="w-4 h-4 text-emerald-600 mr-2" />
            <span className="text-emerald-600 text-sm font-medium">{metrics.customerChange}%</span>
            <span className="text-slate-500 text-xs ml-2">vs last period</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow border border-slate-200">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-500 text-sm">Total Orders</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">{metrics.orders}</p>
            </div>
            <div className="p-2 bg-purple-50 rounded-lg">
              <ShoppingBag className="w-5 h-5 text-purple-600" />
            </div>
          </div>
          <div className="flex items-center mt-3">
            <TrendingDown className="w-4 h-4 text-red-600 mr-2" />
            <span className="text-red-600 text-sm font-medium">{Math.abs(metrics.ordersChange)}%</span>
            <span className="text-slate-500 text-xs ml-2">vs last period</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow border border-slate-200">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-500 text-sm">Avg. Order Value</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">${metrics.avgOrderValue.toFixed(2)}</p>
            </div>
            <div className="p-2 bg-amber-50 rounded-lg">
              <DollarSign className="w-5 h-5 text-amber-600" />
            </div>
          </div>
          <div className="flex items-center mt-3">
            <TrendingUp className="w-4 h-4 text-emerald-600 mr-2" />
            <span className="text-emerald-600 text-sm font-medium">{metrics.avgOrderChange}%</span>
            <span className="text-slate-500 text-xs ml-2">vs last period</span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Revenue Line Chart */}
        <div className="bg-white rounded-xl p-5 shadow border border-slate-200">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Revenue Trend</h3>
              <p className="text-slate-500 text-sm">Daily revenue over time</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-slate-600">Live</span>
            </div>
          </div>
          
          <div className="relative h-48">
            <svg width="100%" height="100%">
              {/* Grid Lines */}
              {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => (
                <line
                  key={i}
                  x1="0"
                  y1={chartHeight * ratio}
                  x2="100%"
                  y2={chartHeight * ratio}
                  stroke="#e2e8f0"
                  strokeWidth="1"
                  strokeDasharray="4"
                />
              ))}

              {/* Line Chart */}
              <polyline
                fill="none"
                stroke="#3b82f6"
                strokeWidth="2"
                points={chartData.map((d, i) => 
                  `${(i / (chartData.length - 1)) * 100}%,${chartHeight - (d.revenue / maxRevenue) * chartHeight}`
                ).join(' ')}
              />

              {/* Dots on line */}
              {chartData.map((d, i) => (
                <circle
                  key={i}
                  cx={`${(i / (chartData.length - 1)) * 100}%`}
                  cy={chartHeight - (d.revenue / maxRevenue) * chartHeight}
                  r="4"
                  fill="#3b82f6"
                  className="hover:r-6 transition-all cursor-pointer"
                />
              ))}

              {/* Labels */}
              {chartData.map((d, i) => (
                <text
                  key={i}
                  x={`${(i / (chartData.length - 1)) * 100}%`}
                  y={chartHeight + 15}
                  textAnchor="middle"
                  className="text-xs fill-slate-500"
                >
                  D{i+1}
                </text>
              ))}
            </svg>
          </div>

          <div className="flex justify-center gap-4 mt-6">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              <span className="text-sm text-slate-600">Revenue</span>
            </div>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white rounded-xl p-5 shadow border border-slate-200">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Revenue by Category</h3>
              <p className="text-slate-500 text-sm">Breakdown of revenue sources</p>
            </div>
            <button className="p-1 hover:bg-slate-100 rounded">
              <MoreVertical className="w-5 h-5 text-slate-400" />
            </button>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <div className="relative w-48 h-48">
              <svg width="100%" height="100%" viewBox="0 0 100 100">
                {(() => {
                  let cumulativePercent = 0;
                  return revenueData.map((item, i) => {
                    const slicePercent = parseFloat(item.percentage);
                    const [x1, y1] = getCoordinatesForPercent(cumulativePercent);
                    cumulativePercent += slicePercent / 100;
                    const [x2, y2] = getCoordinatesForPercent(cumulativePercent);
                    
                    const largeArcFlag = slicePercent > 50 ? 1 : 0;
                    
                    const pathData = [
                      `M ${x1} ${y1}`,
                      `A 1 1 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                      `L 0 0`,
                    ].join(' ');

                    return (
                      <path
                        key={i}
                        d={pathData}
                        fill={item.color}
                        className="cursor-pointer hover:opacity-90 transition-opacity"
                        stroke="white"
                        strokeWidth="2"
                      />
                    );
                  });
                })()}
                <circle cx="0" cy="0" r="25" fill="white" />
              </svg>
            </div>

            <div className="space-y-3">
              {revenueData.map((item, i) => (
                <div key={i} className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded mr-2"
                    style={{ backgroundColor: item.color }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-slate-700 truncate">{item.category}</span>
                      <span className="font-bold text-slate-900 ml-2">{item.percentage}%</span>
                    </div>
                    <div className="text-xs text-slate-500">${item.value.toLocaleString()}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-xl shadow border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200">
          <h3 className="text-lg font-bold text-slate-900">Detailed Analytics</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50">
                <th className="text-left p-3 text-slate-600 font-medium text-sm">Day</th>
                <th className="text-left p-3 text-slate-600 font-medium text-sm">Revenue</th>
                <th className="text-left p-3 text-slate-600 font-medium text-sm">Customers</th>
                <th className="text-left p-3 text-slate-600 font-medium text-sm">Orders</th>
                <th className="text-left p-3 text-slate-600 font-medium text-sm">Avg. Order</th>
                <th className="text-left p-3 text-slate-600 font-medium text-sm">Trend</th>
              </tr>
            </thead>
            <tbody>
              {chartData.map((row, i) => (
                <tr key={i} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="p-3 font-medium text-slate-900">{row.day}</td>
                  <td className="p-3">
                    <div className="font-bold text-slate-900">${row.revenue.toLocaleString()}</div>
                  </td>
                  <td className="p-3">{row.customers}</td>
                  <td className="p-3">{row.orders}</td>
                  <td className="p-3">${(row.revenue / row.orders || 0).toFixed(2)}</td>
                  <td className="p-3">
                    <div className="flex items-center">
                      {i > 0 && row.revenue > chartData[i-1].revenue ? (
                        <>
                          <TrendingUp className="w-4 h-4 text-emerald-600 mr-1" />
                          <span className="text-emerald-600 text-sm font-medium">Up</span>
                        </>
                      ) : i > 0 ? (
                        <>
                          <TrendingDown className="w-4 h-4 text-red-600 mr-1" />
                          <span className="text-red-600 text-sm font-medium">Down</span>
                        </>
                      ) : (
                        <span className="text-slate-400">-</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Live Indicator */}
      <div className="fixed bottom-6 right-6 flex items-center gap-2 bg-white px-3 py-2 rounded-full shadow-lg border border-slate-200">
        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
        <span className="text-sm font-medium text-slate-700">Live data</span>
      </div>
    </div>
  );
};

// Helper function for pie chart coordinates
const getCoordinatesForPercent = (percent) => {
  const x = Math.cos(2 * Math.PI * percent);
  const y = Math.sin(2 * Math.PI * percent);
  return [x, y];
};

export default AnalyticsPage;