import { render, screen } from "@testing-library/react";
import SearchWether from "../components/SearchWether";

test("Shoud render Table Component", () => {
  render(<SearchWether />);
  const elementId = screen.getByTestId("test-test");
  expect(elementId).toBeInTheDocument();
});
test("Checking title", () => {
  render(<SearchWether />);
  const elementId = screen.getByTestId("header-title");
  expect(elementId).toHaveTextContent("Hello");
});
