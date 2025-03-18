import React, { useContext, useState } from "react";
import { NavLink ,useNavigate} from "react-router-dom";
import { adddata } from "../context/ContextProvider";
import { BACKEND_URL } from "../utils/utils";

function Register() {

  const {udata,setUdata} = useContext(adddata);
    const navigate = useNavigate();
  
  const [inpVal, setINP] = useState({
    name: "",
    email: "",
    age: "",
    mobile: "",
    work: "",
    address: "",
    description: "",
  });

  const setdata = (e) => {
    const { name, value } = e.target;
    setINP((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const addinpdata = async (e) => {
    e.preventDefault();

    const { name, email, age, work, address, mobile, description } = inpVal;

    try {
      const res = await fetch(`${BACKEND_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, age, work, address, mobile, description }),
      });

      const data = await res.json();

      if (res.status === 201) {
        alert("User registered successfully");
        navigate("/");
        setUdata(data);
        setINP({ name: "", email: "", age: "", mobile: "", work: "", address: "", description: "" });
      } else {
        alert(data.error || "Registration failed");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <>
      <div className="container mt-4">
        <NavLink to="/">Home</NavLink>
      </div>
      <div className="container mt-3">
        <form className="mt-4" onSubmit={addinpdata}>
          <div className="row">
            {/* Name */}
            <div className="mb-3 col-lg-6 col-md-6 col-12">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input type="text" className="form-control" id="name" name="name" placeholder="Enter your name" value={inpVal.name} onChange={setdata} />
            </div>

            {/* Email */}
            <div className="mb-3 col-lg-6 col-md-6 col-12">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input type="email" className="form-control" id="email" name="email" placeholder="Enter your email" value={inpVal.email} onChange={setdata} />
            </div>

            {/* Age */}
            <div className="mb-3 col-lg-6 col-md-6 col-12">
              <label htmlFor="age" className="form-label">
                Age
              </label>
              <input type="number" className="form-control" id="age" name="age" placeholder="Enter your age" value={inpVal.age} onChange={setdata} />
            </div>

            {/* Mobile */}
            <div className="mb-3 col-lg-6 col-md-6 col-12">
              <label htmlFor="mobile" className="form-label">
                Mobile
              </label>
              <input type="tel" className="form-control" id="mobile" name="mobile" placeholder="Enter your mobile number" value={inpVal.mobile} onChange={setdata} />
            </div>

            {/* Work */}
            <div className="mb-3 col-lg-6 col-md-6 col-12">
              <label htmlFor="work" className="form-label">
                Work
              </label>
              <input type="text" className="form-control" id="work" name="work" placeholder="Enter your profession" value={inpVal.work} onChange={setdata} />
            </div>

            {/* Address */}
            <div className="mb-3 col-lg-6 col-md-6 col-12">
              <label htmlFor="address" className="form-label">
                Address
              </label>
              <input type="text" className="form-control" id="address" name="address" placeholder="Enter your address" value={inpVal.address} onChange={setdata} />
            </div>

            {/* Description */}
            <div className="mb-3 col-lg-12 col-md-12 col-12">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea className="form-control" id="description" name="description" cols="30" rows="5" placeholder="Enter description" value={inpVal.description} onChange={setdata}></textarea>
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Register;
