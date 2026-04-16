import Sidenav from "@/components/Sidenav";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-16 lg:w-52">
        <Sidenav />
      </div>
      <div className="flex-grow p-4 md:overflow-y-auto md:p-6">{children}</div>
    </div>
  );
}
