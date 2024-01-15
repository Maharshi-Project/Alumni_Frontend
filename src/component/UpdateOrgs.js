import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import FormControl from '@mui/material/FormControl';
import { Button, TextField } from '@mui/material';

function UpdateOrgs() {

    const location = useLocation();
    const { id , alumni_id} = location.state || {};

    const url = `http://localhost:9630/updateAlumniOrg/`;

    const [resData, setResData] = useState([]);

    const [myData, setMyData] = useState({alumni_id:'',org_name:'',position:'',joiningDate:'',leavingDate:''});

    const handleUpdateButton = () => {
        const data = { alumni_id: alumni_id, org_name: resData.organisationName, position: myData.position, joiningDate:myData.joiningDate, leavingDate:myData.leavingDate};
    
        axios.put(url, data)
          .then((response) => {
            console.log('Org Update successful', response.data);
          })
          .catch((error) => {
            console.error('Update failed:', error.message);
          });
      };
    
      useEffect(() => {
        console.log(id);
        axios
            .get(`http://localhost:9630/getOrgDetailById/${id}`)
            .then((res) => {
                console.log('Response:', res.data);
                setResData(res.data[0]);
            })
            .catch((error) => {
                console.error('Error fetching data:', error.message);
            });
    }, []);
    

    return (
        <div className='updateProfile_div'>
      <FormControl>
        <TextField
          id='position'
          label='Position'
          variant='standard'
          required={true}
          margin='normal'
          placeholder={resData.position}
          onChange={(e) => setMyData({ ...myData, position: e.target.value })}
        />
        <TextField
          id='joiningDate'
          label='Joining Date'
          variant='standard'
          required={true}
          margin='normal'
          placeholder={resData.joiningDate}
          onChange={(e) => setMyData({ ...myData, joiningDate: e.target.value })}
        />
        <TextField
          id='leavingDate'
          label='Leaving Date'
          variant='standard'
          required={true}
          margin='normal'
          placeholder={resData.leavingDate}
          onChange={(e) => setMyData({ ...myData, leavingDate: e.target.value })}
        />
        <Button margin='normal' onClick={handleUpdateButton}>
          Update
        </Button>
      </FormControl>
    </div>
    )
}

export default UpdateOrgs