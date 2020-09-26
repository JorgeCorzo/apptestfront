import React, { useEffect, useState } from 'react';
import { Link, Route, HashRouter } from 'react-router-dom';
import './App.css';
import Item1 from './views/item1/Item1';
import Item2 from './views/item2/Item2';
import Item3 from './views/item3/Item3';
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function App(props) {
  const [menu, setMenu] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        let res = await fetch('https://enigmatic-dawn-92117.herokuapp.com/api/menu')
        let data = await res.json()
        setMenu(data)
      } catch (error) {
        throw error
      }
    }
    fetchData();
  }, [])

  return (
    <HashRouter>
      <div>
        <nav>
          <label className="logo">App Prueba</label>
          <input type="checkbox" id="btn-menu" />
          <label htmlFor="btn-menu">
            <FontAwesomeIcon icon={faHome} id="icon" />
          </label>
          <ul className="menu">
            {menu.map((item, index) => (
              <li key={item.id}>
                <Link to={item.url}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <Route exact path="/" component={Item1} />
        <Route exact path="/item2" component={Item2} />
        <Route exact path="/item3" component={Item3} />
      </div>
    </HashRouter>
  );
}

export default App;
