const API_KEY = '57b782ed1e57b332740e30da5d75e862'

const requests={
    movie:{
        TopRated:`/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`,
        Popular:`/movie/popular?api_key=${API_KEY}&language=en-US&page=1`,
        Latest:`/movie/latest?api_key=${API_KEY}&language=en-US`,
        Action:`/discover/movie?api_key=${API_KEY}&with_genres=28`,
        Comedy:`/discover/movie?api_key=${API_KEY}&with_genres=35`,
        Horror:`/discover/movie?api_key=${API_KEY}&with_genres=27`,
        Romance:`/discover/movie?api_key=${API_KEY}&with_genres=99`,
        Drama:`/discover/movie?api_key=${API_KEY}&with_genres=18`,
        Scifi:`/discover/movie?api_key=${API_KEY}&with_genres=878`,
        TvMovie:`/discover/movie?api_key=${API_KEY}&with_genres=10770`,
    },
    tv:{
        TopRated:`/tv/top_rated?api_key=${API_KEY}&language=en-US&page=1`,
        Popular:`/tv/popular?api_key=${API_KEY}&language=en-US&page=1`,
        Latest:`/tv/latest?api_key=${API_KEY}&language=en-US`,
        Action:`/discover/tv?api_key=${API_KEY}&with_genres=28`,
        Comedy:`/discover/tv?api_key=${API_KEY}&with_genres=35`,
        Horror:`/discover/tv?api_key=${API_KEY}&with_genres=27`,
        Romance:`/discover/tv?api_key=${API_KEY}&with_genres=99`,
        Drama:`/discover/tv?api_key=${API_KEY}&with_genres=18`,
        Scifi:`/discover/tv?api_key=${API_KEY}&with_genres=878`,
    },
    // TrendingT:`/trending/tv/week?api_key=${API_KEY}&language=en-US`,
    // TrendingM:`/trending/movie/week?api_key=${API_KEY}&language=en-US`,
    Trending:`/trending/all/week?api_key=${API_KEY}&language=en-US`,
    NetflixOriginals:`/discover/tv?api_key=${API_KEY}&with_networks=213`,
    
    
    //
};

export default requests