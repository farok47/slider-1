import Slider from "./Slider";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Slider url={'https://picsum.photos/v2/list'} limit={'10'} />
      </header>
    </div>
  );
}

export default App;
