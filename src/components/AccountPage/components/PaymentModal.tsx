import React from 'react';
import { XCircle, CreditCard, CheckCircle } from 'lucide-react';

interface PaymentModalProps {
  showPaymentModal: boolean;
  setShowPaymentModal: (show: boolean) => void;
  paymentProcessing: boolean;
  paymentSuccess: boolean;
  paymentService: string;
  paymentAmount: number;
  paymentMethod: { type: string; card: string; expires: string };
  processPayment: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  showPaymentModal,
  setShowPaymentModal,
  paymentProcessing,
  paymentSuccess,
  paymentService,
  paymentAmount,
  paymentMethod,
  processPayment
}) => {
  if (!showPaymentModal) return null;
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-xl p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">
            {paymentSuccess ? "Payment Successful" : "Confirm Payment"}
          </h3>
          {!paymentProcessing && !paymentSuccess && (
            <button 
              onClick={() => setShowPaymentModal(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <XCircle className="w-6 h-6" />
            </button>
          )}
        </div>
        
        {paymentProcessing ? (
          <div className="py-10 flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
            <p>Processing your payment...</p>
            <p className="text-sm text-gray-500 mt-2">Please do not close this window</p>
          </div>
        ) : paymentSuccess ? (
          <div className="py-8 flex flex-col items-center justify-center">
            <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
            <p className="text-xl font-bold mb-1">Payment Successful!</p>
            <p className="text-gray-600">Thank you for your payment</p>
            <div className="mt-6 bg-green-50 rounded-lg p-4 w-full">
              <p className="text-center font-medium">
                {paymentService} - ${paymentAmount.toFixed(2)}
              </p>
              <p className="text-center text-sm text-gray-500 mt-1">
                Transaction ID: PAY-{Math.random().toString(36).slice(2, 10).toUpperCase()}
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="bg-blue-50 rounded-xl p-5 mb-6">
              <div className="text-center mb-4">
                <p className="text-3xl font-bold">${paymentAmount.toFixed(2)}</p>
                <p className="text-gray-600">{paymentService}</p>
              </div>
              
              <div className="border rounded-lg p-4 bg-white">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-medium">Payment Method</span>
                  <button className="text-blue-600 text-sm">Change</button>
                </div>
                <div className="flex items-center">
                  <CreditCard className="w-8 h-8 text-blue-500 mr-3" />
                  <div>
                    <p className="font-medium">Credit Card</p>
                    <p className="text-sm text-gray-500">{paymentMethod.card} • Exp {paymentMethod.expires}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col gap-3">
              <button 
                onClick={processPayment}
                className="py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition flex items-center justify-center"
              >
                <CreditCard className="w-5 h-5 mr-2" /> 
                Confirm Payment of ${paymentAmount.toFixed(2)}
              </button>
              
              <button 
                onClick={() => setShowPaymentModal(false)}
                className="py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentModal;