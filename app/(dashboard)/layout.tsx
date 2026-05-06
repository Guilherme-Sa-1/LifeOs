// app/(dashboard)/layout.tsx
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/shared/app-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex min-h-screen w-full flex-col bg-muted/30 p-4 md:p-8">
        {/* SidebarTrigger permite abrir a sidebar no mobile */}
        <SidebarTrigger className="mb-4 md:hidden" />
        
        <div className="mx-auto w-full max-w-7xl">
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
}