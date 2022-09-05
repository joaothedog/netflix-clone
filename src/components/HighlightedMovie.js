import './HighlightedMovie.css';

export default function HighlightedMovie({ item }) {
  let firstDate = new Date(item.first_air_date);
  let genres = [];
  for (let i in item.genres) {
    genres.push(item.genres[i].name);
  }

  console.log(item.overview.length)
  let overview = [];
  for (let i of item.overview) {
    overview.push(item.overview[i]);
  }


  return (
    <section className="highlighted" style={{
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`
    }}>
      <div className='highlighted-vertical-fade'>
        <div className='highlighted-horizontal-fade'>
          <div className='highlighted-name'>{item.original_name}</div>
          <div className='highlighted-info'>
            <div className='highlighted-points'>{item.vote_average.toFixed(1)} pontos</div>
            <div className='highlighted-year'>{firstDate.getFullYear()}</div>
            <div className='highlighted-seasons'>{item.number_of_seasons} temporada{item.number_of_seasons !== 1 ? 's' : ''} disponí{item.number_of_seasons !== 1 ? 'veis' : 'vel'}</div>
          </div>
          <div className='highlighted-description'>{overview.length <= 150 ? item.overview : `${item.overview.slice(0, 200)}...`}</div>
          <div className='highlighted-btns'>
            <a href={`/watch/${item.id}`} className='highlighted-watch-btn'>▶ Assistir</a>
            <a href={`/list/add/${item.id}`} className='highlighted-addmylist-btn'>+ Minha lista</a>

          </div>
          <div className='highlighted-genres'><strong>Gêneros:</strong> {genres.join(', ')}</div>
        </div>
      </div>

    </section >
  );
}
