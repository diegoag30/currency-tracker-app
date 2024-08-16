import { BarsArrowDownIcon } from "@heroicons/react/24/outline";
export default function SortButton() {
  return (
    <>
      <button className="btn btn-square">
        <BarsArrowDownIcon className="w-full aspect-square max-w-[40px]" />
      </button>
    </>
  );
}
