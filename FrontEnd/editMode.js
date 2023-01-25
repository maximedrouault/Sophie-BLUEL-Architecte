// Fonction d'actualisation de la page INDEX.HTML en "MODE EDITION" (si authentifié).
export function editMode() {
	
	const authentificationToken = sessionStorage.getItem("authentificationToken");
	const authentificationState = sessionStorage.getItem("authentificationState");

	if (authentificationState === "true") {
		editModeActivation("flex");
	} else {
		editModeActivation("none");
}};

function editModeActivation (state) {
	const editModeElement = document.querySelectorAll(".edit-mode");
	for (let i = 0; i < editModeElement.length; i++) {
		editModeElement[i].style.display = state;
}};