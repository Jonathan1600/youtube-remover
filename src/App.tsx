import "./App.css";
import { useEffect, useState } from "react";

function App() {
	const [isExtensionOn, setIsExtensionOn] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			const storage = await chrome.storage.sync.get(["isExtensionOn"]);

			if (
				storage &&
				storage.isExtensionOn &&
				typeof storage.isExtensionOn == "boolean"
			) {
				setIsExtensionOn(storage.isExtensionOn);
			} else {
				await chrome.storage.sync.set({ isExtensionOn: false });
				setIsExtensionOn(false);
			}
		};

		fetchData().catch((err) => {
			console.error("Error fetching data from storage:", err);
		});
	}, []);

	const toggleExtension = () => {
		chrome.storage.sync.set({ isExtensionOn: !isExtensionOn });
		setIsExtensionOn(!isExtensionOn);
	};

	return (
		<div id="main-body">
			<div id="header">
				<h2>Youtube Remover</h2>
				<button id="ytb-rmv-on" onClick={toggleExtension}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						viewBox="0 0 24 24"
						fill="none"
						stroke="#ffffff"
						stroke-width="3"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path>
						<line x1="12" y1="2" x2="12" y2="12"></line>
					</svg>
				</button>
			</div>
			{isExtensionOn ? (
				<div id="options">
					<button id="remove-shorts">Remove Shorts</button>
				</div>
			) : (
				<div id="off-ui">
					<p>Youtube Remover is off.</p>
				</div>
			)}
		</div>
	);
}

export default App;
