import React from "react";
import axios from "axios";
import Movie from "./Movie"

class App extends React.Component{
  state={
    isLoading:true,
    movies:[],
    index:true
  }
  submit=(e)=>{
    const date=e.target.value; // form 오류
    console.log(date);
    console.log(e.target);
    const movie=axios.get(`http://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=f5eef3421c602c6cb7ea224104795888&targetDt=${date}`);
    this.setState({
      index:false,
      movies:movie.data.boxOfficeResult.dailyBoxOfficeList, 
      isLoading:false
    });
    console.log(movie.data.boxOfficeResult.dailyBoxOfficeList);
  }
  render(){
    const { isLoading,movies,index } = this.state;
    return(
      <div>
        <form onSubmit={this.submit}>
          <input type="text" placeholder="궁금한 날 ex)20210129"/>
          <input type="submit"/>
        </form>
        {index?"Main Page":
          movies.map(movie=>
            <Movie
              title={movie.movieNm}
              key={movie.rank}
              cntPeople={movie.audiCnt}
            />
          )
        }
      </div>
    );
  }
}

export default App;
