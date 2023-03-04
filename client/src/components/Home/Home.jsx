import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllGames } from '../../redux/actions';
import style from './Home.module.css';
import Filters from '../Filters/Filters';
import Card from '../Card/Card';
import NavBar from '../NavBar/NavBar';
import Paginate from '../Paginate/Paginate';
import Loader from '../Loader/Loader';
import Title from '../Title/Tittle';
import Footer from '../Footer/Footer';

export default function Home() {
  const dispatch = useDispatch();
  const allGames = useSelector((state) => state.games);

  const [order, setOrder] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage, setGamesPerPage] = useState(15);
  const [showFilters, setShowFilters] = useState(true);

  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = allGames.slice(indexOfFirstGame, indexOfLastGame);

  const pages = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getAllGames());
  }, [dispatch]);

  return (
    <div className={style.homeContainer}>
      <div className={style.titleCont}>
        <Title />
      </div>
      <div className={style.navBarContainer}>
        <NavBar />
      </div>
      <div className={style.filtersContainer}>
        <button
          className={style.showFiltersBtn}
          onClick={() => setShowFilters(!showFilters)}
        >
          Filters
        </button>
        {showFilters && (
          <Filters setCurrentPage={setCurrentPage} setOrder={setOrder} />
        )}
      </div>
      <Paginate
        gamesPerPage={gamesPerPage}
        allGames={allGames.length}
        pages={pages}
      />
      <div className={style.cardsContainer}>
        {Array.isArray(currentGames) && currentGames.length > 0 ? (
          currentGames.map((e) => (
            <Link key={e.id} style={{ textDecoration: 'none' }} to={`/detail/${e.id}`}>
              <Card
                name={e.name}
                image={e.image}
                rating={e.rating}
                genres={e.genres}
              />
            </Link>
          ))
        ) : (
          <Loader />
        )}
      </div>
      <div>
        <hr className={style.barras} />
        <div className={style.createGameCont}>
          <h3 className={style.gamecreatorText}>Want to create your own game?</h3>
          <Link to="/create">
            <button className={style.buttonCreateGame}>CREATE A GAME</button>
          </Link>
        </div>
        <hr />
      </div>
      <Footer />
    </div>
  );
}
