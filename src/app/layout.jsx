import "./globals.css";
import { TopBar } from "@/components";
import { Toaster } from "@/components/ui/shadcn/sonner";
import { AuthProvider } from "@/context/AuthContext";


export const metadata = {
  title: "Reporteador BI",
  description: "Reporteador BI Toka",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`antialiased`} >
        <AuthProvider>
          <TopBar />
          <main className="pt-[8vh] min-h-screen">
            <Toaster position='top-center' richColors />
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
