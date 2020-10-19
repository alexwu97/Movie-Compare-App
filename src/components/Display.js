import React from 'react';
import PropTypes from 'prop-types';

class Display extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formatter: new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
      })
    };
  }

  render() {
    const movie = this.props.information;
    //displaying variables used by renderer
    var releaseDate = 'N/A';
    var score = 'N/A';
    var revenue = 'N/A';
    var budget = 'N/A';
    var runtime = 'N/A';
    var posterURL = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSols5HZxlQWyS9JY5d3_L9imbk0LiziHiyDtMZLHt_UNzoYUXs2g';

    //zero condition
    if (!movie) {
      return (
        <div className="color-blue mx-auto no-movie-display">
          <div className="aligner py4 text-color-blue">Search a Movie!</div>
        </div>
      );
    }

    {
      //if props are available, update displaying values to the props' values
      if ((movie.runtime != undefined) & (movie.runtime != 0)) {
        runtime = movie.runtime + ' min';
      }
      if (movie.release_date != undefined) {
        releaseDate = movie.release_date;
      }
      if ((movie.vote_average != undefined) & (movie.vote_average != 0)) {
        score = movie.vote_average + '/10';
      }
      if ((movie.revenue != undefined) & (movie.revenue != 0)) {
        revenue = this.state.formatter.format(movie.revenue);
      }

      if ((movie.budget != undefined) & (movie.budget != 0)) {
        budget = this.state.formatter.format(movie.budget);
      }
      
      if(movie.poster_path !== null){
        posterURL = PIC_URL + movie.poster_path;
      }
    }

    return (
      <div className="display">
        <img className="image-display" src={posterURL} alt=""></img>

        <div className="px20 color-blue relative info-displayer">
          <h2 className="h2 text-color-main mb0">{movie.title}</h2>
          <p className="mb2 scroller">{movie.overview}</p>

          <div>
            <h3 className="h3 text-color-main inline">Genre: </h3>
            {movie.genres.map(obj => (
              <span className="text-color-blue pl1" key={obj.id}>
                {obj.name}
              </span>
            ))}
          </div>
          <div className="category-container">
            <div className="category">
              <h3 className="h3 text-color-main mb0">Release Date: </h3>
              <span>{releaseDate}</span>
            </div>
            <div className="category">
              <h3 className="h3 text-color-main mb0">Score: </h3>
              <span>{score}</span>
            </div>
          </div>
          <div className="category-container">
            <div className="category">
              <h3 className="h3 text-color-main mb0">Box Office: </h3>
              <span>{revenue}</span>
            </div>
            <div className="category">
              <h3 className="h3 text-color-main mb0">Movie Budget: </h3>
              <span>{budget}</span>
            </div>
          </div>

          <div className="mb4">
            <h3 className="h3 text-color-main mb0">Run Time: </h3>
            <span>{runtime}</span>
          </div>
          <div className="link-container">
            <a className="text-color-white website-link" href={movie.homepage}>
              {movie.homepage}
            </a>
          </div>
        </div>
      </div>
    );
  }

  componentWillUnmount() {
    if (this.props.display.displayID === '2') {
      this.props.onRemount();
    }
  }
}

Display.propTypes = {
  information: PropTypes.object,
  display: PropTypes.object,
  onRemount: PropTypes.func,
};

export default Display;
