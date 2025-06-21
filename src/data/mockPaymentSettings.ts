import { PaymentSettings } from '../types';

export const mockPaymentSettings: PaymentSettings = {
  acceptedMethods: ['Cash', 'Bank Transfer', 'E-Wallet', 'Credit Card'],
  commission: 5,
  refundPolicy: 'Hoàn tiền 100% nếu hủy trước 24 giờ',
  payoutSchedule: 'Weekly',
  bankDetails: {
    accountName: 'Nguyễn Văn An',
    accountNumber: '1234567890',
    bankName: 'Vietcombank'
  }
};