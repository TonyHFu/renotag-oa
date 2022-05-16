import {
	Button,
	FormControl,
	InputLabel,
	List,
	ListItem,
	MenuItem,
	Select,
	Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import MaterialsListItem from "./MaterialsListItem";
import { StatesContext } from "../pages/index";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

function MaterialsList(props) {
	const { action, selectedAction, setSelectedAction, setData, currentRoom } =
		props;

	const [add, setAdd] = useState(false);
	const [selectedMaterial, setSelectedMaterial] = useState("");
	const [units, setUnits] = useState(0);

	const states = useContext(StatesContext);
	const handleClickAdd = () => {
		setAdd(true);
	};

	const handleCancelAdd = e => {
		e.preventDefault();
		setAdd(false);
	};

	const handleSelectNewMaterial = e => {
		setSelectedMaterial(e.target.value);
	};

	const handleUnitsChange = e => {
		setUnits(e.target.value);
	};

	const handleConfirmAdd = e => {
		e.preventDefault();
		// alert("units:" + units + "\nmaterial_id: " + selectedMaterial);
		addDoc(collection(db, "actions_materials"), {
			action_id: selectedAction,
			material_id: selectedMaterial,
			units,
			updated: true,
			timestamp: serverTimestamp(),
		}).then(res => {
			console.log("successfully added doc to actions_materials");
			states.setActionsMaterials(prev => {
				return [
					...prev,
					{
						id: res.id,
						action_id: selectedAction,
						material_id: selectedMaterial,
						units,
						updated: true,
						timestamp: new Date().getTime(),
					},
				];
			});
			setSelectedMaterial("");
			setUnits(0);
			setAdd(false);
		});
	};

	return (
		<>
			<List>
				{/* <pre>{JSON.stringify(states.materials, null, 2)}</pre> */}
				{action.id === selectedAction?.toString() &&
					action.materials.map(material => (
						<MaterialsListItem
							material={material}
							key={material.material_id}
							setData={setData}
							currentRoom={currentRoom}
							selectedAction={selectedAction}
						></MaterialsListItem>
					))}
				{action.id === selectedAction?.toString() && add && (
					<form>
						<FormControl fullWidth>
							<InputLabel id="demo-simple-select-label">Material</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={selectedMaterial}
								label="Material"
								onChange={handleSelectNewMaterial}
							>
								{states.materials.map(material => {
									const materialPrice = states.materialDetails.filter(
										detail =>
											detail.updated && detail.material_id === material.id
									)[0].price;
									return (
										<MenuItem value={material.id}>
											{material.name} - Price: ${materialPrice}
										</MenuItem>
									);
								})}
							</Select>
							{/* <label htmlFor="price">Price:</label>
							<input
								type="number"
								name="price"
								onChange={handlePriceChange}
								value={price}
							></input>*/}
							<label htmlFor="units">Units:</label>
							<input
								type="number"
								name="units"
								onChange={handleUnitsChange}
								value={units}
							></input>
						</FormControl>

						<Button variant="outlined" onClick={handleConfirmAdd}>
							Confirm
						</Button>
						<Button variant="outlined" onClick={handleCancelAdd}>
							Cancel
						</Button>
					</form>
				)}
				{action.id === selectedAction?.toString() && (
					<Button variant="outlined" onClick={handleClickAdd}>
						Add
					</Button>
				)}
			</List>
		</>
	);
}

export default MaterialsList;
