import Navigation from "@/components/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto px-6">
      <Navigation />
      {children}
    </div>
  );
}
