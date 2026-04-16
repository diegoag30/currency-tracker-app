import { MAX_ITEMS_PER_PAGE, CURRENCY_TABLE_COLUMNS } from "@/config/constants";

const CurrencyLatestTableSkeleton: React.FC = () => {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th></th>
            {CURRENCY_TABLE_COLUMNS.map((col) => (
              <th key={col.value}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: MAX_ITEMS_PER_PAGE }).map((_, rowIndex) => (
            <tr key={rowIndex}>
              <td><div className="skeleton h-4 w-6" /></td>
              {CURRENCY_TABLE_COLUMNS.map((col) => (
                <td key={col.value}>
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
