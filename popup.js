document.getElementById('remove-shorts').addEventListener("click", () => {
    console.log("CLICKED")
})

document.getElementById('ytb-rmv-on').addEventListener("click", () => {
    const offUI = document.getElementById('off-ui')
    const optionsElement = document.getElementById('options')
    console.log(offUI.style.display)
    if (!offUI.style.display || offUI.style.display == "none") {
        offUI.style.display = "block"
        optionsElement.style.display = "none"
    } else {
        offUI.style.display = "none"
        optionsElement.style.display = "block"
    }
})
