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
        value: "Todos",
        filtrarPor: "Todos",
      },
      moduloCompletado: {
        mostrarBoton: false,
        texto: "",
        value: "Todos",
      },
      nivelDeIngles: {
        mostrarBoton: false,
        texto: "",
        value: "Todos",
      },
      nodo: {
        mostrarBoton: false,
        texto: "",
        value: "Todos",
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

  enviarEstadosModuloCompletado(filtroSeleccionado) {
    if (filtroSeleccionado.value === "Todos") {
      this.setState(
        {
          moduloCompletado: {
            mostrarBoton: false,
          },
        },
        () => {
          this.validarTodosLosFiltrosRemovidos();
          this.props.quitarFiltro(filtroSeleccionado);
        }
      );
    } else
      this.setState({
        moduloCompletado: {
          mostrarBoton: true,
          texto: filtroSeleccionado.text,
          filtro: "Modulo Completado",
          value: "Todos",
          filtrarPor: filtroSeleccionado.filtrarPor,
        },
      });
  }

  enviarEstadosNivelDeIngles(filtroSeleccionado) {
    if (filtroSeleccionado.value === "Todos") {
      this.setState(
        {
          nivelDeIngles: {
            mostrarBoton: false,
          },
        },
        () => {
          this.validarTodosLosFiltrosRemovidos();
          this.props.quitarFiltro(filtroSeleccionado);
        }
      );
    } else
      this.setState({
        nivelDeIngles: {
          mostrarBoton: true,
          texto: filtroSeleccionado.text,
          filtro: "Nivel de Ingles",
          value: "Todos",
          filtrarPor: filtroSeleccionado.filtrarPor,
        },
      });
  }

  enviarEstadosNodo(filtroSeleccionado) {
    if (filtroSeleccionado.value === "Todos") {
      this.setState(
        {
          nodo: {
            mostrarBoton: false,
          },
        },
        () => {
          this.validarTodosLosFiltrosRemovidos();
          this.props.quitarFiltro(filtroSeleccionado);
        }
      );
    } else
      this.setState({
        nodo: {
          mostrarBoton: true,
          texto: filtroSeleccionado.text,
          filtro: "Nodo",
          value: "Todos",
          filtrarPor: filtroSeleccionado.filtrarPor,
        },
      });
  }

  opciones(opcionSeleccionada) {
    // eslint-disable-next-line
    switch (opcionSeleccionada.filtrarPor) {
      case "moduloCompletado":
        this.enviarEstadosModuloCompletado(
          opcionSeleccionada
        );
        break;
      case "nivelDeIngles":
        this.enviarEstadosNivelDeIngles(
          opcionSeleccionada
        );
        break;
      case "nodo":
        this.enviarEstadosNodo(
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
      <>
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
      </>
    );
  }
}

export default OpcionesDeQuitarFiltro;
