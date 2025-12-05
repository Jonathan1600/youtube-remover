const shortsEventListeners = () => {
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

export const shortsChromeInject = async () => {
	let [tab] = await chrome.tabs.query({
		active: true,
		currentWindow: true,
	});
	if (tab && tab.id) {
		chrome.scripting.executeScript({
			target: { tabId: tab.id, allFrames: true },
			func: shortsEventListeners,
		});
	}
};
