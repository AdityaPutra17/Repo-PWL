import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import ProductCard from "../../Component/Product/ProductCard";
import { useLocation, useNavigate } from "react-router-dom";
import * as tmImage from "@teachablemachine/image";

const Object = () => {
  const [model, setModel] = useState(null);
  const [maxPredictions, setMaxPredictions] = useState(0);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [predictions, setPredictions] = useState([]);
  const [highestPrediction, setHighestPrediction] = useState("");
  const webcamRef = useRef(null);
  const labelContainerRef = useRef(null);
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search).get("query");

  const loadModel = async () => {
    const modelURL =
      import.meta.env.VITE_BASE_URL +
      "../../../public/tm-my-image-model/model.json";
    const metadataURL =
      import.meta.env.VITE_BASE_URL +
      "../../../public/tm-my-image-model/metadata.json";

    try {
      const loadedModel = await tmImage.load(modelURL, metadataURL);
      setModel(loadedModel);
      setMaxPredictions(loadedModel.getTotalClasses());
      console.log("Model loaded successfully");
    } catch (error) {
      console.error("Error loading model: ", error);
    }
  };

  useEffect(() => {
    loadModel();
  }, []);

  const setupWebcam = async () => {
    const flip = true;
    const webcam = new tmImage.Webcam(640, 480, flip);
    await webcam.setup();
    await webcam.play();
    webcamRef.current = webcam;
    requestAnimationFrame(loop);

    document.getElementById("webcam-container").appendChild(webcam.canvas);

    for (let i = 0; i < maxPredictions; i++) {
      labelContainerRef.current.appendChild(document.createElement("div"));
    }
    setIsCameraOn(true);
  };

  const loop = async () => {
    if (webcamRef.current) {
      webcamRef.current.update();
      await predict();
      requestAnimationFrame(loop);
    }
  };

  const predict = async () => {
    if (model && webcamRef.current) {
      const prediction = await model.predict(webcamRef.current.canvas);
      setPredictions(prediction);
      const highestPrediction = prediction.reduce((prev, current) =>
        prev.probability > current.probability ? prev : current
      );
      setHighestPrediction(highestPrediction.className);
    }
  };

  const handleStart = async () => {
    if (!isCameraOn) {
      await setupWebcam();
    }
  };
  const handleFind = () => {
    if (predictions.length > 0) {
      const highestPrediction = predictions.reduce((prev, current) =>
        prev.probability > current.probability ? prev : current
      );
      navigate(`/searchimg?query=${highestPrediction.className}`);
    } else {
      alert("Tidak ada prediksi yang tersedia");
    }
  };

  useEffect(() => {
    if (query) {
      fetch(`http://localhost:3003/api/products`)
        .then((res) => res.json())
        .then((data) => {
          const filteredProducts = data.data.filter((product) =>
            product.title.toLowerCase().includes(query.toLowerCase())
          );
          setProducts(filteredProducts);
        })
        .catch((error) => console.error("Error fetching products:", error));
    }
  }, [query]);

  return (
    <div className="flex flex-col gap-10 my-5 min-h-screen">
      <h1 className="text-2xl font-bold  flex items-center">Search By Image</h1>
      <div className="relative mx-auto text-center">
        <button
          type="button"
          className={
            "bg-green-500 text-xl p-5 text-white font-bold rounded-lg mb-4"
          }
          onClick={handleStart}>
          {!isCameraOn ? "Start" : "Stop"}
        </button>

        <div className="hidden">
          <div className="mx-auto">
            <div id="label-container" ref={labelContainerRef}>
              {predictions.map((prediction, index) => (
                <div key={index}>
                  {prediction.className}:{" "}
                  {prediction.probability.toFixed(2) * 100}%
                  <div
                    className="progress"
                    role="progressbar"
                    aria-valuenow="100"
                    aria-valuemin="0"
                    aria-valuemax="100">
                    <div
                      className="progress-bar"
                      style={{
                        width: prediction.probability.toFixed(2) * 100 + "%",
                      }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div id="webcam-container"></div>
      </div>
      <div
        className={`absolute search top-[640px] left-[980px] ${
          !isCameraOn ? "hidden" : ""
        }`}>
        <button
          className="bg-blue-600 p-4 rounded-sm text-white w-40"
          onClick={handleFind}>
          Search
        </button>
      </div>
      <h1 className="text-2xl font-bold mb-20 flex items-center">
        Search Results
      </h1>

      <div className="flex flex-wrap justify-center gap-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            image={product.image}
            title={product.title}
            price={product.price}
            rating={product.rating}
          />
        ))}
      </div>
    </div>
  );
};

export default Object;
