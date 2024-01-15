import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import FormControl from '@mui/material/FormControl';
import { Button, TextField } from '@mui/material';

function AddOrg() {
  const location = useLocation();
  const { id } = location.state || {};

  const [myData, setMyData] = useState({
    org_name: '',
    address: '',
    position: '',
    start_date: '',
    leaving_date: '',
  });

  const handleAddOrgButton = () => {
    const data = {
      alumni_id: id,
      org_name: myData.org_name,
      address: myData.address,
      position: myData.position,
      start_date: myData.start_date,
      leaving_date: myData.leaving_date,
    };

    axios
      .post(`http://localhost:9630/addAlumniOrg/`, data)
      .then((response) => {
        console.log('Org Inserted successful', response.data);
      })
      .catch((error) => {
        console.error('Insertion failed:', error.message);
      });
  };

  return (
    <div className='updateProfile_div'>
      <FormControl>
        <TextField
          id='org_name'
          label='Organisation Name'
          variant='standard'
          required={true}
          margin='normal'
          onChange={(e) => setMyData({ ...myData, org_name: e.target.value })}
        />
        <TextField
          id='address'
          label='Address'
          variant='standard'
          required={true}
          margin='normal'
          onChange={(e) => setMyData({ ...myData, address: e.target.value })}
        />
        <TextField
          id='position'
          label='Position'
          variant='standard'
          required={true}
          margin='normal'
          onChange={(e) => setMyData({ ...myData, position: e.target.value })}
        />
        <TextField
          id='start_date'
          label='Start Date'
          variant='standard'
          required={true}
          margin='normal'
          onChange={(e) => setMyData({ ...myData, start_date: e.target.value })}
        />
        <TextField
          id='leaving_date'
          label='Leaving Date'
          variant='standard'
          required={true}
          margin='normal'
          onChange={(e) => setMyData({ ...myData, leaving_date: e.target.value })}
        />
        <Button margin='normal' onClick={handleAddOrgButton}>
          Add
        </Button>
      </FormControl>
    </div>
  );
}

export default AddOrg;
