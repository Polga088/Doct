import { AppLayoutProvider } from "@/components/layout/AppLayoutContext";
import AppLayoutInner from "@/components/layout/AppLayoutInner";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppLayoutProvider>
      <AppLayoutInner>{children}</AppLayoutInner>
    </AppLayoutProvider>
  );
}
