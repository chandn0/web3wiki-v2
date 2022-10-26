import React from 'react';
import "./MyBlogs";
import Editedrequests from './components/Editedrequests';
const Edited = () => {
  return (

    <div style={{ marginTop: '10px' }}>
      <h2>Edited articles</h2>
      {JSON.parse(localStorage.getItem('editedrequestid')) ? (
        JSON.parse(localStorage.getItem('editedrequestid')).map((number, i) => {
          return (<Editedrequests key={i}
            requestId={number} />)
        }
        )
      ) : (
        <div>
          <h2 style={{ textAlign: 'center' }}>Improve other's articles </h2>
        </div>
      )}
    </div>
  );
};

export default Edited;