import { useEffect, useState } from 'react'
import './App.css'

function App() {
  
  let [drink, setDrink] = useState([]);
  let [searchDrink, setSearchDrink] = useState([]);
  let [inputValue, setInputValue] = useState('');
  let [favoriteDrink, setFavoriteDrink] = useState(() => {
    const localData = localStorage.getItem("favoriteDrink");
    return localData ? JSON.parse(localData) : [];
  });



  let favoriteDrinks = () => {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${inputValue}`)
      .then(response => response.json())
      .then(data => {
        let stuff = data.drinks.map(drink => drink.strDrink);
        // let stuff = data.drinks[0].strDrink
        setSearchDrink(stuff)
        console.log(stuff)
      })
  }
  

  useEffect(() => {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=gin`)
      .then(response => response.json())
      .then(data => {
        let myDrink = data.drinks || [];
        setDrink(myDrink);
      });
  }, []);

  function handleAddDrink(drink) {
    if(!favoriteDrink.includes(drink)){
    let addDrink = drink;
      setFavoriteDrink([...favoriteDrink, addDrink]);
      }
  }
  
  function handleDeleteDrink(cocktail) {
    let updateList = favoriteDrink.filter(drink => drink !== cocktail);
    setFavoriteDrink(updateList);
  }

  useEffect(() => {
    localStorage.setItem('favoriteDrink', JSON.stringify(favoriteDrink));
  }, [favoriteDrink])

  return (
    <>
      <div>
        <a>
          <img src="https://www.thecocktaildb.com/images/ingredients/gin-medium.png" className="logo react" alt="Drink Image" />
        </a>
        <a>
          <img src="https://www.thecocktaildb.com/images/media/drink/vrwquq1478252802.jpg/medium" className="logo react" alt="Drink Image" />
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
        <button onClick={favoriteDrinks}>Ingredient Search</button>
        
        <ul>
          {searchDrink.map((drink,index) =>(
            <li key={index}>{drink}<input type="checkbox" onChange={()=>handleAddDrink(drink)} /></li>
          ))}
        </ul>
        
        <h1>Favorite Drinks List</h1>
        <ol>
          {favoriteDrink.map((drink, index) => (
            <li key={index} > {drink}<input type="checkbox" onChange={()=>handleDeleteDrink(drink)} /></li>
          ))}
        </ol>
      </div>
    </>
  )
}

export default App

