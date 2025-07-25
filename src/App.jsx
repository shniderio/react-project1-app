import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  
  let [drink, setDrink] = useState([]);
  let [favDrink, setFavDrink] = useState([]);
  let [inputValue, setInputValue] = useState('');
  let [checkboxValue, setCheckboxValue] = useState()

  let favoritDrinks = () => {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputValue}`)
      .then(repsonse => repsonse.json())
      .then(data => {
        let stuff = data.drinks.map(drink => drink.strDrink);
        // let stuff = data.drinks[0].strDrink
        setFavDrink(stuff)
        console.log(stuff)
      })
  }
  

  useEffect(() => {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita`)
      .then(response => response.json())
      .then(data => {
        let myDrink = data.drinks || [];
        setDrink(myDrink);
        console.log(myDrink);
      });
  }, []);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Drinks and Stuff</h1>
      <div className="card">
        <ul>
          {drink.slice(0,10).map((drink,index) =>(
            <li key={index}>{drink.strDrink}</li>
          ))}
        </ul>
        <input 
        type="text"
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        ></input>
        <button onClick={favoritDrinks}>Favorite Drinks</button>
        
        <ul>
          {favDrink.map((drink,index) =>(
            <li key={index}>{drink}<input type="checkbox" /></li>
          ))}
          
        </ul>
        
      </div>
    </>
  )
}

export default App
