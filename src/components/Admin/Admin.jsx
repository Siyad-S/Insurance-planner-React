import React, { useEffect, useState } from 'react'
import "./Admin.css"
import Form from '../Form/Form'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDatas } from "../../Redux/Slices/slice"
import Table from '../Table/Table'

const Admin = () => {
    const dispatch = useDispatch()
    const usersData = useSelector(
        (state) => state.insurance.userDatas.insuranceData
      );

    useEffect(() => {
        dispatch(getUserDatas())
    }, [dispatch])

    console.log(usersData);

    const [openForm, setOpenForm] = useState(false)

    const formHandler = () => {
        setOpenForm(true)
    }

  return (
    <div className='admin'>
        <div className='form'>
            {openForm? (
                <Form />
            ) : null}
        </div>
        <div className='applicants'>
            <div className='user'>
                <Table formHandler={formHandler} />
            </div>
        </div>
    </div>
  )
}

export default Admin