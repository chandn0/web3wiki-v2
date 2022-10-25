import { useState } from "react";
import "./NewStory.css"
import Input from "./Input";
import { Remarkable } from "remarkable"
import { Link } from "react-router-dom";
import { uploadFileToIPFS, uploadJSONToIPFS } from "./pinata";
import { ethers } from "ethers";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "./constant";


const md = new Remarkable()

const NewStory = () => {


  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  async function mint(uri) {

    //Upload data to IPFS
    try {
      //After adding your Hardhat network to your metamask, this code will get providers and signers
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      // updateMessage("Please wait.. uploading (upto 5 mins)")

      //Pull the deployed contract instance
      let contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer)

      //massage the params to be sent to the create NFT request

      //actually create the NFT
      let transaction = await contract.createarticle(uri)
      await transaction.wait()

      alert("Successfully listed your NFT!");
      // updateMessage("");
      // updateFormParams({ name: '', description: '', price: '' });
      // window.location.replace("/")
    }
    catch (error) {
      alert("Upload error" + error)
    }
  }


  const uploadFile = async (event) => {
    event.preventDefault();
    const textArray = text.split();
    const metadata = {
      ti: title,
      text: textArray,
    };

    try {
      const response = await uploadJSONToIPFS(metadata);
      if (response.success === true) {
        console.log("Uploaded JSON to Pinata: ", response)
        await mint(response.pinataURL);
      }
    } catch (error) {
      alert(error.message);
    }

  }


  return (
    <>
      <div>
        <form onSubmit={uploadFile} className="writeForm">
          <div className="writeFormGroup">
            <input
              className="writeInput"
              placeholder="Title"
              type="text"
              autoFocus={true}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="writeFormGroup">
            <textarea
              className="writeInput writeText"
              placeholder="Tell your story..."
              autoFocus={true}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <button className="writeSubmit" type="submit">
            Publish
          </button>
        </form>

        {/* <h2 style={{ textAlign: 'center' }}>Preview</h2>
        <a style={{ textAlign: 'center' }} href="https://www.markdownguide.org/cheat-sheet/" target="_blank" rel="noopener noreferrer"><h6>Markdown  cheat sheet</h6></a>
        <div className="content">
          <div
            dangerouslySetInnerHTML={{ __html: md.render(text) }}
          ></div>
        </div> */}
      </div>
    </>
  );
};

export default NewStory;
