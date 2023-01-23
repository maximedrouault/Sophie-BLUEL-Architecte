// Récupération des informations d'authentification à partir du FORM de LOGIN.HTML

const formInfos = document.querySelector("form");

// Fonction d'authentification à partir des informations de l'API

formInfos.addEventListener("submit", async function(event) {
    event.preventDefault();
    // Création de l'objet "userInfos"
	const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
	const userInfos = {email,password};

	// Envoi de ces informations sur l'API "LOGIN"
	const authentificationInfos = await fetch("http://localhost:5678/api/users/login", {
	method: "POST",
	headers: {"Content-Type": "application/json"},
	body: JSON.stringify(userInfos)
  	});

	// Récupération de la réponse et traduction
	const authentificationResponse = await authentificationInfos.json();
	// TOKEN du User identifié ------------------------
	const authentificationToken = authentificationResponse.token;
	// ------------------------------------------------

	if (authentificationInfos.ok) {
		window.location.replace("index.html");
	} else {
		const wrongUserNotification = document.querySelector(".wrong-user-notification");
		wrongUserNotification.innerText = "Nom d'utilisateur ou mot de passe incorrect.";

	}
});