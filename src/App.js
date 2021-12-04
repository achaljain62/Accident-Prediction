import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import { useEffect, useState } from "react";
// import Maps from "./Components/Maps";
// import { Map, Marker, Popup, TileLayer } from "react-leaflet";
// import "./App.css"
import "@tomtom-international/web-sdk-maps/dist/maps.css";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";

function App() {
  const [values, setValues] = useState({
    speed: "",
    midblock: "",
    weather: "",
    lighting: "",
    traffic: "",
    lat: "",
    long: "",
    vehicle: "",
  });

  const [country, setCountry] = useState("aus");
  const [result, setResult] = useState("--");
  const [severity, setSeverity] = useState(() => ["high", "low", "property"]);

  const handleSeverity = (event, newFormats) => {
    setSeverity(newFormats);
  };

  const handleCountry = (event, newCountry) => {
    setCountry(newCountry);
  };

  useEffect(() => {
    const tt = require("@tomtom-international/web-sdk-maps");
    const aus = [
      [110.338953078, -40.6345972634],
      [160.569469029, -8.6681857235],
    ];
    const nz = [
      [160.509144322, -50.641235447],
      [186.517093541, -30.4506617165],
    ];

    const map = tt.map({
      key: "lnarYoAwix8UjKQmmBHQQwBhzWAtpzj5",
      container: "map",
      zoom: 3.8,
      center: [135, -25],
      height: 512,
      width: 512,
      view: "Unified",
      language: "pl-PL",
      layer: "basic",
      format: "png",
      maxBounds: country === "aus" ? aus : nz,
    });
  }, [country]);

  const handleChange = (event) => {
    const name = event.target.name;
    setValues({
      ...values,
      [name]: event.target.value,
    });
  };

  const useStyles = makeStyles((theme) => ({
    formControl: {
      // margin: theme.spacing(1),
      minWidth: "100%",
      marginTop: "20px",
    },
  }));

  const classes = useStyles();

  const speed = ["0-50", "50-80", "80-90", "90-100", "100-110"];
  const midblock = [
    { value: true, text: "True" },
    { value: false, text: "False" },
  ];
  const weather = ["fine", "rain", "unknown"];
  const lighting = [
    { value: "daylight", text: "Daylight" },
    { value: "darkness_lit", text: "Pitch Dark" },
    { value: "darkness_not_lit", text: "Lamp Light" },
  ];
  const traffic = [
    { value: "none", text: "None" },
    { value: "giveway sign", text: "Give way sign" },
    { value: "traffic_lights", text: "Traffic Lights" },
  ];
  const vehicle = [
    { value: "car_sedan", text: "Sedan" },
    { value: "car_van", text: "Van" },
    { value: "bicycle", text: "Cycle" },
    { value: "scooter", text: "Scooter" },
    { value: "taxi", text: "Taxi" },
    { value: "pedestrian", text: "pedestrian" },
  ];

  return (
    <Grid container direction="row" justifyContent="center">
      <Grid
        item
        lg={3}
        md={3}
        style={{
          backgroundColor: "#EEEEEE",
          height: "100vh",
          padding: "3%",
          overflowY: "scroll",
        }}
      >
        <Typography variant="h4" style={{ paddingBottom: "40px" }}>
          Prediction model
        </Typography>
        <Box display="flex" justifyContent="center">
          <ToggleButtonGroup value={country} exclusive onChange={handleCountry}>
            <ToggleButton value="aus">Australia</ToggleButton>

            <ToggleButton value="nz">New Zealand</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <Box display="flex" justifyContent="center" marginTop="20px">
          <ToggleButtonGroup value={severity} onChange={handleSeverity}>
            <ToggleButton value="high">Serious Injury</ToggleButton>
            <ToggleButton value="low">Minor Injury</ToggleButton>
            <ToggleButton value="property">Property Damage</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <TextField
          className={classes.formControl}
          onChange={handleChange}
          value={values.lat}
          label="Latitude"
          variant="filled"
        />
        <TextField
          className={classes.formControl}
          onChange={handleChange}
          value={values.long}
          label="Longitude"
          variant="filled"
        />

        <FormControl variant="filled" className={classes.formControl}>
          <InputLabel htmlFor="filled-age-native-simple">Speed</InputLabel>
          <Select
            native
            value={values.speed}
            onChange={handleChange}
            inputProps={{
              name: "speed",
            }}
          >
            <option aria-label="None" value="" />
            {speed.map((item, key) => (
              <option value={item} id={key}>
                {item}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl variant="filled" className={classes.formControl}>
          <InputLabel htmlFor="filled-age-native-simple">Weather</InputLabel>
          <Select
            native
            value={values.weather}
            onChange={handleChange}
            inputProps={{
              name: "weather",
            }}
          >
            <option aria-label="None" value="" />
            {weather.map((item, key) => (
              <option value={item} id={key}>
                {item}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl variant="filled" className={classes.formControl}>
          <InputLabel htmlFor="filled-age-native-simple">Midblock</InputLabel>
          <Select
            native
            value={values.midblock}
            onChange={handleChange}
            inputProps={{
              name: "midblock",
            }}
          >
            <option aria-label="None" value="" />
            {midblock.map((item, key) => (
              <option value={item.value} id={key}>
                {item.text}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl variant="filled" className={classes.formControl}>
          <InputLabel htmlFor="filled-age-native-simple">Lighting</InputLabel>
          <Select
            native
            value={values.lighting}
            onChange={handleChange}
            inputProps={{
              name: "lighting",
            }}
          >
            <option aria-label="None" value="" />
            {lighting.map((item, key) => (
              <option value={item.value} id={key}>
                {item.text}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl variant="filled" className={classes.formControl}>
          <InputLabel htmlFor="filled-age-native-simple">
            Traffic Sign
          </InputLabel>
          <Select
            native
            value={values.traffic}
            onChange={handleChange}
            inputProps={{
              name: "traffic",
            }}
          >
            <option aria-label="None" value="" />
            {traffic.map((item, key) => (
              <option value={item.value} id={key}>
                {item.text}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl variant="filled" className={classes.formControl}>
          <InputLabel htmlFor="filled-age-native-simple">Vehicle</InputLabel>
          <Select
            native
            value={values.vehicle}
            onChange={handleChange}
            inputProps={{
              name: "vehicle",
            }}
          >
            <option aria-label="None" value="" />
            {vehicle.map((item, key) => (
              <option value={item.value} id={key}>
                {item.text}
              </option>
            ))}
          </Select>
        </FormControl>

        <Button
          variant="outlined"
          style={{ marginTop: "30px" }}
          onClick={() => {
            alert(JSON.stringify(values));
          }}
        >
          Default
        </Button>

        <Typography variant="h4" style={{ marginTop: "20px" }}>
          Severity : {result}
        </Typography>
      </Grid>
      <Grid item lg={9} md={9}>
        <div id="map" style={{ width: "100%", height: "100vh" }}></div>
      </Grid>
    </Grid>
  );
}

export default App;
