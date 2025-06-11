import { useNavigate, Link } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import "./category.css";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faTrash
} 
from "@fortawesome/free-solid-svg-icons";

const CategoryPage = () => {
  const user = {
    name: "Alice Dupont",
    profilePicture: "/images/alice.jpg",
  };

    return <div>
        {/* <h1>Page category</h1>
        <div className="links" >
            <Link to="/">Login</Link>
            <Link to="/register">register</Link>
            <Link to="/dashboard">dashboard</Link>
            <Link to="/deconnexion">deconnexion</Link>
            <Link to="/account">account</Link>
            <Link to="/category">category</Link>
            <Link to="/profile">profile</Link>
            <Link to="/statistique">statistique</Link>
            <Link to="/transaction">transaction</Link> 
        </div> */}

        <div className="dashboard-layout">
            <Sidebar />

            <div className="dashboard-main">
                <Navbar user={user} />

                {/* Ici ton contenu principal */}
                <div className="category-container">
                    {/* <h2>Bienvenue sur le Dashboard</h2> */}
                    <div>
                        {/* <button className="btn-add">
                            <p>ajouter une category</p>
                        </button> */}
                        <h1>liste des categories</h1>
                        <div className="category-list">
                            <p className="titleCat">Divertissement</p>
                            <ul>
                                <li className="cat">
                                    <button className="btn-edit"><FontAwesomeIcon icon={faPen} /></button>
                                    <button className="btn-delete"><FontAwesomeIcon icon={faTrash} /></button>
                                    <p>Streaming</p>
                                </li>
                                <li className="cat">
                                    <button className="btn-edit"><FontAwesomeIcon icon={faPen} /></button>
                                    <button className="btn-delete"><FontAwesomeIcon icon={faTrash} /></button>
                                    <p>Ciné</p>
                                </li>
                            </ul>

                            <p className="titleCat">Jeux Vidéos</p>
                            <ul>
                                <li className="cat">
                                    <button className="btn-edit"><FontAwesomeIcon icon={faPen} /></button>
                                    <button className="btn-delete"><FontAwesomeIcon icon={faTrash} /></button>
                                    <p>Jeux 1</p>
                                </li>
                                <li className="cat">
                                    <button className="btn-edit"><FontAwesomeIcon icon={faPen} /></button>
                                    <button className="btn-delete"><FontAwesomeIcon icon={faTrash} /></button>
                                    <p>Jeux 2</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <form className="add-category">
                        <h3>Ajouter des catégories</h3>
                        <div className="cat-theme">
                            <label>
                            Thème :
                            <input type="text" name="theme" required />
                            </label>
                        </div>
                        <div className="cat-title">
                            <label>
                            Nom :
                            <input type="text" name="title" required />
                            </label>
                        </div>
                        <div className="cat-color">
                            <label>
                            Couleur :
                            <input type="color" name="color" />
                            </label>
                        </div>
                        <button type="submit" className="btn-add">AJOUTER</button>
                    </form>

                </div>
            </div>
        </div>
    </div>;
};

export default CategoryPage;