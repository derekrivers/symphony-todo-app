import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { App } from "./App";

describe("App", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  afterEach(() => {
    cleanup();
    window.localStorage.clear();
  });

  it("supports the core task walkthrough and persists tasks", async () => {
    const user = userEvent.setup();

    const { container, unmount } = render(<App />);

    await user.type(screen.getByLabelText("Title"), "Draft review");
    await user.selectOptions(screen.getByLabelText("Priority"), "high");
    await user.type(screen.getByLabelText("Category"), "Work");
    await user.type(screen.getByLabelText("Due"), "2026-05-14");
    await user.type(screen.getByLabelText("Notes"), "Confirm app scaffold");
    await user.click(screen.getByRole("button", { name: /add task/i }));

    expect(screen.getByText("Draft review")).toBeTruthy();

    await waitFor(() => {
      expect(window.localStorage.getItem("symphony.todo.tasks")).toContain(
        "Draft review",
      );
    });

    await user.click(screen.getByLabelText("Open"));
    await user.click(screen.getByRole("button", { name: /completed/i }));
    expect(screen.getByText("Draft review")).toBeTruthy();

    await user.type(screen.getByLabelText("Search"), "scaffold");
    await user.selectOptions(screen.getByLabelText("Sort"), "priority");
    expect(screen.getByText("Draft review")).toBeTruthy();

    const toolbar = container.querySelector(".task-toolbar");
    const taskList = container.querySelector(".task-list");
    expect(screen.getByLabelText("Search").closest(".task-toolbar")).toBe(
      toolbar,
    );
    expect(screen.getByLabelText("Sort").closest(".task-toolbar")).toBe(
      toolbar,
    );
    expect(
      toolbar?.compareDocumentPosition(taskList as Element) ??
        Node.DOCUMENT_POSITION_PRECEDING,
    ).toBe(Node.DOCUMENT_POSITION_FOLLOWING);

    unmount();
    render(<App />);
    expect(screen.getByText("Draft review")).toBeTruthy();

    await user.click(screen.getByRole("button", { name: /delete draft review/i }));
    expect(screen.queryByText("Draft review")).toBeNull();
  });

  it("supports the dashboard shell controls", async () => {
    const user = userEvent.setup();

    render(<App />);

    expect(screen.getByRole("navigation", { name: "Primary" })).toBeTruthy();

    const searchInput = screen.getByLabelText("Search");
    await user.click(screen.getByRole("button", { name: /search tasks/i }));
    expect(document.activeElement).toBe(searchInput);

    await user.click(screen.getByRole("button", { name: /dark/i }));
    expect(document.documentElement.dataset.theme).toBe("dark");
    expect(window.localStorage.getItem("symphony.todo.theme")).toBe("dark");
  });
});
