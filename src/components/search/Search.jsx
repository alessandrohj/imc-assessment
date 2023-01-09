import React, { useState } from "react";

export default function Search() {
  const [cityList, setCityList] = useState("");
  const [city, setCity] = useState("");

  const handleSearch = () => {
    console.log("searching", city);
  };

  return (
    <div className="form-group">
      <input
        type="text"
        className="form-control"
        placeholder="Search for a city"
        value={city}
        onChange={handleSearch}
      />
    </div>
  );
}
