import { useNavigate, Link } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import "./category.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faTrash,
  faPlus,
  faXmark
} 
from "@fortawesome/free-solid-svg-icons";

const CategoryPage = () => {
    const { t } = useOutletContext();

    const [showForm, setShowForm] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);

    const [formData, setFormData] = useState({
        theme: "",
        title: "",
        color: "#000000"
    });

    const openAddForm = () => {
        setIsEditMode(false);
        setFormData({ theme: "", title: "", color: "#000000" });
        setShowForm(true);
    };

    const openEditForm = (category) => {
        setIsEditMode(true);
        setFormData(category);
        setShowForm(true);
    };

    const closeForm = () => {
        setShowForm(false);
        setFormData({ theme: "", title: "", color: "#000000" });
        setIsEditMode(false);
    };

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <div className="category-container">
            <div className="category">
                <button className="btn-add-mobile" onClick={openAddForm}>
                    <FontAwesomeIcon icon={faPlus} /> {t('CategoryPage.addCat')}
                </button>
                <h1>{t('CategoryPage.titleCat')}</h1>
                <div className="category-list">
                    <p className="titleCat">Divertissement</p>
                    <ul>
                        <li className="cat">
                            <button className="btn-edit"  onClick={() => openEditForm({
                            theme: "Divertissement",
                            title: "Streaming",
                            color: "#1abc9c"
                            })}>
                                <FontAwesomeIcon icon={faPen} />
                            </button>
                            <button className="btn-delete"><FontAwesomeIcon icon={faTrash} /></button>
                            <p>Streaming</p>
                        </li>
                        <li className="cat">
                            <button className="btn-edit"  onClick={() => openEditForm({
                            theme: "Divertissement",
                            title: "Ciné",
                            color: "#1abc9c"
                            })}>
                                <FontAwesomeIcon icon={faPen} />
                            </button>
                            <button className="btn-delete"><FontAwesomeIcon icon={faTrash} /></button>
                            <p>Ciné</p>
                        </li>
                    </ul>

                    <p className="titleCat">Jeux Vidéos</p>
                    <ul>
                        <li className="cat">
                            <button className="btn-edit"  onClick={() => openEditForm({
                            theme: "Jeux Vidéos",
                            title: "Jeu 1",
                            color: "#1abc9c"
                            })}>
                                <FontAwesomeIcon icon={faPen} />
                            </button>
                            <button className="btn-delete"><FontAwesomeIcon icon={faTrash} /></button>
                            <p>Jeu 1</p>
                        </li>
                        <li className="cat">
                            <button className="btn-edit"  onClick={() => openEditForm({
                            theme: "Jeux Vidéos",
                            title: "Jeu 2",
                            color: "#1abc9c"
                            })}>
                                <FontAwesomeIcon icon={faPen} />
                            </button>
                            <button className="btn-delete"><FontAwesomeIcon icon={faTrash} /></button>
                            <p>Jeu 2</p>
                        </li>
                    </ul>
                </div>
            </div>
            
            {showForm && <div className="modal-overlay-cat" onClick={closeForm}></div>}

            <form className={`add-category ${showForm ? "show" : ""}`}>
                <button type="button" className="btn-close" onClick={closeForm}>
                    <FontAwesomeIcon icon={faXmark} />
                </button>
                <h3>{isEditMode ? t('CategoryPage.editCat') : t('CategoryPage.addCat')}</h3>
                
                <div className="cat-theme">
                <label>
                    {t('CategoryPage.theme')}
                    <input
                    type="text"
                    name="theme"
                    value={formData.theme}
                    onChange={handleChange}
                    required
                    />
                </label>
                </div>

                <div className="cat-title">
                <label>
                    {t('CategoryPage.name')}
                    <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    />
                </label>
                </div>

                <div className="cat-color">
                <label>
                    {t('CategoryPage.color')}
                    <input
                    type="color"
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                    />
                </label>
                </div>

                <button type="submit" className="btn-add">
                    {isEditMode ? t('CategoryPage.editCat') : t('CategoryPage.addCat')}
                </button>
            </form>

        </div>
    );
};

export default CategoryPage;