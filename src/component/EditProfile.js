import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import FormControl from '@mui/material/FormControl';
import { Button, TextField } from '@mui/material';

function EditProfile() {
  const location = useLocation();
  const { id } = location.state || {};

  const [myContact, setMyContact] = useState({ email: '', contactNumber: '', password: '' });
  const [myEdu, setMyEdu] = useState({ degree: '', passingYear: '', joiningYear: '', collegeName: '', address: '' });

  const url = `http://localhost:9630/getAlumni/${id}`;

  const handleUpdateButton = () => {
    const data = { alumni_id: id, contact_no: myContact.contactNumber };

    axios.put(`http://localhost:9630/updateAlumniContact/`, data)
      .then((response) => {
        console.log('Contact Update successful', response.data);
      })
      .catch((error) => {
        console.error('Update failed:', error.message);
      });

    const dataEdu = {
      id: id,
      collegeName: myEdu.collegeName,
      degree: myEdu.degree,
      joiningYear: myEdu.joiningYear,
      passingYear: myEdu.passingYear,
      address: myEdu.address,
    };

    axios.put(`http://localhost:9630/updateAlumniEducation/`, dataEdu)
      .then((res) => {
        console.log('Edu Update successful', res.data);
      })
      .catch((error) => {
        console.error('Edu Update failed:', error.message);
      });
  };

  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        setMyContact(res.data[0]);
      });

    axios.get(`http://localhost:9630/getEdu/${id}`)
      .then((res) => {
        setMyEdu(res.data[0]);
      });
  }, [id]);

  return (
    <div className='updateProfile_div'>
      <FormControl>
        <TextField
          id='contactNumber'
          label='Contact Number'
          variant='standard'
          required={true}
          margin='normal'
          placeholder={myContact.contactNumber}
          onChange={(e) => setMyContact({ ...myContact, contactNumber: e.target.value })}
        />
        <TextField
          id='degree'
          label='Degree'
          variant='standard'
          required={true}
          margin='normal'
          placeholder={myEdu.degree}
          onChange={(e) => setMyEdu({ ...myEdu, degree: e.target.value })}
        />
        <TextField
          id='joiningYear'
          label='Joining Year'
          variant='standard'
          required={true}
          margin='normal'
          placeholder={myEdu.joiningYear}
          onChange={(e) => setMyEdu({ ...myEdu, joiningYear: e.target.value })}
        />
        <TextField
          id='passingYear'
          label='Passing Year'
          variant='standard'
          required={true}
          margin='normal'
          placeholder={myEdu.passingYear}
          onChange={(e) => setMyEdu({ ...myEdu, passingYear: e.target.value })}
        />
        <TextField
          id='collegeName'
          label='College Name'
          variant='standard'
          required={true}
          margin='normal'
          placeholder={myEdu.collegeName}
          onChange={(e) => setMyEdu({ ...myEdu, collegeName: e.target.value })}
        />
        <TextField
          id='address'
          label='Address'
          variant='standard'
          required={true}
          margin='normal'
          placeholder={myEdu.address}
          onChange={(e) => setMyEdu({ ...myEdu, address: e.target.value })}
        />
        <Button margin='normal' onClick={handleUpdateButton}>
          Update
        </Button>
      </FormControl>
    </div>
  );
}

export default EditProfile;
