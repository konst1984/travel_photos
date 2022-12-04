import React, { useEffect, useState } from "react";
import "./index.scss";
import Collection from "./components/Collection/Collection";

interface IItem {
  category: number;
  name: string;
  photos: Array<string>;
}

const countElenOnPage = 4;

function App() {
  const [categoryId, setCategoryId] = useState(0);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState([]);
  const [collections, setCollections] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const countPage = Math.ceil(collections.length / countElenOnPage);
  const lastIndex = page * countElenOnPage;
  const firstIndex = lastIndex - countElenOnPage;

  useEffect(() => {
    setIsLoading(true);
    fetch("./data.json")
      .then((data) => data.json())
      .then((res) => {
        if (categoryId) {
          const resCategory = res.collections.filter(
            (item: IItem) => item.category === categoryId
          );
          setCollections(resCategory);
        } else setCollections(res.collections);

        setCategory(res.categories);
      })
      .catch((e) => console.warn(e))
      .finally(() => {
        setIsLoading(false);
      });
  }, [categoryId, page]);

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {category.map(({ name }, index) => (
            <li
              key={index}
              className={categoryId === index ? "active" : ""}
              onClick={() => {
                setCategoryId(index);
                setPage(1);
              }}
            >
              {name}
            </li>
          ))}
        </ul>
        <input
          className="search-input"
          placeholder="Поиск по названию"
          value={searchValue}
          onChange={onChangeInput}
        />
      </div>
      <div className="content">
        {!isLoading
          ? collections
              .slice(firstIndex, lastIndex)
              .filter((item: { name: string }) =>
                item.name.toLowerCase().includes(searchValue.toLowerCase())
              )
              .map(({ name, photos }, index) => (
                <Collection key={index + name} name={name} images={photos} />
              ))
          : "Loading..."}
      </div>
      <ul className="pagination">
        {countPage > 0
          ? [...Array(countPage)].map((_, index) => (
              <li
                key={index}
                onClick={() => setPage(index + 1)}
                className={index + 1 === page ? "active" : ""}
              >
                {index + 1}
              </li>
            ))
          : null}
      </ul>
    </div>
  );
}

export default App;
