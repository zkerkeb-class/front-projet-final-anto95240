import { useNavigate, Link } from "react-router";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios"
import "./register.css";
import ThemeTrad from "../../components/ThemeTrad";
import SignUpPart1 from "../../components/SignUpPart1";
import SignUpPart2 from "../../components/SignUpPart2";
import SignUpPart3 from "../../components/SignUpPart3";

const RegisterPage = () => {
  const [step, setStep] = useState(1); // étape actuelle

  const navigate = useNavigate();
  const { t } = useTranslation();
  const loginToken = sessionStorage.getItem("loginToken");
  const API_url = import.meta.env.VITE_API_url;

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
    accountName: "",
    budgetStart: "",
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
      accountName,
      budgetStart,
    } = formData;

    setErrorMsg("");

    const parsedBudget = parseFloat(budgetStart);

    if (isNaN(parsedBudget) || parsedBudget < 0) {
      setErrorMsg(t('ErrorMsg.errorBudgetStart'));
      return;
    }

    if (!accountName.trim()) {
      setErrorMsg(t('ErrorMsg.errorNameAccount'));
      return;
    }

    const registerData = {
      firstname: formData.firstname.trim(),
      lastname: formData.lastname.trim(),
      username: username.trim(),
      email: email.trim(),
      password,
      passwordConfirm,
      accountName: accountName.trim(),
      budgetStart: parsedBudget,
    };

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
        accountName: "",
        budgetStart: "",
      });
    } catch (error) {
      if (error.response?.data?.message) {
        setErrorMsg(error.response.data.message);
      } else {
        setErrorMsg(t('ErrorMsg.errorNetwork'));
      }
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
        t={t}
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
        t={t}
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
        t={t}
      />
    )}
    </div>
  );
};

export default RegisterPage;