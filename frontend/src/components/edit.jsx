import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

export default function EditProduct() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const imageHandeler = (e) => {
    setImage(e.target.files[0]);
  };

  useEffect(() => {
    editProduct();
  }, []);

  const editProduct = async () => {
    await axios
      .get("http://127.0.0.1:8000/api/products/" + id)
      .then(({ data }) => {
        const { title, description } = data.product;
        setTitle(title);
        setDescription(description);
      })
      .catch(({ response: { data } }) => {
        console.log(data.message);
      });
  };
  const updateProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("_method", "PUT");
    formData.append("title", title);
    formData.append("description", description);
    if (image !== null) {
      formData.append("image", image);
    }
    await axios
      .post("http://127.0.0.1:8000/api/products/" + id, formData)
      .then(({ data }) => {
        Swal.fire({
          icon: "success",
          title: "Great Job",
          text: "Product Updated Successfully!",
        });
        navigate("/");
      })
      .catch(({ response }) => {
        if (response.status === 422) {
          console.log(response.data.errors);
        } else {
          console.log(response.data.message);
        }
      });
  };
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="conl-12 col-sm-12 col-md-12">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title"> Update Product</h3>
              <hr></hr>
              <div className="from-wrapper">
                <form onSubmit={updateProduct}>
                  <div className="form-group">
                    <label for="exampleInputEmail1">Title</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Title"
                      value={title}
                      onChange={(e) => {
                        setTitle(e.target.value);
                      }}
                    />
                  </div>

                  <div className="form-group">
                    <label for="exampleInputPassword1">Description</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Description"
                      value={description}
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                    />
                  </div>

                  <div className="form-group">
                    <label for="exampleInputEmail1">Image</label>
                    <input
                      type="file"
                      className="form-control"
                      placeholder="Enter Image"
                      onChange={imageHandeler}
                    />
                  </div>

                  <button type="submit" className="btn btn-primary">
                    Update
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
