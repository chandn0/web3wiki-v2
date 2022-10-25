import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import BlogCard from "./components/BlogCard";
import "./Home.css";

const HomeAuth = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const [obj, setobj] = useState([]);
    const navigate = useNavigate();
    const [articallist, setArticallist] = useState();


    function clickHandler() {
        navigate("/newStory");
    }
    return (
        <div >
            <div className="homeAuth_header">Recommended Blogs</div>
            <div >
                {JSON.parse(localStorage.getItem('blogs')) &&
                    JSON.parse(localStorage.getItem('blogs')).map((uri, i) => {
                        return (
                            <BlogCard uri={uri} key={i} articleId={i + 1} />
                        );
                    }
                    )}
            </div>
        </div>
    );
};

export default HomeAuth;
