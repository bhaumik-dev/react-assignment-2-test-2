import React, { useState, useEffect } from "react";
import EmployeeTable from "./EmployeeTable";
import EmployeeCreate from "./EmployeeCreate";
import "../styles/styles.css";

const EmployeeDirectory = () => {
  const [employeeData, setEmployeeData] = useState([]);

  const updateEmployeeData = (newEmployee) => {
    setEmployeeData([...employeeData, newEmployee]);
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("http://localhost:4000/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: `
              query {
                employees {
                  id
                  firstName
                  lastName
                  age
                  dateOfJoining
                  title
                  department
                  employeeType
                  currentStatus
                }
              }
            `,
          }),
        });
        if (response.ok) {
          const data = await response.json();
          setEmployeeData(data.data.employees);
        } else {
          console.error("Failed to fetch employee data");
        }
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div>
      <h1>Employee Directory</h1>
      {employeeData.length > 0 ? (
        <EmployeeTable employeeData={employeeData} />
      ) : (
        <p>No employee data available</p>
      )}
      <EmployeeCreate updateEmployeeData={updateEmployeeData} />
    </div>
  );
};

export default EmployeeDirectory;
