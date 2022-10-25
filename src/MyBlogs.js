import "./MyBlogs.css";
import { useNavigate } from "react-router-dom";
import FetchblogCard from "./components/fetchblog";

const MyBlogs = () => {

  const navigate = useNavigate();


  function clickHandler() {
    navigate("/newStory");
  }

  return (
    <>
      <div>
        <div className="myBlogsHeader">My Blogs</div>
        {JSON.parse(localStorage.getItem('myblogs_Id')) ? (
          <div>
            {JSON.parse(localStorage.getItem('myblogs_Id')).map((number, i) =>
              <FetchblogCard key={i}
                articleId={number} />
            )}
          </div>) : (
          <div>
            <h3 >No Blogs</h3>
            <button onClick={clickHandler} className='createbutton'> Create First Blog</button>
          </div>
        )}
      </div>
    </>
  );
};

export default MyBlogs;
