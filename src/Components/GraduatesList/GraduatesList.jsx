import React, { Component } from "react";
import { Input, Table, Loader, Dimmer, Message } from "semantic-ui-react";
import FilterButton from "./FilterButton";
import Graduated from "./Graduated";
import NahualLogo from "../../assets/logo-proyecto-nahual.webp";
import FactoryFilter from "../FilterGraduates/FactoryFilter/FactoryFilter";
import GraduateService from "../../Services/Services-Graduates/GraduateService";

class GraduatesList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			graduates: [],
			filterBy: "All",
			filterCriteria: "",
			newFilterRequest: false,
			displayLoader: true,
			selectedEgresades: []
		};
	}

	componentDidMount() {
		this.getAllGraduates();
	}

	getResponse(response) {
		this.setState({
			graduates: response.data.response,
			newFilterRequest: false,
			displayLoader: false
		});
	}

	catchError(error) {
		this.setState({
			newFilterRequest: false,
			displayLoader: false
		});
		alert("There is an error with the data base. status: " + error.status);
	}

	async getAllGraduates() {
		await GraduateService.GetGraduates()
			.then(response => {
				this.getResponse(response);
			})
			.catch(error => {
				this.catchError(error);
			});
	}

	async getFilteredGraduates() {
		await FactoryFilter(this.state.filterCriteria)
			.then(response => {
				this.getResponse(response);
			})
			.catch(error => {
				this.catchError(error);
			});
	}

	listGraduates() {
		if (this.state.newFilterRequest) {
			this.getFilteredGraduates();
		}
		return this.mapGraduatedList(this.state.graduates);
	}

	mapGraduatedList(graduatedList) {
		return graduatedList.map((graduated, index) => {
			return (
				<Graduated
					item={graduated}
					key={index}
					selectEgresade={this.selectEgresades}
				/>
			);
		});
	}

	handleOnSelectOption = data => {
		this.setState({
			filterCriteria: data,
			filterBy: data.value,
			newFilterRequest: true,
			displayLoader: true
		});
	};

	loadingIcon() {
		return (
			this.state.displayLoader === true && (
				<Dimmer active inverted>
					<Loader inverted>Cargando</Loader>
				</Dimmer>
			)
		);
	}

	emptyList() {
		let messageHeader = "por el momento no tenemos egresades disponibles.";
		let messageContent = "Intenta mas tarde";
		if (this.state.filterBy !== "All") {
			messageHeader = "no existen datos relacionados con su busqueda.";
			messageContent = "Intenta con otro filtro";
		}
		return (
			this.state.graduates.length === 0 && (
				<Message
					icon="warning sign"
					warning
					header={`Lo sentimos, ${messageHeader}`}
					content={`${messageContent}. Gracias`}
				/>
			)
		);
	}

	selectAllEgresades() {
		let checkboxes = Array.from(document.getElementsByName("checkbox"));
		checkboxes.map(checkbox => {
			return (checkbox.checked = checkboxes[0].checked);
		});
		checkboxes[0].checked
			? this.setState({ selectedEgresades: this.state.graduates })
			: this.setState({ selectedEgresades: [] });
	}

	selectEgresades = (graduated, checked) => {
		console.log(checked);
		if (checked) {
			this.state.graduates.map(egresade => {
				return egresade.id === graduated.id &&
					this.setState({
						selectedEgresades: this.state.selectedEgresades.concat(graduated)
					});
			});
		} else {
			this.state.selectedEgresades.map(() => {
				return this.setState({
					selectedEgresades: this.state.selectedEgresades.filter(
						e => e.id !== graduated.id
					)
				});
			});
		}
	};

	render() {
		return (
			<div style={{ paddingBottom: "5%" }}>
				<img
					src={NahualLogo}
					width="150"
					style={{ marginTop: 20 }}
					alt="Nahual"
				/>
				<h1>Lista Egresades</h1>
				<div style={{ marginLeft: "150px", marginRight: "150px" }}>
					{this.loadingIcon()}
					<Table
						style={{
							borderCollapse: "collapse",
							border: "#81ce32 2px solid"
						}}
						inverted
						unstackable
						verticalAlign="middle"
						celled
					>
						<Table.Header style={{ backgroundColor: "#81ce32" }}>
							<Table.Row>
								<Table.HeaderCell colSpan="2">
									<FilterButton
										handleOnSelectOption={this.handleOnSelectOption}
									/>
								</Table.HeaderCell>
								<Table.HeaderCell colSpan="4">
									{/* <Input icon="search" iconPosition="left" className="search"/> */}
								</Table.HeaderCell>
							</Table.Row>
						</Table.Header>
						<Table.Header style={{ backgroundColor: "#81ce32" }}>
							<Table.Row style={{ textAlign: "left" }}>
								<Table.HeaderCell style={{ textAlign: "center" }}>
									<input
										type="checkbox"
										name="checkbox"
										onClick={() => this.selectAllEgresades()}
										style={{ transform: "scale(1.4)" }}
									/>
								</Table.HeaderCell>
								<Table.HeaderCell>NOMBRE</Table.HeaderCell>
								<Table.HeaderCell>NODO</Table.HeaderCell>
								<Table.HeaderCell>MODULOS CURSADOS</Table.HeaderCell>
								<Table.HeaderCell>NIVEL DE INGLES</Table.HeaderCell>
								<Table.HeaderCell></Table.HeaderCell>
							</Table.Row>
						</Table.Header>
						<Table.Body
							style={{
								color: "black",
								backgroundColor: "white",
								textAlign: "left"
							}}
						>
							{
								(console.log(this.state.selectedEgresades),
								this.listGraduates())
							}
						</Table.Body>
					</Table>
					{this.emptyList()}
				</div>
			</div>
		);
	}
}

export default GraduatesList;
