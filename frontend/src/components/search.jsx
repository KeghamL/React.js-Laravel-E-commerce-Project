// import { useState, useEffect } from "react";
// import axios from "axios";

// export default function SearchProduct() {
//   const [search, setSearch] = useState([]);
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     axios
//       .get("http://127.0.0.1:8000/api/products")
//       .then(({ data }) => {
//         setProducts(data);
//         setSearch(data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, []);

//   const Filter = (e) => {
//     setSearch(
//       products.filter((products) =>
//         products.title.toLowerCase().includes(e.target.value)
//       )
//     );
//     setProducts(Filter);
//   };
//   return (
//     <div>
//       <form class="d-flex">
//         <input
//           class="form-control mr-sm-2"
//           type="search"
//           placeholder="Search"
//           aria-label="Search"
//           value={search}
//           onChange={Filter}
//         ></input>
//         <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
//           Search
//         </button>
//       </form>
//     </div>
//   );
// }
// {
//   /* {products &&
//         products
//           .filter((products) => {
//             if (search === "") {
//               return products;
//             } else if (
//               products.title.toLowerCase().includes(search.toLowerCase())
//             ) {
//               return products;
//             }
//           })
//           .map((products, index) => (
//             <div className="box" key={index}>
//               <p>{products.title}</p>
//               <p>{products.description}</p>
//             </div>
//           ))}
//           */
// }
