import { func } from "prop-types";
import React from "react";
import propTypes from "prop-types";

function Movie({title,cntPeople}){
    return (
        <div>
            <h1>{title}</h1>
            <h3>{cntPeople}</h3>
        </div>
    );
}

Movie.propTypes={
    title: propTypes.string.isRequired,
    cntPeople:propTypes.string.isRequired //json
}
export default Movie;