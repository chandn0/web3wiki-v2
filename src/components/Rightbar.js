import "./Rightbar.css";
import { ethers } from "ethers";
import { useState, useEffect } from "react";

const Rightbar = () => {
  // const { account, } = useMoralis();
  // const provider = new ethers.providers.Web3Provider(window.ethereum);

  // const Mint = async () => {
  //   const contract = new ethers.Contract(contractlocation, contractabi, provider);
  //   let k = await contract.authorslist();
  //   console.log(k);
  //   for (let i = 0; i < k.length; i++) {

  //   }
  //   return k;

  // }
  // useEffect(() => {
  //   Mint();

  // }, [account]);



  return (
    <>
      <div className="rightbarContent">
        {/* <Input label="Search" name="Search" prefixIcon="search"></Input> */}

        <div className="trends">
          <h4 style={{ textColor: 'yellow' }}>Features coming soon..</h4>

          {/* What are we reading Today */}
          {/* {trends.map((e, i) => {
            return (
              <div key={i} className="trend">
                <div className="trendText">{e.text}</div>
              </div>
            );
          })} */}
        </div>

      </div>
    </>
  );
};

export default Rightbar;
