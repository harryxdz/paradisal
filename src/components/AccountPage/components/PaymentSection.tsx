import React from 'react';
import { DollarSign, Plus, CreditCard, Download } from 'lucide-react';
import { ServiceCategory, Payment } from '../types';

interface PaymentSectionProps {
  handleMakePayment: (service: string, amount: number) => void;
  payments: Payment[];
  paymentMethod: { type: string; card: string; expires: string };
}

const PaymentSection: React.FC<PaymentSectionProps> = ({
  handleMakePayment,
  payments,
  paymentMethod
}) => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">Make a Payment</h3>
          <button 
            onClick={() => handleMakePayment('Custom Payment', 0)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center hover:bg-blue-700 transition"
          >
            <Plus className="w-4 h-4 mr-1" /> Custom Payment
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {serviceCategories.flatMap(category => 
            category.services.filter(s => s.fee > 0).map(service => (
              <div 
                key={service.id}
                className="border rounded-xl p-4 hover:shadow-md transition cursor-pointer"
                onClick={() => handleMakePayment(service.name, service.fee)}
              >
                <div className="flex justify-between items-start">
                  <h4 className="font-bold">{service.name}</h4>
                  <DollarSign className="text-green-600" />
                </div>
                <p className="text-sm text-gray-500 mt-2">{service.description}</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-lg font-bold">${service.fee.toFixed(2)}</span>
                  <button className="text-blue-600 hover:text-blue-800 text-sm">
                    Pay Now
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="text-xl font-bold mb-4">Payment History</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {payments.map(payment => (
                <tr key={payment.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap">{payment.service}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{payment.date}</td>
                  <td className="px-4 py-3 whitespace-nowrap">${payment.amount.toFixed(2)}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      payment.status === 'completed' ? 'bg-green-100 text-green-800' : 
                      payment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'
                    }`}>
                      {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <button className="text-blue-600 hover:text-blue-800 flex items-center">
                      <Download className="w-4 h-4 mr-1" /> Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="text-xl font-bold mb-4">Payment Methods</h3>
        <div className="flex items-center justify-between p-4 border rounded-xl">
          <div className="flex items-center">
            <CreditCard className="w-8 h-8 text-blue-500 mr-4" />
            <div>
              <p className="font-medium">Credit Card</p>
              <p className="text-sm text-gray-500">{paymentMethod.card} • Exp {paymentMethod.expires}</p>
            </div>
          </div>
          <button className="text-blue-600 hover:text-blue-800">Edit</button>
        </div>
        <button className="mt-4 flex items-center text-blue-600 hover:text-blue-800">
          <Plus className="w-4 h-4 mr-1" /> Add Payment Method
        </button>
      </div>
    </div>
  );
};

export default PaymentSection;