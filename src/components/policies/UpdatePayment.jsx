import axios from "axios";
import React, { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import datepicker styles
import { useParams } from "react-router-dom";
import { API_URL } from "../../Links";

const UpdatePayment = () => {
  const [user, setUser] = useState({});
  const { policyId } = useParams();
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [lastPaymentDate, setLastPaymentDate] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/user`);
        setUser(data.user);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (user && user.policies) {
      const policy = user.policies.find((policy) => policy._id === policyId);
      if (policy) {
        setLastPaymentDate(policy.lastPremiumPayment);
      }
    }
  }, [user, policyId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "content-Type": "application/json",
        },
      };

      await axios.put(
        `${API_URL}/user/policy/${policyId}`,
        { lastPremiumPayment: lastPaymentDate },
        config
      );

      setSuccessMessage("Updated Last Premium Payment Date");
    } catch (error) {
      console.error("Error Updating ....", error);
      setErrorMessage("Error Updating ....");
    }
  };

  return (
    <div className="row">
      <h1 className="text-center">Change the last premium payment date</h1>
      <div className="col-md-6 offset-md-3">
        {successMessage && <Alert variant="success">{successMessage}</Alert>}
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        <form
          noValidate
          className="validated-form"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
        >
          <div className="mb-3">
            <label className="form-label" htmlFor="lastPaymentDate">
              Last Premium Payment Date:
            </label>
            <DatePicker
              className="form-control" // Apply Bootstrap form-control class
              selected={lastPaymentDate} // Pass selected date
              onChange={(date) => setLastPaymentDate(date)} // Handle date change
              dateFormat="dd/MM/yyyy" // Set date format
            />
          </div>
          <div className="mb-3">
            <button type="submit" className="btn btn-success">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePayment;
