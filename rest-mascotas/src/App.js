import './App.css';
import {useEffect,useState} from 'react'
import Perro from './iconos_svg/Perro';
import Fondo from './iconos_svg/Fondo';
import Modals from './modals/modals';

const  headers = {
  'Content-Type': 'application/json'
}

function App() {
  const[datos,setDatos] = useState([])
  const[modal,setModal] = useState(false)
  const[datosModal,setDatosModal] = useState()

  useEffect(()=>{
    
    const data = async()=>{
      const data =await fetch(`https://crudcrud.com/api/${process.env.REACT_APP_ID_SERVER}/mascotas`,{
      headers,
      method:'GET'
      })

      const res = await data.json()
      setDatos(res)
    }

    data()
  },[])

  const borrar = async (id)=>{
    await fetch(`https://crudcrud.com/api/${process.env.REACT_APP_ID_SERVER}/mascotas/${id}`,{
      headers,
      method:'DELETE'
    })

    datos.map((el,index)=>{
      if(el._id === id){
        let copiaData = datos.slice()
        copiaData.splice(index)
        setDatos(copiaData)
        return 0
      }

      return 0
    })
  }


  const cerrarModal = async (close)=> {

    if(close){
      const data = await fetch(`https://crudcrud.com/api/${process.env.REACT_APP_ID_SERVER}/mascotas`,{
        headers,
        method:'GET'
      })

      const res = await data.json()
      setDatos(res)
    }
    
    setModal(false)
  }

  const abrirModal = (titulo,tipo,id = undefined)=> {

    setModal(true)
    setDatosModal({
      titulo,
      tipo,  // 0 agregar 1 editar
      id
    })

  }

  return (
    <div className="App">
      { modal ? <Modals cerrar={cerrarModal} datos={datosModal} />:null }
      
      <div className='agregar' onClick={()=>{abrirModal('Agregar mascota',0)}}>
        <p>+</p>
      </div>
      <Fondo/>
      <div className='header'>
        <div className='cont-buscador'>
        </div>
        <div className='cont-titulo'>
          <svg className='deco-heder'  viewBox="0 0 697 332" fill="none">
            <path d="M1.14556 127.461C-1.93685 63.4073 44.4639 34.4678 90.1456 -10.5387C237.03 -155.252 506.279 -183.752 618.146 -10.5387C690.393 101.328 750.441 345.687 618.146 330.461C564.415 324.278 548.678 281.001 498.646 260.461C362.809 204.697 246.321 339.616 122.646 260.461C63.3923 222.538 4.52703 197.73 1.14556 127.461Z" fill="#203254" stroke="#328C36"/>
          </svg>
          <Perro />
          <h1>Mascotas</h1>
        </div>
      </div>
      <div className='cont-cards'>
        {
        datos.map(el=>

        <div key={el._id} className='card-mascotas'>
          <div className='cont-img-card'>
            <div className='cont-btn-card editar' onClick={()=>{abrirModal('Editar mascota',1,el._id)}}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.1199 9.46602L8.0996 19.482L6.64296 18.0254L6.79335 17.875H4.81249C4.43437 17.875 4.12499 17.5656 4.12499 17.1875V15.2066L3.97503 15.357C3.77179 15.5633 3.62269 15.8125 3.54147 16.0875L2.55405 19.4477L5.91249 18.4594C6.14882 18.3777 6.43671 18.2273 6.64296 18.0254L8.0996 19.482C7.65272 19.9289 7.09843 20.2598 6.49257 20.4359L1.32214 21.957C0.960342 22.0645 0.568897 21.9656 0.302061 21.6605C0.0352161 21.4328 -0.0645488 21.0418 0.0419278 20.6766L1.56276 15.5074C1.74151 14.9016 2.06937 14.3473 2.51667 13.9004L12.534 3.8818L18.1199 9.46602ZM21.1707 2.52442C22.2449 3.59821 22.2449 5.34102 21.1707 6.41524L19.091 8.49492L13.5051 2.90985L15.5848 0.830159C16.659 -0.243974 18.4035 -0.243974 19.4777 0.830159L21.1707 2.52442Z" fill="#203254"/>
              </svg>
            </div>
            <div className='cont-btn-card basura' onClick={()=>{borrar(el._id)}}>
              <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.03571 0.760117C6.27679 0.29425 6.77232 0 7.3125 0H12.6875C13.2277 0 13.7232 0.29425 13.9643 0.760117L14.2857 1.375H18.5714C19.3616 1.375 20 1.99074 20 2.75C20 3.50926 19.3616 4.125 18.5714 4.125H1.42857C0.639732 4.125 0 3.50926 0 2.75C0 1.99074 0.639732 1.375 1.42857 1.375H5.71429L6.03571 0.760117ZM1.38839 5.5H18.5714V19.25C18.5714 20.7668 17.2902 22 15.7143 22H4.24554C2.70759 22 1.38839 20.7668 1.38839 19.25V5.5ZM4.95982 8.9375V18.5625C4.95982 18.9406 5.32143 19.25 5.67411 19.25C6.10714 19.25 6.38839 18.9406 6.38839 18.5625V8.9375C6.38839 8.55937 6.10714 8.25 5.67411 8.25C5.32143 8.25 4.95982 8.55937 4.95982 8.9375ZM9.24554 8.9375V18.5625C9.24554 18.9406 9.60714 19.25 9.95982 19.25C10.3929 19.25 10.7143 18.9406 10.7143 18.5625V8.9375C10.7143 8.55937 10.3929 8.25 9.95982 8.25C9.60714 8.25 9.24554 8.55937 9.24554 8.9375ZM13.5714 8.9375V18.5625C13.5714 18.9406 13.8929 19.25 14.2857 19.25C14.6786 19.25 15 18.9406 15 18.5625V8.9375C15 8.55937 14.6786 8.25 14.2857 8.25C13.8929 8.25 13.5714 8.55937 13.5714 8.9375Z" fill="#CD2020"/>
              </svg>
            </div>
            <img  src={require(`./assest/perro${Math.ceil(Math.random()*7)}.jpg`)} alt={el.raza}/>
          </div>
          <div className='cont-texto-card'>  
            <p>
              <strong>Nombre: </strong>
              {el.nombre}
            </p>
            <p>
              <strong>Edad: </strong>
              {el.edad}
            </p>
            <p>
              <strong>Especie: </strong>
              {el.raza}
            </p>
          </div>
        </div>
          )
        }
      </div>
    </div>
  );
}

export default App;
