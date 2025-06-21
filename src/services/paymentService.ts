import { PaymentSettings } from '../types';
import { mockPaymentSettings } from '../data/mockPaymentSettings';

class PaymentService {
  private settings: PaymentSettings = mockPaymentSettings;

  async getPaymentSettings(): Promise<PaymentSettings> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return this.settings;
  }

  async updatePaymentSettings(updates: Partial<PaymentSettings>): Promise<PaymentSettings> {
    await new Promise(resolve => setTimeout(resolve, 500));
    this.settings = { ...this.settings, ...updates };
    return this.settings;
  }
}

export const paymentService = new PaymentService();