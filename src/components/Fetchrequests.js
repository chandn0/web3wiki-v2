import React from 'react';
import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { parse } from 'path';
import axios from "axios";
import "./BlogCard.css";
import { useAccount } from 'wagmi';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../constant";
import { ethers } from 'ethers';
import './Fetchrequest.css';
const Fetchrequests = ({ requestId }) => {
    const [blogsContent, setBlogsContent] = useState();
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const { account } = useAccount();
    const [obj, setobj] = useState();
    // const [on, seton] = useState();

    async function fetcharticles() {
        try {
            const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
            let ledger = await contract.requestdata(requestId);
            setobj(ledger);
        } catch (err) {
            console.error(err);

        }
    }

    useEffect(() => {
        fetcharticles();
    }, [account]);


    useEffect(() => {
        if (obj) {
            // const record = obj;
            // let re = [];
            // for (const o of record) {
            //     re.push(o);
            // }
            // seton(re);
            // if (on) {
            getAllNFTs(obj[2]);
            // }

        }
    }, [obj]);


    async function getAllNFTs(uri) {
        let meta = await axios.get(uri);
        meta = meta.data;
        const title = meta.ti;
        const text = meta.text.toString();

        setBlogsContent({ title, text, uri });
    }

    return (
        <div className='requests'>
            {blogsContent ? (<div> <h2>{blogsContent.title}</h2>
                <p>{blogsContent.text}</p>
                {/* <p>IPFS Content address :{blogsContent.uri}</p> */}
                <p>ArticleId: {obj[1].toNumber()}</p>
                <p>Total amount:{obj[3]}</p>
                <br></br>
            </div>) : (<div></div>)}
        </div>
    );
};
export default Fetchrequests;