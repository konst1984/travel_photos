import React, { useEffect, useState } from "react";

interface ICollection {
  name: string;
  images: Array<string>;
}

const Collection = ({ name, images }: ICollection) => {
  const [currentImage, setCurrentImage] = useState("");

  useEffect(() => {
    if (images.length) {
      setCurrentImage(images[0]);
    }
  }, []);

  const changeImagePoster = (e: React.BaseSyntheticEvent) => {
    if (e.target.className === "collection__mini") {
      const image = `${currentImage}`;
      setCurrentImage(e.target.src);
      e.target.src = image;
    }
  };

  return (
    <div className="collection">
      <img className="collection__big" src={`${currentImage}`} alt="" />
      <div className="collection__bottom" onClick={changeImagePoster}>
        <img className="collection__mini" src={images[1]} alt="" />
        <img className="collection__mini" src={images[2]} alt="" />
        <img className="collection__mini" src={images[3]} alt="" />
      </div>
      <h2>{name}</h2>
    </div>
  );
};

export default Collection;
