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
    <div className="card card-compact bg-base-100 w-96 shadow-xl">
      <figure>
        <img
          className="mask mask-circle"
          src={CurrencyMetadata.logo}
          alt="Logo"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{CurrencyMetadata.name}</h2>
        <div className="collapse bg-base-200">
          <input type="checkbox" />
          <div className="collapse-title text-xl font-medium">
            Click for more Info
          </div>
          <div className="collapse-content">
            <p>{CurrencyMetadata.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrencyCard;
