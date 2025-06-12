import { useNavigate, Link } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import "./category.css";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import ThemeTrad from "../../components/ThemeTrad";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faTrash
} 
from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from 'react-i18next';

const CategoryPage = () => {
    const { t } = useTranslation();
  const user = {
    name: "Alice Dupont",
    profilePicture: "/images/alice.jpg",
  };

    return (
        <div className="dashboard-layout">
            <Sidebar />

            <div className="dashboard-main">
                <Navbar user={user} />

                {/* Ici ton contenu principal */}
                <div className="category-container">
                    {/* <h2>Bienvenue sur le Dashboard</h2> */}
                    <div className="category">
                        {/* <button className="btn-add">
                            <p>ajouter une category</p>
                        </button> */}
                        <h1>{t('CategoryPage.titleCat')}</h1>
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
                        <h3>{t('CategoryPage.addCat')}</h3>
                        <div className="cat-theme">
                            <label>
                            {t('CategoryPage.theme')} <input type="text" name="theme" required />
                            </label>
                        </div>
                        <div className="cat-title">
                            <label>
                            {t('CategoryPage.name')} <input type="text" name="title" required />
                            </label>
                        </div>
                        <div className="cat-color">
                            <label>
                            {t('CategoryPage.color')} <input type="color" name="color" />
                            </label>
                        </div>
                        <button type="submit" className="btn-add">AJOUTER</button>
                    </form>

                </div>
            </div>
            <div className="theme-wrapper">
                <ThemeTrad />
            </div>
        </div>
    );
};

export default CategoryPage;