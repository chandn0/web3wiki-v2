import BlogCard from "./components/BlogCard";
import "./Home.css";


const HomeAuth = () => {
    return (
        <div >
            <div className="homeAuth_header"><h4>Recommended Articles </h4></div>
            <div >
                {JSON.parse(localStorage.getItem("blogs")) && JSON.parse(localStorage.getItem("blogs")).map((uri, i) => {
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
