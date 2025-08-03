import React from 'react';
import { XCircle, Download, MapPin, File, CreditCard } from 'lucide-react';
import { Service } from '../types';

interface ServiceDetailsModalProps {
  selectedService: Service | null;
  setShowServiceDetails: (show: boolean) => void;
  handleMakePayment: (service: string, amount: number) => void;
}

const ServiceDetailsModal: React.FC<ServiceDetailsModalProps> = ({
  selectedService,
  setShowServiceDetails,
  handleMakePayment
}) => {
  if (!selectedService) return null;
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-xl p-6 max-w-2xl w-full">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold">{selectedService.name}</h3>
          <button 
            onClick={() => setShowServiceDetails(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <XCircle className="w-6 h-6" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <p className="text-gray-600 mb-4">{selectedService.description}</p>
            
            <div className="bg-gray-50 rounded-xl p-4 mb-4">
              <h4 className="font-bold mb-2">Requirements</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Government-issued photo ID</li>
                <li>Proof of residency (utility bill, lease agreement)</li>
                <li>Completed application form</li>
                {selectedService.fee > 0 && <li>Payment method (credit/debit card)</li>}
              </ul>
            </div>
            
            {selectedService.form && (
              <div className="border rounded-xl p-4">
                <h4 className="font-bold mb-2 flex items-center">
                  <File className="w-5 h-5 mr-2 text-blue-600" />
                  Required Form: {selectedService.form}
                </h4>
                <div className="flex gap-2 mt-3">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center hover:bg-blue-700 transition">
                    <Download className="w-4 h-4 mr-1" /> Download PDF
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                    Fill Online
                  </button>
                </div>
              </div>
            )}
          </div>
          
          <div className="space-y-4">
            <div className="border rounded-xl p-4">
              <h4 className="font-bold mb-3">Service Details</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Processing Fee:</span>
                  <span className="font-bold">
                    {selectedService.fee > 0 ? `$${selectedService.fee.toFixed(2)}` : 'Free'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Estimated Time:</span>
                  <span className="font-bold">{selectedService.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Processing Time:</span>
                  <span className="font-bold">5-7 business days</span>
                </div>
              </div>
            </div>
            
            <div className="border rounded-xl p-4">
              <h4 className="font-bold mb-3">Service Locations</h4>
              <div className="flex items-start mb-2">
                <MapPin className="w-5 h-5 text-red-500 mr-2 mt-0.5" />
                <div>
                  <p className="font-medium">Downtown Service Center</p>
                  <p className="text-sm text-gray-500">123 Government St, Suite 100</p>
                  <p className="text-sm text-gray-500">Mon-Fri: 8:30 AM - 4:30 PM</p>
                </div>
              </div>
              <button className="text-blue-600 hover:text-blue-800 text-sm mt-2">
                View all locations
              </button>
            </div>
            
            <button 
              onClick={() => {
                if (selectedService.fee > 0) {
                  handleMakePayment(selectedService.name, selectedService.fee);
                }
                setShowServiceDetails(false);
              }}
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition flex items-center justify-center"
            >
              {selectedService.fee > 0 ? (
                <>
                  <CreditCard className="w-5 h-5 mr-2" /> 
                  Pay ${selectedService.fee.toFixed(2)} & Start Service
                </>
              ) : (
                "Start Service Now"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailsModal;