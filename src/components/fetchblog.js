import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BlogCard from "./BlogCard";
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { ethers } from "ethers";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../constant";

const FetchblogCard = ({ articleId }) => {
  const { account } = useAccount();
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  const navigate = useNavigate();
  const [obj, setobj] = useState();

  async function fetcharticles() {
    try {
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
      let ledger = await contract.articleuri(articleId);
      setobj(ledger);
    } catch (err) {
      console.error(err);

    }
  }
  // const { data, error, fetch, isFetching, isLoading } =
  //   useWeb3ExecuteFunction({
  //     abi: contractabi,
  //     contractAddress: contractlocation,
  //     functionName: "articleuri",
  //     params: {
  //       id: articleId,
  //     },
  //   });

  useEffect(() => {
    fetcharticles();
  }, [account]);


  useEffect(() => {

    if (obj) {
      console.log(obj);
      localStorage.setItem("articleId", obj);
    }
  }, [obj]);

  return (
    <>
      <div>
        {obj ? (<div><BlogCard uri={obj} key={articleId} articleId={articleId} /></div>) : (<div></div>)}
      </div>
    </>
  );
};

export default FetchblogCard;
