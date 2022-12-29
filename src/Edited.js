import React from 'react';
import "./MyBlogs";
import Editedrequests from './components/Editedrequests';
const Edited = () => {
  return (

    <div style={{ marginTop: '10px' }}>
      <h2>Edited articles</h2>
      {JSON.parse(localStorage.getItem('editedrequestid')) ? (
        JSON.parse(localStorage.getItem('editedrequestid')).map((numbe, i) => {
          return (<Editedrequests key={i}
            requestId={numbe} />)
        }
        )
      ) : (
        <div>
          <h2 style={{ textAlign: 'center' }}>Improve other's articles </h2>
        </div>
      )}
      {
        JSON.parse(localStorage.getItem('editedrequestid')) && JSON.parse(localStorage.getItem('editedrequestid')).length === 0 ? (
          <div>
            <h3 style={{ textAlign: 'center' }}>Improve other's articles </h3>
          </div>
        ) : null

      }
    </div>
  );
};

export default Edited;