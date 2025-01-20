import axios from "axios";
import React, { useContext} from "react";
import { TailSpin } from "react-loader-spinner";
import { useQuery } from "react-query";
import HomeSlider from '../../Component/HomeSlider/HomeSlider'
import CategorySlider from '../../Component/CategorySlider/CategorySlider'
import { Link } from 'react-router-dom';
import { cartContext } from "../../Context/CartContext";
import {Helmet} from "react-helmet";

import toast from "react-hot-toast";

// export default function Products() {
//   const [allProducts, setAllProducts] = useState(null);

//   async function getAllProducts() {
//     axios
//       .get("https://ecommerce.routemisr.com/api/v1/products")
//       .then((res) => {
//         setAllProducts(res.data.data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }

//   useEffect(() => {
//     getAllProducts();
//   }, []);

//   return (
//     <>
//       {allProducts ? (
//         <div className="container">
//           <div className="row g-3">
//             {allProducts.map((product, idx) => {
//               return (
//                 <div key={idx} className="col-md-2">
//                   <div className="product">
//                     <img src={product.imageCover} className="w-100" alt="uu" />
//                     <h3 className=" h6 text-main"> {product.category.name} </h3>

//                     <h2 className=" h6 ">
//                       {" "}
//                       {product.title.split(" ").slice(0, 2).join(" ")}{" "}
//                     </h2>

//                     <div className=" d-flex justify-content-between">
//                       {product.priceAfterDiscount ? (
//                         <p className=" ms-2 ">
//                           {" "}
//                           <span className=" text-decoration-line-through ">
//                             {product.price}
//                           </span>{" "}
//                           - {product.priceAfterDiscount}{" "}
//                         </p>
//                       ) : (
//                         <p className=" ms-2"> {product.price} </p>
//                       )}

//                       <p className=" me-2">
//                         {" "}
//                         <span>
//                           {" "}
//                           <i className="fa-solid fa-star text-main"></i>{" "}
//                         </span>{" "}
//                         {product.ratingsAverage}{" "}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       ) : (
//         <div className=" d-flex justify-content-center align-items-center bg-body vh-100">
//           <TailSpin
//             visible={true}
//             height="80"
//             width="80"
//             color="#4fa94d"
//             ariaLabel="tail-spin-loading"
//             radius="1"
//             wrapperStyle={{}}
//             wrapperClass=""
//           />
//         </div>
//       )}
//     </>
//   );
// }

export default function Products() {

  const {addProductToCart}=useContext(cartContext);



  async function addMyProduct(id){
   const res = await addProductToCart(id);
   if(res){
    toast.success('Added Successfully' ,{ duration:1500 , position:"top-center"})
   }
   else{
    toast.error(' OOps! Error Occured' ,{ duration:1500 , position:"top-center"})
   }
  }

  async function getAllProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  const { data, isLoading } = useQuery("getAllProducts", getAllProducts);

  // console.log(data?.data.data);

  if (isLoading) {
   return  <div className=" d-flex justify-content-center align-items-center bg-body vh-100">
      <TailSpin
        visible={true}
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>;
  }

  return (
    <>
<Helmet><title> products</title> </Helmet>
      <div className="container">
        
        <HomeSlider />
        <CategorySlider/>
      
        <div className="row  g-3 mt-3">
          {data.data.data.map((product, idx) => {

          
            
            return (
              <div key={idx} className=" products overflow-hidden col-md-2">
                {" "}
             <Link  to={`/productDetails/${product.id}`}>
             <div className="product">
                  {" "}
                  <img
                    src={product.imageCover}
                    className="w-100"
                    alt="uu"
                  />{" "}
                  <h3 className=" h6 text-main"> {product.category.name} </h3>
                  <h2 className=" h6 ">
                    {" "}
                    {product.title.split(" ").slice(0, 2).join(" ")}{" "}
                  </h2>
                  <div className=" d-flex justify-content-between">
                    {product.priceAfterDiscount ? (
                      <p className=" ms-2 ">
                        {" "}
                        <span className=" text-decoration-line-through ">
                          {product.price}
                        </span>{" "}
                        - {product.priceAfterDiscount}{" "}
                      </p>
                    ) : (
                      <p className=" ms-2"> {product.price} </p>
                    )}

                    <p className=" me-2">
                      {" "}
                      <span>
                        {" "}
                        <i className="fa-solid fa-star text-main"></i>{" "}
                      </span>{" "}
                      {product.ratingsAverage}{" "}
                    </p>
                  </div>
                </div>
             </Link>

             <button onClick={()=>{addMyProduct(product.id)}}  className="addBtn btn bg-main text-white m-auto d-block mb-3">Add to cart </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
