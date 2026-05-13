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

    const { unmount } = render(<App />);

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
    expect(screen.getByText("Draft review")).toBeTruthy();

    unmount();
    render(<App />);
    expect(screen.getByText("Draft review")).toBeTruthy();

    await user.click(screen.getByRole("button", { name: /delete draft review/i }));
    expect(screen.queryByText("Draft review")).toBeNull();
  });
});
