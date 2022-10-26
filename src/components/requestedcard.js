import { useEffect, useState } from "react";
import Fetchrequests from './Fetchrequests';
// import 'bootstrap/dist/css/bootstrap.css';
import { useAccount } from 'wagmi';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../constant";
import { ethers } from "ethers";
const Requestedcard = ({ articleId }) => {

    const { account } = useAccount();
    const [obj, setobj] = useState([]);
    const [request, setrequest] = useState();

    const provider = new ethers.providers.Web3Provider(window.ethereum);

    async function fetcharticles() {
        try {
            const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
            let ledger = await contract.request_of_articleId(articleId);
            setobj(ledger);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        fetcharticles();
    }, [account]);

    useEffect(() => {
        let k;
        if (obj) {
            console.log(obj);
            let co = [];
            for (let i = 0; i < obj.length; i++) {
                k = obj[i].toNumber();
                co.push(k);
            }
            setrequest(co);
            console.log(co);
        }
    }, [obj]);



    return (
        <div style={{ marginTop: '10px' }}>
            {(request) ? (
                <div>
                    {request.map((number, i) =>
                        <Fetchrequests key={i}
                            requestId={number} />
                    )}
                </div>) : (
                <div style={{ textAlign: 'center' }} >
                </div>
            )}

        </div>
    );
};

export default Requestedcard;