import { useNavigate, Link } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios"
import "./register.css";
import ThemeTrad from "../../components/ThemeTrad";
import SignUpPart1 from "../../components/SignUpPart1";
import SignUpPart2 from "../../components/SignUpPart2";
import SignUpPart3 from "../../components/SignUpPart3";

const RegisterPage = () => {
  const [step, setStep] = useState(1); // étape actuelle
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    accountType: "",
    budgetStart: "",
    taux: ""
  });

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const handleSubmit = async () => {
    try {
    //   const res = await axios.post("http://localhost:5000/api/user/signUp", formData);
    //   console.log("Utilisateur inscrit :", res.data);
      // redirection ou message ici
    alert("Inscription réussie !");
    } catch (error) {
      alert("Erreur lors de l'inscription");
    //   console.error("Erreur :", err.response?.data || err.message);
    }
  };

    return (
      <div>
      <div className="theme-wrapper">
        <ThemeTrad />
      </div>
      {step === 1 && (
        <SignUpPart1
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
        />
      )}
      {step === 2 && (
        <SignUpPart2
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      {step === 3 && (
        <SignUpPart3
          formData={formData}
          setFormData={setFormData}
          prevStep={prevStep}
          handleSubmit={handleSubmit}
        />
    )}
    </div>
  );
};

export default RegisterPage;