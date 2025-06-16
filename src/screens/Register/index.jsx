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

  const navigate = useNavigate();
  const loginToken = sessionStorage.getItem("loginToken");
  const API_url = "http://localhost:5000";

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
    accountType: "",
    budgetStart: "",
    taux: 0,
  });
  
  const [badLogin, setBadLogin] = useState(false);
  const [badPassword, setBadPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  async function handleSubmit(e) {
    e.preventDefault();

    const {
      username,
      email,
      password,
      passwordConfirm,
      accountType,
      budgetStart,
      taux,
    } = formData;

    // Nettoyage erreurs précédentes
    setErrorMsg("");

    // Détection si le type de compte nécessite un taux
    const needsTaux = ["épargne", "epargne", "savings"];
    const accountTypeFormatted = accountType.trim().toLowerCase();
    const shouldSendTaux = needsTaux.includes(accountTypeFormatted);

    // Si taux requis, on le vérifie
    if (shouldSendTaux && (taux === "" || isNaN(taux))) {
      setErrorMsg("Le taux est requis et doit être un nombre.");
      return;
    }

    // Construction de l’objet à envoyer
    const registerData = {
      ...formData,
      accountType: accountType.trim(),
      budgetStart: parseFloat(budgetStart),
    };

    if (shouldSendTaux) {
      const parsedTaux = parseFloat(taux);
      if (isNaN(parsedTaux)) {
        setErrorMsg("Le taux est requis et doit être un nombre.");
        return;
      }
      registerData.taux = parsedTaux;
    }

    setLoading(true);

    try {
      const { data } = await axios.post(`${API_url}/api/user/sign-up`, registerData);

      sessionStorage.setItem("loginToken", data.token);
      navigate("/dashboard");

      setFormData({
        firstname: "",
        lastname: "",
        username: "",
        email: "",
        password: "",
        passwordConfirm: "",
        accountType: "",
        budgetStart: "",
        taux: "",
      });
    } catch (error) {
      setErrorMsg("Erreur réseau, veuillez réessayer.");
    }

    setLoading(false);
  }
    
  useEffect(() => {
      if (loginToken) {
          navigate("/dashboard");
      }
  }, [loginToken, navigate]);

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
        badLogin={badLogin}
        setBadLogin={setBadLogin}
      />
    )}
    {step === 2 && (
      <SignUpPart2
        formData={formData}
        setFormData={setFormData}
        nextStep={nextStep}
        prevStep={prevStep}
        badPassword={badPassword}
        setBadPassword={setBadPassword}
        errorMsg={errorMsg}
        setErrorMsg={setErrorMsg}
      />
    )}
    {step === 3 && (
      <SignUpPart3
        formData={formData}
        setFormData={setFormData}
        prevStep={prevStep}
        handleSubmit={handleSubmit}
        errorMsg={errorMsg}
        successMsg={successMsg}
        loading={loading}
      />
    )}
    </div>
  );
};

export default RegisterPage;