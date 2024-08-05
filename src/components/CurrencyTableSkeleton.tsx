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
            <tr className="skeleton w-1/3" key={index}>
              <td className="text-transparent">LOADING </td>
              <td className="text-transparent">LOADING </td>
              <td className="text-transparent">LOADING </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CurrencyTableSkeleton;
