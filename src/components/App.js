import React from 'react';
import Search from './Search';
import ScreenDisplay from './ScreenDisplay';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movieInfo: null,
      toggle: 'off'
    };
  }

  getInfo = item => {
    fetch(
      `https://api.themoviedb.org/3/movie/${item.id}?api_key=97c6d094b395cb9fa70c2328184d5e4f`
    )
      .then(res => res.json())
      .then(data => {
        this.setState({ movieInfo: data });
      });
  };

  tempFunc = () => {
    if ($('input[name=checkbox]').is(':checked')) {
      this.toggleChange('off');
    } else {
      this.toggleChange('on');
      console.log(this.state.toggle);
    }
  };

  toggleChange = status => {
    this.setState({ toggle: status });
    console.log(this.state.toggle);
  };



  componentDidMount() {
    // init Bloodhound
    var movieSuggestions = new Bloodhound({
      datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      remote: {
        url:
          'https://api.themoviedb.org/3/search/movie?query=%QUERY&api_key=97c6d094b395cb9fa70c2328184d5e4f',
        wildcard: '%QUERY', // %QUERY will be replace by users input in
        transform: function(movies) {
          // Map the remote source JSON array to a JavaScript object array
          return $.map(movies.results, function(movie) {
            return {
              value: movie.original_title, // search original title
              id: movie.id, // get ID of movie simultaniously
              pic: movie.poster_path,
              score: movie.vote_average
            };
          });
        }
      }
    });

    $('#movieSearch').on('typeahead:selected', (evt, item) =>
      this.getInfo(item)
    );

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
            '<div>Not Found</div>' /* Rendered if 0 suggestions are available */,
          suggestion: function(datum) {
            var poster;
            if (datum.pic === null) {
              poster =
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSols5HZxlQWyS9JY5d3_L9imbk0LiziHiyDtMZLHt_UNzoYUXs2g';
            } else {
              poster = PIC_URL + datum.pic;
            }

            /* Used to render a single suggestion */
            return (
              '<div class="flex">' +
              '<img class="my-auto" style="width: 40px;" src="' +
              poster +
              '"></img>' +
              '<div style="margin-left: 15px;">' +
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
  }

  render() {
    return (
      <section>
        <Search onToggled={this.tempFunc} />
        <ScreenDisplay
          info={this.state.movieInfo}
          toggle={this.state.toggle}
        />
      </section>
    );
  }
}

export default App;
