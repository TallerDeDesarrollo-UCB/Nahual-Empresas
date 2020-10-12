import React, { Component } from "react";
import { Label, Icon } from "semantic-ui-react";

class OpcionesDeQuitarFiltro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      removerFiltro: {
        id: 0,
        key: 0,
        text: "Todos",
        value: "All",
        filterby: "Todos",
      },
      moduloCompletado: {
        mostrarBoton: false,
        texto: "",
        value: "All",
      },
      nivelDeIngles: {
        mostrarBoton: false,
        texto: "",
        value: "All",
      },
      nodo: {
        mostrarBoton: false,
        texto: "",
        value: "All",
      },
    };
  }

  ocultarBotones() {
    this.setState({
      nodo: {
        mostrarBoton: false,
      },
      moduloCompletado: {
        mostrarBoton: false,
      },
      nivelDeIngles: {
        mostrarBoton: false,
      },
    });
  }

  validarTodosLosFiltrosRemovidos() {
    if (
      this.state.moduloCompletado.mostrarBoton === false &&
      this.state.nodo.mostrarBoton === false &&
      this.state.nivelDeIngles.mostrarBoton === false
    ) {
      this.ocultarBotones();
      this.props.esUltimoFiltro(false);
    }
  }

  enviarEstadosModuloCompletado(valor, filtroPor, objeto) {
    if (valor === "All") {
      this.setState(
        {
          moduloCompletado: {
            mostrarBoton: false,
          },
        },
        () => {
          this.validarTodosLosFiltrosRemovidos();
          this.props.quitarFiltro(objeto);
        }
      );
    } else
      this.setState({
        moduloCompletado: {
          mostrarBoton: true,
          texto: valor,
          filtro: "Modulo Completado",
          value: "All",
          filterby: filtroPor,
        },
      });
  }

  enviarEstadosNivelDeIngles(valor, filtroPor, objeto) {
    if (valor === "All") {
      this.setState(
        {
          nivelDeIngles: {
            mostrarBoton: false,
          },
        },
        () => {
          this.validarTodosLosFiltrosRemovidos();
          this.props.quitarFiltro(objeto);
        }
      );
    } else
      this.setState({
        nivelDeIngles: {
          mostrarBoton: true,
          texto: valor,
          filtro: "Nivel de Ingles",
          value: "All",
          filterby: filtroPor,
        },
      });
  }

  enviarEstadosNodo(valor, filtroPor, objeto) {
    if (valor === "All") {
      this.setState(
        {
          nodo: {
            mostrarBoton: false,
          },
        },
        () => {
          this.validarTodosLosFiltrosRemovidos();
          this.props.quitarFiltro(objeto);
        }
      );
    } else
      this.setState({
        nodo: {
          mostrarBoton: true,
          texto: valor,
          filtro: "Nodo",
          value: "All",
          filterby: filtroPor,
        },
      });
  }

  opciones(opcionSeleccionada) {
    switch (opcionSeleccionada.filterby) {
      case "ModuleCompleted":
        this.enviarEstadosModuloCompletado(
          opcionSeleccionada.value,
          opcionSeleccionada.filterby,
          opcionSeleccionada
        );
        break;
      case "EnglishLevel":
        this.enviarEstadosNivelDeIngles(
          opcionSeleccionada.value,
          opcionSeleccionada.filterby,
          opcionSeleccionada
        );
        break;
      case "Node":
        this.enviarEstadosNodo(
          opcionSeleccionada.value,
          opcionSeleccionada.filterby,
          opcionSeleccionada
        );
        break;
      case "Todos":
        this.ocultarBotones();
        break;
    }
  }

  componentWillReceiveProps(newProps) {
    this.opciones(newProps.opcion);
  }

  alHacerClick(opcionSeleccionada) {
    this.opciones(opcionSeleccionada);
  }

  render() {
    return (
      <div>
        {this.state.nodo.mostrarBoton === true && (
          <Label image>
            {this.state.nodo.filtro}
            <Icon
              name="delete"
              link
              onClick={() => this.alHacerClick(this.state.nodo)}
            />
            <Label.Detail>{this.state.nodo.texto}</Label.Detail>
          </Label>
        )}

        {this.state.moduloCompletado.mostrarBoton === true && (
          <Label image>
            {this.state.moduloCompletado.filtro}
            <Icon
              name="delete"
              link
              onClick={() => this.alHacerClick(this.state.moduloCompletado)}
            />
            <Label.Detail>{this.state.moduloCompletado.texto}</Label.Detail>
          </Label>
        )}

        {this.state.nivelDeIngles.mostrarBoton === true && (
          <Label image>
            {this.state.nivelDeIngles.filtro}
            <Icon
              name="delete"
              link
              onClick={() => this.alHacerClick(this.state.nivelDeIngles)}
            />
            <Label.Detail>{this.state.nivelDeIngles.texto}</Label.Detail>
          </Label>
        )}
      </div>
    );
  }
}

export default OpcionesDeQuitarFiltro;