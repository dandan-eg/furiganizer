# Furiganizer

Script Google Apps Script (Google Docs) qui ajoute les furigana entre parenthèses sur **la sélection** :

```
昨日映画を見ました  →  昨日(きのう)映画(えいが)を見(み)ました
```

## Installation

1. Ouvre un Google Doc → **Extensions > Apps Script**.
2. Colle le contenu de `Code.gs` dans l'éditeur.
3. (Optionnel) **Paramètres du projet > Afficher le fichier manifeste**, puis remplace par `appsscript.json`.
4. Recharge le document : le menu **ふりがな** apparaît.

Aucune clé d'API : le script est directement partageable (copie du Doc, ou copier-coller du script).

## Utilisation

Sélectionne du texte, puis **ふりがな > ふりがなを付ける**.

## Notes

- Back-end : [Mikann API](https://github.com/NoHeartPen/fast-mikann-api) (Sudachi, mode C), gratuit et sans clé.
- L'analyse morphologique est indispensable : 昨日 = きのう et non さくじつ, 見ました → 見(み)ました, 日本語 = にほんご en un seul bloc.
- Les okurigana restent hors des parenthèses : 食べて → 食(た)べて, 走って → 走(はし)って.
- Lectures parfois fausses, mise en forme perdue, ne pas relancer deux fois : voir [LIMITATIONS.md](LIMITATIONS.md) avant de partager le script.
