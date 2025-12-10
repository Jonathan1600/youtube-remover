const subsEventListeners = () => {
	chrome.storage.onChanged.addListener((changes, namespace) => {
		if (namespace == "sync" && changes.subs) {
			const results = document.evaluate(
				"//yt-formatted-string[normalize-space(text())='Subscriptions']",
				document,
				null,
				XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
				null
			);

			if (!!changes.subs.newValue) {
				for (let i = 0; i < results.snapshotLength; i++) {
					const parent =
						results.snapshotItem(i)?.parentNode?.parentNode?.parentNode
							?.parentNode?.parentNode?.parentNode?.parentNode;

					if (parent instanceof Element) {
						parent.removeAttribute("style");
					}
				}
			} else {
				for (let i = 0; i < results.snapshotLength; i++) {
					const parent =
						results.snapshotItem(i)?.parentNode?.parentNode?.parentNode
							?.parentNode?.parentNode?.parentNode?.parentNode;
					if (parent instanceof Element) {
						parent.setAttribute("style", "display: none");
					}
				}
			}
		}
	});
};

export const subsChromeInject = async () => {
	let [tab] = await chrome.tabs.query({
		active: true,
		currentWindow: true,
	});
	if (tab && tab.id) {
		chrome.scripting.executeScript({
			target: { tabId: tab.id, allFrames: true },
			func: subsEventListeners,
		});
	}
};
