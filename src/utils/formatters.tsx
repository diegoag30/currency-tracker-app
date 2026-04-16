import { format } from "date-fns";
import { NumericFormat } from "react-number-format";
import { DECIMAL_SCALE } from "@/config/constants";
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
    decimalScale={DECIMAL_SCALE}
  />
);

export const formatNumber = (value: number) => (
  <NumericFormat
    value={value || 0}
    displayType={"text"}
    thousandSeparator={true}
    decimalScale={DECIMAL_SCALE}
  />
);

export const formatVolumeChange = (value: number) => (
  <NumericFormat
    value={value || 0}
    displayType={"text"}
    decimalScale={DECIMAL_SCALE}
    suffix={"%"}
    // prefix={value > 0 ? "-" : "+"}
  />
);

const escapeRegex = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export const highlightDescription = (text: string, name: string) => {
  const TOKEN_RE = new RegExp(
    `(https?:\\/\\/[^\\s]+|\\$[\\d,]+(?:\\.\\d+)?|[\\d,]+(?:\\.\\d+)?|${escapeRegex(name)})`,
    "g"
  );
  return text.split(TOKEN_RE).map((part, i) => {
    if (/^https?:\/\//.test(part))
      return <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="text-primary underline">{part}</a>;
    if (/^\$[\d,]+/.test(part) || /^[\d,]+(?:\.\d+)?$/.test(part))
      return <span key={i} className="font-semibold text-base-content">{part}</span>;
    if (part === name)
      return <span key={i} className="font-semibold text-primary">{part}</span>;
    return part;
  });
};

export const formatDate = (date: string) => {
  try {
    // Convert string to Date object and format
    return <span>{format(new Date(date), "MMMM dd, yyyy, hh:mm a")} UTC</span>;
  } catch (error) {
    // Handle invalid date format or other errors
    return <span>Unknown</span>;
  }
};
