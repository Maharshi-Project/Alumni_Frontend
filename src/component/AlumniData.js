import React from 'react';
import { styled } from '@mui/material/styles';
import "../style.css";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import {  Paper,
          TableRow,
          TableHead,
          TableContainer,
          TableBody,
          Table
        } from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


const AlumniData = ({  id }) => {
  const navigate = useNavigate();

  console.log("ID is ::: "+id);
  const idAsLong = parseInt(id, 10);

  const [organizations, setOrganizations] = useState([]);
  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const response = await axios.get(`http://localhost:9630/getPosition/${idAsLong}`);
        setOrganizations(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching organizations:', error.message);
      }
    };

    fetchOrganizations();
  }, []);

  const handleUpdate = (orgId, id) => {
    console.log(id);
    navigate('/editOrg', { state: { id: orgId, alumni_id: id} });
  };


  const handleDelete = (alumni_id,orgId, orgPosition) => {
    console.log(`Delete organization with ID: ${orgId}`);
    console.log(`Delete alumni with ID: ${alumni_id}`);
    console.log(`Delete position : ${orgPosition}`);

    const apiUrl = "http://localhost:9630/deleteAlumniOrg/";
    const data = {
      alumni_id: alumni_id,
      org_id: orgId,
      position: orgPosition,
    };

    axios
      .delete(apiUrl, { data: data })  // Use axios.delete for DELETE requests
      .then((response) => { 
        console.log(`Delete successful for organization with ID: ${orgId}`);
        // Update the state after successful deletion
        setOrganizations(prevOrgs => prevOrgs.filter(org => org.organisationId !== orgId));
      })
      .catch((error) => {
        console.error(`Delete failed for organization with ID: ${orgId}`, error.message);
      });

  };

  return (
    <div className='table_div'>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Organisation</StyledTableCell>
              <StyledTableCell align="center">Position</StyledTableCell>
              <StyledTableCell align="center">Joining Date</StyledTableCell>
              <StyledTableCell align="center">Leaving Date</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {organizations.map((org) => (
              <StyledTableRow key={org.gen_id}>
                <StyledTableCell component="th" scope="row">
                  {org.organisationName}
                </StyledTableCell>
                <StyledTableCell align="center">{org.position}</StyledTableCell>
                <StyledTableCell align="center">{org.joiningDate}</StyledTableCell>
                <StyledTableCell align="center">{org.leavingDate}</StyledTableCell>
                <StyledTableCell align="center">
                  <button className="editProfile-button" onClick={() => handleUpdate(org.gen_id, id)}>Update</button>
                  <button className="delete-button" onClick={() => handleDelete(id, org.organisationId, org.position)}>Delete</button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AlumniData;