import "./App.css";
import { useEffect, useState } from "react";
import { shortsChromeInject } from "./shorts";
import { exploreChromeInject } from "./explore";

function App() {
	const [isExtensionOn, setIsExtensionOn] = useState(false);
	const [shortsEnabled, setShortsEnabled] = useState(true);
	const [exploreEnabled, setExploreEnabled] = useState(true);

	useEffect(() => {
		const fetchExtensionData = async () => {
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

		const fetchShortsData = async () => {
			const storage = await chrome.storage.sync.get(["shorts"]);

			if (storage && typeof storage.shorts == "boolean") {
				setShortsEnabled(storage.shorts);
			} else {
				await chrome.storage.sync.set({ shorts: true });
				setShortsEnabled(true);
			}
		};

		const fetchExploreData = async () => {
			const storage = await chrome.storage.sync.get(["explore"]);

			if (storage && typeof storage.explore == "boolean") {
				setExploreEnabled(storage.explore);
			} else {
				await chrome.storage.sync.set({ explore: true });
				setExploreEnabled(true);
			}
		};

		fetchExtensionData().catch((err) => {
			console.error("Error fetching data for extension:", err);
		});

		fetchShortsData().catch((err) => {
			console.error("Error fetching data for shorts:", err);
		});

		fetchExploreData().catch((err) => {
			console.error("Error fetching data for explore:", err);
		});

		shortsChromeInject().catch((err) => {
			console.error("Error fetching data for chromeQuery:", err);
		});

		exploreChromeInject().catch((err) => {
			console.error("Error fetching data for chromeQuery:", err);
		});
	}, []);

	const toggleExtension = () => {
		chrome.storage.sync.set({ isExtensionOn: !isExtensionOn });
		setIsExtensionOn(!isExtensionOn);
	};

	const toggleShorts = () => {
		chrome.storage.sync.set({ shorts: !shortsEnabled });
		setShortsEnabled(!shortsEnabled);
	};

	const toggleExplore = () => {
		chrome.storage.sync.set({ explore: !exploreEnabled });
		setExploreEnabled(!exploreEnabled);
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
					<label>
						<input
							id="remove-shorts"
							type="checkbox"
							defaultChecked={!shortsEnabled}
							onClick={toggleShorts}
						/>
						<span />
						<strong>Remove Shorts</strong>
					</label>
					<label>
						<input
							id="remove-explore"
							type="checkbox"
							defaultChecked={!exploreEnabled}
							onClick={toggleExplore}
						/>
						<span />
						<strong>Remove Explore Section</strong>
					</label>
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
