import { stat } from "fs";
import React from "react";
import { CardList } from "react-bootstrap-icons";
import { json } from "stream/consumers";
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
  cardsDisplay: Array<CardType>;
  selectedCategory: string;
  categories: Array<string>;
}

class Menu extends React.Component<MenuProps, MenuState> {
  constructor(props: MenuProps) {
    super(props);
    this.state = {
      display: props.defaultDisplay,
      cards: [],
      cardsDisplay: [],
      selectedCategory: "all",
      categories: ["all", "Chicken", "Pizza", "Meat"],
    };
  }

  componentDidMount() {
    fetch("http://localhost:3100/cards")
      .then((res) => res.json())
      .then((json) => {
        this.setState(() => ({
          cards: json,
          cardsDisplay: json,
        }));
      });
  }

  changeDisplay = (mode: displayMode) => {
    this.setState((state, props) => ({
      display: mode,
    }));
  };

  categoryChange = (selected: string) => {
    // const selected = event.target.value;
    const cards = [...this.state.cards];

    const filtered = cards.filter((card) => {
      return card.category === selected;
    });
    this.setState((state, props) => ({
      cardsDisplay: selected === "all" ? cards : filtered,
      selectedCategory: selected,
    }));
  };

  render() {
    //conditional rendering - if no dishes display an empty page
    if (this.state.cardsDisplay.length === 0) return <p>No dishes in Menu!</p>;
    return (
      <>
        <Title text="Order Delivery or Takeaway"></Title>
        <div className="d-flex justify-content-between px-5">
          <div className="d-flex align-items-center">
            <label className="pe-2">Category:</label>
            <select
              onChange={(e) => this.categoryChange(e.target.value)}
              className="form-select"
              value={this.state.selectedCategory}
            >
              {this.state.categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div>
            <button
              onClick={(e) => this.changeDisplay("list")}
              className="btn btn-default"
            >
              <i className="bi-list-ul"></i>
            </button>
            <button
              onClick={(e) => this.changeDisplay("grid")}
              className="btn btn-default"
            >
              <i className="bi-grid-3x3-gap-fill"></i>
            </button>
          </div>
        </div>

        <div className={this.state.display}>
          {this.state.cardsDisplay.map((card) => (
            <Card
              key={card._id}
              data={card}
              categoryChange={this.categoryChange}
            />
          ))}
        </div>
      </>
    );
  }
}

export default Menu;
