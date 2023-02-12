
import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getPlant, savePlant } from "../services/plantService";
import { getCategories } from "../services/categoryService";


class PlantForm extends Form {
  state = {
    data: {
      title: "",
      categoryId: "",
      numberInStock: "",
      price:""
     
    },
    categories: [],
    errors: {}
  };
  schema = {
    _id: Joi.string(),
    title: Joi.string()
      .required()
      .label("Title"),
    categoryId: Joi.string()
      .required()
      .label("Category"),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Number in Stock"),
    price: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Price"),

  };
  async componentDidMount() {
    const {data: categories} = await getCategories();
    this.setState({ categories });

    const plantId = this.props.match.params.id;
    if (plantId === "new") return;

    const { data: plant } = await getPlant(plantId);
    if (!plant) return this.props.history.replace("/not-found");

    this.setState({ data: this.mapToViewModel(plant) });
  }

  mapToViewModel(plant) {
    return {
      _id: plant._id,
      title: plant.title,
      categoryId: plant.category._id,
      numberInStock: plant.numberInStock,
      price: plant.price
      
    };
  }

  doSubmit = () => {
    savePlant(this.state.data);

    this.props.history.push("/plants");
  };
  render() {
    return (
      <div>
        <h1> Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("categoryId", "Category", this.state.categories)}
          {this.renderInput("numberInStock", "Number in Stock", "number")}
          {this.renderInput("price", "Price", "number")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
};

export default PlantForm;