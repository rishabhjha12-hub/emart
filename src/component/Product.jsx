import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import { Link } from "react-router-dom";
const Product = () => {
  const { id } = useParams();

  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch=useDispatch();
  const addProducts=(product)=>{
    dispatch(addCart(product))
  }
  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);

      setProduct(await response.json());
      setLoading(false);
    };
    getProduct();
  }, []);
  const Loading = () => {
    return <>loading......</>;
  };
  const ShowProduct = () => {
    return (
      <>
        <div className="col-md-6">
          <img
            src={product.image}
            width="400px"
            height="400px"
            alt={product.title}
          />
        </div>
        <div className="col-md-6">
            <h4 className="text-uppercase text-black-50">{product.category}</h4>
            <h1 className="display-5">{product.title}</h1>
            <p className="lead fw-bolder">
              Rating {product.rating && product.rating.rate}
              <i className="fas fa-star"></i>
            </p>
            <div className="display-6 fw-bold my-4">
              ${product.price}
            </div>
            <p className="lead">{product.description}</p>
            <button className="btn btn-outline-dark px-4 py-2" onClick={()=>addProducts(product)}>
              Add to Cart
            </button>
            <Link to="/cart"  className="btn btn-dark mx-2 px-3 py-2">
              Go to Cart
            </Link>
        </div>
      </>
    );
  };
  return (
    <div>
      <div className="container py-5">
        <div className="row py-5">{loading ? <Loading /> : <ShowProduct />}</div>
      </div>
    </div>
  );
};

export default Product;
