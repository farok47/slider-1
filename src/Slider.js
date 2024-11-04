import React, { useEffect, useState } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import "./style.css"

function Slider({ url, limit = 5 }) {
  const [images, setimages] = useState([]);
  const [errormsg, seterrormsg] = useState(null);
  const [loading, setloading] = useState(false);
  const [currentslide, setcurrentslide] = useState(0);

  async function fetchimages(geturl) {
    try {
      setloading(true);
      const response = await fetch(`${geturl}?limit=${limit}`);
      const data = await response.json();

      if (data) {
        setimages(data);
        setloading(false);
      }
    } catch (error) {
      console.log(error);
      seterrormsg(error.message);
      setloading(false);
    }
  }
  useEffect(() => {
    if (url !== null) fetchimages(url);
  }, [url]);
  console.log(images);
  if (loading) {
    return <div>loading...</div>;
  }
  if (errormsg !== null) {
    return <div>error: {errormsg}</div>;
  }

  function handleleft() {
    setcurrentslide(currentslide === 0 ? images.length - 1 : currentslide - 1);
  }
  function handleright() {
    setcurrentslide(currentslide === images.length - 1 ? 0 : currentslide + 1);
  }
  return (
    <div className="container">
      <BsArrowLeftCircleFill
        onClick={handleleft}
        className="arrow arrow-left"
      />
      {images && images.length
        ? images.map((imageitem, index) => (
            <img
              src={imageitem.download_url}
              alt={imageitem.download_url}
              className={
                currentslide === index
                  ? "current-image"
                  : "current-image hide-current-image"
              }
            />
          ))
        : null}
      <BsArrowRightCircleFill
        onClick={handleright}
        className="arrow arrow-right"
      />
      <span className="circle-indicator">
        {images && images.length
          ? images.map((_, index) => (
              <button
                className={
                  currentslide === index
                    ? "current-indicator"
                    : "current-indicator inactive-current-indicator"
                }
              ></button>
            ))
          : null}
      </span>
    </div>
  );
}

export default Slider;
