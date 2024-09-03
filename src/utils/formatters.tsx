import { format } from "date-fns";
import { NumericFormat } from "react-number-format";
// Formatters
const abbreviateNumber = (value: number) => {
  if (value >= 1e12) return (value / 1e12).toFixed(1) + "T";
  if (value >= 1e9) return (value / 1e9).toFixed(1) + "B";
  if (value >= 1e6) return (value / 1e6).toFixed(1) + "M";
  if (value >= 1e3) return (value / 1e3).toFixed(1) + "K";
  return value.toString();
};

export const AbbreviatedNumberFormat = (value: number) => {
  const formattedValue = abbreviateNumber(value);
  return <span>{formattedValue}</span>;
};

export const formatPrice = (value: number) => (
  <NumericFormat
    value={value || 0}
    displayType={"text"}
    thousandSeparator={true}
    prefix={"$"}
    decimalScale={2}
  />
);

export const formatNumber = (value: number) => (
  <NumericFormat
    value={value || 0}
    displayType={"text"}
    thousandSeparator={true}
    decimalScale={2}
  />
);

export const formatVolumeChange = (value: number) => (
  <NumericFormat
    value={value || 0}
    displayType={"text"}
    decimalScale={2}
    suffix={"%"}
    // prefix={value > 0 ? "-" : "+"}
  />
);

export const formatDate = (date: string) => {
  try {
    // Convert string to Date object and format
    return <span>{format(new Date(date), "MMMM dd, yyyy, hh:mm a")} UTC</span>;
  } catch (error) {
    // Handle invalid date format or other errors
    return <span>Unknown</span>;
  }
};
