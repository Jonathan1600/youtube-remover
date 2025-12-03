window.addEventListener("load", async () => {
    const extensionOn = await chrome.storage.sync.get(["extension"])
    const offUI = document.getElementById('off-ui')
    const optionsElement = document.getElementById('options')
    if (extensionOn && !!extensionOn.extension) {
        offUI.style.display = "none"
        optionsElement.style.display = "block"
    } else {
        await chrome.storage.sync.set({extension: false})
        offUI.style.display = "block"
        optionsElement.style.display = "none"
    }
});

document.getElementById('ytb-rmv-on').addEventListener("click", async () => {
    const extensionOn = await chrome.storage.sync.get(["extension"])
    const offUI = document.getElementById('off-ui')
    const optionsElement = document.getElementById('options')
    console.log(offUI.style.display)
    if (extensionOn && !!extensionOn.extension) {
        await chrome.storage.sync.set({extension: false})
        offUI.style.display = "block"
        optionsElement.style.display = "none"
    } else {
        await chrome.storage.sync.set({extension: true})
        offUI.style.display = "none"
        optionsElement.style.display = "block"
    }
})

document.getElementById("remove-shorts").addEventListener("click", async () => {
    console.log("CLICK")
    const [tab] = await chrome.tabs.query({active:true, currentWindow: true})
    chrome.scripting.executeScript({
        target: {tabID: tab.id},
        func: () => {
            console.log("Trying to remove shorts")
            // Remove the Shorts carousel drawer
            const carousels = document.querySelectorAll(
                "ytd-rich-section-renderer, ytd-reel-shelf-renderer"
            );
            carousels.forEach((carousel) => {
                // Add specific condition to target Shorts carousel if needed
            carousel.remove();
            });
        }
    })
})
