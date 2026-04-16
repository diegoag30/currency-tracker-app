import { CURRENCY_SYMBOL_TO_COUNTRY } from "@/config/constants";

const toFlagEmoji = (countryCode: string): string => {
  if (countryCode.length !== 2) return "";
  return [...countryCode.toUpperCase()]
    .map((c) => String.fromCodePoint(0x1f1e6 - 65 + c.charCodeAt(0)))
    .join("");
};

export const getCurrencyFlag = (symbol: string): string => {
  if (symbol in CURRENCY_SYMBOL_TO_COUNTRY) {
    const code = CURRENCY_SYMBOL_TO_COUNTRY[symbol];
    return code ? toFlagEmoji(code) : "";
  }
  return toFlagEmoji(symbol.slice(0, 2));
};
