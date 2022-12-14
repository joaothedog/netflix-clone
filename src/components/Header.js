import './Header.css';

export default function Header({ black, hiddenh }) {
  return (
    <header className={hiddenh ? 'hiddenheader' : '' + black ? 'black' : ''}>
      <div className='header-logo'>
        <a href='/'>
          <img src='https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg' alt='Netflix' />
        </a>
      </div>

      <div className='header-user'>
        <a href='/'>
          <img src='https://ih0.redbubble.net/image.618427277.3222/flat,1000x1000,075,f.u2.jpg' alt='Usuário' />
        </a>
      </div>
    </header>
  );
}
