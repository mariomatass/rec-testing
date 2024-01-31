import React from "react";
import Button from '@mui/material/Button'
import Box from '@mui/material/Box';
import { TextField } from '@mui/material'
import { useState } from "react";
import { getByAltText } from "@testing-library/react";


export function emailValidation(email) 
{

  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return pattern.test(email);
    

}

function Formulario () {

const [data, setData] = useState({nombre:'', email:''})
const [emailValidated, setEmailValidated] = useState(null)
const [lengthEmail, setLengthEmail] = useState(0)


const handleChangeEmail = (value) => {

  setData({...data, email: value})

}
const handleSubmit = () => {

  //Llamo a la función emailValidation
  const res = emailValidation(data.email);
  setEmailValidated(res)
   
}

const handleCheckForm = () => {
  setLengthEmail(data.email.length)

  if (data.email.length > 0) handleSubmit()
}
return <>
    <Box
        sx={{
            width: 500,
            maxWidth: '100%',
            margin: '50px auto'
        }}
        >
        <h3>Rellena el formulario</h3>
        
        <form>
            <TextField 
                fullWidth 
                variant="standard" 
                label="Nombre" 
                id="nombre" 
                value={data.nombre}
                onChange={(event) => {setData({...data, nombre: event.target.value})}}
                margin="normal" 
                role="input" />
   
            <TextField 
                fullWidth 
                variant="standard" 
                label="Email" 
                id="email" 
                value={data.email}
                onChange={(event) => handleChangeEmail(event.target.value)}
                margin="normal" 
                role="input" />
       
            <Button type="button" variant="outlined" sx={{marginBottom: '300px'}} onClick={handleCheckForm}>Validar</Button>

            {/*renderizado condicional: si el email es correcto aparece una imagen y
            si es incorrecto aparece otra imagen. Si no hay email no aparece imagen.*/}
            
            {(lengthEmail > 0 && emailValidated) && <img alt='ok' src='/tup.png' width='100px' height='100px' sx={{ marginTop: '10px' }} /> }
            { (lengthEmail > 0 && !emailValidated) && <img alt='wrong' src='/tdown.png' width='100px' height='100px' sx={{ marginTop: '10px' }} />}
            
        </form>
      </Box>
</>
}

export default Formulario
/*
Realiza los siguientes tests:
Tests unitarios para lafuncion emailValidation()
comprobar que la funcion devuelve un valor booleano
comrpobar que si la entrada tiene elformato correcto de un email devuelve true
comrpbar que si la entrada no tiene el formato correcto de un email (@gmail.com) devuelve false 

Test de funcionalidad del formulario 
Comprueba que se renderizan los siguientes elementos: la cabecera cuyo contenido es "Rellena el formulario" el campo de texto del nombre el campo del email y el boton 
Comprueba que cuando el usuario rellena el formulario con un email con unemailcon el formato correct y pica el boton de validar aparece la imagen cuyo alt="ok" getByAltText('texto del alt')
Comprueba qye cuando el usuario rellena el formulario con un emailcon formato incorrecto y pica el boton de validar aparece la imagen cuyo alt="wrong" para ello usa el getByAltText('texto del alt')
*/