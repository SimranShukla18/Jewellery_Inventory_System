import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { Eye, Loader } from 'lucide-react';

const CategoryChart = ({ data, loading }) => {
  return (
    <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-xl hover:shadow-2xl transition-all">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-slate-800 mb-1">Category Distribution</h3>
          <p className="text-slate-600">Products by category</p>
        </div>
        <div className="flex items-center gap-2 bg-purple-50 px-4 py-2 rounded-lg border border-purple-200">
          <Eye className="w-4 h-4 text-purple-600" />
          <span className="text-sm font-bold text-purple-600">LIVE</span>
        </div>
      </div>
      {loading ? (
        <div className="flex items-center justify-center h-80">
          <Loader className="w-8 h-8 text-purple-500 animate-spin" />
        </div>
      ) : data.length > 0 ? (
        <div className="flex items-center justify-between">
          <ResponsiveContainer width="50%" height={280}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="white" strokeWidth={3} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
                }} 
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="w-1/2 flex flex-col gap-3">
            {data.map((item, index) => (
              <div key={index} className="bg-slate-50 rounded-xl p-4 border border-slate-200 hover:shadow-lg transition-all">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full shadow-md" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm font-bold text-slate-800">{item.name}</span>
                  </div>
                  <span className="text-sm font-bold text-slate-600">{item.percentage}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                  <div 
                    className="h-2 rounded-full transition-all duration-500" 
                    style={{ backgroundColor: item.color, width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-80 text-slate-400">
          <p>No category data available</p>
        </div>
      )}
    </div>
  );
};

export default CategoryChart;