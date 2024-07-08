import { ReactNode } from "react";
import { Header } from "./modules/header/header";
import { Navigation } from "./modules/navigation/navigation";
import { useRouter } from "next/router";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const { pathname } = useRouter();

  if (pathname.includes("login")) {
    return <>{children}</>;
  }

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background:
          "linear-gradient(-45deg, rgba(2,0,36,1) 0%, rgba(35,161,94,1) 63%, rgba(56,166,189,1) 100%)",
      }}
    >
      <Header />
      <div style={{ display: "flex", height: "calc(100vh - 60px)" }}>
        <Navigation />
        <div style={{ padding: 30, width: "100%", overflowY: "auto" }}>
          {children}
        </div>
      </div>
    </div>
  );
};
