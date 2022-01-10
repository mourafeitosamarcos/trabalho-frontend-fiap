import { NextPage } from "next";
import { useState } from "react"
import { executeRequest } from "../services/api";
import { SignUpResponse } from "../types/SignUpResponse";

type SignUpProps = {
    setToken(s: string) : void
}

export const SignUp : NextPage = () => {

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msgError, setError] = useState('');

    const doSignUp = async () => {
        try {
            if (!nome|| !email || !password) {
                setError('favor preencher os dados');
                return;
            }

            setError('');

            const body = {
                nome,
                email,
                password
            };

            const result = await executeRequest('user', 'POST', body);
            if(result && result.data){
                const loginResponse = result.data as SignUpResponse;
               
            }
        } catch (e : any) {
            if(e?.response?.data?.error){
                console.log(e?.response);
                setError(e?.response?.data?.error);
                return;
            }
            console.log(e);
            setError('Ocorreu erro ao efetuar login, tente novamenete');
        }
    }

    return (
        <div className="container-login">            
            <div className="form">
                {msgError && <p>{msgError}</p>}
                <div className="input">
                    <input type="text" placeholder="Informe seu nome"
                        value={nome} onChange={evento => setNome(evento.target.value)} />
                </div>
                <div className="input">
                    <input type="text" placeholder="Informe seu email"
                        value={email} onChange={evento => setEmail(evento.target.value)} />
                </div>
                <div className="input">
                    <input type="password" placeholder="Informe sua senha"
                        value={password} onChange={evento => setPassword(evento.target.value)} />
                </div>
                <button onClick={doSignUp}>Salvar</button>
            </div>

        </div>
    )
}