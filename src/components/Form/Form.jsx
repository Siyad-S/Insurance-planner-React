import React, { useEffect } from "react";
import "./Form.css";
import {
  getInsurePolicies,
  postUserInsure,
  setUserInsurance,
} from "../../Redux/Slices/slice";
import { useDispatch, useSelector } from "react-redux";

const genders = ["Male", "Female"];
const relationships = ["Parent", "Spouse", "Sibling", "Friend", "Other"];

const Form = () => {
  const dispatch = useDispatch();
  const insureForm = useSelector((state) => state.insurance.insureForm);
  const policiesData = useSelector(
    (state) => state.insurance.policies.getPolicies
  );

  useEffect(() => {
    dispatch(getInsurePolicies());
  }, [dispatch]);

  console.log(policiesData);

  const handleInputChange = (e) => {
    const inputData = {
      ...insureForm,
      [e.target.id]: e.target.value,
    };
    dispatch(setUserInsurance(inputData));
  };

  const handleCheckboxChange = (e) => {
    const checkboxData = {
      ...insureForm,
      qualifications: e.target.checked
        ? [...insureForm.qualifications, e.target.value]
        : insureForm.qualifications.filter(
            (qualification) => qualification !== e.target.value
          ),
    };

    dispatch(setUserInsurance(checkboxData));
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

  const handleSubmit = async () => {
    dispatch(postUserInsure(insureForm));
  };
  console.log(insureForm);

  return (
    <>
        <div className="form-container">
          <form>
            <label>
              Salutation:
              <select
                id="salutation"
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
                id="name"
                value={insureForm.name}
                onChange={handleInputChange}
                required
              />
            </label>

            <label>
              Email:
              <input
                type="email"
                id="email"
                value={insureForm.email}
                onChange={handleInputChange}
                required
              />
            </label>

            <label>
              Gender:
              <select
                id="gender"
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
                id="dob"
                value={insureForm.dob}
                onChange={handleDateChange}
                required
              />
            </label>

            <label>
              Age:
              <input type="number" id="age" value={insureForm.age} readOnly />
            </label>

            <label>
              Address:
              <textarea
                id="address"
                value={insureForm.address}
                onChange={handleInputChange}
                required
              />
            </label>

            <label>
              Qualifications:
              <div>
                <label htmlFor="+2">+2</label>
                <input
                  type="checkbox"
                  id="qualifications"
                  name="+2"
                  value={"+2"}
                  onChange={handleCheckboxChange}
                />
              </div>
              <div>
                <label htmlFor="graduation">Graduation</label>
                <input
                  type="checkbox"
                  id="qualifications"
                  name="graduation"
                  value={"Graduation"}
                  onChange={handleCheckboxChange}
                />
              </div>
            </label>

            <label>
              Profession:
              <input
                type="text"
                id="profession"
                value={insureForm.profession}
                onChange={handleInputChange}
                required
              />
            </label>

            <label>
              Nominee:
              <input
                type="text"
                id="nominee"
                value={insureForm.nominee}
                onChange={handleInputChange}
                required
              />
            </label>

            <label>
              Relationship with Nominee:
              <select
                id="relationship"
                value={insureForm.relationship}
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
                    id={"insuranceData"}
                    name="insuranceData"
                    value={policy._id}
                    checked={insureForm.insuranceData === policy._id}
                    onChange={handleInputChange}
                  />
                  <label>{policy.insurance_name}</label>
                </div>
              ))}
            </label>

            <button type="button" onClick={handleSubmit}>
              Submit
            </button>
          </form>
        </div>
    </>
  );
};

export default Form;
