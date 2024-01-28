import React, { useEffect, useState } from "react";
import "./Table.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserDatas,
  getSingleUser,
  updateUserInsureStatus,
  getInsurePolicies,
} from "../../Redux/Slices/slice";

const Table = ({formHandler}) => {
  const dispatch = useDispatch();
  const usersData = useSelector(
    (state) => state.insurance.userDatas.insuranceData
  );
  const [searchQuery, setSearchQuery] = useState("");
  const singleUserData = useSelector((state) => state.insurance.singleUser);
  const [openThreeDot, setOpenThreeDot] = useState(false);
  const [userId, setUserId] = useState("");
  const policies = useSelector(
    (state) => state.insurance.policies.getPolicies
  );
  

  useEffect(() => {
    console.log("Search Query:", searchQuery);
    dispatch(getUserDatas(searchQuery));
    dispatch(getInsurePolicies());
  }, [dispatch, searchQuery]);
  

  const findPolicyNameById = (policyId) => {
    if (!policies) {
      return "Loading Policies...";
    }
    const policy = policies.find((policyData) => policyData._id === policyId);
    return policy ? policy.insurance_name : "Unknown Policy";
  };

  const handleThreeDot = (userId) => {
    setOpenThreeDot(true);
    dispatch(getSingleUser(userId)).then(() => {
      setUserId(userId);
    });
  };

  const handleStatusChange = (status) => {
    dispatch(
      updateUserInsureStatus({
        id: userId,
        data: { insuranceStatus: status },
      })
    );
    setOpenThreeDot(false);
  };

  console.log(singleUserData);



  return (
    <div>
        <div className='header'>
        <div className='heading'>
            <h1>Insurances</h1>
        </div>
        <div className='search_addBtn'>
  <input
    type="search"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
  />
  <button onClick={formHandler}>Add Customer</button>
</div>

    </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Policy</th>
            <th>Insurance Status</th>
          </tr>
        </thead>
        <tbody>
          {usersData?.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{findPolicyNameById(user.insuranceData)}</td>
              <td>{user.insuranceStatus}</td>
              <td>
                <i
                  className="material-symbols-outlined"
                  onClick={() => handleThreeDot(user._id)}
                >
                  more_vert
                </i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {openThreeDot ? (
        <div className="status_menu">
          <h5>Change Status</h5>
          <ul>
            {singleUserData?.insuranceData?.insuranceStatus === "Pending" && (
              <li onClick={() => handleStatusChange("Approved")}>Approve</li>
            )}
            {singleUserData?.insuranceData?.insuranceStatus === "Approved" && (
              <li onClick={() => handleStatusChange("Completed")}>Complete</li>
            )}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default Table;
