
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

// Regional pricing modifiers (discount or premium factor)
// 1 = regular price, 0.9 = 10% discount, 1.2 = 20% premium
const REGIONAL_PRICING: Record<string, number> = {
  US: 1,     // Base price (USA)
  GB: 0.95,  // UK slight discount
  EU: 0.9,   // Europe bigger discount
  AU: 1.1,   // Australia slight premium (increased from 0.9)
  CA: 0.95,  // Canada slight discount
  JP: 1.1,   // Japan premium
  IN: 0.7,   // India significant discount
  MY: 0.75,  // Malaysia discount
  ID: 0.7,   // Indonesia discount
  SG: 0.95,  // Singapore slight discount
  AE: 1.05,  // UAE slight premium
  // Default to 1 (no adjustment) for unlisted countries
};

// Map of currency codes to country codes for regional pricing
const CURRENCY_TO_REGION: Record<string, string> = {
  USD: 'US',
  EUR: 'EU',
  GBP: 'GB',
  AUD: 'AU',
  CAD: 'CA',
  JPY: 'JP',
  INR: 'IN',
  MYR: 'MY',
  IDR: 'ID',
  SGD: 'SG',
  AED: 'AE',
};

export interface CurrencyInfo {
  code: string;
  symbol: string;
  name: string;
  region: string;
  pricingFactor: number;
}

export const CURRENCIES: Record<string, Omit<CurrencyInfo, 'region' | 'pricingFactor'>> = {
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

// Get complete currency info including regional pricing factor
export function getCurrencyInfo(currencyCode: string): CurrencyInfo {
  const baseInfo = CURRENCIES[currencyCode] || CURRENCIES.USD;
  const region = CURRENCY_TO_REGION[currencyCode] || 'US';
  const pricingFactor = REGIONAL_PRICING[region] || 1;
  
  return {
    ...baseInfo,
    region,
    pricingFactor
  };
}

// Special handling for free pricing
export function convertPrice(priceInUSD: number, targetCurrency: string): number {
  // Handle free pricing
  if (priceInUSD === 0) return 0;
  
  if (!EXCHANGE_RATES[targetCurrency]) {
    console.warn(`Exchange rate not found for ${targetCurrency}, using USD`);
    return priceInUSD;
  }
  
  // Apply regional pricing factor
  const currencyInfo = getCurrencyInfo(targetCurrency);
  const baseConverted = priceInUSD * EXCHANGE_RATES[targetCurrency];
  return baseConverted * currencyInfo.pricingFactor;
}

export function formatPrice(amount: number, currencyCode: string): string {
  // Handle free pricing
  if (amount === 0) return 'Free';
  
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
  const [userCountry, setUserCountry] = useState<string>('US');
  
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
        setUserCountry(CURRENCY_TO_REGION[detectedCurrency] || 'US');
      }
    } catch (error) {
      console.error('Failed to detect local currency:', error);
    }

    // Attempt to get user's country with browser geolocation API (in a real app)
    // This is simplified for demo purposes
    // In a real app, you'd use a geolocation service or IP-based detection
  }, []);
  
  const currencyInfo = getCurrencyInfo(localCurrency);
  
  return {
    localCurrency,
    userCountry,
    localCurrencyInfo: currencyInfo,
    pricingFactor: currencyInfo.pricingFactor,
    convertAndFormat: (priceInUSD: number) => {
      const convertedPrice = convertPrice(priceInUSD, localCurrency);
      return formatPrice(convertedPrice, localCurrency);
    },
    getRegionalPrice: (basePrice: number) => {
      return basePrice * currencyInfo.pricingFactor;
    }
  };
}
