import React, { Component } from "react";
import { Dropdown } from "semantic-ui-react";
import ServicioDeFiltrado from "../../Servicios/Servicios-OpcionesDeFiltrado/ServicioDeFiltrado";

class OptionsNode extends Component{
  constructor (props){
    super(props)
		this.state = {
      valor: '',
      filterOptions: []
    };
  }

  async componentDidMount() {
    await ServicioDeFiltrado.obtenerOpcionesDeNodos()
    .then(response => {
      this.ConstructFilterOptions(response.data.response);
    })
    .catch(error => {
      alert("Parece haber un error con la base de datos.");
    })
  }

  ConstructFilterOptions(response) {
    const ListOptionNode = []
    response.forEach(OptionNode => {
      OptionNode={
        key: OptionNode.id,
        text: OptionNode.nombre,
        value: OptionNode.nombre,
        filterby: "Node"
      }
      ListOptionNode.push(OptionNode);
    });
    this.setState({filterOptions:ListOptionNode})
  }

  handleSelected(option){
    this.setState({ valor: option.value });
    this.props.handleOnSelectOption(option)
  }

  opcionesDeFiltro(){
     return (
      <Dropdown.Menu >
        {this.state.filterOptions.map((option) => (
          <Dropdown.Item 
            active={option.value === this.state.valor}
            key={option.key}
            value={option.value}
            text={option.text}
            {... option}
            onClick={() => this.handleSelected(option)}
          />
        ))}
      </Dropdown.Menu>
      )
  }

  componentWillReceiveProps(newProps){
    if (newProps.valor.desactivarOpcion === false || newProps.quitarUnFiltro.filterby === 'Node')
       this.setState({valor:'All'})
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

export default OptionsNode;