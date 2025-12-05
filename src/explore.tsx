const exploreEventListeners = () => {
	chrome.storage.onChanged.addListener((changes, namespace) => {
		if (namespace == "sync" && changes.explore) {
			const results = document.evaluate(
				"//*[@id='guide-section-title' and contains(text(), 'Explore')]",
				document,
				null,
				XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
				null
			);

			if (!!changes.explore.newValue) {
				for (let i = 0; i < results.snapshotLength; i++) {
					const parent = results.snapshotItem(i)?.parentNode?.parentNode;

					if (parent instanceof Element) {
						parent.removeAttribute("style");
					}
				}
			} else {
				for (let i = 0; i < results.snapshotLength; i++) {
					const parent = results.snapshotItem(i)?.parentNode?.parentNode;
					if (parent instanceof Element) {
						parent.setAttribute("style", "display: none");
					}
				}
			}
		}
	});
};

export const exploreChromeInject = async () => {
	let [tab] = await chrome.tabs.query({
		active: true,
		currentWindow: true,
	});
	if (tab && tab.id) {
		chrome.scripting.executeScript({
			target: { tabId: tab.id, allFrames: true },
			func: exploreEventListeners,
		});
	}
};
