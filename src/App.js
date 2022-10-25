import './App.css';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Routes, Route } from "react-router-dom";
import Home from './Home';
import Sidebar from "./components/Sidebar";
import { ethers } from "ethers";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "./constant";
import { useState, useEffect } from "react";
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import Rightbar from './components/Rightbar';
import About from './About';
import Blog from './components/Blog';
import NewStory from './NewStory';
import EditBlog from './components/EditBlog';

function App() {
  const { address, isConnected } = useAccount()
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const [articles, setarticles] = useState([]);

  async function fetcharticles() {
    try {
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
      let ledger = await contract.getarticles();
      setarticles(ledger);
    } catch (err) {
      console.error(err);

    }
  }

  useEffect(() => {
    console.log('empty');
    fetcharticles();
  }, [address]);

  useEffect(() => {
    let k;
    if (articles) {
      let co = [];
      for (let i = 0; i < articles.length; i++) {
        if (i !== 0) {
          k = articles[i];
          co.push(k);
        }
      }
      console.log(co);
      localStorage.setItem('blogs', JSON.stringify(co));
    }
  }, [articles]);

  return (
    <>

      {isConnected ? (
        <div className="App">
          <div className="connectwallet">  < ConnectButton /></div>
          <div className="sideBar">
            <Sidebar />
          </div>
          <div className="mainWindow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="*" element={<Home />} />
              <Route path="/editblog" element={<EditBlog />} />

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
