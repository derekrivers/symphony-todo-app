import { type PropsWithChildren, useEffect, useState } from "react";
import {
  CalendarDays,
  Command,
  Gauge,
  ListTodo,
  Moon,
  PanelLeft,
  Search,
  SlidersHorizontal,
  Sun,
} from "lucide-react";

type ThemePreference = "light" | "dark";

const themeStorageKey = "symphony.todo.theme";

function getInitialTheme(): ThemePreference {
  if (typeof window === "undefined") {
    return "light";
  }

  const storedTheme = window.localStorage.getItem(themeStorageKey);
  return storedTheme === "dark" ? "dark" : "light";
}

export function AppLayout({ children }: PropsWithChildren) {
  const [theme, setTheme] = useState<ThemePreference>(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem(themeStorageKey, theme);
  }, [theme]);

  function focusTaskSearch() {
    document.getElementById("task-search")?.focus();
  }

  return (
    <div className="dashboard-shell">
      <aside className="app-sidebar" aria-label="Application navigation">
        <div className="sidebar-header">
          <a className="brand" href="/">
            <span className="brand-mark" aria-hidden="true">
              <Command size={18} />
            </span>
            <span>
              <strong>Symphony</strong>
              <small>Todo Admin</small>
            </span>
          </a>
        </div>

        <nav className="sidebar-nav" aria-label="Primary">
          <a className="sidebar-link" data-active="true" href="/">
            <Gauge size={17} aria-hidden="true" />
            <span>Dashboard</span>
          </a>
          <a className="sidebar-link" href="#tasks">
            <ListTodo size={17} aria-hidden="true" />
            <span>Tasks</span>
          </a>
          <a className="sidebar-link" href="#create-task">
            <CalendarDays size={17} aria-hidden="true" />
            <span>Capture</span>
          </a>
          <a className="sidebar-link" href="#task-filters">
            <SlidersHorizontal size={17} aria-hidden="true" />
            <span>Views</span>
          </a>
        </nav>

        <div className="sidebar-footer">
          <span className="status-dot" aria-hidden="true" />
          <span>Local workspace</span>
        </div>
      </aside>

      <div className="app-frame">
        <header className="app-header">
          <div className="header-left">
            <button
              aria-label="Navigation menu"
              className="header-icon-button"
              type="button"
            >
              <PanelLeft size={18} aria-hidden="true" />
            </button>
            <span className="header-separator" aria-hidden="true" />
            <button
              className="command-button"
              onClick={focusTaskSearch}
              type="button"
            >
              <Search size={16} aria-hidden="true" />
              <span>Search tasks</span>
              <kbd>/</kbd>
            </button>
          </div>

          <button
            className="theme-button"
            onClick={() =>
              setTheme((currentTheme) =>
                currentTheme === "dark" ? "light" : "dark",
              )
            }
            type="button"
          >
            {theme === "dark" ? (
              <Sun size={16} aria-hidden="true" />
            ) : (
              <Moon size={16} aria-hidden="true" />
            )}
            <span>{theme === "dark" ? "Light" : "Dark"}</span>
          </button>
        </header>

        <div className="app-content">{children}</div>
      </div>
    </div>
  );
}
