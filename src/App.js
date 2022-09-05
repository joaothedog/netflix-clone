import './App.css';
import Tmdb from './Tmdb';
import { useEffect, useState } from 'react';
import MovieRow from './components/MovieRow';
import HighlightedMovie from './components/HighlightedMovie';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {

  const [movieList, setMovieList] = useState([]);
  const [highlightedData, setHighlightedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);
  const [hiddenHeader, setHiddenHeader] = useState(false);

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

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 10) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    }

    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
  }, []);

  useEffect(() => {
    const scrollListenerHidden = () => {
      if (window.scrollY > 500) {
        setHiddenHeader(true)
      } else {
        setHiddenHeader(false);
      }
    }

    window.addEventListener('scroll', scrollListenerHidden);

    return () => {
      window.removeEventListener('scroll', scrollListenerHidden);
    }
  }, []);

  return (
    <div className="page">
      <Header black={blackHeader} hiddenh={hiddenHeader} />

      {highlightedData &&
        <HighlightedMovie item={highlightedData} />
      }

      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>

      <Footer />

      {movieList.length <= 0 &&
        <div className="loading">
          <img src="https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif" alt="Carregando" />
        </div>
      }
    </div>
  );
}

export default App;
