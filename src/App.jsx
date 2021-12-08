import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import * as Yup from "yup";
import AppForm from "./components/Form/AppForm";
import AppFormField from "./components/Form/AppFormField";
import AppFormSelect from "./components/Form/AppFormSelect";
import SubmitButton from "./components/Form/SubmitButton";
import { useMap } from "./context/MapProvider";
import { HiOutlineLocationMarker } from "react-icons/hi";

const validationSchema = Yup.object().shape({
  animals: Yup.number().min(0).required().label("Animals"),
  bicycle: Yup.number().min(0).required().label("Bicycles"),
  bus: Yup.number().min(0).required().label("Bus"),
  car_4x4: Yup.number().min(0).required().label("Cars (4x4)"),
  car_sedan: Yup.number().min(0).required().label("Sedans"),
  car_station_wagon: Yup.number().min(0).required().label("Station wagons"),
  car_utility: Yup.number().required().min(0).label("Utility cars"),
  car_van: Yup.number().required().min(0).label("Vans"),
  inanimate: Yup.number().min(0).required().label("Inanimate objects"),
  motor_cycle: Yup.number().min(0).required().label("Motor cycles"),
  pedestrian: Yup.number().min(0).required().label("Pedestrians"),
  scooter: Yup.number().min(0).required().label("Scooters"),
  train: Yup.number().min(0).required().label("Trains"),
  tram: Yup.number().min(0).required().label("Trams"),
  taxi: Yup.number().min(0).required().label("Taxis"),
  truck_large: Yup.number().min(0).required().label("Large trucks"),
  truck_small: Yup.number().min(0).required().label("Small trucks"),
  vehicle_other: Yup.number().min(0).required().label("Other vehicles"),
  latitude: Yup.number().min(-90).max(90).required().label("Latitude"),
  longitude: Yup.number().min(-180).max(180).required().label("Longitude"),
  lighting: Yup.string()
    .oneOf([
      "daylight",
      "darkness_not_light",
      "darkness_lit",
      "dawn_dusk",
      "unknown",
    ])
    .required()
    .label("Lighting"),
  intersection: Yup.boolean().required().label("Intersection"),
  midblock: Yup.boolean().required().label("Midblock"),
  speed_limit: Yup.string()
    .oneOf(["0 - 50", "50 - 80", "80 - 90", "90 - 100", "100 - 110"])
    .required()
    .label("Speed"),
  traffic_controls: Yup.string()
    .oneOf([
      "none",
      "other",
      "stop_sign",
      "traffic_lights",
      "giveway_sign",
      "railway_crossing",
      "pedestrian_crossing",
      "manual_control",
      "school_crossing",
    ])
    .required()
    .label("Traffic control status"),
  weather: Yup.string()
    .oneOf([
      "fine",
      "rain",
      "unknown",
      "snow",
      "fog",
      "smoke_dust",
      "high_wind",
    ])
    .required()
    .label("Weather"),
});

function App() {
  const { togglePopup, coords } = useMap();
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);

  const getSeverity = (values) => {
    if (
      Object.keys(values)
        .filter(
          (val) =>
            ![
              "latitude",
              "longitude",
              "midblock",
              "speed_limit",
              "traffic_controls",
              "weather",
              "intersection",
            ].includes(val)
        )
        .some((val) => values[val] > 0)
    ) {
      setLoading(true);
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append(
        "Authorization",
        "Bearer 8KXca1tjiJx7Zd8vhbDU9c2uA50KrJlO"
      );
      const raw = JSON.stringify({
        data: [
          {
            animals: values.animals,
            bicycle: values.bicycle,
            bus: values.bus,
            car_4x4: values.car_4x4,
            car_sedan: values.car_sedan,
            car_station_wagon: values.car_station_wagon,
            car_utility: values.car_utility,
            car_van: values.car_van,
            inanimate: values.inanimate,
            intersection: values.intersection,
            latitude: values.latitude,
            lighting: values.lighting,
            longitude: values.longitude,
            midblock: values.midblock,
            motor_cycle: values.motor_cycle,
            pedestrian: values.pedestrian,
            scooter: values.scooter,
            speed_limit: values.speed_limit,
            taxi: values.taxi,
            traffic_controls: values.traffic_controls,
            train: values.train,
            tram: values.tram,
            truck_large: values.truck_large,
            truck_small: values.truck_small,
            vehicle_other: values.vehicle_other,
            weather: values.weather,
          },
        ],
        method: "predict",
      });
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      fetch("http://localhost:8010/proxy/score", requestOptions)
        .then((response) => response.json())
        .then((res) => JSON.parse(res))
        .then((val) => setResult(val.result[0]))
        .catch((error) => {
          console.log("error", error);
          setResult("Error");
        });
    } else {
      alert("There must be at least one vehicle, person or inanimate object");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (formRef.current) {
      formRef.current.setValues((fields) => {
        return { ...fields, latitude: coords.lat, longitude: coords.lng };
      });
    }
  }, [coords]);

  return (
    <div className="h-screen w-full grid items-center justify-center grid-cols-6 p-2 bg-gray-700 gap-x-2">
      <AppForm
        ref={formRef}
        initialValues={{
          animals: 0,
          bicycle: 0,
          bus: 0,
          car_4x4: 0,
          car_sedan: 0,
          car_station_wagon: 0,
          car_utility: 0,
          car_van: 0,
          inanimate: 0,
          motor_cycle: 0,
          pedestrian: 0,
          scooter: 0,
          train: 0,
          tram: 0,
          taxi: 0,
          truck_large: 0,
          truck_small: 0,
          vehicle_other: 0,
          intersection: false,
          latitude: "",
          longitude: "",
          lighting: "unknown",
          midblock: false,
          speed_limit: "0 - 50",
          traffic_controls: "none",
          weather: "unknown",
        }}
        validationSchema={validationSchema}
        onSubmit={getSeverity}
      >
        <div className="border-2 p-5 pb-3 rounded col-span-3 bg-white">
          <h1 className="text-gray-900 font-semibold text-3xl mb-10 capitalize">
            Vehicles and their count
          </h1>
          <div className="grid grid-cols-3 justify-center items-center gap-x-5">
            <AppFormField
              label="Animals count"
              type="number"
              min="0"
              name="animals"
            />
            <AppFormField
              label="Bicycles count"
              type="number"
              min="0"
              name="bicycle"
            />
            <AppFormField label="Bus count" type="number" min="0" name="bus" />
            <AppFormField
              label="Cars (4x4) count"
              type="number"
              min="0"
              name="car_4x4"
            />
            <AppFormField
              label="Sedans count"
              type="number"
              min="0"
              name="car_sedan"
            />
            <AppFormField
              label="Station Wagons count"
              type="number"
              min="0"
              name="car_station_wagon"
            />
            <AppFormField
              label="Utility cars count"
              type="number"
              min="0"
              name="car_utility"
            />
            <AppFormField
              label="Vans count"
              type="number"
              min="0"
              name="car_van"
            />
            <AppFormField
              label="Motor cycles count"
              type="number"
              min="0"
              name="motor_cycle"
            />
            <AppFormField
              label="Scooters count"
              type="number"
              min="0"
              name="scooter"
            />
            <AppFormField
              label="Trains count"
              type="number"
              min="0"
              name="train"
            />
            <AppFormField
              label="Trams count"
              type="number"
              min="0"
              name="tram"
            />
            <AppFormField
              label="Taxis count"
              type="number"
              min="0"
              name="taxi"
            />
            <AppFormField
              label="Large trucks count"
              type="number"
              min="0"
              name="truck_large"
            />
            <AppFormField
              label="Small trucks count"
              type="number"
              min="0"
              name="truck_small"
            />
            <AppFormField
              label="Pedestrians count"
              type="number"
              min="0"
              name="pedestrian"
            />
            <AppFormField
              label="Other vehicles count"
              type="number"
              min="0"
              name="vehicle_other"
            />
            <AppFormField
              label="Inanimate objects count"
              type="number"
              min="0"
              name="inanimate"
            />
          </div>
        </div>
        <div className="border-2 p-5 pb-3 rounded col-span-2 bg-white h-full">
          <h1 className="text-gray-900 font-semibold text-3xl mb-10 capitalize">
            Other factors
          </h1>
          <div className="grid grid-cols-2 gap-5">
            <AppFormField
              rightIcon={HiOutlineLocationMarker}
              onRightIconClick={() => togglePopup(true)}
              label="Latitude"
              type="number"
              min="-90"
              max="90"
              name="latitude"
            />
            <AppFormField
              rightIcon={HiOutlineLocationMarker}
              onRightIconClick={() => togglePopup(true)}
              label="Longitude"
              type="number"
              min="-180"
              max="180"
              name="longitude"
            />
          </div>
          <AppFormSelect
            items={[
              { title: "Daylight", value: "daylight" },
              { title: "Complete Darkness", value: "darkness_not_light" },
              { title: "Darkness with street lights", value: "darkness_lit" },
              { title: "Dusk / Dawn", value: "dawn_dusk" },
              { title: "Unknown", value: "unknown" },
            ]}
            label="Lighting"
            name="lighting"
          />
          <AppFormSelect
            items={[
              { title: "0 - 50", value: "0 - 50" },
              { title: "50 - 80", value: "50 - 80" },
              { title: "80 - 90", value: "80 - 90" },
              { title: "90 - 100", value: "90 - 100" },
              { title: "100 - 110", value: "100 - 110" },
            ]}
            label="Speed Limit"
            name="speed_limit"
          />
          <AppFormSelect
            items={[
              { title: "None", value: "none" },
              { title: "Stop sign", value: "stop_sign" },
              { title: "Traffic lights", value: "traffic_lights" },
              { title: "Giveway sign", value: "giveway_sign" },
              { title: "Railway crossing", value: "railway_crossing" },
              { title: "Pedestrian crossing", value: "pedestrian_crossing" },
              { title: "Manual control", value: "manual_control" },
              { title: "School crossing", value: "school_crossing" },
              { title: "Other", value: "other" },
            ]}
            label="Traffic Control"
            name="traffic_control"
          />
          <AppFormSelect
            items={[
              { title: "Unknown", value: "unknown" },
              { title: "Fine", value: "fine" },
              { title: "Rain", value: "rain" },
              { title: "Snow", value: "snow" },
              { title: "Fog", value: "fog" },
              { title: "Smoke dust", value: "smoke_dust" },
              { title: "High wind", value: "high_wind" },
            ]}
            label="Weather"
            name="weather"
          />
          <div className="grid grid-cols-2 gap-5">
            <AppFormSelect
              items={[
                { title: "Yes", value: true },
                { title: "No", value: false },
              ]}
              label="Midblock : "
              name="midblock"
            />
            <AppFormSelect
              items={[
                { title: "Yes", value: true },
                { title: "No", value: false },
              ]}
              label="Intersection : "
              name="intersection"
            />
          </div>
        </div>
        <div
          className={clsx(
            "border-2 p-5 pb-3 rounded col-span-1 h-full flex flex-col items-center justify-center",
            {
              "bg-white": result === "",
              "bg-red-200": result === "property_damage",
              "bg-red-300": result === "minor_injury",
              "bg-red-400": result === "seriously_injured_or_fatality",
            }
          )}
        >
          {loading && (
            <div className="pointer-events-none mb-10">
              Fetching Results ...
            </div>
          )}
          {!loading && (
            <h1 className="max-w-full text-gray-900 text-center font-semibold text-2xl mb-10 capitalize">
              {result === "property_damage"
                ? "Property Damage"
                : result === "minor_injury"
                ? "Minor Injury"
                : result !== ""
                ? "Major Injury or Fatality"
                : ""}
            </h1>
          )}
          <SubmitButton
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            title="Predict Severity"
          />
        </div>
      </AppForm>
    </div>
  );
}

export default App;
