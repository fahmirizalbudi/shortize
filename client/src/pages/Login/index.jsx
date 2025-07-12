import FlexBox from "../../components/FlexBox/index.jsx"
import logo from "../../assets/logo.png"
import TextBox from "../../components/TextBox/index.jsx";
import StandardButton from "../../components/StandardButton/index.jsx";
import {useContext, useState} from "react";
import {AuthContext} from "../../contexts/AuthContext.jsx";
import {useNavigate} from "react-router-dom";

const Login = () => {

    const { login, loading } = useContext(AuthContext)
    const navigate = useNavigate()

    const [form, setForm] = useState({});
    const [validate, setValidate] = useState(null);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setValidate(null);

        try {
            await login(form);
            if (loading) return <div className="loader"></div>;
            navigate('/admin');
        } catch (err) {
            console.error(err)
            setValidate('Invalid credentials.');
        }
    };

    return (
        <FlexBox properties="w-full items-center justify-center min-h-screen font-outfit bg-[#F5F5F5] flex-col">
            <form onSubmit={handleSubmit} className="flex w-108 bg-white rounded-2xl p-8 pb-18 items-center justify-center gap-5 shadow-sm flex-col">
                <img src={logo} alt="logo" width={275} className="relative right-3"/>
                <TextBox hint="Enter your email ..." withLabel labelName="Email :" identifier="email" onChange={handleChange} withValidation validate={validate}/>
                <TextBox hint="Enter your password ..." type="password" withLabel labelName="Password :" identifier="password" onChange={handleChange} withValidation validate={validate}/>
                <StandardButton properties="px-5 py-[9px] w-full font-outfit font-normal bg-[#534FEB] rounded text-white cursor-pointer" text="Log In" buttonType="submit" />
            </form>
        </FlexBox>
    )
}

export default Login