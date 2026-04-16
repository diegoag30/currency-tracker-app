import { MAX_ITEMS_PER_PAGE } from "@/config/constants";

const columns = [
  "", "Name", "Symbol", "Price", "Volume 24h", "Volume Change 24h",
  "Change 24h", "Change 7d", "Change 30d", "Market Cap",
  "Circulating Supply", "Total Supply", "Last Updated",
];

const CurrencyLatestTableSkeleton: React.FC = () => {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            {columns.map((col, i) => <th key={i}>{col}</th>)}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: MAX_ITEMS_PER_PAGE }).map((_, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((_, colIndex) => (
                <td key={colIndex}>
                  <div className="skeleton h-4 w-20" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CurrencyLatestTableSkeleton;
