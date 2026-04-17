import { MAX_ITEMS_PER_PAGE } from "@/config/constants";

const CurrencyTableSkeleton: React.FC = () => {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Sign</th>
            <th>Symbol</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: MAX_ITEMS_PER_PAGE }).map((_, index) => (
            <tr key={index}>
              <td><div className="skeleton h-4 w-24" /></td>
              <td><div className="skeleton h-4 w-8" /></td>
              <td><div className="skeleton h-4 w-12" /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CurrencyTableSkeleton;
