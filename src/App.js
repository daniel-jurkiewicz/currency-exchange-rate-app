import React, { useState, useEffect } from "react";
import Table from "./Table";

function App() {
	const [cells, setCells] = useState([]);

	const getCurrentRatesData = () => {
		fetch("https://api.nbp.pl/api/exchangerates/tables/A/?format=json")
			.then((response) => {
				if (response.ok) {
					return response.json();
				}
				throw new Error("Response not OK");
			})
			.then((data) => {
				const { rates } = data[0];
				const cells = rates.map((rate) => {
					return {
						currency: rate.currency,
						code: rate.code,
						mid: rate.mid,
					};
				});
				setCells(cells);
			});
	};

	const getPickedDateRatesData = (date) => {
		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		if (month < 10) {
			month = "0" + month;
		}
		let day = date.getDate();
		if (day < 10) {
			day = "0" + day;
		}
		let pickedDate = `${year}-${month}-${day}`;

		fetch(
			`https://api.nbp.pl/api/exchangerates/tables/A/${pickedDate}/?format=json`,
		)
			.then((response) => {
				if (response.ok) {
					return response.json();
				}
				throw new Error("Response not OK");
			})
			.then((data) => {
				const { rates } = data[0];
				const cells = rates.map((rate) => {
					return {
						currency: rate.currency,
						code: rate.code,
						mid: rate.mid,
					};
				});
				setCells(cells);
			});
	};

	const columns = React.useMemo(
		() => [
			{
				Header: "Symbol waluty",
				accessor: "code",
			},
			{
				Header: "Waluta",
				accessor: "currency",
			},
			{
				Header: "Kurs waluty",
				accessor: "mid",
			},
		],
		[],
	);

	useEffect(() => {
		getCurrentRatesData();
	}, []);

	const data = React.useMemo(() => cells, [cells]);

	return (
		<Table
			columns={columns}
			data={data}
			getPickedDateRatesData={getPickedDateRatesData}
		/>
	);
}

export default App;
