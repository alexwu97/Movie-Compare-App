import React from 'react';
import Search from './Search';
import DisplayContainer from './DisplayContainer';
import Footer from './Footer';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayOne: { displayID: '1', elementID: '#displayOne', selection: true }, //defaults display 1 as initial display
      displayTwo: { displayID: '2', elementID: '#displayTwo', selection: false },
      movieInfoOne: null, //stores data from fetched movie for display 1
      movieInfoTwo: null, //stores data from fetched movie for display 2
      showTwoDisplays: 'off' //off: shows 1 display, on: shows 2 displays
    };
  }

  componentDidMount() {
    // init Bloodhound
    var movieSuggestions = new Bloodhound({
      datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      remote: {
        url: `${API_URL}search/movie?query=%QUERY&api_key=${TMDB_KEY}`,
        wildcard: '%QUERY', //%QUERY will be replace by users input in

        transform: movies => {
          // Map the remote source JSON array to a JavaScript object array
          return $.map(movies.results, movie => {
            return {
              value: movie.title, //search english title of movie
              id: movie.id, //search movie id
              pic: movie.poster_path, //search path for movie poster
              score: movie.vote_average //search movie score
            };
          });
        }
      }
    });

    // init Typeahead
    $('#movieSearch').typeahead(
      {
        hint: true,
        highlight: true,
        minLength: 1
      },
      {
        name: 'movie',
        source: movieSuggestions, // suggestion engine is passed as the source
        display: datum => {
          return datum.value;
        },
        templates: {
          notFound:
            '<div style="margin-left:15px; font-weight: bold; font-size: 16px">Not Found</div>', // Rendered if 0 suggestions are available
          pending:
            '<i class="material-icons w3-spin" style="margin-left:5px; margin-top:5px;">refresh</i>',
          suggestion: datum => {
            var poster = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSols5HZxlQWyS9JY5d3_L9imbk0LiziHiyDtMZLHt_UNzoYUXs2g';
            if (datum.pic !== null) {
              poster = PIC_URL + datum.pic;
            }

            /* Render each suggestion to have their poster, name, and rating score */
            return (
              '<div class="flex">' +
              '<img class="my-auto" style="width: 40px;" src="' +
              poster +
              '"></img>' +
              '<div class="mb0" style="margin-left: 15px;">' +
              '<div style="width:340px;">' +
              datum.value +
              '</div>' +
              '<h5 class="h5 red">' +
              'rating: ' +
              datum.score +
              '</h5>' +
              '</div>' +
              '</div>'
            );
          }
        }
      }
    );

    // Fetch movie data when select a suggestion
    $('#movieSearch').on('typeahead:selected', (event, item) =>
      this.getSelectedMovieInfo(item)
    );
  }

  //fetches movie data based off suggestion selected
  getSelectedMovieInfo = item => {
    fetch(`${API_URL}movie/${item.id}?api_key=${TMDB_KEY}`)
      .then(res => res.json())
      .then(movieInfo => {
        this.setState(() => {
          //decide whether to place data into display 1 or 2
          if (this.state.displayOne.selection) {
            return { movieInfoOne: movieInfo };
          } else {
            return { movieInfoTwo: movieInfo };
          }
        });
      });
  };

  //Set display 1 as main when display 2 is unmounted
  onRemount = () => {
    this.setState({
      displayOne: { displayID: '1', elementID: '#displayOne', selection: true },
      displayTwo: { displayID: '2', elementID: '#displayTwo', selection: false }
    });
  };

  // switches the display to user selection
  activateDisplay = displayer => {
    if(displayer.selection === false){
      if (displayer.displayID === '1') {
        this.setState(prevState => ({
          displayOne: {
            ...prevState.displayOne,
            selection: true
          },
          displayTwo: {
            ...prevState.displayTwo,
            selection: false
          }
        }));
      } else if (displayer.displayID === '2') {
        this.setState(prevState => ({
          displayOne: {
            ...prevState.displayOne,
            selection: false
          },
          displayTwo: {
            ...prevState.displayTwo,
            selection: true
          }
        }));
      }
    }
  };

  switchDisplayModes = () => {
    if ($('input[name=checkbox]').is(':checked')) {
      this.setDisplayMode('off');
      this.setState({ movieInfoTwo: null }); //wipe out what display 2 shows every time the showTwoDisplays is off
    } else {
      this.setDisplayMode('on');
    }
  };

  //toggles between on and off
  setDisplayMode = status => {
    this.setState({ showTwoDisplays: status });
  };

  render() {
    return (
      <section>
        <Search />
        <div className="margin10">
          <DisplayContainer
            infoOne={this.state.movieInfoOne}
            infoTwo={this.state.movieInfoTwo}
            showTwoDisplays={this.state.showTwoDisplays}
            displayOne={this.state.displayOne}
            displayTwo={this.state.displayTwo}
            onRemount={this.onRemount}
            activateDisplay={this.activateDisplay}
          />
        </div>

        <Footer switchDisplayModes={this.switchDisplayModes} showTwoDisplays={this.state.showTwoDisplays} />
      </section>
    );
  }
}

export default App;
