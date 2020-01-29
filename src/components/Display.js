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
          className="color-blue h100"
          onClick={() => {
            this.props.onSelected(this.props.display);
          }}
        >
          <div className="" style={{ height: 750 }}>
            Look up a movie
          </div>
        </div>
      );
    }

    let revenue = 'N/A';
    if ((movie.revenue != undefined) & (movie.revenue != 0)) {
      revenue = formatter.format(movie.revenue);
    }

    return (
      <div
        className="flex color-blue h100"
        onClick={() => {
          this.props.onSelected(this.props.display);
        }}
      >
        <div>
          <img className="h100" src={PIC_URL + movie.poster_path} alt=""></img>
        </div>

        <div className="px20">
          <h2 className="h2 text-color-main">{movie.original_title}</h2>
          <p>{movie.overview}</p>

          <div>
            <h3 className="h3 text-color-main">Genre: </h3>
            {movie.genres.map(obj => (
              <span key={obj.id}>{obj.name} </span>
            ))}
          </div>
          <div>
            <span>release date: </span>
            <span>{movie.release_date}</span>
          </div>
          <div>
            <span>run time: </span>
            <span>{movie.runtime} min</span>
          </div>
          <div>
            <span>score: </span>
            <span>{movie.vote_average}/10</span>
          </div>
          <div>
            <span>box office: </span>
            <span>{revenue}</span>
          </div>
        </div>
      </div>
    );
  }

  componentWillUnmount() {
    if (this.props.display.no === '2') {
      console.log('hello');
      this.props.onRemount();
    }
  }
}

export default Display;
