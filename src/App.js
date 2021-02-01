import React from "react";
import axios from "axios";
import Movie from "./Movie"

class App extends React.Component{
  state={
    isLoading:true,
    movies:[],
    index:true,
    date:''
  }
  submit=(e)=>{
    const date=e.target.date.value;
    console.log(date);
    this.setState({date:date});
  }
  getmovies=()=>{ // XHR failed loading: GET ???
    axios.get("https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=7505633b57c0264a95d188319bfc3798&targetDt=20120101")
    .then(movie=>{
      console.log(movie);
      this.setState({
        index:false,
        movies:movie.data.boxOfficeResult.dailyBoxOfficeList, 
        isLoading:false
      });
      console.log(movie.data.boxOfficeResult.dailyBoxOfficeList);
    })
    .catch((error)=>{
      if (error.response) {
        // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
      else if (error.request) {
        // 요청이 이루어 졌으나 응답을 받지 못했습니다.
        // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
        // Node.js의 http.ClientRequest 인스턴스입니다.
        console.log(error.request);
      }
      else {
        // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
        console.log('Error', error.message);
      }
      console.log(error.config);
    }

    );
  }
  componentDidUpdate(){
    this.getmovies();
  }
  render(){
    const { isLoading,movies,index } = this.state;
    return(
      <div>
        <form onSubmit={this.submit}>
          <input type="text" placeholder="궁금한 날 ex)20210129" name="date"/>
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
