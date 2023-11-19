import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchWeatherAction,fetchWeatherCurrent } from "../redux/slices/weatherSlices";
import {
  Container,
  Row,
  Card,
  Col,
  Button,
} from "react-bootstrap";
import "../WeatherApp.css";

function Weatherhome() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { loading, weather, error } = state;
  console.log("state", state);
  const icon = weather?.weather[0]?.icon;
  const [city, setCity] = useState("");
 
  useEffect(() => {
    dispatch(fetchWeatherAction("London"));
  }, []);

 

  let weatherclass = document.getElementsByTagName("weather-app");
  const handleSearch = () => {
    dispatch(fetchWeatherAction(city));
    setCity("");
  };

 

  const getCurrentLocation = async () => {
    await window.navigator.geolocation.getCurrentPosition(function (position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      dispatch(fetchWeatherCurrent({ latitude, longitude }));
    });
  };
  return (
    <>
      {loading ? (
        <h1> Loading please wait </h1>
      ) : error ? (
        <h1 className="error-message">{error?.message}</h1>
      ) : (
        weatherclass
      )}
      <section className="weather-app">
        <Container>
          <Row className="text-center">
            <h1 className="mb-5">Weather Application</h1>
            <Col className="text-center" md={12}>
              <input
                type="text"
                placeholder="Enter city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <Button variant="primary" onClick={handleSearch}>
                Search
              </Button>
            </Col>
          </Row>

          <Row className="mt-5">
            <Col md={6}>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 320 512"
                >
                  <path
                    fill="#ffffff"
                    d="M160 64c-26.5 0-48 21.5-48 48V276.5c0 17.3-7.1 31.9-15.3 42.5C86.2 332.6 80 349.5 80 368c0 44.2 35.8 80 80 80s80-35.8 80-80c0-18.5-6.2-35.4-16.7-48.9c-8.2-10.6-15.3-25.2-15.3-42.5V112c0-26.5-21.5-48-48-48zM48 112C48 50.2 98.1 0 160 0s112 50.1 112 112V276.5c0 .1 .1 .3 .2 .6c.2 .6 .8 1.6 1.7 2.8c18.9 24.4 30.1 55 30.1 88.1c0 79.5-64.5 144-144 144S16 447.5 16 368c0-33.2 11.2-63.8 30.1-88.1c.9-1.2 1.5-2.2 1.7-2.8c.1-.3 .2-.5 .2-.6V112zM208 368c0 26.5-21.5 48-48 48s-48-21.5-48-48c0-20.9 13.4-38.7 32-45.3V208c0-8.8 7.2-16 16-16s16 7.2 16 16V322.7c18.6 6.6 32 24.4 32 45.3z"
                  />
                </svg>
                Temperature
                {" " + weather?.main.temp}
                <span>&#8451;</span>
              </div>
              <hr />
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 640 512"
                >
                  <path
                    fill="#ffffff"
                    d="M320 96C178.6 96 64 210.6 64 352v96c0 17.7-14.3 32-32 32s-32-14.3-32-32V352C0 175.3 143.3 32 320 32s320 143.3 320 320v96c0 17.7-14.3 32-32 32s-32-14.3-32-32V352C576 210.6 461.4 96 320 96zm0 192c-35.3 0-64 28.7-64 64v96c0 17.7-14.3 32-32 32s-32-14.3-32-32V352c0-70.7 57.3-128 128-128s128 57.3 128 128v96c0 17.7-14.3 32-32 32s-32-14.3-32-32V352c0-35.3-28.7-64-64-64zM160 352v96c0 17.7-14.3 32-32 32s-32-14.3-32-32V352c0-123.7 100.3-224 224-224s224 100.3 224 224v96c0 17.7-14.3 32-32 32s-32-14.3-32-32V352c0-88.4-71.6-160-160-160s-160 71.6-160 160z"
                  />
                </svg>
                Humidity
                {" " + weather?.main?.humidity}%
              </div>
              <hr />
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="#ffffff"
                    d="M156.7 256H16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h142.2c15.9 0 30.8 10.9 33.4 26.6 3.3 20-12.1 37.4-31.6 37.4-14.1 0-26.1-9.2-30.4-21.9-2.1-6.3-8.6-10.1-15.2-10.1H81.6c-9.8 0-17.7 8.8-15.9 18.4 8.6 44.1 47.6 77.6 94.2 77.6 57.1 0 102.7-50.1 95.2-108.6C249 291 205.4 256 156.7 256zM16 224h336c59.7 0 106.8-54.8 93.8-116.7-7.6-36.2-36.9-65.5-73.1-73.1-55.4-11.6-105.1 24.9-114.9 75.5-1.9 9.6 6.1 18.3 15.8 18.3h32.8c6.7 0 13.1-3.8 15.2-10.1C325.9 105.2 337.9 96 352 96c19.4 0 34.9 17.4 31.6 37.4-2.6 15.7-17.4 26.6-33.4 26.6H16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16zm384 32H243.7c19.3 16.6 33.2 38.8 39.8 64H400c26.5 0 48 21.5 48 48s-21.5 48-48 48c-17.9 0-33.3-9.9-41.6-24.4-2.9-5-8.7-7.6-14.5-7.6h-33.8c-10.9 0-19 10.8-15.3 21.1 17.8 50.6 70.5 84.8 129.4 72.3 41.2-8.7 75.1-41.6 84.7-82.7C526 321.5 470.5 256 400 256z"
                  />
                </svg>
                Wind
                {" " + weather?.wind?.speed}
              </div>
            </Col>
            <Col md={6}>
              <Card>
                <Card.Body>
                  <Card.Title>Weather Description </Card.Title>
                  <Card.Text>
                    The weather condition in {weather?.name} is decribed as :{" "}
                    <img
                      src={`https://openweathermap.org/img/wn/${icon}.png`}
                    ></img>{" "}
                    {weather?.weather[0]?.main} of a{" "}
                    {weather?.weather[0]?.description} with a temperature of{" "}
                    {weather?.main.temp} <span>&#8451;</span> and a humidity of{" "}
                    {weather?.main?.humidity}%
                  </Card.Text>
                  <Button variant="primary" onClick={getCurrentLocation}>
                    Current Location
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default Weatherhome;
