import React from "react";
import { render } from "@testing-library/react";
import MiniWeatherCard from "./MiniWeatherCard";
import { getForecastByCity } from "../../utils/forecast";

jest.mock("../../utils/forecast", () => ({
  getForecastByCity: jest.fn(),
}));

describe("MiniWeatherCard component", () => {
  test("updates the weather data when the unit changes", async () => {
    getForecastByCity.mockResolvedValue({
      weather: [{ main: "Rain" }],
      main: { temp_min: 290, temp_max: 300 },
      name: "New York",
      sys: { country: "US" },
    });
    const { findByTestId, rerender } = render(
      <MiniWeatherCard
        location={{ city: "New York", country: "US" }}
        unit="imperial"
      />
    );
    const temp = await findByTestId("weathercard-temp");
    expect(temp).toHaveTextContent("68 / 86°F");
    rerender(
      <MiniWeatherCard
        location={{ city: "New York", country: "US" }}
        unit="metric"
      />
    );
    expect(temp).toHaveTextContent("19 / 15°C");
  });

  test("renders an empty card if there is an error or no data", async () => {
    getForecastByCity.mockRejectedValue(new Error("No data"));
    const { container } = render(
      <MiniWeatherCard
        location={{ city: "New York", country: "US" }}
        unit="imperial"
      />
    );
    expect(container.firstChild).toBe(null);
  });
});
