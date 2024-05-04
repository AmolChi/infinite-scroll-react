import { Autocomplete, TextField } from "@mui/material";
import "./styles/App.css";
import { useEffect, useState } from "react";

function App() {
  const roles = ["frontend", "backend", "dba"];
  const noEmp = ["0-10", "10-20", "20-50"];
  const exp = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const rem = ["Remote", "Hybrid", "In-Office"];
  const basePay = ["0L", "10L", "20L"];

  const [data,setData] =  useState(null);

  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const body = JSON.stringify({
      limit: 10,
      offset: 0,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body,
    };

    fetch(
      "https://api.weekday.technology/adhoc/getSampleJdJSON",
      requestOptions
    )
      .then((res) => res.text())
      .then((res) => setData(res))
      .catch((err) => console.log(err));
  }, []);

  useEffect(()=>{
    
  },[data])

  return (
    (data===null)?
      <></>
    :<>
      <div className="searchBox">
        <Autocomplete
          multiple
          limitTags={2}
          id="multiple-limit-tags"
          options={roles}
          getOptionLabel={(option) => option}
          renderInput={(params) => (
            <TextField {...params} label="Role" placeholder="" />
          )}
          sx={{ minWidth: 150 }}
        />
        <Autocomplete
          multiple
          limitTags={2}
          id="multiple-limit-tags"
          options={noEmp}
          getOptionLabel={(option) => option}
          renderInput={(params) => (
            <TextField {...params} label="Number Of Employees" />
          )}
          sx={{ minWidth: 220 }}
        />
        <Autocomplete
          id="multiple-limit-tags"
          options={exp}
          getOptionLabel={(option) => option}
          renderInput={(params) => <TextField {...params} label="Experience" />}
          sx={{ minWidth: 150 }}
        />
        <Autocomplete
          multiple
          id="multiple-limit-tags"
          options={rem}
          getOptionLabel={(option) => option}
          renderInput={(params) => <TextField {...params} label="Remote" />}
          sx={{ minWidth: 150 }}
        />
        <Autocomplete
          id="multiple-limit-tags"
          options={basePay}
          getOptionLabel={(option) => option}
          renderInput={(params) => (
            <TextField {...params} label="Minimum Base Pay Salary" />
          )}
          sx={{ minWidth: 300 }}
        />
        <TextField label="Search Company Name" />
      </div>
    </>
  );
}

export default App;
