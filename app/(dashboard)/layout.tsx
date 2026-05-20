import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/shared/app-sidebar";
import { getAuthUser } from "@/lib/auth";
import { LogoutButton } from "@/components/logout-button";
import { UserCircle } from "lucide-react";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getAuthUser();

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex min-h-screen w-full flex-col bg-muted/30 p-4 md:p-8">
        
        {/* Cabeçalho do Dashboard */}
        <header className="flex items-center justify-between mb-6 pb-4 border-b">
          <SidebarTrigger className="md:hidden" />
          
          <div className="flex items-center gap-6 ml-auto">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <UserCircle className="h-5 w-5" />
              <span>{user?.name || user?.email}</span>
            </div>
            
            <LogoutButton />
          </div>
        </header>
        
        {/* Conteúdo Principal */}
        <div className="mx-auto w-full max-w-7xl">
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
}