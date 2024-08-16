import { format } from "date-fns";
import { NumericFormat } from "react-number-format";
// Formatters
export const formatPrice = (value: number) => (
  <NumericFormat
    value={value || 0}
    displayType={"text"}
    thousandSeparator={true}
    prefix={"$"}
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
