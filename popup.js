window.addEventListener("load", async () => {
    const storage = await chrome.storage.sync.get(["extension"])
    const offUI = document.getElementById('off-ui')
    const optionsElement = document.getElementById('options')
    if (storage && !!storage.extension) {
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
    const storage = await chrome.storage.sync.get(["shorts"])
    if (storage && storage.shorts == true) {
        await chrome.storage.sync.set({shorts: false})
    } else if (storage && storage.shorts == false) {
        await chrome.storage.sync.set({shorts: true})
    }else {
        await chrome.storage.sync.set({shorts: false})
    }
})
