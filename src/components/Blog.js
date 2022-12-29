import { useEffect, useState } from "react";
import "./Blog.css";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { Url } from "../constant";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Remarkable } from "remarkable"
import { ethers } from "ethers";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../constant";

const md = new Remarkable()
const Blog = () => {
  const location = useLocation();
  const [title, setTitle] = useState(location.state.btitle);
  const [text, setText] = useState(location.state.btext);
  const [Id, setId] = useState(location.state.Id);
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  let contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
  const [owner, setOwner] = useState([]);
  const navigate = useNavigate();

  const { url } = useParams();

  const fetchBlogContent = async () => {
    const res = await axios.get(`${Url}/${url}`);
    setTitle(res.data.title);
    const text = res.data.text.toString();
    setText(text);
  };

  useEffect(() => {
    if (!title || !text) {
      fetchBlogContent();
    }
    fetchowner();
  }, [text, title]);

  function fetchowner() {
    contract.ownerofarticle(Id).then((res) => {
      console.log(res);
      setOwner(res);
      return res;
    })
  }
  function Tip() {

  }

  const clickHandler = () => {
    navigate(`/editblog`, { state: { title: title, text: text, Id: Id } });
  };

  return (
    <div className="singleBlog">
      <div className="singleBlogWrapper">
        <div className="singleBlogContent">

          <h1 className="singleBlogTitle">{title} </h1>
          <p className="singleBlogText">{text}</p>
          {/* <div
            className="content"
            style={{ marginLeft: '10vh' }}
            dangerouslySetInnerHTML={{ __html: md.render(text) }}
          ></div> */}
        </div>

      </div>
      <div className="singleBlogAuthor">
        <div className="singleBlogAuthorWrapper">
          <p>Author: {owner}</p>
        </div>
      </div>
      <button onClick={clickHandler} style={{ border: 'none', height: "30px", content: "center" }} className="improve" >Improve</button>
      <button onClick={Tip} style={{ border: 'none', height: "30px", content: "center", marginLeft: "60px" }} className="improve" >Tip the Author</button>


    </div>

  );
};

export default Blog;
