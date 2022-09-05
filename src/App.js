import './App.css';
import Tmdb from './Tmdb';
import { useEffect, useState } from 'react';
import MovieRow from './components/MovieRow';
import HighlightedMovie from './components/HighlightedMovie';

function App() {

  const [movieList, setMovieList] = useState([]);
  const [highlightedData, setHighlightedData] = useState(null);

  useEffect(() => {
    const loadAll = async () => {
      //pegando a lista toda
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      //Filme em destaque
      let originals = list.filter(item => item.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
      setHighlightedData(chosenInfo);
    }

    loadAll();
  }, []);

  return (
    <div className="page">

      {highlightedData &&
        <HighlightedMovie item={highlightedData} />
      }

      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>
    </div>
  );
}

export default App;
