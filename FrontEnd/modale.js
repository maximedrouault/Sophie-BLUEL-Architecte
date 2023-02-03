// Import de la liste de tous les travaux à partir du FETCH sur l'API, de "FETCHDATAS.JS".
import { works } from "./fetchDatas.js";
// Import de la list des "CATEGORIES" à partir du FETCH sur l'API, de "FETCHDATA.JS".
import { categories } from "./fetchDatas.js";
// Import de la fonction generateGallery à partir de "gallerie.js" pour actualiser l'affichage après ajout ou suppression d'un projet.
import { generateGallery } from "./gallerie.js"


// Fonction permettant la gestion de l'ouverture et fermeture de la MODALE en "EDITMODE".
export function modale() {

	const openModalButton = document.querySelectorAll(".open-modal-button");
	const closeModalButton = document.querySelectorAll(".close-modal-button");
	const modal = document.querySelector(".modal");

	// Ajout des Listener pour ouvrir la modale (Boutons "Publier les changements" et "Modifier" à côté de Mes Projets).
	for(let i = 0; i < openModalButton.length; i++){
		openModalButton[i].addEventListener("click", function() {
		modal.style.display = "flex";
		})
	};

	// Ajout des Listener pour fermer la modale au clique sur un bouton "Fermer".
	for(let i = 0; i < closeModalButton.length; i++){
		closeModalButton[i].addEventListener("click", function() {
		modal.style.display = "none";
		});
	};

	// Ajout d'un écouteur d'événement pour fermer la modale en cliquant à l'extérieur de celle-ci.
	modal.addEventListener("click", function(event) {
		if (event.target === modal) {
			modal.style.display = "none";
		}
	});
};


// Définition du fonctionnement du bouton "RETURN" de la partie "Ajout de projet" de la "MODALE".
const returnModalButton = document.querySelector(".return-modal-button");

returnModalButton.addEventListener("click", function() {
	// Switch de la "MODALE" de la partie "Ajout de projet" à "Suppression de projet".
	const modalGallerySwitch = document.querySelector(".modal-content");
	modalGallerySwitch.style.display = "flex";
	const modalFormSwitch = document.querySelector(".modal-content-form");
	modalFormSwitch.style.display = "none";
});


// Génération de la "GALLERY" de la MODALE.
const authentificationToken = sessionStorage.getItem("authentificationToken");

// Fonction pour générer la "GALLERY" de la MODALE.
function generateGalleryModale(works) {
	// Parcours des données WORKS pour les ajouter au HTML de la MODALE.
	for (let i = 0; i < works.length; i++) {

		const work = works[i];
		// Récupération de l'élément du DOM qui accueillera les fiches des différents travaux.
		const sectionGalleryModale = document.querySelector(".modal-gallery-grid-container");
		// Création d'une balise dédiée à une fiche de travaux.
		const galleryElementModale = document.createElement("figure");
		galleryElementModale.dataset.id = work.id;
		// Création des balises.
		const imageElementModale = document.createElement("img");
		imageElementModale.src = work.imageUrl;
		imageElementModale.alt = work.title;
		imageElementModale.crossOrigin = "";
		const enlargeImageButtonElementModale = document.createElement("button");
		enlargeImageButtonElementModale.className = "enlarge-image-button-modale";
		const enlargeImageIconeElementModale = document.createElement("i");
		enlargeImageIconeElementModale.className = "fa-solid fa-arrows-up-down-left-right";
		const trashButtonElementModale = document.createElement("button");
		trashButtonElementModale.className = "trash-button-modale";
		const trashIconeElementModale = document.createElement("i");
		trashIconeElementModale.className = "fa-solid fa-trash-can";
		// Ajout des écouteurs sur les "butons corbeilles" de la "Gallerie" de la "Modale" pour pouvoir supprimer des "Projets".
		trashButtonElementModale.addEventListener("click", function() {
			// Appel de la fonction "deleteWork" pour supprimer le projet (work.id) en fonction du bouton "Trash" cliqué.
			deleteWork(work.id);
			console.log("workId", work.id);
		});
		const buttonGalleryElementModale = document.createElement("button");
		buttonGalleryElementModale.className = "edit-button-modale";
		buttonGalleryElementModale.innerText = "éditer";
		// Rattachement de la balise BUTTON à la section "sectionGalleryModale".
		sectionGalleryModale.appendChild(galleryElementModale);
		// Rattachement des balises IMG et FIGCAPTION à "galleryElement" (la balise FIGURE).
		galleryElementModale.appendChild(imageElementModale);
		galleryElementModale.appendChild(enlargeImageButtonElementModale);
		enlargeImageButtonElementModale.appendChild(enlargeImageIconeElementModale);
		galleryElementModale.appendChild(trashButtonElementModale);
		trashButtonElementModale.appendChild(trashIconeElementModale);
		galleryElementModale.appendChild(buttonGalleryElementModale);
	};
};

generateGalleryModale(works);


// Fonction de "Suppresion" de projet de la "Gallery" "Modale".
async function deleteWork(workId) {
	// Suppression du projet via l'API en fonction de l'ID du Projet (work.id).
	const deleteResponse = await fetch("http://localhost:5678/api/works/" + workId, {
		method: "DELETE",
		headers: {
			"Authorization": "Bearer " + authentificationToken
		},
	});

	// Si réponse de suppression de l'API est OK, alors on supprime le projet du DOM (Gallerie et Modale).
	if (deleteResponse.ok) {
		const workToRemove = document.querySelectorAll(`figure[data-id="${workId}"]`);

		for(let i = 0; i < workToRemove.length; i++){
			workToRemove[i].remove();
		};
		// Suppression de l'élément du tableau "works" correspondant à l'ID du projet.
		const workIndexToRemove = works.findIndex(work => workId === work.id);
		works.splice(workIndexToRemove, 1);

	} else {
		return alert("Échec de la suppresion du projet");
	};
};

// Passage de la "MODALE" en mode formulaire d'ajout de projet si clique sur le bouton "Ajouter une photo" de la partie "Gallerie / suppresion de projet" de la "MODALE".
// Ajout du Listener sur le bouton "Ajouter une photo" et SWITCH de la "MODALE" si cliqué.
const addPhotoButton = document.querySelector(".add-photo-button");

addPhotoButton.addEventListener("click", function() {
	const modalGallerySwitch = document.querySelector(".modal-content");
	modalGallerySwitch.style.display = "none";
	const modalFormSwitch = document.querySelector(".modal-content-form");
	modalFormSwitch.style.display = "flex";
});


// Injection de la liste des "CATEGORIES" dans la liste "SELECT" "#project-category" de la partie "Ajout de projet" de la "MODALE".
// Copie du tableau de catégories récupéré précédement via le FETCH en enlevant l'index 0 (catégorie "TOUS").
const categoriesModale = categories.slice(0);

// Parcours des données de "categoriesModale" pour les ajouter au HTML et créer les options de la liste "SELECT" de la partie "Ajout de projet" de la "MODALE".
for (let i = 0; i < categoriesModale.length; i++) {
	const categoryModale = categoriesModale[i];
	// Récupération de l'élément du DOM qui accueillera la liste des catégories.
	const categoryListModale = document.querySelector("#project-category");
	// Création des balises "OPTION".
	const categoryListModaleOptions = document.createElement("option");
	categoryListModaleOptions.value = categoryModale.id;
	categoryListModaleOptions.innerText = categoryModale.name;
	// Rattachement des balises "OPTION" à la liste "SELECT" de la partie "Ajout de projet" de la "MODALE".
	categoryListModale.appendChild(categoryListModaleOptions);
};



// Gestion du "PREVIEW" de l'image choisie de "L'AJOUT DE PROJET" de la "MODALE".
// Vérification de la taille du fichier et extensions autorisées définies dans le HTML.
const projectPhotoFileAddInputFormModale = document.querySelector("#project-photo-file-add-input");

projectPhotoFileAddInputFormModale.addEventListener("change", function() {
	
	// Vérification de la taille du fichier image soumis dans le champs de la "MODALE".
	if (projectPhotoFileAddInputFormModale.files[0].size <= 4 * 1024 * 1024) {
		
		// Réinitialisation de la zone "project-photo-file-add-container" du DOM
		const projectPhotoFileAddContainer = document.querySelector(".project-photo-file-add-container");
		projectPhotoFileAddContainer.innerHTML = "";
		// Création d'un élément "IMG" pour afficher la "PREVIEW" de l'image choisie.
		const projectPhotoFilePreviewFormModale = document.createElement("img");
		projectPhotoFilePreviewFormModale.src = URL.createObjectURL(projectPhotoFileAddInputFormModale.files[0]);
		projectPhotoFilePreviewFormModale.className = "project-photo-file-preview-form-modale";
		// Rattachement de la balise "IMG".
		projectPhotoFileAddContainer.appendChild(projectPhotoFilePreviewFormModale);

		// Ajout d'un listerner pour donner la possibilité de choisir une autre image en cas d'erreur de choix.
		projectPhotoFilePreviewFormModale.addEventListener("click", function() {
			projectPhotoFileAddInputFormModale.click();
		});
	} else {
		URL.revokeObjectURL(projectPhotoFileAddInputFormModale.files[0]);
		projectPhotoFileAddInputFormModale.value = "";
		return alert ("Taille de l'image supérieure à 4mo.")
	};
});


// Gestion de la validation du "FORM" de la "MODALE"
const projectTitleFormModale = document.querySelector("#project-title");
const projectCategoryFormModale = document.querySelector("#project-category");
const validButtonFormModale = document.querySelector(".valid-form");

validButtonFormModale.addEventListener("click", function(event) {
	event.preventDefault();
	// Vérification de la validité des informations des champs de la "MODALE" soumis.
	if (projectPhotoFileAddInputFormModale.checkValidity() && projectTitleFormModale.checkValidity() && projectCategoryFormModale.checkValidity() === true) {
		// Appel de fonction pour ajouter le projet à l'API et aux Galleries.
		addWork();
	} else {
		return alert("Tous les champs sont requis.")
	};
});


// Préparation des données du nouveau projet et envoi sur l'API "http://localhost:5678/api/works".
// Fonction d'ajout de projet.
async function addWork() {
	// Création de l'objet formData
	const formData = new FormData();
	
	formData.append("image", projectPhotoFileAddInputFormModale.files[0]);
	formData.append("title", projectTitleFormModale.value);
	formData.append("category", projectCategoryFormModale.value);

	const addResponse = await fetch("http://localhost:5678/api/works/", {
		method: "POST",
		headers: {
			"Authorization": "Bearer " + authentificationToken,
			accept: "application/json"			
		},
		body: formData
	});

	// Si réponse de d'ajout de l'API est OK, alors on ajoute le projet au DOM (Gallerie et Modale).
	if (addResponse.ok) {
		// Mise à jour du tableau "WORKS" avec les nouvelles données.
		works.push(await addResponse.json());

		returnModalButton.click();
		// Réinitialisation du DOM (Galleries accueil et Modale).
		const sectionGalleryModale = document.querySelector(".modal-gallery-grid-container");
		const sectionGallery = document.querySelector(".gallery");
		sectionGalleryModale.innerHTML = "";
		sectionGallery.innerHTML = "";
		// Regénération des Galleries.
		generateGalleryModale(works);
		generateGallery(works);

	} else {
		return alert("Échec de la l'ajout du projet");
	};
};