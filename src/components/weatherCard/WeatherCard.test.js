import React from "react";
import { render } from "@testing-library/react";
import WeatherCard from "./WeatherCard";

describe("WeatherCard component", () => {
  test("renders loading state when props are not provided", () => {
    const { getByText } = render(<WeatherCard units="imperial" />);
    const loading = getByText("Loading...");
    expect(loading).toBeInTheDocument();
  });

  test("renders weather data with correct temperature and location when props are provided", () => {
    const props = {
      weather: [{ main: "Rain" }],
      main: { temp_min: 290, temp_max: 300, temp: 295, feels_like: 285 },
      name: "New York",
      wind: { speed: 5 },
    };
    const { getByText } = render(
      <WeatherCard props={props} units="imperial" />
    );
    const city = getByText("New York");
    expect(city).toBeInTheDocument();
    const condition = getByText("Rain");
    expect(condition).toBeInTheDocument();
    const temp = getByText("68");
    expect(temp).toBeInTheDocument();
    const tempMax = getByText("86°F");
    expect(tempMax).toBeInTheDocument();
    const wind = getByText("5");
    expect(wind).toBeInTheDocument();
    const feelsLike = getByText("Feels like: 69°F");
    expect(feelsLike).toBeInTheDocument();
  });
  test("updates temperature units when it changes from imperial to metric and vice versa", () => {
    const props = {
      weather: [{ main: "Rain" }],
      main: { temp_min: 290, temp_max: 300, temp: 295, feels_like: 285 },
      name: "New York",
      wind: { speed: 5 },
    };
    const { getByText, rerender } = render(
      <WeatherCard props={props} units="imperial" />
    );
    const temp = getByText("68");
    expect(temp).toBeInTheDocument();
    rerender(<WeatherCard props={props} units="metric" />);
    expect(temp).toHaveTextContent("19");
    const tempMax = getByText("15°C");
    expect(tempMax).toBeInTheDocument();
    const feelsLike = getByText("Feels like: 19°C");
    expect(feelsLike).toBeInTheDocument();
  });

  test("renders the correct icon for the provided weather condition", () => {
    const props = {
      weather: [{ main: "Rain" }],
      main: { temp_min: 290, temp_max: 300, temp: 295, feels_like: 285 },
      name: "New York",
      wind: { speed: 5 },
    };
    const { container } = render(
      <WeatherCard props={props} units="imperial" />
    );
    const icon = container.querySelector("[alt='Rain']");
    expect(icon).toBeInTheDocument();
  });
});
