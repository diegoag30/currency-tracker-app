import { Metadata } from "@/app/types/metadata";
import WatchlistButton from "@/components/WatchlistButton";
import { WatchlistItem } from "@/lib/watchlist";

const escapeRegex = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const buildTokenRE = (name: string) =>
  new RegExp(
    `(https?:\\/\\/[^\\s]+|\\$[\\d,]+(?:\\.\\d+)?|[\\d,]+(?:\\.\\d+)?|${escapeRegex(name)})`,
    "g"
  );

const highlightDescription = (text: string, name: string) => {
  const TOKEN_RE = buildTokenRE(name);
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

interface CurrencyCardProps {
  metadata?: Metadata[];
  isLoading?: boolean;
  watchlistCurrency?: WatchlistItem;
}

const CurrencyCard: React.FC<CurrencyCardProps> = ({ metadata = [], isLoading, watchlistCurrency }) => {
  if (isLoading || (!metadata || metadata.length === 0)) {
    return (
      <div className="card card-compact bg-neutral text-neutral-content w-full shadow-xl p-2">
        <div className="flex items-center p-2 gap-4">
          <div className="skeleton w-10 h-10 rounded-full shrink-0" />
          <div className="skeleton h-6 w-40" />
        </div>
        <div className="p-2 flex flex-col gap-2">
          <div className="skeleton h-4 w-48" />
          <div className="skeleton h-3 w-full" />
          <div className="skeleton h-3 w-full" />
          <div className="skeleton h-3 w-3/4" />
        </div>
      </div>
    );
  }

  const CurrencyMetadata = metadata[0];
  return (
    <div className="card card-compact bg-neutral text-neutral-content w-full shadow-xl p-2">
      <div className="flex items-center p-2">
        <div className="avatar mr-4">
          <div className="w-10 rounded-full">
            <img src={CurrencyMetadata.logo} />
          </div>
        </div>
        <h2 className="card-title">{CurrencyMetadata.name}</h2>
        {watchlistCurrency && (
          <div className="ml-auto">
            <WatchlistButton currency={watchlistCurrency} />
          </div>
        )}
      </div>
      <div className="collapse collapse-arrow bg-base-200 p-2">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-medium">
          About this Currency
        </div>
        <div className="collapse-content prose prose-sm max-w-none prose-invert">
          <p>{CurrencyMetadata.description ? highlightDescription(CurrencyMetadata.description, CurrencyMetadata.name) : "No description available."}</p>
        </div>
      </div>
    </div>
  );
};

export default CurrencyCard;
