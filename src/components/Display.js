import React from 'react';

class Display extends React.Component {
  constructor(props) {
    super(props);
    this.state = { information: null };
  }

  static getDerivedStateFromProps(props, state) {
    return {
      information: props.information
    };
  }

  componentDidMount() {
    this.setState = { information: null };
  }

  render() {
    let movie = this.state.information;

    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    });

    if (!movie) {
      return (
        <div
          className="color-blue h100 mx-auto"
          onClick={() => {
            this.props.onSelected(this.props.display);
          }}
        >
          <div className="aligner" style={{ height: 750 }}>
            Look up a movie
          </div>
        </div>
      );
    }

    let revenue = 'N/A';
    let budget = 'N/A';
    if ((movie.revenue != undefined) & (movie.revenue != 0)) {
      revenue = formatter.format(movie.revenue);
    }

    if ((movie.budget != undefined) & (movie.budget != 0)) {
      budget = formatter.format(movie.budget);
    }

    return (
      <div
        className="flex color-blue h100"
        onClick={() => {
          this.props.onSelected(this.props.display);
        }}
      >
        <div>
          <img
            className="h100 width500"
            src={PIC_URL + movie.poster_path}
            alt=""
          ></img>
        </div>

        <div className="px20 width100">
          <h2 className="h2 text-color-main">{movie.original_title}</h2>
          <p>{movie.overview}</p>

          <div>
            <h3 className="h3 text-color-main inline">Genre: </h3>
            {movie.genres.map(obj => (
              <span key={obj.id}>{obj.name} </span>
            ))}
          </div>
          <div>
            <h3 className="h3 text-color-main">Release Date: </h3>
            <span>{movie.release_date}</span>
          </div>
          <div>
            <h3 className="h3 text-color-main">Run Time: </h3>
            <span>{movie.runtime} min</span>
          </div>
          <div>
            <h3 className="h3 text-color-main">Score: </h3>
            <span>{movie.vote_average}/10</span>
          </div>
          <div>
            <h3 className="h3 text-color-main">Box Office: </h3>
            <span>{revenue}</span>
          </div>
          <div>
            <h3 className="h3 text-color-main">Movie Budget: </h3>
            <span>{budget}</span>
          </div>
          <div className="py-auto"></div>
          <div className="bottom">
            <a className="text-color-white" href={movie.homepage}>
              {movie.homepage}
            </a>
          </div>
        </div>
      </div>
    );
  }

  componentWillUnmount() {
    if (this.props.display.no === '2') {
      this.props.onRemount();
    }
  }
}

export default Display;
