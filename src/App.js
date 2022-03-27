import React, { useState, useEffect } from "react";
import Table from "./Table";

function App() {
	const [cells, setCells] = useState([]);

	const getData = () => {
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
		getData();
	}, []);

	const data = React.useMemo(() => cells, [cells]);

	return <Table columns={columns} data={data} />;
}

export default App;
