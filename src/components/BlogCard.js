import "./BlogCard.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const BlogCard = ({ uri, articleId }) => {
  const [check, setcheck] = useState(false);
  const [blogsContent, setBlogsContent] = useState();

  useEffect(() => {
    getAllNFTs();
  }, []);

  async function getAllNFTs() {
    let meta = await axios.get(uri);
    meta = meta.data;
    const title = meta.ti;
    const text = meta.text.toString();
    setBlogsContent({ title, text, articleId, uri });
    setcheck(true);
  }

  const navigate = useNavigate();
  const clickHandler = () => {
    navigate(`/blog`, { state: { Id: blogsContent.articleId, btext: blogsContent.text, btitle: blogsContent.title } });
  };

  return (
    <div className="blog" onClick={clickHandler}>
      <div className="blog_leftSide">
        <div className="blogger">

        </div>
        {check ? (<div> <div className="blog_title">
          <h3>{blogsContent.title}</h3>
        </div>
          <div className="blog_content">
            <p>{blogsContent.text}...</p>
          </div>
        </div>) : (
          <div></div>
        )}

      </div>

    </div>
  );
};

export default BlogCard;
