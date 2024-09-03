import { Metadata } from "@/app/types/metadata";

interface TableProps {
  metadata?: Metadata[];
}
const CurrencyCard: React.FC<TableProps> = ({ metadata = [] }) => {
  if (!metadata || metadata.length === 0) {
    return <div>No metadata available</div>;
  }
  const CurrencyMetadata = metadata[0];
  return (
    <div className="card card-compact bg-base-100 w-full shadow-xl p-2">
      {/* <figure>
        <img
          className="mask mask-circle"
          src={CurrencyMetadata.logo}
          alt="Logo"
        />
      </figure> */}
      <div className="flex items-center p-2">
        <div className="avatar mr-4">
          <div className="w-10 rounded-full">
            <img src={CurrencyMetadata.logo} />
          </div>
        </div>
        <h2 className="card-title">{CurrencyMetadata.name}</h2>
      </div>
      <div className="collapse collapse-arrow bg-base-200 p-2">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-medium">
          About this Currency
        </div>
        <div className="collapse-content">
          <p>{CurrencyMetadata.description}</p>
        </div>
      </div>
    </div>
  );
};

export default CurrencyCard;
