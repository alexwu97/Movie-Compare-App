import React from 'react';
import Search from './Search';
import ScreenDisplay from './ScreenDisplay';
import Footer from './Footer';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayOne: { no: '1', class: '.1', selection: true }, //defaults display 1 as initial display
      displayTwo: { no: '2', class: '.2', selection: false },
      movieInfoOne: null, //stores data from fetched movie for display 1
      movieInfoTwo: null, //stores data from fetched movie for display 2
      toggle: 'off' //off: shows 1 display, on: shows 2 displays
    };
  }

  //fetches movie data based off suggestion selected
  getInfo = item => {
    fetch(`${API_URL}movie/${item.id}?api_key=${TMDB_KEY}`)
      .then(res => res.json())
      .then(data => {
        this.setState(() => {
          //decide whether to place data into display 1 or 2
          if (this.state.displayOne.selection) {
            return { movieInfoOne: data };
          } else {
            return { movieInfoTwo: data };
          }
        });
      });
  };

  //Set display 1 as main when display 2 is unmounted
  onRemount = () => {
    this.setState({
      displayOne: { no: '1', class: '.1', selection: true },
      displayTwo: { no: '2', class: '.2', selection: false }
    });
  };

  // switches the display to user selection
  onSelected = displayer => {
    if ((displayer.no === '1') & (displayer.selection === false)) {
      this.setState({
        displayOne: { no: '1', class: '.1', selection: true },
        displayTwo: { no: '2', class: '.2', selection: false }
      });
    } else if ((displayer.no === '2') & (displayer.selection === false)) {
      this.setState({
        displayOne: { no: '1', class: '.1', selection: false },
        displayTwo: { no: '2', class: '.2', selection: true }
      });
    }
  };

  tempFunc = () => {
    if ($('input[name=checkbox]').is(':checked')) {
      this.toggleChange('off');
      this.setState({ movieInfoTwo: null }); //wipe out what display 2 shows every time the toggle is off
    } else {
      this.toggleChange('on');
    }
  };

  //toggles between on and off
  toggleChange = status => {
    this.setState({ toggle: status });
  };

  componentDidMount() {
    // init Bloodhound
    var movieSuggestions = new Bloodhound({
      datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      remote: {
        url: `${API_URL}search/movie?query=%QUERY&api_key=${TMDB_KEY}`,
        wildcard: '%QUERY', //%QUERY will be replace by users input in

        transform: function(movies) {
          // Map the remote source JSON array to a JavaScript object array
          return $.map(movies.results, function(movie) {
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
        display: function(datum) {
          return datum.value;
        },
        templates: {
          notFound:
            '<div style="margin-left:15px; font-weight: bold; font-size: 16px">Not Found</div>' /* Rendered if 0 suggestions are available */,
          pending:
            '<i class="material-icons w3-spin" style="margin-left:5px; margin-top:5px;">refresh</i>',
          suggestion: function(datum) {
            var poster;
            if (datum.pic === null) {
              poster =
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSols5HZxlQWyS9JY5d3_L9imbk0LiziHiyDtMZLHt_UNzoYUXs2g';
            } else {
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
    $('#movieSearch').on('typeahead:selected', (evt, item) =>
      this.getInfo(item)
    );
  }

  render() {
    return (
      <section>
        <Search />
        <div className="margin10">
          <ScreenDisplay
            infoOne={this.state.movieInfoOne}
            infoTwo={this.state.movieInfoTwo}
            toggle={this.state.toggle}
            displayOne={this.state.displayOne}
            displayTwo={this.state.displayTwo}
            onRemount={this.onRemount}
            onSelected={this.onSelected}
          />
        </div>

        <Footer onToggled={this.tempFunc} toggle={this.state.toggle} />
      </section>
    );
  }
}

export default App;
