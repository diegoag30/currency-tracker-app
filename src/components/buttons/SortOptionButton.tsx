import { Bars3BottomLeftIcon } from "@heroicons/react/24/outline";

export default function SortOptionButton() {
  return (
    <>
      <div className="dropdown dropdown-bottom">
        <div tabIndex={0} role="button" className="btn btn-square m-1">
          <Bars3BottomLeftIcon className="w-full aspect-square max-w-[40px]" />
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
        >
          <li>
            <a>Price</a>
          </li>
          <li>
            <a>Volume Change</a>
          </li>
        </ul>
      </div>
    </>
  );
}
