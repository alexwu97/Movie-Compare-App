import React from 'react';

class Display extends React.Component {
  constructor(props) {
    super(props);
    this.state = { information: null };

    if (this.props.display.no === '2') {
      console.log('hello');
      this.props.onRemount();
    }
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
          onClick={() => {
            this.props.onSelected(this.props.display);
          }}
        >
          <div style={{ height: 750 }}>Look up a movie</div>
        </div>
      );
    }

    let revenue = 'N/A';
    if (movie.revenue != undefined) {
      revenue = formatter.format(movie.revenue);
    }

    return (
      <div
        className="flex"
        onClick={() => {
          this.props.onSelected(this.props.display);
        }}
      >
        <div style={{ flex: 3, height: 750 }}>
          <img src={PIC_URL + movie.poster_path} alt=""></img>
        </div>

        <div style={{ flex: 5 }}>
          <h1>{movie.original_title}</h1>
          <p>{movie.overview}</p>

          <div>
            <p>genre:</p>
            {movie.genres.map(obj => (
              <span key={obj.id}>{obj.name} </span>
            ))}
          </div>
          <div>
            <span>release date:</span>
            <span>{movie.release_date}</span>
          </div>
          <div>
            <span>run time:</span>
            <span>{movie.runtime} min</span>
          </div>
          <div>
            <span>score:</span>
            <span>{movie.vote_average}/10</span>
          </div>
          <div>
            <span>box office:</span>
            <span>{revenue}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Display;
