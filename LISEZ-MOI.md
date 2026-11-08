# Échéancier Pro

Suivi des séances par classe et par activité : thématique, statut, numéro de séance, dates d'évaluation.

Adresse de l'application : https://romeoprof.github.io/echeancier-pro/

## Installer sur l'iPad

1. Ouvrir l'adresse ci-dessus dans Chrome.
2. Menu Partager de Chrome, puis « Sur l'écran d'accueil ».
3. Ouvrir l'app depuis cette icône, puis aller dans ⚙ Réglages : le message « Prête à fonctionner hors connexion » doit s'afficher.

Ouvrir ensuite l'app toujours depuis l'icône : Chrome et l'icône peuvent garder des données séparées.

## Synchronisation

⚙ Réglages → Synchronisation en ligne, à faire une seule fois (création d'un jeton GitHub, valable un an).

Quand l'appareil a du réseau, les modifications partent dans le dépôt privé `romeoprof/echeancier-pro-donnees`, fichier `echeancier-pro.json`. Hors connexion, tout reste sur l'appareil et part plus tard. Le jeton reste sur l'appareil : il n'est ni dans le code, ni dans le fichier envoyé.

## Modifier

Presque tout se change dans l'application : calendrier, dates de trimestres, activités et lieux.
Pour modifier le code : changer `index.html`, augmenter `VERSION` dans `sw.js`, puis redéposer les fichiers sur le dépôt `romeoprof/echeancier-pro`. Les données de l'iPad sont conservées.
