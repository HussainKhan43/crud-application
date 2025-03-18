import React, { useEffect, useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { adddata, updatedata, deldata } from "../context/ContextProvider";
import { BACKEND_URL } from "../utils/utils";


function Home() {
    const { udata, setUdata } = useContext(adddata);
    const { updata, setUPdata } = useContext(updatedata);
    const { dltdata, setDLTdata } = useContext(deldata);

    const [getuserdata, setUserdata] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [ageFilter, setAgeFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const getdata = async () => {
        try {
            const res = await fetch(`${BACKEND_URL}/getdata`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await res.json();
            setUserdata(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        getdata();
    }, []);

    const deleteuser = async (id) => {
        const res2 = await fetch(`${BACKEND_URL}/deleteuser/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const deletedata = await res2.json();

        if (res2.status === 422 || !deletedata) {
            alert("Error in deleting user");
        } else {
            alert("User deleted successfully");
            setDLTdata(deletedata);
            getdata();
        }
    };

    const ageRanges = [
        { label: "All", value: "" },
        { label: "18-25", value: "18-25" },
        { label: "26-35", value: "26-35" },
        { label: "36-50", value: "36-50" },
    ];

    const filterByAge = (user) => {
        if (!ageFilter) return true;
        const [min, max] = ageFilter.split("-").map(Number);
        return user.age >= min && user.age <= max;
    };

    const filteredUsers = getuserdata.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        filterByAge(user)
    );

    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const currentUsers = filteredUsers.slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

    return (
        <>
            <div className="container mt-3">
                <div className="input-group mb-3">
                    <input
                        type="text"
                        placeholder="Search by name..."
                        className="form-control border-primary"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <select
                        className="form-select border-primary ms-2"
                        value={ageFilter}
                        onChange={(e) => setAgeFilter(e.target.value)}
                    >
                        {ageRanges.map((range, index) => (
                            <option key={index} value={range.value}>{range.label}</option>
                        ))}
                    </select>
                    <span className="input-group-text bg-primary text-white">
                        <i className="fa-solid fa-search"></i>
                    </span>
                </div>
            </div>
            
            <div className="mt-5">
                <div className="container">
                    <div className="add_btn mt-2 mb-2">
                        <NavLink to="/register" className="btn btn-primary">
                            <i className="fa-solid fa-plus"></i> Add data
                        </NavLink>
                    </div>
                    <table className="table">
                        <thead>
                            <tr className="table-dark">
                                <th scope="col">ID</th>
                                <th scope="col">Username</th>
                                <th scope="col">Email</th>
                                <th scope="col">Job</th>
                                <th scope="col">Number</th>
                                <th scope="col">Age</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentUsers.map((element, index) => (
                                <tr key={index}>
                                    <th scope="row">{firstIndex + index + 1}</th>
                                    <td>{element.name}</td>
                                    <td>{element.email}</td>
                                    <td>{element.work}</td>
                                    <td>{element.mobile}</td>
                                    <td>{element.age}</td>
                                    <td className="d-flex justify-content-between">
                                        <NavLink to={`view/${element._id}`}>
                                            <button className="btn btn-success">
                                                <i className="fa-solid fa-eye"></i>
                                            </button>
                                        </NavLink>
                                        <NavLink to={`edit/${element._id}`}>
                                            <button className="btn btn-primary">
                                                <i className="fa-solid fa-pen"></i>
                                            </button>
                                        </NavLink>
                                        <button className="btn btn-danger" onClick={() => deleteuser(element._id)}>
                                            <i className="fa-solid fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {/* Pagination */}
                    <nav>
                        <ul className="pagination justify-content-center">
                            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                                <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
                            </li>
                            {[...Array(totalPages)].map((_, i) => (
                                <li key={i} className={`page-item ${currentPage === i + 1 ? "active" : ""}`}>
                                    <button className="page-link" onClick={() => setCurrentPage(i + 1)}>{i + 1}</button>
                                </li>
                            ))}
                            <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                                <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    );
}

export default Home;
