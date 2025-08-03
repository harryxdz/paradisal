import React from 'react';
import { PieChart, BarChart3, Plug, Activity } from 'lucide-react';

const AnalyticsDashboard: React.FC = () => {
  const serviceUsageData = [
    { name: 'Passport', value: 35 },
    { name: 'License', value: 25 },
    { name: 'Tax', value: 20 },
    { name: 'ID', value: 15 },
    { name: 'Permits', value: 5 },
  ];
  
  const resolutionTimeData = [
    { day: 'Mon', time: 4 },
    { day: 'Tue', time: 3.5 },
    { day: 'Wed', time: 5 },
    { day: 'Thu', time: 2.5 },
    { day: 'Fri', time: 3 },
    { day: 'Sat', time: 1.5 },
    { day: 'Sun', time: 1 },
  ];
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <h4 className="font-bold mb-4 flex items-center">
            <PieChart className="w-5 h-5 mr-2 text-blue-600" />
            Service Usage Distribution
          </h4>
          <div className="h-64 flex items-center justify-center">
            <div className="relative w-48 h-48">
              {serviceUsageData.map((item, i) => {
                const percentage = item.value;
                const rotation = serviceUsageData.slice(0, i).reduce((sum, curr) => sum + curr.value, 0) * 3.6;
                return (
                  <div 
                    key={item.name}
                    className="absolute inset-0 rounded-full overflow-hidden"
                    style={{
                      clipPath: `conic-gradient(
                        from ${rotation}deg,
                        var(--color) 0 ${percentage * 3.6}deg,
                        transparent ${percentage * 3.6}deg 360deg
                      )`
                    }}
                  >
                    <div 
                      className="w-full h-full"
                      style={{
                        '--color': `hsl(${i * 70}, 70%, 50%)` as any
                      }}
                    ></div>
                  </div>
                );
              })}
              <div className="absolute inset-8 bg-white rounded-full flex flex-col items-center justify-center">
                <span className="text-lg font-bold">Services</span>
              </div>
            </div>
            <div className="ml-8">
              <ul>
                {serviceUsageData.map((item, i) => (
                  <li key={item.name} className="flex items-center mb-2">
                    <div 
                      className="w-4 h-4 rounded-sm mr-2" 
                      style={{ backgroundColor: `hsl(${i * 70}, 70%, 50%)` }}
                    ></div>
                    <span>{item.name}: {item.value}%</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <h4 className="font-bold mb-4 flex items-center">
            <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
            Average Resolution Times
          </h4>
          <div className="h-64">
            <div className="flex items-end h-48 gap-4 mt-4">
              {resolutionTimeData.map((item, i) => (
                <div key={item.day} className="flex flex-col items-center flex-1">
                  <div 
                    className="w-full bg-blue-500 rounded-t-lg hover:bg-blue-600 transition-all"
                    style={{ height: `${item.time * 15}px` }}
                  ></div>
                  <span className="mt-2 text-sm">{item.day}</span>
                  <span className="text-xs text-gray-500 mt-1">{item.time}h</span>
                </div>
              ))}
            </div>
            <div className="text-center mt-4 text-sm">
              Average resolution time: 3.25 hours
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-4 rounded-xl shadow-sm">
        <h4 className="font-bold mb-4">System Performance Metrics</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border rounded-lg">
            <div className="flex justify-between">
              <span>Uptime</span>
              <span className="font-bold">99.98%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '99.98%' }}></div>
            </div>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="flex justify-between">
              <span>Response Time</span>
              <span className="font-bold">128ms</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '85%' }}></div>
            </div>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="flex justify-between">
              <span>User Satisfaction</span>
              <span className="font-bold">4.7/5</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '94%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;