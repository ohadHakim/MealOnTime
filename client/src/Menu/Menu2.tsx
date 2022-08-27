import React, { useEffect, useState } from "react";
import Card, { CardType } from "../Card/Card";
import Title from "../Title/Title";
import "./Menu.css";

type displayMode = "grid" | "list";

interface MenuProps {
  defaultDisplay: displayMode;
}

interface MenuState {
  display: displayMode;
  cards: Array<CardType>;
  filteredByCategory: Array<CardType>;
  selectedCategory: string;
  categories: Array<string>;
}

function Menu(props: MenuProps) {
  // constructor(props: MenuProps) {
  //   super(props);
  //   this.state = {
  //     display: props.defaultDisplay,
  //     cards: [],
  //     filteredByCategory: [],
  //     selectedCategory: "all",
  //     categories: ["all", "Chicken", "Pizza", "Meat"],
  //   };
  // }

  const [display, setDisplay] = useState<displayMode>(props.defaultDisplay);
  const [cards, setCards] = useState<Array<CardType>>([]);
  const [filteredByCategory, setFilteredByCategory] = useState<Array<CardType>>(
    []
  );
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [categories, setCategories] = useState<Array<string>>([
    "all",
    "Chicken",
    "Pizza",
    "Meat",
  ]);

  useEffect(() => {
    fetch("http://localhost:3100/cards")
      .then((res) => res.json())
      .then((json) => {
        setCards(json);
        setFilteredByCategory(json);
      });
  });

  // componentDidMount() {
  //   fetch("http://localhost:3100/cards")
  //     .then((res) => res.json())
  //     .then((json) => {
  //       this.setState(() => ({
  //         cards: json,
  //         filteredByCategory: json,
  //       }));
  //     });
  // }

  function changeDisplay(mode: displayMode) {
    setDisplay(mode);

    //not allowed here
    //useState()
    //useEffect()
  }

  function categoryChange(selected: string) {
    const filtered = cards.filter((card) => {
      return card.category === selected;
    });
    // this.setState((state, props) => ({
    //   filteredByCategory: selected === "all" ? cards : filtered,
    //   selectedCategory: selected,
    // }));
    const byCategory = selected === "all" ? cards : filtered;
    setFilteredByCategory(byCategory);
    setSelectedCategory(selected);
  }

  //conditional rendering - if no dishes display an empty page
  if (filteredByCategory.length === 0) return <p>No dishes in Menu!</p>;
  return (
    <>
      <Title text="Order Delivery or Takeaway"></Title>
      <div className="d-flex justify-content-between px-5">
        <div className="d-flex align-items-center">
          <label className="pe-2">Category:</label>
          <select
            onChange={(e) => categoryChange(e.target.value)}
            className="form-select"
            value={selectedCategory}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div>
          <button
            onClick={(e) => changeDisplay("list")}
            className="btn btn-default"
          >
            <i className="bi-list-ul"></i>
          </button>
          <button
            onClick={(e) => changeDisplay("grid")}
            className="btn btn-default"
          >
            <i className="bi-grid-3x3-gap-fill"></i>
          </button>
        </div>
      </div>

      <div className={display}>
        {filteredByCategory.map((card) => (
          <Card key={card._id} data={card} categoryChange={categoryChange} />
        ))}
      </div>
    </>
  );
}

export default Menu;
