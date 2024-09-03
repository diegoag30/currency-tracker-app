import { CurrencyLatestInfo } from "@/app/types/currencyLatestInfo";
import {
  AbbreviatedNumberFormat,
  formatVolumeChange,
} from "@/utils/formatters";

interface TableProps {
  CurrencyLatestInfo?: CurrencyLatestInfo[];
}
const CurrencyStats: React.FC<TableProps> = ({ CurrencyLatestInfo = [] }) => {
  if (!CurrencyLatestInfo || CurrencyLatestInfo.length === 0) {
    return <div>No CurrencyLatestInfo available</div>;
  }
  const currencyLatestInfo = CurrencyLatestInfo[0];
  return (
    <div className="grid grid-cols-3 gap-1">
      <div className="stat">
        <div className="stat-title">Market Cap</div>
        <div className="stat-value">
          {AbbreviatedNumberFormat(currencyLatestInfo.market_cap)}
        </div>
        <div className="stat-desc">Jan 1st - Feb 1st</div>
      </div>

      <div className="stat">
        <div className="stat-title">Volume 24h</div>
        <div className="stat-value">
          {formatVolumeChange(currencyLatestInfo.volume_change_24h)}
        </div>
        <div className="stat-desc">↗︎ 400 (22%)</div>
      </div>

      <div className="stat">
        <div className="stat-title">Circulating supply</div>
        <div className="stat-value">
          {AbbreviatedNumberFormat(currencyLatestInfo.circulating_supply)}
        </div>
        <div className="stat-desc">↘︎ 90 (14%)</div>
      </div>
    </div>
  );
};

export default CurrencyStats;
