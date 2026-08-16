# Limitations connues

## Dépendance à un service tiers

Le script appelle [Mikann API](https://github.com/NoHeartPen/fast-mikann-api) (`https://fast-mikann-api.vercel.app/ruby/`), un analyseur Sudachi hébergé sur Vercel.

- **Pas de clé d'API** — c'est ce qui rend le script partageable tel quel.
- **Aucune garantie de pérennité** : projet personnel, pas de SLA, pas de quota documenté. S'il disparaît, changer `FURIGANA_ENDPOINT` (autre piste : [Yomi API](https://github.com/ookii-tsuki/yomi), sans clé mais découpage plus fin — voir ci-dessous ; ou l'API ルビ振り de Yahoo! JAPAN, qui demande un Client ID).
- **Confidentialité** : le texte sélectionné part sur un serveur tiers. À éviter pour du contenu sensible.
- **La phrase voyage dans l'URL** (`/ruby/<phrase>`), pas dans un corps de requête. Conséquences : un `/` dans le texte provoquerait un 404 — le script découpe donc sur `/` et fait plusieurs appels — et une sélection très longue peut dépasser la limite de longueur d'URL. Aucune limite de taille n'est documentée : pour de longs passages, procéder paragraphe par paragraphe.

## Qualité de l'analyse

Sudachi (mode C, unités longues) gère bien les composés — `日本語(にほんご)` et non `日本(にっぽん)語(ご)` — mais reste statistique :

- **Homographes** : souvent juste (`会議を行(おこな)った` / `駅に行(い)った`), parfois faux — `辛いカレー` sort en `辛(つら)い` au lieu de `辛(から)い`.
- **Découpage imparfait** : `一日中` → `一(いち)日(にち)中(ちゅう)` au lieu de `一日中(いちにちじゅう)`.
- **Lectures littéraires** : `私` → `わたくし` plutôt que `わたし`.
- **Noms propres et prénoms** : lecture plausible mais non garantie (`田中(たなか)健太(けんた)` ici correct, mais rien ne l'assure).
- **Aucun dictionnaire d'exceptions** : pas de moyen de forcer une lecture. Il faut relire et corriger à la main.

## Comportement dans le document

- **Sélection uniquement** — rien ne se passe sans sélection.
- **La mise en forme du passage est perdue** : le texte est supprimé puis réinséré, il reprend le style du début de la plage (gras, couleurs, liens partiels disparaissent).
- Relancer sur un passage déjà annoté est sans danger : `stripFurigana()` retire les `(かな)` existants avant l'analyse, le résultat est identique. En revanche une lecture corrigée à la main sera écrasée.
- Seuls les éléments texte sont traités. Tableaux, en-têtes/pieds de page, notes, zones de dessin ne sont atteints que si Docs les inclut dans la sélection courante (souvent non).
- Pas de fonction « retirer les furigana » — Ctrl+Z, ou Rechercher/Remplacer avec `([一-鿿])[(（][ぁ-ゟ]+[)）]` → `$1` (regex activée).
- Parenthèses ASCII `( )` en sortie : Google Docs n'a pas de balises ruby natives.

## Quotas Apps Script

- `UrlFetchApp` : 20 000 appels/jour (compte gratuit) ; 1 appel par exécution du menu (plus si le texte contient des `/`).
- Exécution limitée à 6 minutes — sans objet pour une sélection normale.
