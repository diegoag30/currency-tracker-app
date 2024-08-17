import {
  BarsArrowDownIcon,
  BarsArrowUpIcon,
} from "@heroicons/react/24/outline";

interface SortButtonProps {
  isAscending: boolean;
  setIsAscending: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SortButton({
  isAscending,
  setIsAscending,
}: SortButtonProps) {
  return (
    <>
      <button
        onClick={() => setIsAscending(!isAscending)}
        className="btn btn-square"
      >
        {isAscending ? (
          <BarsArrowUpIcon className="w-full aspect-square max-w-[40px]" />
        ) : (
          <BarsArrowDownIcon className="w-full aspect-square max-w-[40px]" />
        )}
      </button>
    </>
  );
}
