import { Chip } from "@mui/material";
import React from "react";
import "../styles/card.css";

function Card({ data }) {
  const transferToSite = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div className="card">
      <Chip label="&#9203; Posted 10 days ago" />
      <div className="header">
        <img src={data.logoUrl} alt="logo.svg" />
        <div className="header-company-data">
          <div className="company">{data.companyName}</div>
          <div className="role">{data.jobRole}</div>
          <div className="location">{data.location}</div>
        </div>
      </div>
      <div>
        Estimated Salary: &#8377; {data.minJdSalary ? data.minJdSalary : 0} -{" "}
        {data.maxJdSalary ? data.maxJdSalary : " "} LPA ✅
      </div>
      <p style={{ fontSize: "large", fontWeight: "bold", marginBottom: "0" }}>
        About Company:
      </p>
      <p style={{ marginTop: "0", marginBottom: "0", fontSize: "large" }}>
        About Us <br />
      </p>
      <div className="job-desc">{data.jobDetailsFromCompany}</div>
      <br />
      <p style={{ fontWeight: "bold", marginTop: "0", marginBottom: "0" }}>
        Minimum Experience
      </p>
      {data.minExp ? data.minExp : 0} Years <br />
      <button onClick={() => transferToSite(data.jdLink)}>⚡Easy Apply</button>
    </div>
  );
}

export default Card;
