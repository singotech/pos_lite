function alertE(message) {
	var alertRoot = document.getElementById("customAlert")
	if (!alertRoot) {
		alertRoot = document.createElement("div")
		alertRoot.id = "customAlert"
		document.body.appendChild(alertRoot)
	}

	alertRoot.textContent = ""
	var backdrop = document.createElement("div")
	backdrop.className = "custom-alert-backdrop"
	backdrop.setAttribute("role", "presentation")

	var dialog = document.createElement("section")
	dialog.className = "custom-alert-dialog"
	dialog.setAttribute("role", "alertdialog")
	dialog.setAttribute("aria-modal", "true")
	dialog.setAttribute("aria-labelledby", "custom-alert-title")

	var heading = document.createElement("h2")
	heading.id = "custom-alert-title"
	heading.textContent = "Something needs your attention"
	var body = document.createElement("p")
	body.textContent = String(message)

	var closeButton = document.createElement("button")
	closeButton.type = "button"
	closeButton.className = "custom-alert-close"
	closeButton.textContent = "Close"
	closeButton.addEventListener("click", alertClose)
	backdrop.addEventListener("click", function (event) {
		if (event.target === backdrop) {
			alertClose()
		}
	})
	dialog.addEventListener("keydown", function (event) {
		if (event.key === "Escape") {
			alertClose()
		}
	})

	dialog.appendChild(heading)
	dialog.appendChild(body)
	dialog.appendChild(closeButton)
	backdrop.appendChild(dialog)
	alertRoot.appendChild(backdrop)
	closeButton.focus()
}

function confirmAction(message, onConfirm, confirmLabel) {
	var alertRoot = document.getElementById("customAlert")
	if (!alertRoot) {
		alertRoot = document.createElement("div")
		alertRoot.id = "customAlert"
		document.body.appendChild(alertRoot)
	}

	alertRoot.textContent = ""
	var backdrop = document.createElement("div")
	backdrop.className = "custom-alert-backdrop"
	backdrop.setAttribute("role", "presentation")

	var dialog = document.createElement("section")
	dialog.className = "custom-alert-dialog"
	dialog.setAttribute("role", "alertdialog")
	dialog.setAttribute("aria-modal", "true")
	dialog.setAttribute("aria-labelledby", "custom-alert-title")
	dialog.setAttribute("aria-describedby", "custom-alert-message")

	var heading = document.createElement("h2")
	heading.id = "custom-alert-title"
	heading.textContent = "Confirm this action"
	var body = document.createElement("p")
	body.id = "custom-alert-message"
	body.textContent = String(message)

	var actions = document.createElement("div")
	actions.className = "custom-alert-actions"
	var cancelButton = document.createElement("button")
	cancelButton.type = "button"
	cancelButton.className = "custom-alert-cancel"
	cancelButton.textContent = "Cancel"
	cancelButton.addEventListener("click", alertClose)

	var confirmButton = document.createElement("button")
	confirmButton.type = "button"
	confirmButton.className = "custom-alert-close"
	confirmButton.textContent = confirmLabel || "Confirm"
	confirmButton.addEventListener("click", function () {
		alertClose()
		if (typeof onConfirm === "function") {
			onConfirm()
		}
	})

	backdrop.addEventListener("click", function (event) {
		if (event.target === backdrop) {
			alertClose()
		}
	})
	dialog.addEventListener("keydown", function (event) {
		if (event.key === "Escape") {
			alertClose()
		}
	})

	actions.appendChild(cancelButton)
	actions.appendChild(confirmButton)
	dialog.appendChild(heading)
	dialog.appendChild(body)
	dialog.appendChild(actions)
	backdrop.appendChild(dialog)
	alertRoot.appendChild(backdrop)
	confirmButton.focus()
}

function alertClose() {
	var alertRoot = document.getElementById("customAlert")
	if (alertRoot) {
		alertRoot.textContent = ""
	}
}