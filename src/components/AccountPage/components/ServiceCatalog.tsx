import React, { useState } from 'react';
import { Search, Clock, Info, FileText } from 'lucide-react';
import { ServiceCategory, Service } from '../types';

interface ServiceCatalogProps {
  serviceCategories: ServiceCategory[];
  initiateService: (service: Service) => void;
  serviceHistory: { service: string; date: string; status: string; reference: string }[];
}

const ServiceCatalog: React.FC<ServiceCatalogProps> = ({
  serviceCategories,
  initiateService,
  serviceHistory
}) => {
  const [serviceSearch, setServiceSearch] = useState('');
  
  const filteredCategories = serviceCategories.map(category => ({
    ...category,
    services: category.services.filter(service => 
      service.name.toLowerCase().includes(serviceSearch.toLowerCase()) ||
      service.description.toLowerCase().includes(serviceSearch.toLowerCase())
    )
  })).filter(category => category.services.length > 0);
  
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">Service Catalog</h3>
          <div className="relative w-1/3">
            <Search className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search services..."
              value={serviceSearch}
              onChange={e => setServiceSearch(e.target.value)}
              className="pl-10 p-2 border rounded-lg w-full focus:ring-2 focus:ring-blue-300"
            />
          </div>
        </div>
        
        {filteredCategories.length === 0 ? (
          <div className="text-center py-10 bg-gray-50 rounded-xl">
            <Info className="w-10 h-10 mx-auto mb-4 text-blue-500" />
            <p>No services found matching your search</p>
          </div>
        ) : (
          <div className="space-y-8">
            {filteredCategories.map(category => (
              <div key={category.id}>
                <h4 className="text-lg font-bold mb-4 border-b pb-2">{category.name}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.services.map(service => (
                    <div 
                      key={service.id}
                      className="border rounded-xl p-5 hover:shadow-md transition cursor-pointer group"
                      onClick={() => initiateService(service)}
                    >
                      <div className="flex justify-between items-start">
                        <h5 className="font-bold text-lg group-hover:text-blue-600 transition">{service.name}</h5>
                        {service.fee > 0 ? (
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                            ${service.fee.toFixed(2)}
                          </span>
                        ) : (
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                            Free
                          </span>
                        )}
                      </div>
                      <p className="text-gray-500 mt-2">{service.description}</p>
                      <div className="mt-4 flex justify-between items-center">
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="w-4 h-4 mr-1" /> {service.duration}
                        </div>
                        <button className="text-blue-600 hover:text-blue-800 text-sm flex items-center">
                          Start Service <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="text-xl font-bold mb-4">Recently Used Services</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {serviceHistory.map((service, i) => (
            <div key={i} className="border rounded-xl p-4 flex items-start">
              <div className="bg-blue-100 p-2 rounded-lg mr-4">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h5 className="font-bold">{service.service}</h5>
                <p className="text-sm text-gray-500">Ref: {service.reference}</p>
                <div className="mt-2 flex items-center">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    service.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {service.status}
                  </span>
                  <span className="text-xs text-gray-500 ml-2">{service.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceCatalog;