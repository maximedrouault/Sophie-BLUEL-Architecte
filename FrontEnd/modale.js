// Import de la liste de tous les travaux à partir du FETCH sur l'API, de FETCHDATAS.JS
import { works } from "./fetchDatas.js";


// Fonction permettant la gestion de l'ouverture et fermeture de la MODALE en "EDITMODE".
export function modale() {

	const openModalButton = document.querySelectorAll(".open-modal-button, .modify-projects");
	const closeModalBtn = document.querySelector(".close-modal-button");
	const modal = document.querySelector(".modal");

	// Ajout des écouteurs d'événements pour ouvrir la modale (Boutons "Publier les changements" et "Modifier" à côté de Mes Projets).
	for(let i = 0; i < openModalButton.length; i++){
		openModalButton[i].addEventListener("click", function() {
		modal.style.display = "flex";
		})
	};

	// Ajout d'un écouteur d'événement pour fermer la modale.
	closeModalBtn.addEventListener("click", function() {
	modal.style.display = "none";
	});

	// Ajout d'un écouteur d'événement pour fermer la modale en cliquant à l'extérieur de celle-ci.
	modal.addEventListener("click", function(event) {
		if (event.target === modal) {
			modal.style.display = "none";
		}
	});
};


// Génération de la "GALLERY" de la MODALE.

// Fonction pour générer la "GALLERY" de la MODALE.
function generateGalleryModale(works) {
	// Parcours des données WORKS pour les ajouter au HTML de la MODALE.
	for (let i = 0; i < works.length; i++) {

		const work = works[i];
		// Récupération de l'élément du DOM qui accueillera les fiches des différents travaux.
		const sectionGalleryModale = document.querySelector(".modal-gallery-grid-container");
		// Création d'une balise dédiée à une fiche de travaux.
		const galleryElementModale = document.createElement("figure");
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
	}
}

generateGalleryModale(works);