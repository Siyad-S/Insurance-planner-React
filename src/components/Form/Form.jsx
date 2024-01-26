import React, { useState, useEffect } from "react";
import "./Form.css";
import { getInsurePolicies, postUserInsure, setUserInsurance } from "../../Redux/Slices/slice";
import { useDispatch, useSelector } from "react-redux";

const genders = ["Male", "Female"];
const relationships = ["Parent", "Spouse", "Sibling", "Friend", "Other"];

const Form = () => {
  const dispatch = useDispatch();
  const insureForm = useSelector((state) => state.insurance.insureForm);
  const policiesData = useSelector((state) => state.insurance.policies.getPolicies);

  useEffect(() => {
    dispatch(getInsurePolicies());
  }, [dispatch]);

  console.log(policiesData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(setUserInsurance({
...insureForm, [name]: value ,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    if (checked) {
      dispatch(setUserInsurance({
        ...insureForm,
        qualifications: [...insureForm.qualifications, name]
      }
    ));
    } else {
      dispatch(setUserInsurance(
        {
            ...insureForm,
            qualifications: insureForm.qualifications.filter((q) => q !== name),
          },
      ));
    }
  };

  const handleDateChange = (e) => {
    const dob = e.target.value;
    dispatch(setUserInsurance({ ...insureForm, dob, age: calculateAge(dob) }));
  };

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const currentDate = new Date();
    const age = currentDate.getFullYear() - birthDate.getFullYear();
    return age;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postUserInsure({userData: insureForm}))
    console.log(insureForm);
  };

  return (
    <div className="form-container">
      <form>
        <label>
          Salutation:
          <select
            name="salutation"
            value={insureForm.salutation}
            onChange={handleInputChange}
            required
          >
            <option value="">Select</option>
            <option value="Mr.">Mr.</option>
            <option value="Mrs.">Mrs.</option>
          </select>
        </label>

        <label>
          Name:
          <input
            type="text"
            name="name"
            value={insureForm.name}
            onChange={handleInputChange}
            required
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={insureForm.email}
            onChange={handleInputChange}
            required
          />
        </label>

        <label>
          Gender:
          <select
            name="gender"
            value={insureForm.gender}
            onChange={handleInputChange}
            required
          >
            <option value="">Select</option>
            {genders.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label>
          Date of Birth:
          <input
            type="date"
            name="dob"
            value={insureForm.dob}
            onChange={handleDateChange}
            required
          />
        </label>

        <label>
          Age:
          <input type="number" name="age" value={insureForm.age} readOnly />
        </label>

        <label>
          Address:
          <textarea
            name="address"
            value={insureForm.address}
            onChange={handleInputChange}
            required
          />
        </label>

        <label>
          Qualifications:
          <div>
            <input
              type="checkbox"
              name="qualification1"
              checked={insureForm.qualifications.includes("qualification1")}
              onChange={handleCheckboxChange}
            />
            <label>+2</label>
          </div>
          <div>
            <input
              type="checkbox"
              name="qualification2"
              checked={insureForm.qualifications.includes("qualification2")}
              onChange={handleCheckboxChange}
            />
            <label>Graduation</label>
          </div>
        </label>

        <label>
          Profession:
          <input
            type="text"
            name="profession"
            value={insureForm.profession}
            onChange={handleInputChange}
            required
          />
        </label>

        <label>
          Nominee:
          <input
            type="text"
            name="nominee"
            value={insureForm.nominee}
            onChange={handleInputChange}
            required
          />
        </label>

        <label>
          Relationship with Nominee:
          <select
            name="relationshipWithNominee"
            value={insureForm.relationshipWithNominee}
            onChange={handleInputChange}
            required
          >
            <option value="">Select</option>
            {relationships.map((relationship) => (
              <option key={relationship} value={relationship}>
                {relationship}
              </option>
            ))}
          </select>
        </label>

        <label>
          Selection of Insurance Details:
          {policiesData?.map((policy, index) => (
                      <div key={index}>
                      <input
                        type="radio"
                        name="insuranceDetails"
                        value={policy}
                        checked={insureForm.insuranceDetails === policy.insurance_name}
                        onChange={handleInputChange}
                      />
                      <label>{policy.insurance_name}</label>
                    </div>
          ))}
        </label>

        <button type="button" onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  );
};

export default Form;
