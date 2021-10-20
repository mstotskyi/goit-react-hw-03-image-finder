import './App.css';
import { Component } from 'react';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';

class App extends Component {
  state = {
    searchQuery: '',
  };

  getSearchQuery = searchQuery => this.setState({ searchQuery });

  render() {
    return (
      <div className="App">
        <Searchbar getSearchQuery={this.getSearchQuery} />
        <ImageGallery searchQuery={this.state.searchQuery} />
      </div>
    );
  }
}

export default App;
