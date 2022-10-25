import { useEffect, useState } from "react";
import "../NewStory.css";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../constant";
import { uploadFileToIPFS, uploadJSONToIPFS } from "../pinata";
import { ethers } from "ethers";
import { useLocation } from "react-router-dom";

const EditBlog = () => {

    const location = useLocation();
    const [title, setTitle] = useState(location.state.title);
    const [text, setText] = useState(location.state.text);
    const [Ids, setIds] = useState(location.state.Id);

    // const mint = async (uri) => {
    //     let options = {
    //         functionName: "requestchange",
    //         abi: CONTRACT_ABI,
    //         contractAddress: CONTRACT_ADDRESS,
    //         params: {
    //             uri: uri,
    //             articleId: Ids,
    //         },
    //     }

    //     await contractProcessor.fetch({
    //         params: options,
    //         onSuccess: () => {
    //             alert("Succesful Mint");
    //             setText("");
    //             setTitle("");
    //         },
    //         onError: (error) => {
    //             alert(error.message);
    //         },
    //     });

    // }
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
            let transaction = await contract.requestchange(Ids, uri)
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
            </div>
        </>
    );


};
export default EditBlog;