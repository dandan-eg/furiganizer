---
layout: default
title: Furiganizer
---

# Furiganizer

Module complémentaire Google Docs qui ajoute les furigana entre parenthèses sur la sélection :

```
昨日映画を見ました  →  昨日（きのう）映画（えいが）を見（み）ました
```

## Utilisation

Sélectionne du texte, puis **Extensions > Furiganizer > ふりがなを付ける**.

## Limites connues

Les lectures produites par l'analyse morphologique sont parfois fausses sur les noms propres
et les lectures rares. La mise en forme de la sélection (gras, couleur, liens) est perdue au
remplacement, et relancer la commande deux fois sur le même texte produit des parenthèses
imbriquées. Détail : [LIMITATIONS](LIMITATIONS).

## Confidentialité

Le texte sélectionné est envoyé à un service d'analyse tiers pour obtenir les lectures.
Rien n'est conservé par le module. Voir la [politique de confidentialité](PRIVACY) et les
[conditions d'utilisation](TERMS).

## Support

Questions et signalements de bugs :
[github.com/dandan-eg/furiganizer/issues](https://github.com/dandan-eg/furiganizer/issues)

Code source : [github.com/dandan-eg/furiganizer](https://github.com/dandan-eg/furiganizer)
