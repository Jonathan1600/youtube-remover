const searchEventListeners = () => {
	chrome.storage.onChanged.addListener((changes, namespace) => {
		if (namespace == "sync" && changes.search) {
			const carousels = document.querySelectorAll(
				"yt-searchbox, #voice-search-button"
			);
			if (!!changes.search.newValue) {
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

export const searchChromeInject = async () => {
	let [tab] = await chrome.tabs.query({
		active: true,
		currentWindow: true,
	});
	if (tab && tab.id) {
		chrome.scripting.executeScript({
			target: { tabId: tab.id, allFrames: true },
			func: searchEventListeners,
		});
	}
};
