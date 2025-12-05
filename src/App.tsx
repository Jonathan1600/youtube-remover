import "./App.css";
import { useEffect, useState } from "react";

const eventListeners = () => {
	window.addEventListener("load", async () => {
		const storage = await chrome.storage.sync.get(["shorts"]);
		const carousels = document.querySelectorAll(
			"ytd-rich-section-renderer, ytd-reel-shelf-renderer, grid-shelf-view-model, [aria-label='Shorts'], [title='Shorts']"
		);
		if (storage.shorts == false) {
			carousels.forEach((carousel) => {
				carousel.setAttribute("style", "display: none");
			});
		}
	});

	chrome.storage.onChanged.addListener((changes, namespace) => {
		if (namespace == "sync" && changes.shorts) {
			const carousels = document.querySelectorAll(
				"ytd-rich-section-renderer, ytd-reel-shelf-renderer, grid-shelf-view-model, [aria-label='Shorts'], [title='Shorts']"
			);
			if (!!changes.shorts.newValue) {
				carousels.forEach((carousel) => {
					carousel.removeAttribute("style");
				});
			} else {
				carousels.forEach((carousel) => {
					carousel.setAttribute("style", "display: none");
				});
			}
		}
	});
};

const doChromeScripting = async () => {
	let [tab] = await chrome.tabs.query({
		active: true,
		currentWindow: true,
	});
	if (tab && tab.id) {
		chrome.scripting.executeScript({
			target: { tabId: tab.id, allFrames: true },
			func: eventListeners,
		});
	}
};

function App() {
	const [isExtensionOn, setIsExtensionOn] = useState(false);
	const [shortsEnabled, setShortsEnabled] = useState(true);

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

			if (storage && storage.shorts && typeof storage.shorts == "boolean") {
				setShortsEnabled(storage.shorts);
			} else {
				await chrome.storage.sync.set({ shorts: true });
				setShortsEnabled(true);
			}
		};

		doChromeScripting().catch((err) => {
			console.error("Error fetching data for chromeQuery:", err);
		});

		fetchExtensionData().catch((err) => {
			console.error("Error fetching data for extension:", err);
		});

		fetchShortsData().catch((err) => {
			console.error("Error fetching data for shorts:", err);
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
					<button id="remove-shorts" onClick={toggleShorts}>
						Remove Shorts
					</button>
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
