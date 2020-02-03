import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, screen, wait } from "@testing-library/react";
import EventCreator from "../EventCreator";

describe("errors when the form isn't filled in", () => {
  test("incomplete form => tell user to click the calendar and enter a title", async () => {
    render(<EventCreator></EventCreator>);

    const submitButton = screen.getByLabelText("Create calendar events!");
    fireEvent.click(submitButton);
    await wait(() => {
      expect(
        screen.getByText("Make sure to select days on the calendar")
      ).toBeInTheDocument();
    });
  });
});
test("");
