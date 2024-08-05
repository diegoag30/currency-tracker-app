const CurrencytableSkeleton: React.FC = () => {
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
          {Array.from({ length: 7 }).map((_, index) => (
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

export default CurrencytableSkeleton;
