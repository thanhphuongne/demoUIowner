import React, { useState } from 'react';
import { CreditCard, Save } from 'lucide-react';
import { Payment } from '../../types';

interface PaymentSettingsProps {
  paymentSettings: Payment;
  loading: boolean;
  error: string | null;
  onUpdatePaymentSettings: (settings: Partial<Payment>) => Promise<void>;
  clearError: () => void;
}

const PaymentSettings: React.FC<PaymentSettingsProps> = ({ 
  paymentSettings,
  loading,
  error,
  onUpdatePaymentSettings,
  clearError
}) => {
  const [paymentData, setPaymentData] = useState<Payment>(paymentSettings);

  React.useEffect(() => {
    setPaymentData(paymentSettings);
  }, [paymentSettings]);

  const togglePaymentMethod = (method: string) => {
    setPaymentData(prev => ({
      ...prev,
      acceptedMethods: prev.acceptedMethods.includes(method)
        ? prev.acceptedMethods.filter(m => m !== method)
        : [...prev.acceptedMethods, method]
    }));
  };

  const handleSavePayment = async () => {
    await onUpdatePaymentSettings(paymentData);
  };

  return (
    <div className="p-6">
      <div className="flex items-center space-x-4 mb-6">
        <CreditCard className="w-6 h-6 text-gray-600" />
        <h2 className="text-xl font-semibold text-gray-900">Cài Đặt Thanh Toán</h2>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg">
          {error}
          <button 
            onClick={clearError} 
            className="float-right text-red-800 font-medium"
          >
            Đóng
          </button>
        </div>
      )}

      <div className="space-y-6">
        {/* Payment Methods */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Phương Thức Thanh Toán</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Cash', 'Bank Transfer', 'E-Wallet', 'Credit Card'].map(method => (
              <label key={method} className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="checkbox"
                  checked={paymentData.acceptedMethods.includes(method)}
                  onChange={() => togglePaymentMethod(method)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">{method}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Commission */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phí hoa hồng (%)
          </label>
          <input
            type="number"
            value={paymentData.commission}
            onChange={(e) => setPaymentData(prev => ({ ...prev, commission: Number(e.target.value) }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="0"
            max="100"
          />
        </div>

        {/* Refund Policy */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Chính sách hoàn tiền
          </label>
          <textarea
            value={paymentData.refundPolicy}
            onChange={(e) => setPaymentData(prev => ({ ...prev, refundPolicy: e.target.value }))}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Payout Schedule */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Lịch chi trả
          </label>
          <select
            value={paymentData.payoutSchedule}
            onChange={(e) => setPaymentData(prev => ({ ...prev, payoutSchedule: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="Daily">Hàng ngày</option>
            <option value="Weekly">Hàng tuần</option>
            <option value="Monthly">Hàng tháng</option>
          </select>
        </div>

        {/* Bank Details */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Thông Tin Ngân Hàng</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tên tài khoản
              </label>
              <input
                type="text"
                value={paymentData.bankDetails.accountName}
                onChange={(e) => setPaymentData(prev => ({
                  ...prev,
                  bankDetails: { ...prev.bankDetails, accountName: e.target.value }
                }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Số tài khoản
              </label>
              <input
                type="text"
                value={paymentData.bankDetails.accountNumber}
                onChange={(e) => setPaymentData(prev => ({
                  ...prev,
                  bankDetails: { ...prev.bankDetails, accountNumber: e.target.value }
                }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tên ngân hàng
              </label>
              <input
                type="text"
                value={paymentData.bankDetails.bankName}
                onChange={(e) => setPaymentData(prev => ({
                  ...prev,
                  bankDetails: { ...prev.bankDetails, bankName: e.target.value }
                }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleSavePayment}
            disabled={loading}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{loading ? 'Đang lưu...' : 'Lưu cài đặt'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSettings;