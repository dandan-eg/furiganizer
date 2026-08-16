---
layout: default
title: Furiganizer
---

# Furiganizer

Script Google Apps Script (Google Docs) qui ajoute les furigana entre parenthèses sur **la sélection** :

```
昨日映画を見ました  →  昨日（きのう）映画（えいが）を見（み）ました
```

## Installation (add-on, disponible sur tous tes documents)

1. Ouvre **un** Google Doc (il servira de projet de développement) → **Extensions > Apps Script**.
2. Renomme le projet **Furiganizer** (c'est ce nom qui s'affichera dans le menu Extensions).
3. Colle le contenu de `Code.gs` dans l'éditeur.
4. **Paramètres du projet > Afficher le fichier manifeste `appsscript.json`**, puis remplace-le par celui du dépôt.
5. **Déployer > Tester les déploiements** → *Sélectionner le type : module complémentaire Docs* → **Installer**.
6. Ouvre n'importe quel Google Doc : **Extensions > Furiganizer > ふりがなを付ける**.

Le déploiement de test reste installé sur ton compte : pas besoin de validation Google, et le menu suit tous tes documents.

Aucune clé d'API.

## Publication (pour tout le monde)

Le déploiement de test ci-dessus ne vaut que pour ton compte. Pour que n'importe qui puisse
installer Furiganizer depuis le Google Workspace Marketplace, voir **[PUBLISHING.md](PUBLISHING.md)** :
projet Cloud, écran de consentement OAuth, fiche du store, soumission à la revue Google.

Documents requis par la revue, déjà rédigés : [PRIVACY.md](PRIVACY.md) et [TERMS.md](TERMS.md)
(à publier sous des URL `https://` stables, par ex. via GitHub Pages).

## Utilisation

Sélectionne du texte, puis **Extensions > Furiganizer > ふりがなを付ける**.

## Notes

- Back-end : [Mikann API](https://github.com/NoHeartPen/fast-mikann-api) (Sudachi, mode C), gratuit et sans clé.
- L'analyse morphologique est indispensable : 昨日 = きのう et non さくじつ, 見ました → 見(み)ました, 日本語 = にほんご en un seul bloc.
- Les okurigana restent hors des parenthèses : 食べて → 食(た)べて, 走って → 走(はし)って.
- Lectures parfois fausses, mise en forme perdue, ne pas relancer deux fois : voir [LIMITATIONS.md](LIMITATIONS.md) avant de partager le script.
