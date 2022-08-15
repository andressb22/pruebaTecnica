import {useState} from 'react'
import styles from './styles/modals.module.css'

const datosForm = (method,body)=>{
    let data = {
      headers: {
            'Content-Type': 'application/json'
      },
      method,
      body
    }
    return data
}


const Modals = ({cerrar,datos}) => {
  const [datosInput,setDatosInput] = useState({})
  const [error,setError] = useState('')

  const handleSubmit = async (e)=>{
    e.preventDefault()
    if(datosInput.nombre === "" || datosInput.raza === "" || datosInput === ""){
        return setError('porfavor rellenar todos los campos')
    }
    if(isNaN(datosInput.edad)){
        return setError('campo edad invalido')
    }

    if(datos.tipo === 0){
        let data = datosForm('POST',JSON.stringify(datosInput))
        await fetch(`https://crudcrud.com/api/${process.env.REACT_APP_ID_SERVER}/mascotas`,data)
    }
    else{
        let data = datosForm('PUT',JSON.stringify(datosInput))
        await fetch(`https://crudcrud.com/api/${process.env.REACT_APP_ID_SERVER}/mascotas/${datos.id}`,data)
    }

    cerrar(true)
  }

  const handleChange = (e)=>{
    const {name,value} = e.target;
    datosInput[name] = value ;
    setDatosInput(datosInput)
  }

  return (
    <div className={styles.contenedor} style={{height:(document.documentElement.scrollHeight ) +'px'}}>
        <div>
            <div className={styles.cont_cerrar}>
                <p onClick={()=>{cerrar(false)}}>X</p>
            </div>
            <h2 className={styles.title}>{datos.titulo}</h2>
            <form onSubmit={handleSubmit} className={styles.cont_datos}>
                <div className={styles.cont_inputs}>
                    <input type="text" placeholder='Nombre' name="nombre" onChange={handleChange}/>
                </div>
                <div className={styles.cont_inputs}>
                    <input type="text" placeholder='Raza' name="raza" onChange={handleChange}/>
                </div>
                <div className={styles.cont_inputs}>
                    <input type="text" placeholder='Edad' name="edad" onChange={handleChange}/>
                </div>
                <div>
                    <input className={styles.btn_form} type="submit" value={`enviar`}/>
                </div>  
                {error.length > 0 ? <p className={styles.error}>{error}</p>:null}
            </form>
        </div>
    </div>
  )
}

export default Modals