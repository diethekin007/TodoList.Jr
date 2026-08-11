import Sidebar from "../../components/Sidebar";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden">
      {/* Floating Top Navbar Overlay - Fixed at Top 0, non-blocking background */}
      <header className="fixed top-0 left-0 right-0 z-50 pt-4 px-4 pb-2 pointer-events-none">
        <div className="pointer-events-auto">
          <Sidebar />
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative min-h-screen w-full">
        {children}
      </main>
    </div>
  );
}