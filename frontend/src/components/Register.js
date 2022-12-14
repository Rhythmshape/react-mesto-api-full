import { useState } from "react";
import { Link } from "react-router-dom";

function Register({ onRegister }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleEmailInput(evt) {
        setEmail(evt.target.value);
    }

    function handlePasswordInput(evt) {
        setPassword(evt.target.value);
    }

    function handleRegisterSubmit(evt) {
        evt.preventDefault();
        onRegister(email, password)
    }

    return (
        <section className="login">
            <h2 className="login__title">Регистрация</h2>
            <form className="login__form" onSubmit={handleRegisterSubmit}>
                <input
                    className="login__input"
                    type="email"
                    placeholder="Email"
                    onChange={handleEmailInput}
                    value={email}
                    required
                />
                <input
                    className="login__input"
                    type="password"
                    placeholder="Пароль"
                    onChange={handlePasswordInput}
                    value={password}
                    autoComplete="on"
                    required
                />
                <button className="login__button" type="submit">Зарегистрироваться</button>
            </form>
            <p className="login__text">Уже зарегестрированы?<Link to="/signin" className="login__link">Войти</Link></p>
        </section>
    )

}

export default Register;