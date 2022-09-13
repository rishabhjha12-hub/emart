import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
const Products = () => {
    const [data,setData]=useState([]);
    const [filter,setFilter]=useState(data);
    const [loading,setLoading]=useState(false);
    let componentMounted=true;
    useEffect(()=>{
        const getProducts=async()=>{
            setLoading(true);
            const response=await fetch("https://fakestoreapi.com/products")
            if(componentMounted){
                setData(await response.clone().json())
                setFilter(await response.json());
                setLoading(false);
                console.log("filter",filter)
            }
            return()=>{
                componentMounted=false;
            }
        }
        getProducts();
    },[])
    const Loading=()=>{
        return(
            <>loading.....</>
        )
    }
    const filterProduct=(cat)=>{
        const updatedList=data.filter((x)=>x.category===cat)
        setFilter(updatedList)

    }
    const ShowProducts=()=>{
        return(
            <>
                <div className="buttons  d-flex justify-content-center">
                <div className="btn btn-outline-dark me-2" onClick={()=> setFilter(data)}>All</div>

                <div className="btn btn-outline-dark me-2" onClick={()=> filterProduct("men's clothing")}>Men's Clothing</div>
                <div className="btn btn-outline-dark me-2" onClick={()=> filterProduct("women's clothing")}>Women's Clothing</div>
                <div className="btn btn-outline-dark me-2" onClick={()=> filterProduct("jewelery")}>Jewellery</div>
                <div className="btn btn-outline-dark me-2" onClick={()=> filterProduct("electronics")}>Electronics</div>
                </div>
                {filter.map((product)=>{
                    return(
                        <div className='col-md-3'>
                         <div className="card h-100 text-center p-4" key={product.id} >
  <img src={product.image} className="card-img-top" alt="..." height="250px"/>
  <div className="card-body">
    <h5 className="card-title mb-0">{product.title.substr(0,12)}...</h5>
    <p className="card-text lead fw-bold">Rs.{product.price}</p>
    <Link to={`/products/${product.id}`} className="btn btn-primary btn btn-outline-dark">Buy Now</Link>
  </div>
</div>

                        </div>
                    )
                })}
            </>
           
        )
    }
  return (
    <div>
        <div className="container my-5 py-5">
            <div className="row">
                <div className="col12 mb-5">
                    <h1 className='display-6 fw-bolder text-center'>Latest Products</h1>
                    <hr />
                </div>
            </div>
            <div className="row justify-content-center">
                {loading?<Loading/>:<ShowProducts/>}
            </div>
        </div>
    </div>
  )
}

export default Products