import "./App.css";
import CurrrntWeather from "./component/current-weather/current-weather";
import Search from "./component/search/search";

function App() {
  const handleOnSearchChange = (searchData) => {
    console.log(searchData);
  };
  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      <CurrrntWeather />
    </div>
  );
}

export default App;
