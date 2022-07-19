import {useEffect} from 'react'
import {NavbarContainer} from './Navbar.style'
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  apiGetDiets,
  apiGetRecipesAsc,
  apiGetRecipesDesc,
  apiGetRecipeScore,
  apiGetRecipesByDiet,
  apiGetRecipes,
  apiSearchRecipes,
} from '../../Redux/spoonacular/apiCalls';

const Nav = () => {
  const dispatch = useDispatch();
  const diets = useSelector((state) => state.spoon.data.diets);

  useEffect(() => {
    apiGetDiets(dispatch);
  }, []);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      apiSearchRecipes(dispatch, event.target.value);
    }
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.navContainerLogo}>
        <img
          onClick={() => apiGetRecipes(dispatch)}
          className={styles.navLogo}
          src={imgs.chefLogo}
          alt='nav-logo'
        />
      </div>
      <div className={styles.navContainerSearchBar}>
        <input
          type='text'
          className={styles.navSearchInput}
          placeholder='Search...'
          onKeyDown={(event) => handleKeyDown(event)}
        />
      </div>
      <div>
        <button
          className={styles.navButton}
          onClick={() => apiGetRecipesAsc(dispatch)}
        >
          A - Z
        </button>
      </div>
      <div>
        <button
          className={styles.navButton}
          onClick={() => apiGetRecipesDesc(dispatch)}
        >
          Z - A
        </button>
      </div>
      <div className={styles.navContainerDiets}>
        <select
          onChange={(e) => {
            apiGetRecipesByDiet(dispatch, e.target.value);
          }}
          className={styles.navButton}
        >
          <option defaultValue={''} value=''>
            Diet:
          </option>
          {diets?.map((d, index) => (
            <option key={index} value={d.name}>
              {d.name[0].toUpperCase() + d.name.slice(1)}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.navContainerScore}>
        <select
          className={styles.navButton}
          onChange={(e) => {
            apiGetRecipeScore(dispatch, e.target.value);
          }}
        >
          <option value='null'>HighScore:</option>
          <option value='highScoreASC'>HighScore &#8593;</option>
          <option value='highScoreDESC'>HighScore &#8595;</option>
        </select>
      </div>
      <div>
        <NavLink to={'/home/createRecipe'}>
          <button className={`${styles.navButton} ${styles.navButtonCreate}`}>
            Create Recipe
          </button>
        </NavLink>
      </div>
    </nav>
  );
};

export default Nav;