import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import axios from 'axios';

const App = () => {
	const [data, setData] = useState(null);
	const inputValueRef = useRef();
	const [error, setError] = useState(false);

	const fetchData = async (name) => {
		try {
			const result = await axios
				.get(
					`http://api.weatherapi.com/v1/current.json?key=c8c116aab7af4bdd8d9123409232105&q=${name}`
				)
				.then((res) => res.data);
			setData(result);
		} catch (err) {
			setError(true);
			console.log('Error fetching data: ', err);
		}
	};

	const handleSearch = (e) => {
		if (e.key === 'Enter') {
			fetchData(inputValueRef.current.value);
			inputValueRef.current.value = '';
		}
	};

	useEffect(() => {
		fetchData('Landon');
	}, []);

	return (
		<div className="bg-img">
			<div className="bg-overlay"></div>
			{error ? (
				<div className="fs-2">
					Something went wrong. Please type a valid location
				</div>
			) : (
				<div
					className="col-6 bg-dark p-5 border border-white rounded d-flex flex-column gap-3"
					style={{
						zIndex: 1000,
					}}>
					<input
						type="text"
						className="form-control input"
						placeholder="Search location"
						ref={inputValueRef}
						onKeyDown={handleSearch}
					/>
					<h1 className="text-warning">{data?.location?.name}</h1>
					<div className="d-flex align-items-center group justify-content-center">
						<img src={data?.current?.condition?.icon} alt="" />
						<h1>{data?.current?.condition?.text}</h1>
					</div>

					<h1>{data?.current.temp_c} °C</h1>

					<div className="row">
						<div className="col-sm-4">
							<div>
								<p>Humidity</p>
								<h1>{data?.current.humidity} %</h1>
							</div>
						</div>

						<div className="col-sm-4">
							<div>
								<p>Wind</p>
								<h1>{data?.current.wind_mph} mp/h</h1>
							</div>
						</div>

						<div className="col-sm-4">
							<div>
								<p>Feels Like</p>
								<h1>{data?.current.feelslike_c} °C</h1>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default App;
