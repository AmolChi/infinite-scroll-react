import { Autocomplete, TextField } from "@mui/material";
import "./styles/App.css";
import { useEffect, useState } from "react";
import Card from './components/Card';

function App() {
  const noEmp = ["0-10","11-20", "21-50","51-100","101-250","251-500","500+"];
  const rem = ["Remote", "Hybrid", "In-Office"];
  //const basePay = [0, 10, 20, 30, 40, 50, 60, 70];

  const [data, setData] = useState(null);
  const [sendData,setSendData] = useState(null);
  const [roles, setRole] = useState([]);
  const [exp, setExp] = useState([]);
  const [basePay,setBasePay] = useState([]);
  const [currentRoles,setCurrentRoles] = useState([]);
  const [currentExp, setCurrentExp] = useState(0);
  const [currentRemoteValue,setCurrentRemoteValue] = useState([]);
  const [currentMinPay, setCurrentMinPay] = useState(0);
  const [searchComp,setSearchComp] = useState("");

  const handleSearchComp = (event) =>{
    setSearchComp(event.target.value);
  }


  const getData = async () => {
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

    const response = await fetch(
      "https://api.weekday.technology/adhoc/getSampleJdJSON",
      requestOptions
    );
    const Data = await response.json();
    setData(Data.jdList);
  };

  const handleRoleChange = (event,newValue) =>{
    setCurrentRoles(newValue);
  }

  const handleExpChange = (event,newValue)=>{
    if(newValue === null)
      setCurrentExp(0);
    else
      setCurrentExp(newValue);
  }

  const handleRemoteChange = (event,newValue)=>{
    setCurrentRemoteValue(newValue);
  }

  const handleMinBasePay = (event,newValue)=>{
    if(newValue === null)
        setCurrentMinPay(0);
    else
      setCurrentMinPay(newValue);
  }

  useEffect(()=>{
    var newData = data;
    if(currentRoles.length !== 0){
      newData = newData.filter((d)=>currentRoles.includes(d.jobRole))
    }
    if(currentExp>0){
      newData = newData.filter((d)=>d.minExp>=currentExp)
    }
    if(currentMinPay>0){
      newData = newData.filter((d)=>d.minJdSalary>=currentMinPay)
    }
    if(currentRemoteValue.length>0){
      newData = newData.map((d)=>{
        if(currentRemoteValue.includes('Remote') && d.location === 'remote')
            return d;
        if(currentRemoteValue.includes('Hybrid') && d.location.includes('remote'))
            return d;
        if(currentRemoteValue.includes('In-Office') && d.location !== 'remote')
            return d;
        return null;
      }).filter(d=>d!==null);
    }

    if(searchComp.length>0){
      newData = data.filter(d=>d.companyName.includes(searchComp));
    }

    setSendData(newData);
  },[data,currentRoles,currentExp,currentMinPay,currentRemoteValue,searchComp]);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (data != null) {
      const diffRoles = [
        ...new Set(
          data.map((d) => {
            if (d.jobRole != null) {
              return d.jobRole;
            }
            return null;
          }).filter(d=>d!==null)
        ),
      ];

      const minExp = Math.min(
        ...new Set(data.map((d) => d.minExp).filter((d) => d !== null))
      );

      const maxExp = Math.max(
        ...new Set(data.map((d) => d.minExp).filter((d) => d !== null))
      );

      var minSal = Math.min(
        ...new Set(data.map(d=>d.minJdSalary).filter((d)=>d!==null))
      )
      
      var maxSal = Math.max(
        ...new Set(data.map(d => d.maxJdSalary).filter((d)=>d!==null))
      )

      minSal = Math.floor(minSal/10)*10;
      maxSal = Math.floor(maxSal/10)*10;

      const salArr = Array.from(
        {length:(maxSal-minSal)/10 + 1},
        (_,index)=>index*10 + minSal
      )

      const exp = Array.from(
        { length: maxExp - minExp + 1 },
        (_, index) => index + minExp
      );
      
      setBasePay(salArr);
      setExp(exp);
      setRole(diffRoles);
    }
  }, [data]);

  return data === null ? (
    <></>
  ) : (
    <>
      <div className="searchBox">
        <Autocomplete
          multiple
          limitTags={2}
          id="multiple-limit-tags"
          options={roles}
          getOptionLabel={(option) => option}
          onChange={handleRoleChange}
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
          getOptionLabel={(option) => String(option)}
          onChange={handleExpChange}
          renderInput={(params) => <TextField {...params} label="Experience" />}
          sx={{ minWidth: 150 }}
        />
        <Autocomplete
          multiple
          id="multiple-limit-tags"
          options={rem}
          getOptionLabel={(option) => option}
          onChange={handleRemoteChange}
          renderInput={(params) => <TextField {...params} label="Remote" />}
          sx={{ minWidth: 150 }}
        />
        <Autocomplete
          id="multiple-limit-tags"
          options={basePay}
          getOptionLabel={(option) => String(option)}
          onChange={handleMinBasePay}
          renderInput={(params) => (
            <TextField {...params} label="Minimum Base Pay Salary" />
          )}
          sx={{ minWidth: 300 }}
        />
        <TextField label="Search Company Name" value={searchComp} onChange={handleSearchComp}/>
      </div>
      {sendData && <div className="cards">
          {
            sendData.map((d,idx)=>(
              <Card data = {d}/>
            ))
          }
      </div>}
    </>
  );
}

export default App;
