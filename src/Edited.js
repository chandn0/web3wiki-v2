import React from 'react';
import "./MyBlogs";
import Fetchrequests from './components/Fetchrequests';

const Edited = () => {


  return (
    <div style={{ marginTop: '10px' }}>
      {JSON.parse(localStorage.getItem('editedrequestid')) ? (
        JSON.parse(localStorage.getItem('editedrequestid')).map((number, i) => {
          return (<Fetchrequests key={i}
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