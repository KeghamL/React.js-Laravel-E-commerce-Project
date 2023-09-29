import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import Navv from "./nav";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

export default function ShowProduct() {
  const navigate = useNavigate();
  const [products, setProducts] = useState("");
  const [isWaiting, setisWaiting] = useState(true);
  const [isEmpty, setisEmpty] = useState(true);
  const [isConfirmed, setisConfirmed] = useState(false);

  useEffect(() => {
    fetchProduct();
    if (!sessionStorage.getItem("access_token")) {
      navigate("/login");
    }
  }, []);

  const fetchProduct = async () => {
    try {
      await axios.get("http://127.0.0.1:8000/api/products").then(({ data }) => {
        setProducts(data);
        setisWaiting(false);
        if (data.length > 0) {
          setisEmpty(false);
        } else {
          setisEmpty(true);
        }
      });
    } catch (error) {
      console.error(error.response.data);
    }
  };

  const deleteProduct = async (id) => {
    await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        axios
          .delete("http://127.0.0.1:8000/api/products/" + id)
          .then((response) => {
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
            navigate("/");
          });
      } else {
        navigate("/");
      }
      // .catch(({ response: { data } }) => {
      //   console.log(data.message);
      // });
    });
  };

  return (
    <div>
      <Navv />
      <div className="container">
        <div className="row">
          <div className="conl-12">
            <div className="col-12">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Description</th>
                    <th scope="col">Image</th>
                    <th scope="col">Action</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <div>
                    {isWaiting && <h1>Please Wait for loading.....</h1>}
                  </div>
                  <div>{isEmpty && <h1>There Is No Products Here!!</h1>}</div>
                  {products.length > 0 &&
                    products.map((item, key) => (
                      <tr key={key}>
                        <td>{item.title}</td>
                        <td>{item.description}</td>
                        <td>
                          <img
                            width="100px"
                            src={`http://127.0.0.1:8000/backend/storage/app/public/images/${item.image}`}
                          ></img>
                        </td>
                        <td>
                          <button
                            className="btn btn-danger"
                            onClick={() => deleteProduct(item.id)}
                          >
                            Delete
                          </button>
                        </td>
                        <td>
                          <Link
                            to={"/edit/" + item.id}
                            className="btn btn-primary"
                          >
                            Edit
                          </Link>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
