const hideExploreSection = async () => {
	const observer = new MutationObserver(async (mutations, obs) => {
		const results = document.evaluate(
			"//*[@id='guide-section-title' and contains(text(), 'Explore')]",
			document,
			null,
			XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
			null
		);

		if (results.snapshotLength > 0) {
			const storage = await chrome.storage.sync.get([
				"explore",
				"isExtensionOn",
			]);
			if (storage.explore || !storage.isExtensionOn) {
				obs.disconnect();
				return;
			}
			for (let i = 0; i < results.snapshotLength; i++) {
				const parent = results.snapshotItem(i)?.parentNode?.parentNode;
				if (parent instanceof Element) {
					parent.setAttribute("style", "display: none");
				}
			}
			obs.disconnect();
		}
	});

	observer.observe(document.body, { childList: true, subtree: true });
};

const hideMoreSection = async () => {
	const observer = new MutationObserver(async (mutations, obs) => {
		const results = document.evaluate(
			"//*[@id='guide-section-title' and contains(text(), 'More from YouTube')]",
			document,
			null,
			XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
			null
		);

		if (results.snapshotLength > 0) {
			const storage = await chrome.storage.sync.get(["more", "isExtensionOn"]);
			if (storage.more || !storage.isExtensionOn) {
				obs.disconnect();
				return;
			}
			for (let i = 0; i < results.snapshotLength; i++) {
				const parent = results.snapshotItem(i)?.parentNode?.parentNode;
				if (parent instanceof Element) {
					parent.setAttribute("style", "display: none");
				}
			}
			obs.disconnect();
		}
	});

	observer.observe(document.body, { childList: true, subtree: true });
};

const hideSubsSection = async () => {
	const observer = new MutationObserver(async (mutations, obs) => {
		const results = document.evaluate(
			"//yt-formatted-string[normalize-space(text())='Subscriptions']",
			document,
			null,
			XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
			null
		);

		if (results.snapshotLength > 0) {
			const storage = await chrome.storage.sync.get(["subs", "isExtensionOn"]);
			if (storage.subs || !storage.isExtensionOn) {
				obs.disconnect();
				return;
			}
			for (let i = 0; i < results.snapshotLength; i++) {
				const parent =
					results.snapshotItem(i)?.parentNode?.parentNode?.parentNode
						?.parentNode?.parentNode?.parentNode?.parentNode;
				if (parent instanceof Element) {
					parent.setAttribute("style", "display: none");
				}
			}
			obs.disconnect();
		}
	});

	observer.observe(document.body, { childList: true, subtree: true });
};

const hideSearchSection = async () => {
	const observer = new MutationObserver(async (mutations, obs) => {
		const carousels = document.querySelectorAll(
			"yt-searchbox, #voice-search-button"
		);

		if (carousels.length > 0) {
			const storage = await chrome.storage.sync.get([
				"search",
				"isExtensionOn",
			]);
			if (storage.search || !storage.isExtensionOn) {
				obs.disconnect();
				return;
			}

			carousels.forEach((carousel) => {
				carousel.setAttribute("style", "display: none");
			});
		}
	});

	observer.observe(document.body, { childList: true, subtree: true });
};

const hideShortsSection = async () => {
	const observer = new MutationObserver(async (mutations, obs) => {
		const carousels = document.querySelectorAll(
			"ytd-rich-section-renderer, ytd-reel-shelf-renderer, grid-shelf-view-model, [aria-label='Shorts'], [title='Shorts']"
		);

		if (carousels.length > 0) {
			const storage = await chrome.storage.sync.get([
				"shorts",
				"isExtensionOn",
			]);
			if (storage.shorts || !storage.isExtensionOn) {
				obs.disconnect();
				return;
			}

			carousels.forEach((carousel) => {
				carousel.setAttribute("style", "display: none");
			});
		}
	});

	observer.observe(document.body, { childList: true, subtree: true });
};

hideShortsSection();
hideExploreSection();
hideMoreSection();
hideSubsSection();
hideSearchSection();
