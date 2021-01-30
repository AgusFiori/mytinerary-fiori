import React from "react";
import "../styles/cities.css";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Loading } from "./Loader.jsx";
import { connect } from "react-redux";
import { CityCard } from "./CityCard";
import citiesActions from "../redux/actions/citiesActions";

const Cities = (props) => {
  // const [loading, setLoading] = useState(true);

  console.log(props);

  // const {getCities} = props

  useEffect(() => {
    props.getCities();
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="cities">
      <h1>Cities</h1>
      <h2 className="filter">
        <input
          type="text"
          placeholder="Search cities..."
          name="filter"
          id="filter"
          onChange={(e) => {
            props.filterCities(e.target.value);
          }}
          autoComplete="off"
        />
      </h2>
      <div className="citiesContainer">
        {props.allCities.length ? (
          props.filteredCities.length !== 0 ? (
            props.filteredCities
              .sort((a, b) =>
                a.cityName > b.cityName ? 1 : b.cityName > a.cityName ? -1 : 0
              )
              .map((city) => {
                return <CityCard key={uuidv4()} cityCard={city} />;
              })
          ) : (
            <div className="noCities">
              <div className="noCitiesMsg">
                <h5>
                  Looks like there are no itineraries for the city you're
                  looking for...
                </h5>
                <h6>Try another one !</h6>
              </div>
            </div>
          )
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    allCities: state.cityR.cities,
    filteredCities: state.cityR.filteredCities,
  };
};

const mapDispatchToProps = {
  getCities: citiesActions.getCities,
  filterCities: citiesActions.filterCities,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cities); // mapStateToProps le da la capacidad de leer el STORE --> mapea el estado centralizado y lo pasa como props
