import React from 'react';
import AlumniData from './AlumniData';
import Header from './Header';
import { useLocation } from 'react-router-dom';

const Home = () => {

  const location = useLocation();
  const { id } = location.state || {};
  console.log("Get id in home : "+id);

  return (
    <>
        <Header id = { id }/>
        <div className='main_div'>
            <AlumniData id={ id }/>
        </div>
    </>
  );
};

export default Home;
