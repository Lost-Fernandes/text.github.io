import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { db } from '../../FireBase/FireBase';
import { collection, addDoc } from "firebase/firestore";
import { toast } from 'react-toastify';

const Carteira = () => {
    const { user } = useContext(UserContext);
    const [nome, setNome] = useState("");
    const [cpf, setCPF] = useState("");
    const [rg, setRG] = useState("");
    const [dataNascimento, setDataNascimento] = useState("");
    const [curso, setCurso] = useState("");
    const [instituicao, setinstituicao] = useState("");
    const [matricula, setMatricula] = useState("");
    const [nivelEnsino, setNivelEnsino] = useState("");
    const [cidade, setCidade] = useState("");

    async function handleGerar() {
        if (!nome || !cpf || !rg || !dataNascimento || !curso || !instituicao || !matricula || !nivelEnsino || !cidade) {
            toast.error('Por favor, preencha todos os campos', { /* ... */ });
            return;
        }

        // Use um UUID gerado aleatoriamente ou outro método para gerar um identificador único
        const UID = generateUUID();

        await addDoc(collection(db, "dadosCarteira"), {
            nome,
            cpf,
            rg,
            dataNascimento,
            curso,
            instituicao,
            matricula,
            nivelEnsino,
            cidade,
            UID
        }).then(() => {
            toast.success('Carteira cadastrada com Sucesso', { /* ... */ });
            // Limpar os campos após o cadastro
            setNome("");
            setCPF("");
            setRG("");
            setDataNascimento("");
            setCurso("");
            setinstituicao("");
            setMatricula("");
            setNivelEnsino("");
            setCidade("");
        }).catch((error) => {
            toast.error(`${error}`, { /* ... */ });
        })
    }

    // Função para gerar um UUID aleatório
    function generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    return (
        <div>
            {user ? (
                <div>
                    {/* Inputs dos dados da carteira... */}
                    <button onClick={() => { handleGerar() }}>Gerar!</button>
                </div>
            ) : (<div>Loading...</div>)}
        </div>
    )
}

export default Carteira;
