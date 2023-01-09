import React, { useState } from "react";
import { getGeolocation } from "../../utils/forecast";

export default function Search({ find }) {
  const [cityList, setCityList] = useState([]);
  const [query, setQuery] = useState("");

  const handleSearch = (query) => {
    setQuery(query);
    setTimeout(() => {
      getGeolocation(query)
        .then((data) => {
          setCityList(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }, 100);
  };

  const handleSelection = (city) => {
    setQuery(city.name);
    find({
      city: city.name,
      coord: { longitude: city.lon, latitude: city.lat },
    });
    setCityList([]);
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
              onClick={() => handleSelection(city)}
            >
              {city.name}
            </li>
          ))}
      </ul>
    </div>
  );
}
