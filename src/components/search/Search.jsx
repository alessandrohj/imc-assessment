import React, { useState } from "react";
import { getGeolocation } from "../../utils/forecast";

export default function Search() {
  const [cityList, setCityList] = useState("");
  const [city, setCity] = useState("");
  const [query, setQuery] = useState("");

  const handleSearch = (query) => {
    setQuery(query);
    console.log(query);
    setTimeout(() => {
      getGeolocation(query)
        .then((data) => {
          setCityList(data);
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }, 100);
  };

  return (
    <div className="form-group px-2 mb-1">
      <input
        type="text"
        className="form-control"
        placeholder="Search for a city"
        value={query}
        onChange={(ev) => handleSearch(ev.target.value)}
      />
      <ul className="list-group position-absolute w-75">
        {cityList &&
          cityList.map((city) => (
            <li
              className="list-group-item list-group-item-action"
              key={city.id}
              onClick={() => setCity(city.name)}
            >
              {city.name}
            </li>
          ))}
      </ul>
    </div>
  );
}
