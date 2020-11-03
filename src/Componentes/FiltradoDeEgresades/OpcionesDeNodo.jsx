import React, { Component } from "react";
import { Dropdown } from "semantic-ui-react";
import ServicioDeFiltrado from "../../Servicios/Servicios-OpcionesDeFiltrado/ServicioDeFiltrado";

class OpcionesDeNodo extends Component{
  constructor (props){
    super(props)
		this.state = {
      valor: '',
      opcionesDeFiltrado: []
    };
  }

  async componentDidMount() {
    await ServicioDeFiltrado.obtenerOpcionesDeNodos()
    .then(respuesta => {
      this.agregarOpcionesDeFiltrado(respuesta.data.response);
    })
    .catch(error => {
      alert("Error en la base de datos.")
    })
  }

  agregarOpcionesDeFiltrado(respuesta) {
    const opcionesDeNodo = []
    respuesta.forEach(opcionNodo => {
      opcionNodo={
        key: opcionNodo.id,
        text: opcionNodo.nombre,
        valor: opcionNodo.id,
        filtrarPor: "nodo"
      }
      opcionesDeNodo.push(opcionNodo);
    });
    this.setState({opcionesDeFiltrado:opcionesDeNodo})
  }

  manejarEvento(opcionSeleccionada){
    this.setState({ valor: opcionSeleccionada.valor });
    this.props.manejarEvento(opcionSeleccionada)
  }

  opcionesDeFiltro(){
     return (
      <Dropdown.Menu >
        {this.state.opcionesDeFiltrado.map((opcionSeleccionada) => (
          <Dropdown.Item 
            active={opcionSeleccionada.valor === this.state.valor}
            key={opcionSeleccionada.key}
            valor={opcionSeleccionada.valor}
            text={opcionSeleccionada.text}
            {... opcionSeleccionada}
            onClick={() => this.manejarEvento(opcionSeleccionada)}
          />
        ))}
      </Dropdown.Menu>
      )
  }

  componentWillReceiveProps(nuevasProps){
    if (nuevasProps.valor.desactivarOpcion === false || nuevasProps.quitarUnFiltro.filtrarPor === 'nodo')
      this.setState({valor:'Todos'})
  }

  render(){
    return  (
      <Dropdown
        text='Nodo' 
        pointing='left' 
        className='link item'
      >
        {this.opcionesDeFiltro()}
      </Dropdown>
    );
  }
}

export default OpcionesDeNodo;