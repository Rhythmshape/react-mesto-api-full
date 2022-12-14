import React, { useState } from "react";

function Login({ onLogin, }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleEmailInput(evt) {
        setEmail(evt.target.value);
    }

    function handlePasswordInput(evt) {
        setPassword(evt.target.value);
    }

    function handleLoginSubmit(evt) {
        evt.preventDefault();
        onLogin(email, password)
    }

    return (
        <section className="login">
            <h2 className="login__title">Вход</h2>
            <form className="login__form" onSubmit={handleLoginSubmit}>
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
                    value={password}
                    onChange={handlePasswordInput}
                    autoComplete="on"
                    required
                />
                <button className="login__button" type="submit">Войти</button>
            </form>
        </section>
    )
}

export default Login;