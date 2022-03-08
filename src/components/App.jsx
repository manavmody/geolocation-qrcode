import React, { useEffect , useState } from "react";
import QRCode from 'qrcode.react';



function App() {

  const [formStep,setFormStep] = useState(0);
  const [name, setName] = useState("");
  const [headingText, setHeading] = useState("");
  const [location, setLocation] = useState("");
  const[maps,setMaps] = useState("");

  const completeFormStep = () =>{
    if(formStep===1) return
    setFormStep(cur =>cur+1);
  }
  

  function handleChange(event) {
    console.log(event.target.value);
    setName(event.target.value);
  }
  

  function handleClick(event) {
    setHeading(name);
    navigator.geolocation.getCurrentPosition((position) => {

      setLocation("Your Location is :" + position.coords.latitude +" and " + position.coords.longitude);
      var link = "https://maps.googleapis.com/maps/api/staticmap?center=40.714728,-73.998672&zoom=12&size=400x400&maptype=roadmap&key=AIzaSyA8d7doPQVJEe_-cMIflaI7wXdGVkwashY"
      setMaps(link);


    });
    
    event.preventDefault();
  }

  return (
    <div className="container">
      
      
      <form onSubmit={handleClick}>
        {formStep===0 &&(
          <section>
          <h1>Hello there! </h1>
          <input
          onChange={handleChange}
          type="text"
          placeholder="What's your name?"
          value={name}
          />
          
        </section>
        )}
        {formStep===1 &&(
          <section>
            <h1 style={{padding: "20px" }}>Hello {headingText}</h1>
            <h2 style={{padding: "20px" }}>{location}</h2>
            <h2 style={{padding: "10px" }}> Your Unique QRCode is: </h2>
            <img src={maps} />
            <QRCode id ={name} value={name}/>    
                 
          </section>
        )}
        <button type="submit" onClick={completeFormStep}>Get Location and QRCode</button>
        
      </form>
    </div>
  );
}




export default App;
