import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Search from "./Search";
import { getGeolocation } from "../../utils/forecast";

jest.mock("../../utils/forecast", () => ({
  getGeolocation: jest.fn(),
}));

describe("Search component", () => {
  test("Check Search field is there and it only has a placeholder", () => {
    const { getByPlaceholderText } = render(<Search find={() => {}} />);
    const input = getByPlaceholderText("Search for a city");
    expect(input).toBeInTheDocument();
  });

  test("Get geolocation of a city", async () => {
    const { findByTestId } = render(<Search find={() => {}} />);
    const input = await findByTestId("search");
    fireEvent.change(input, { target: { value: "New York" } });
    expect(getGeolocation).toHaveBeenCalledWith("New York");
  });

  test("displays list of cities based on the search", async () => {
    getGeolocation.mockResolvedValue([
      { name: "New York" },
      { name: "Los Angeles" },
    ]);
    const { findByTestId, findByText } = render(<Search find={() => {}} />);
    const input = await findByTestId("search");
    fireEvent.change(input, { target: { value: "New York" } });
    const cityList = await findByTestId("city-list");
    expect(cityList).toBeInTheDocument();
    const newYork = await findByText("New York");
    expect(newYork).toBeInTheDocument();
    const losAngeles = await findByText("Los Angeles");
    expect(losAngeles).toBeInTheDocument();
  });

  test("calls find function when a city is selected", async () => {
    getGeolocation.mockResolvedValue([{ name: "New York", lon: -74, lat: 40 }]);
    const find = jest.fn();
    const { findByTestId, findByText } = render(<Search find={find} />);
    const input = await findByTestId("search");
    fireEvent.change(input, { target: { value: "New York" } });
    const newYork = await findByText("New York");
    fireEvent.click(newYork);
    expect(find).toHaveBeenCalledWith({
      city: "New York",
      coord: { longitude: -74, latitude: 40 },
    });
  });
});
