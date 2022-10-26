import './App.css';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Routes, Route } from "react-router-dom";
import Home from './Home';
import Sidebar from "./components/Sidebar";
import { ethers } from "ethers";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "./constant";
import { useState, useEffect } from "react";
import { useAccount } from 'wagmi';
// import { InjectedConnector } from 'wagmi/connectors/injected';
import Rightbar from './components/Rightbar';
import About from './About';
import Blog from './components/Blog';
import NewStory from './NewStory';
import EditBlog from './components/EditBlog';
import MyBlogs from './MyBlogs';
import Edited from './Edited';
import Requests from './Requests';
function App() {
  const { address, isConnected } = useAccount()
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const [articles, setarticles] = useState([]);
  const [myarticles, setmyarticles] = useState();
  const [editedarticlesrequestid, seteditedarticlesrequestid] = useState();

  async function fetcharticles() {
    try {
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
      let ledger = await contract.getarticles();
      setarticles(ledger);

    } catch (err) {
      console.error(err);

    }
  }

  async function fetchmyarticles() {
    try {
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
      let ledger = await contract.articleswriten(address);
      setmyarticles(ledger);
    } catch (err) {
      console.error(err);
    }
  }

  async function fetchmyedits() {
    try {
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
      let ledger = await contract.getrequestsofaddress(address);
      seteditedarticlesrequestid(ledger);
    } catch (err) {
      console.error(err);

    }
  }

  useEffect(() => {
    let k;
    if (myarticles) {
      let co = [];
      for (let i = 0; i < myarticles.length; i++) {
        k = myarticles[i].toNumber();
        co.push(k);
      }
      localStorage.setItem('myblogs_Id', JSON.stringify(co));
    }
  }, [myarticles]);


  useEffect(() => {
    fetchmyarticles();
  }, []);

  useEffect(() => {
    fetcharticles();

  }, [address]);

  useEffect(() => {
    let k;
    if (articles) {
      let co = [];
      for (let i = 0; i < articles.length; i++) {
        k = articles[i];
        if (i !== 0) {
          co.push(k);
        }
      }
      localStorage.setItem('blogs', JSON.stringify(co));
    }
  }, [articles]);

  useEffect(() => {
    fetchmyedits();
  }, [address]);


  useEffect(() => {
    let k;
    if (editedarticlesrequestid) {
      let co = [];
      for (let i = 0; i < editedarticlesrequestid.length; i++) {
        k = editedarticlesrequestid[i].toNumber();
        co.push(k);
      }
      localStorage.setItem('editedrequestid', JSON.stringify(co));
      localStorage.setItem("Inrequestedblogs", true);

    }
  }, [editedarticlesrequestid]);




  return (
    <>

      {isConnected ? (
        <div className="App">
          {/* <div className="connectwallet">  < ConnectButton /></div> */}
          <div className="sideBar">
            <Sidebar />
          </div>
          <div className="mainWindow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="*" element={<Home />} />
              <Route path="/editblog" element={<EditBlog />} />
              <Route path="/myBlogs" element={<MyBlogs />} />
              <Route path="/edited" element={<Edited />} />
              <Route path="/requests" element={<Requests />} />

              <Route path="/about" element={<About />} />
              <Route path="/blog/" element={<Blog />} />
              <Route path="/newstory" element={<NewStory />} />
            </Routes>
          </div>
          <div className="rightBar">
            <Rightbar />
          </div>

        </div>) : (<div className="unAuth">
          <ConnectButton />
        </div>)}


    </>
  );
}

export default App;
