import React from 'react';
import Requestedcard from './components/requestedcard';
import { useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { CONTRACT_ABI, CONTRACT_ADDRESS } from "./constant";
// import { ethers } from "ethers";
// import { useAccount } from 'wagmi';

const Requests = () => {
    const navigate = useNavigate();
    // const { account } = useAccount();
    // const { myarticles, setMyarticles } = useState([]);
    // const provider = new ethers.providers.Web3Provider(window.ethereum);

    function clickHandler() {
        navigate("/newStory");
    }
    // useEffect(() => {

    // }, [account]);

    return (
        <div style={{ marginTop: '10px' }}
        >
            <h2>Requests</h2>
            {JSON.parse(localStorage.getItem('myblogs_Id')) ? (
                <div>
                    {JSON.parse(localStorage.getItem('myblogs_Id')).map((number, i) =>
                        <Requestedcard key={i}
                            articleId={number} />
                    )}
                </div>) : (
                <div style={{ textAlign: 'center' }}>
                    <h1 >No Blogs</h1>
                    <button onClick={clickHandler} > Create First Blog</button>
                </div>
            )}
        </div>
    );
};

export default Requests;