import { CurrencyLatestInfo } from "@/app/types/currencyLatestInfo";
import {
  AbbreviatedNumberFormat,
  formatVolumeChange,
} from "@/utils/formatters";

interface CurrencyStatsProps {
  currencies?: CurrencyLatestInfo[];
  isLoading?: boolean;
}

const StatSkeleton = () => (
  <div className="stat">
    <div className="skeleton h-3 w-24 mb-2" />
    <div className="skeleton h-8 w-32 mb-2" />
    <div className="skeleton h-3 w-16" />
  </div>
);

const CurrencyStats: React.FC<CurrencyStatsProps> = ({ currencies = [], isLoading }) => {
  if (isLoading || !currencies || currencies.length === 0) {
    return (
      <div className="grid grid-cols-3 gap-1 mt-2">
        {Array.from({ length: 6 }).map((_, i) => <StatSkeleton key={i} />)}
      </div>
    );
  }

  const currencyLatestInfo = currencies[0];
  return (
    <div className="bg-base-200 rounded-xl p-4 mt-4">
    <div className="grid grid-cols-3 gap-4">
      <div className="stat">
        <div className="stat-title">Market Cap</div>
        <div className="stat-value">
          {AbbreviatedNumberFormat(currencyLatestInfo.market_cap)}
        </div>
      </div>

      <div className="stat">
        <div className="stat-title">24h Volume Change</div>
        <div className="stat-value">
          {formatVolumeChange(currencyLatestInfo.volume_change_24h)}
        </div>
      </div>

      <div className="stat">
        <div className="stat-title">Circulating Supply</div>
        <div className="stat-value">
          {AbbreviatedNumberFormat(currencyLatestInfo.circulating_supply)}
        </div>
      </div>

      <div className="stat">
        <div className="stat-title">24h % Change</div>
        <div className="stat-value">
          {formatVolumeChange(currencyLatestInfo.percent_change_24h)}
        </div>
      </div>

      <div className="stat">
        <div className="stat-title">7d % Change</div>
        <div className="stat-value">
          {formatVolumeChange(currencyLatestInfo.percent_change_7d)}
        </div>
      </div>

      <div className="stat">
        <div className="stat-title">30d % Change</div>
        <div className="stat-value">
          {formatVolumeChange(currencyLatestInfo.percent_change_30d)}
        </div>
      </div>
    </div>
    </div>
  );
};

export default CurrencyStats;
