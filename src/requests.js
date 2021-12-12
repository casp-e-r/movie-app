const API_KEY = '57b782ed1e57b332740e30da5d75e862'

const requests={
    // TrendingT:`/trending/tv/week?api_key=${API_KEY}&language=en-US`,
    // TrendingM:`/trending/movie/week?api_key=${API_KEY}&language=en-US`,
    Trending:`/trending/all/week?api_key=${API_KEY}&language=en-US`,
    NetflixOriginals:`/discover/tv?api_key=${API_KEY}&with_networks=213`,
    TopRated:`/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    Action:`/discover/movie?api_key=${API_KEY}&with_genres=28`,
    Comedy:`/discover/movie?api_key=${API_KEY}&with_genres=35`,
    Horror:`/discover/movie?api_key=${API_KEY}&with_genres=27`,
    Romance:`/discover/movie?api_key=${API_KEY}&with_genres=99`,
    Drama:`/discover/movie?api_key=${API_KEY}&with_genres=18`,
    Scifi:`/discover/movie?api_key=${API_KEY}&with_genres=878`,
    TvMovie:`/discover/movie?api_key=${API_KEY}&with_genres=10770`,
    
    //
};

export default requests