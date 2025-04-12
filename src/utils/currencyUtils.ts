
import { useEffect, useState } from 'react';

// Simplified exchange rates for demonstration
// In a production app, you would fetch these from an API
const EXCHANGE_RATES: Record<string, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.78,
  AUD: 1.51,
  CAD: 1.37,
  JPY: 151.71,
  INR: 83.45,
  MYR: 4.74,
  IDR: 16235.50,
  SGD: 1.35,
  AED: 3.67,
};

export interface CurrencyInfo {
  code: string;
  symbol: string;
  name: string;
}

export const CURRENCIES: Record<string, CurrencyInfo> = {
  USD: { code: 'USD', symbol: '$', name: 'US Dollar' },
  EUR: { code: 'EUR', symbol: '€', name: 'Euro' },
  GBP: { code: 'GBP', symbol: '£', name: 'British Pound' },
  AUD: { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
  CAD: { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
  JPY: { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  INR: { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  MYR: { code: 'MYR', symbol: 'RM', name: 'Malaysian Ringgit' },
  IDR: { code: 'IDR', symbol: 'Rp', name: 'Indonesian Rupiah' },
  SGD: { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar' },
  AED: { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham' },
};

export function convertPrice(priceInUSD: number, targetCurrency: string): number {
  if (!EXCHANGE_RATES[targetCurrency]) {
    console.warn(`Exchange rate not found for ${targetCurrency}, using USD`);
    return priceInUSD;
  }
  
  return priceInUSD * EXCHANGE_RATES[targetCurrency];
}

export function formatPrice(amount: number, currencyCode: string): string {
  const currencyInfo = CURRENCIES[currencyCode] || CURRENCIES.USD;
  
  // Format based on currency conventions
  let formattedAmount: string;
  
  if (currencyCode === 'JPY' || currencyCode === 'IDR') {
    // No decimal places for these currencies
    formattedAmount = Math.round(amount).toLocaleString();
  } else {
    // 2 decimal places for most currencies
    formattedAmount = amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  
  return `${currencyInfo.symbol}${formattedAmount}`;
}

export function extractNumericPrice(priceString: string): number {
  // Extract numeric value from price string like "$19.99/month"
  const numericMatch = priceString.match(/[0-9.]+/);
  if (!numericMatch) return 0;
  return parseFloat(numericMatch[0]);
}

export function useLocalCurrency() {
  const [localCurrency, setLocalCurrency] = useState<string>('USD');
  
  useEffect(() => {
    // Try to detect user's currency based on browser locale
    try {
      const detectedCurrency = 
        new Intl.NumberFormat(navigator.language, { 
          style: 'currency', 
          currency: 'USD' 
        })
        .formatToParts(1)
        .find(part => part.type === 'currency')
        ?.value || 'USD';
      
      // Only set if we support this currency
      if (CURRENCIES[detectedCurrency]) {
        setLocalCurrency(detectedCurrency);
      }
    } catch (error) {
      console.error('Failed to detect local currency:', error);
    }
  }, []);
  
  return {
    localCurrency,
    localCurrencyInfo: CURRENCIES[localCurrency] || CURRENCIES.USD,
    convertAndFormat: (priceInUSD: number) => {
      const convertedPrice = convertPrice(priceInUSD, localCurrency);
      return formatPrice(convertedPrice, localCurrency);
    }
  };
}
