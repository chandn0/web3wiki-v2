import React from 'react';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { parse } from 'path';
import axios from "axios";
import "./BlogCard.css";
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../constant";
import { ethers } from 'ethers';

const Fetchrequests = ({ requestId }) => {
    const [blogsContent, setBlogsContent] = useState();
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const { account } = useAccount();
    const [obj, setobj] = useState();
    const [on, seton] = useState();

    async function fetcharticles() {
        try {
            const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
            let ledger = await contract.requestdata(requestId);
            setobj(ledger);
        } catch (err) {
            console.error(err);

        }
    }

    // const { data, error, fetch, isFetching, isLoading } =
    //     useWeb3ExecuteFunction({
    //         abi: contractabi,
    //         contractAddress: contractlocation,
    //         functionName: "requestdata",
    //         params: {
    //             requesetId: requestId,
    //         },
    //     });

    useEffect(() => {
        fetcharticles();
    }, [account]);


    useEffect(() => {
        if (obj) {
            const record = obj;
            let re = [];
            for (const o of record) {
                re.push(o);
            }
            seton(re);
            if (on) {
                getAllNFTs(on[2]);
            }

        }
    }, [obj]);

    async function getAllNFTs(uri) {
        let meta = await axios.get(uri);
        meta = meta.data;
        const title = meta.ti;
        const text = meta.text.toString();

        setBlogsContent({ title, text, uri });
    }

    const fetchBlogurl = async (uri) => {

        if (uri != undefined) {
            const res = await axios.get(uri);
            const externalUrl = res.data.externalUrl.toString();
            const re = await axios.get(externalUrl);
            const text = re.data.text.toString();
            const title = re.data.title;
            setBlogsContent({ title, text, externalUrl });
        } else if (uri != null) {
            const res = await axios.get(uri);
            const externalUrl = res.data.externalUrl.toString();
            const re = await axios.get(externalUrl);
            const text = re.data.text.toString();
            const title = re.data.title;
            setBlogsContent({ title, text, externalUrl });
        }
    }

    return (
        <div style={{
            border: "2px",
            borderradius: "5px",
            bordercolor: "black"
        }}>
            {blogsContent ? (<div> <h2>{blogsContent.title}</h2>
                <p>{blogsContent.text}</p>
                {/* <p>IPFS Content address :{blogsContent.uri}</p> */}
                <p>ArticleId: {on[1].toNumber()}</p>
                <p>Total amount:{on[3]}</p>
                <br></br>
            </div>) : (<div></div>)}
        </div>
    );
};
export default Fetchrequests;