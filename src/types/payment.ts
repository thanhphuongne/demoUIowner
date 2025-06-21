export interface PaymentSettings {
    acceptedMethods: string[];
    commission: number;
    refundPolicy: string;
    payoutSchedule: string;
    bankDetails: {
      accountName: string;
      accountNumber: string;
      bankName: string;
    };
  }