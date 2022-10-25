import { useEffect, useState } from "react";
import "./Blog.css";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { Url } from "../constant";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Remarkable } from "remarkable"

const md = new Remarkable()
const Blog = () => {
  const location = useLocation();
  const [title, setTitle] = useState(location.state.btitle);
  const [text, setText] = useState(location.state.btext);
  const [Id, setId] = useState(location.state.Id);

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
  }, [text, title]);

  const clickHandler = () => {
    navigate(`/editblog`, { state: { title: title, text: text, Id: Id } });
  };

  return (
    <div className="singleBlog">
      <div className="singleBlogWrapper">
        <div className="singleBlogContent">

          <h1 className="singleBlogTitle">{title}</h1>
          {/* <p className="singleBlogText">{text}</p> */}
          <div
            className="content"
            style={{ marginLeft: '10vh' }}
            dangerouslySetInnerHTML={{ __html: md.render(text) }}
          ></div>
        </div>
      </div>
      <div onClick={clickHandler} style={{ alignContent: 'center' }}>
        <button style={{ border: 'none' }}>Improve</button>
      </div>
    </div>
  );
};

export default Blog;
