import { CurrencyLatestInfo } from "@/app/types/currencyLatestInfo";
import { Bars3BottomLeftIcon } from "@heroicons/react/24/outline";
interface SortOptionButtonProps {
  setSortOption: (option: keyof CurrencyLatestInfo) => void;
}

export default function SortOptionButton({
  setSortOption,
}: SortOptionButtonProps) {
  return (
    <>
      <div className="dropdown dropdown-hover dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-square m-1">
          <Bars3BottomLeftIcon className="w-full aspect-square max-w-[40px]" />
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
        >
          <li>
            <a onClick={() => setSortOption("price")}>Price</a>
          </li>
          <li>
            <a onClick={() => setSortOption("volume_change_24h")}>
              Volume Change
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}
