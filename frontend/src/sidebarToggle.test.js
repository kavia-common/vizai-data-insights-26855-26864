import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

/**
 * These tests verify responsive sidebar behavior on small screens:
 * - hidden by default (aria-hidden, transform class)
 * - opens when the hamburger button is clicked
 * - closes when the close icon in the sidebar is clicked
 * - closes when the backdrop is clicked
 * - accessibility: toggle has aria-controls and aria-expanded updates
 *
 * Note: We simulate "small screen" by default since App uses Tailwind "md:" classes.
 * The visibility is controlled via transform classes and aria-hidden attribute.
 */

function getSidebar() {
  return screen.getByRole("complementary", { hidden: true }) || screen.getByTestId("app-sidebar");
}

function querySidebar() {
  // Use aria-controls/id to locate sidebar; fallback to getByText vizAi heading
  return screen.getByLabelText(/close sidebar/i, { selector: "button" }).closest("aside");
}

describe("Sidebar responsive toggle", () => {
  test("hidden by default on small screens (aria-hidden and transform class)", () => {
    render(<App />);

    const sidebar = screen.getByRole("complementary", { hidden: true }) || screen.getByTestId?.("app-sidebar") || document.getElementById("app-sidebar");
    // Fallback: locate by id since aside has id="app-sidebar"
    const aside = sidebar || document.getElementById("app-sidebar");
    expect(aside).toBeInTheDocument();
    // aria-hidden should be true when closed
    expect(aside).toHaveAttribute("aria-hidden", "true");
    // Should have off-canvas translate class when closed on mobile
    expect(aside.className).toMatch(/-translate-x-full/);

    const toggle = screen.getByRole("button", { name: /open sidebar/i });
    expect(toggle).toBeInTheDocument();
    expect(toggle).toHaveAttribute("aria-controls", "app-sidebar");
    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });

  test("opens when hamburger toggle is clicked (aria-expanded true, transform to translate-x-0)", async () => {
    const user = userEvent.setup();
    render(<App />);

    const toggle = screen.getByRole("button", { name: /open sidebar/i });
    await user.click(toggle);

    // aria-expanded should be true now
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(toggle).toHaveAccessibleName(/close sidebar/i);

    const aside = document.getElementById("app-sidebar");
    expect(aside).toHaveAttribute("aria-hidden", "false");
    expect(aside.className).toMatch(/translate-x-0/);
  });

  test("closes when close icon in sidebar is clicked", async () => {
    const user = userEvent.setup();
    render(<App />);

    const toggle = screen.getByRole("button", { name: /open sidebar/i });
    await user.click(toggle);

    const closeBtn = screen.getByRole("button", { name: /close sidebar/i });
    await user.click(closeBtn);

    const aside = document.getElementById("app-sidebar");
    expect(aside).toHaveAttribute("aria-hidden", "true");
    expect(aside.className).toMatch(/-translate-x-full/);

    // Toggle aria-expanded should be false again
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(toggle).toHaveAccessibleName(/open sidebar/i);
  });

  test("closes when backdrop is clicked", async () => {
    const user = userEvent.setup();
    render(<App />);

    const toggle = screen.getByRole("button", { name: /open sidebar/i });
    await user.click(toggle);

    // Backdrop appears only when open
    const backdrop = screen.getByRole("button", { name: /close menu backdrop/i });
    await user.click(backdrop);

    const aside = document.getElementById("app-sidebar");
    expect(aside).toHaveAttribute("aria-hidden", "true");
    expect(aside.className).toMatch(/-translate-x-full/);
    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });

  test("closes when pressing Escape key", async () => {
    const user = userEvent.setup();
    render(<App />);

    const toggle = screen.getByRole("button", { name: /open sidebar/i });
    await user.click(toggle);

    // Now press Escape
    await user.keyboard("{Escape}");

    const aside = document.getElementById("app-sidebar");
    expect(aside).toHaveAttribute("aria-hidden", "true");
    expect(aside.className).toMatch(/-translate-x-full/);
    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });

  test("navigating to a section closes the sidebar on mobile", async () => {
    const user = userEvent.setup();
    render(<App />);

    const toggle = screen.getByRole("button", { name: /open sidebar/i });
    await user.click(toggle);

    // Click "Analysis" in the sidebar
    const analysisBtn = screen.getByRole("button", { name: /analysis/i });
    await user.click(analysisBtn);

    const aside = document.getElementById("app-sidebar");
    expect(aside).toHaveAttribute("aria-hidden", "true");
    expect(aside.className).toMatch(/-translate-x-full/);
    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });
});
