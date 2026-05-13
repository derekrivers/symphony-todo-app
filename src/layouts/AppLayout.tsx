import type { PropsWithChildren } from "react";

export function AppLayout({ children }: PropsWithChildren) {
  return (
    <div className="app-shell">
      <header className="app-header">
        <a className="brand" href="/">
          Symphony Todo
        </a>
      </header>
      {children}
    </div>
  );
}
