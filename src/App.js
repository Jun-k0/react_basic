import React from "react";
import axios from "axios";
import Movie from "./Movie"


class App extends React.Component{
  state={
    isLoading:true,
    movies:[],
    date:''
  }
  componentDidMount(){
    this.searchMovies("");
  }
  searchMovies(date){
    if(date===""){
      console.log(date);
      this.setState({isLoading:false,movies:[]});
    }
    else{
      axios.get(`https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=7505633b57c0264a95d188319bfc3798&targetDt=${date}`)
      .then(movie=>{
        console.log(movie);
        this.setState({
          movies:movie.data.boxOfficeResult.dailyBoxOfficeList, 
          isLoading:false,
          date:date
        });
        console.log(movie.data.boxOfficeResult.dailyBoxOfficeList);
      })
      }
  }
  submit=(e)=>{
    e.preventDefault(); // 페이지 리로드 막아줌 이거때메 안됐음
    const date=e.target.date.value;
    console.log(date);
    this.searchMovies(date);
  }
  render(){
    const { isLoading,movies } = this.state;
    return(
      <section>
        {isLoading?"Loading...":(
           <form onSubmit={this.submit}>
            <input type="text" placeholder="궁금한 날 ex)20210129" name="date"/>
            <button>검색</button>
            <div>
              {
                movies.map(movie=>{
                console.log(movie.movieNm);
                return(
                  <Movie 
                    title={movie.movieNm}
                    key={movie.rank}
                    cntPeople={movie.audiCnt}
                  /> 
                );
              })
              }
            </div>
           </form>
           
        )}
      </section>
    );
  }
}
/*
class App extends React.Component{
  state={
    isLoading:true,
    movies:[]
  }
  getmovies=async()=>{
    const movie=await axios.get("https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=7505633b57c0264a95d188319bfc3798&targetDt=20120101");
    console.log(movie.data.boxOfficeResult.dailyBoxOfficeList);
    this.setState({isLoading:false,movies:movie.data.boxOfficeResult.dailyBoxOfficeList});
  }
  componentDidMount(){
    this.getmovies();
  }
  render(){
    const {isLoading,movies}=this.state;
    return(
      <div>
        {isLoading ? "Loading..": 
          movies.map(movie=>{
            console.log(movie.movieNm);
            return(
            <Movie 
              title={movie.movieNm}
              key={movie.rank}
              cntPeople={movie.audiCnt}
            /> 
            );
          })
        }
      </div>
    );
  }
}
*/
export default App;
