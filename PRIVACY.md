---
layout: default
title: Politique de confidentialité
---

# Politique de confidentialité — Furiganizer

*Dernière mise à jour : 16 août 2026*

Furiganizer est un module complémentaire Google Docs qui ajoute les furigana au texte
sélectionné. Cette page décrit les données traitées.

## Données traitées

Lorsque tu lances **Extensions > Furiganizer > ふりがなを付ける**, le module lit **uniquement
le texte que tu as sélectionné** dans le document ouvert, et le remplace par sa version annotée.

Furiganizer ne lit pas le reste du document, n'accède à aucun autre fichier de ton Drive, et
n'accède à aucun document lorsqu'il n'est pas explicitement lancé. C'est garanti techniquement
par le champ d'autorisation utilisé, `documents.currentonly`, qui limite l'accès au seul
document ouvert.

## Transmission à un service tiers

Le texte sélectionné est envoyé, en HTTPS, à l'API publique **Mikann**
(`https://fast-mikann-api.vercel.app`, hébergée sur Vercel) qui calcule les lectures et renvoie
le résultat. Ce service est développé par un tiers
([NoHeartPen/fast-mikann-api](https://github.com/NoHeartPen/fast-mikann-api)) et n'est pas
contrôlé par l'auteur de Furiganizer.

**N'utilise pas Furiganizer sur du texte confidentiel.**

## Conservation

Furiganizer ne stocke aucune donnée : pas de base de données, pas de journaux applicatifs,
pas de cookies, pas de compte. Le texte transite en mémoire le temps de l'appel, puis disparaît.
L'auteur n'a accès à aucun contenu de tes documents.

Les journaux techniques d'exécution (erreurs) sont ceux fournis par la plateforme Google Apps
Script et ne contiennent pas le contenu des documents.

## Aucun partage, aucune publicité

Aucune donnée n'est vendue, louée, partagée à des fins commerciales, ni utilisée pour de la
publicité ou de l'entraînement de modèles.

## Utilisation limitée

L'utilisation des données reçues des API Google respecte la
[politique Google API Services User Data](https://developers.google.com/terms/api-services-user-data-policy),
y compris ses exigences d'utilisation limitée.

## Suppression

Puisque rien n'est conservé, il n'y a rien à supprimer. Tu peux retirer l'accès à tout moment
depuis [myaccount.google.com/permissions](https://myaccount.google.com/permissions) ou désinstaller
le module via **Extensions > Modules complémentaires > Gérer les modules complémentaires**.

## Contact

Pour toute question : ouvrir une issue sur le dépôt du projet.
