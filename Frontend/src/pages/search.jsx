import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";

function Search() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [results, setResults] = useState([]);

    const search = async (e) => {
        e.preventDefault();

        // try to fetch the search results from the api and store the results
        try {
            const response = await fetch(`https://cinemavault-b2jo.onrender.com/api/search?query=${encodeURIComponent(searchQuery)}`);
            const data = await response.json();
            setResults(data);
        } catch (err){
            console.log("Error searching for movie: " + err);
        }
    }

    // when the page is loaded check if the user is logged in
    useEffect(() => {
        const user = localStorage.getItem('username');
        if (!user) { // if not logged in redirect
            navigate('/login');
        }
    }, [navigate]);

    return (
        <div className="searchDiv">
            <form className="searchForm" onSubmit={search}>
                <h1 className="searchTitle">Search:</h1>
                <input className="query"
                       placeholder="Enter a movie title"
                       value={searchQuery}
                       onChange={(e) => setSearchQuery(e.target.value)}
                ></input>
                <br/>
                <button type="submit">Search</button>
            </form>

            <div>
                {results.map(movie => (
                    <div key={movie.id} className="movieDisplay">
                        <h1>{movie.title}</h1>
                        {movie.poster_path && (
                            <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
                        )}
                        <p>Release Date: {movie.release_date}</p>
                        <p>{movie.overview}</p>
                    </div>

                ))}
            </div>
        </div>
    );
}

export default Search;