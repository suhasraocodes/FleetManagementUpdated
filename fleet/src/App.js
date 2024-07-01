import { CardWithForm } from './items/card';
import Navbar from './items/Navbar';
import Carousel from './items/Carousel';
function App() {  
  return (
    <div>
      <div><Navbar/>
      <Carousel/></div>
      <div className="flex justify-center items-center h-screen">
      <CardWithForm />
    </div>
    </div>
    
  );
}

export default App;
