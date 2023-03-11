import React, { useEffect, useState } from "react";

const SearchWether = () => {
  const apiKey = "757a221ba6671a34de9408711c9032ce";

  const [search, setSearch] = useState("hyderabad");
  const [data, setData] = useState();

  let temp = (data?.main?.temp - 273.15).toFixed(2);
  let temp_min = (data?.main?.temp_min - 273.15).toFixed(2);
  let temp_max = (data?.main?.temp_max - 273.15).toFixed(2);

  let today = new Date();

  let date = today.getDate();
  let year = today.getFullYear();
  let month = today.toLocaleString("default", { month: "long" });
  let day = today.toLocaleString("default", { weekday: "long" });

  let time = today.toLocaleString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  let emoji = null;

  useEffect(() => {
    fetchWetherInfo();
    // eslint-disable-next-line
  }, []);
  const fetchWetherInfo = async () => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${search}&APPID=${apiKey}`
    );
    const resData = await response.json();
    setData(resData);
  };

  const wetherType = (data && data?.weather[0]?.main) || null;

  if (data && typeof data.main != "undefined") {
    if (wetherType === "Clouds") {
      emoji = "fa-cloud";
    } else if (wetherType === "Thunderstrom") {
      emoji = "fa-bold";
    }
    if (wetherType === "Drizzle") {
      emoji = "fa-cloud-rain";
    }
    if (wetherType === "Rain") {
      emoji = "fa-cloud-shower-heavy";
    }
    if (wetherType === "Snow") {
      emoji = "fa-snow-flake";
    } else {
      emoji = "fa-smog";
    }
  } else {
    return <h4 className="text-center mt-5">Loading....</h4>;
  }

  return (
    <div>
      <div data-testid="test-test" className="container mt-5">
        {data && data.cod === "404" ? (
          <h2 className="text-center mt-5">City not found</h2>
        ) : (
          <div className="row justify-content-center">
            <div className="col-md-4">
              <div class="card text-white text-center border-0">
                <img
                  src={`https://source.unsplash.com/600x900/?${wetherType}`}
                  class="card-img"
                  alt="imag"
                />

                <div class="card-img-overlay">
                  <h3 data-testid="header-title my-3">Know your Weather</h3>
                  <div class="input-group mb-3">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Enter your location"
                      aria-label="Location"
                      aria-describedby="button-addon2"
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    <button
                      class="btn btn-primary"
                      type="button"
                      id="button-addon2"
                      onClick={() => fetchWetherInfo()}
                    >
                      <i className="fas fa-search"></i>
                    </button>
                  </div>
                  <div className="bg-dark bg-opacity-50 py-3">
                    <h2 class="card-title">{data?.name}</h2>
                    <p class="card-text lead">
                      {day}, {month} {date}, {year} <br />
                      {time}
                    </p>
                    <hr />
                    <i className={`fas ${emoji} fa-4x`}></i>{" "}
                    <h1 className="fw-bolder mb-5">{temp} &deg;C</h1>
                    <p className="lead fw-bolder mb-0">{wetherType}</p>
                    <p className="lead">
                      {temp_min}&deg;C | {temp_max}&deg;C
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchWether;
