import React, { useState, useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "../profile/UserContext";
import SearchForm from "../common/SearchForm";
import JoblyApi from "../api/api";

import CompanyCard from "./CompanyCard";

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const { currentUser, userInfoLoaded } = useContext(UserContext);

  //Searches for Company
  async function getCompanies(data) {
    let companies = await JoblyApi.getAllCompanies(data.search);
    setCompanies(companies);
  }

  // Set the company list.
  useEffect(() => {
    async function getCompanies() {
      let companies = await JoblyApi.getAllCompanies();
      setCompanies(companies);
    }
    getCompanies();
  }, []);

  //Redirects unauthorized users to /login route
  if (!currentUser && userInfoLoaded) {
    return <Navigate replace to="/login" />;
  }

  return (
    <div>
      companies
      <SearchForm searchFunction={getCompanies} />
      {companies.map((company) => (
        <CompanyCard
          name={company.name}
          handle={company.handle}
          description={company.description}
          logoUrl={company.logoUrl}
        />
      ))}
    </div>
  );
};
export default Companies;
