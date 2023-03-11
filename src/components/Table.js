import React, { useEffect, useState } from "react";

const Table = () => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const page = 10;
  useEffect(() => {
    fetchData();
    setLoader(true);
  }, []);
  const fetchData = () => {
    fetch("https://randomuser.me/api/?results=" + page)
      .then((res) => res.json())
      .then((data) => {
        setData(data.results);
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
        setError(true);
      });
  };
  console.log({ data });
  return (
    <div data-testid="test-test" className="App">
      <h1 data-testid="header-title">Hello React</h1>
      {loader ? <h1>Loading...</h1> : null}
      {error ? <h1>Error</h1> : null}

      <div className="table-center">
        <div>
          <table rules="all" border={"2px"}>
            <thead>
              <th>Phone</th>
              <th>Gender</th>
              <th>Email</th>
              <th>Cell</th>
              <th>Image</th>
            </thead>
            <tbody>
              {data &&
                data.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.phone}</td>
                      <td>{item.gender}</td>
                      <td>{item.email}</td>
                      <td>{item.cell}</td>
                      <td>
                        <img src={item?.picture?.large} />
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Table;
