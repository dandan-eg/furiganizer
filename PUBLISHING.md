# Publier Furiganizer sur le Google Workspace Marketplace

Objectif : un add-on Docs public, installable par n'importe qui (dont ta prof) depuis
**Extensions > Modules complémentaires > Télécharger des modules complémentaires**.

Tout ce qui suit se fait à la main dans la console Google Cloud + l'éditeur Apps Script.
Le code du dépôt est déjà prêt (`onInstall`, `createAddonMenu`, gestion d'erreur, `urlFetchWhitelist`).

## 1. Projet Google Cloud

1. [console.cloud.google.com](https://console.cloud.google.com) → nouveau projet, nom `Furiganizer`.
2. **APIs & Services > Bibliothèque** → activer **Google Workspace Marketplace SDK**.
3. Dans Apps Script : **Paramètres du projet > Projet Google Cloud > Changer de projet**,
   coller le **numéro** du projet (pas l'ID). Le script doit être rattaché à *ton* projet Cloud,
   sinon la publication est impossible.

## 2. Écran de consentement OAuth

L'ancienne page unique « OAuth consent screen » est devenue **Google Auth Platform**
(`console.cloud.google.com/auth/overview`), éclatée en sous-pages :

**Branding** (Personnalisation)

- Nom de l'app : `Furiganizer` (⚠️ pas de « Google » ni de nom de produit Google dedans).
- E-mail d'assistance, logo.
- **Domaine autorisé** : à renseigner *avant* que les deux champs suivants apparaissent.
- Liens **Politique de confidentialité** et **Conditions d'utilisation** → voir `PRIVACY.md` / `TERMS.md`
  (publie-les via GitHub Pages pour avoir des URL `https://` stables, sur le domaine autorisé).

**Audience** (Public cible)

- Type d'utilisateur : **Externe**.
- Utilisateurs de test tant que l'app n'est pas passée en Production.

**Data Access** (Accès aux données)

- Scopes : les trois du manifeste, `documents.currentonly`, `script.container.ui`
  et `script.external_request`. Pour un add-on Apps Script, ce sont ceux du manifeste qui
  s'appliquent réellement ; on les déclare ici parce que c'est ce que lit la revue.
  Ils sont volontairement étroits — c'est ce qui évite la revue de sécurité lourde
  (pas d'accès à tout le Drive, seulement au document ouvert). Sensibles, mais pas restreints.

**Verification Center** (Centre de validation)

- **Vérification de la marque** (logo + domaine) : compte quelques jours.

## 3. Déploiement versionné

Dans l'éditeur Apps Script : **Déployer > Nouveau déploiement > Module complémentaire**.
Note le **numéro de déploiement** — c'est lui que demande le SDK Marketplace.
Chaque mise à jour publiée = nouveau déploiement + mise à jour de la fiche.

## 4. Marketplace SDK

**APIs & Services > Google Workspace Marketplace SDK > Configuration de l'app** :

- Visibilité : **Public**.
- Installation : **Utilisateur individuel + Administrateur** (sinon seuls les admins de domaine
  peuvent installer, ce qui bloquerait un compte Gmail perso).
- Intégrations : **Module complémentaire Docs**, avec le script ID et le numéro de déploiement.
- Scopes : identiques au manifeste, au caractère près.

## 5. Fiche du store

Onglet **Store listing**. Assets à préparer :

| Élément | Contrainte |
|---|---|
| Nom | 50 caractères max |
| Description courte | 200 caractères max |
| Description longue | 16 000 caractères max |
| Icône | PNG **32×32** et **128×128** |
| Bannière de carte | **220×140** |
| Captures d'écran | 1 à 10, **1280×800** recommandé (640×400 ou 2560×1600 acceptés), plein cadre, sans marge |
| URL | politique de confidentialité, conditions d'utilisation, support |
| Catégorie + langue | à choisir (japonais/français) |

Au moins une capture doit montrer l'add-on **en action dans Google Docs** (menu Extensions visible
+ avant/après sur une phrase) : c'est un critère de revue explicite.

## 6. Soumission

**Publier > Soumettre pour examen**. Google review la fiche *et* le comportement de l'app.
Compter quelques jours à quelques semaines. Motifs de rejet fréquents ici :

- captures qui ne montrent pas l'intégration Docs ;
- description qui ne dit pas clairement ce que fait l'app ;
- politique de confidentialité qui ne mentionne pas l'envoi de données à un tiers.

## Point de vigilance : la dépendance à Mikann

L'add-on envoie le texte sélectionné à `fast-mikann-api.vercel.app`, une instance publique
que tu ne contrôles pas. Conséquences une fois public :

- si elle tombe ou change d'URL, l'add-on est cassé pour **tous** les utilisateurs, et tu devras
  republier une version (donc repasser par une revue) ;
- tu dois le déclarer dans la politique de confidentialité (c'est fait dans `PRIVACY.md`).

Ça reste publiable tel quel. Mais si l'add-on prend, héberger ton propre service devient la
première chose à faire — il suffira alors de changer `FURIGANA_ENDPOINT` et `urlFetchWhitelist`.

Voir aussi `LIMITATIONS.md` : les lectures parfois fausses et la perte de mise en forme
méritent d'être mentionnées dans la description du store, pas découvertes par l'utilisateur.
