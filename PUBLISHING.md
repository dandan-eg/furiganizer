# Publishing Furiganizer on Google Workspace Marketplace

Goal: a public Docs add-on, installable by anyone (including your teacher) from
**Extensions > Add-ons > Get add-ons**.

Everything below is done manually in the Google Cloud console + Apps Script editor.
The repository code is already prepared (`onInstall`, `createAddonMenu`, error handling, `urlFetchWhitelist`).

## 1. Google Cloud Project

1. [console.cloud.google.com](https://console.cloud.google.com) → create new project named `Furiganizer`.
2. **APIs & Services > Library** → enable **Google Workspace Marketplace SDK**.
3. In Apps Script: **Project Settings > Google Cloud Project > Change project**,
   paste the **project number** (not the ID). The script must be attached to *your* Cloud project,
   otherwise publishing is impossible.

## 2. OAuth Consent Screen

The old single "OAuth consent screen" page has become **Google Auth Platform**
(`console.cloud.google.com/auth/overview`), split across multiple pages:

**Branding**

- App name: `Furiganizer` (⚠️ no "Google" or other Google product names).
- Support email, logo.
- **Authorized domain**: fill this in *before* the following two fields appear.
- Links to **Privacy Policy** and **Terms of Service** → see `PRIVACY.md` / `TERMS.md`
  (publish via GitHub Pages to get stable `https://` URLs on the authorized domain).

**Audience**

- User type: **External**.
- Test users until the app moves to Production.

**Data Access**

- Scopes: the three from the manifest, `documents.currentonly`, `script.container.ui`
  and `script.external_request`. For an Apps Script add-on, the manifest scopes are what
  actually apply; we declare them here because that's what the review reads.
  They are deliberately narrow — this avoids heavy security review
  (no access to all of Drive, only the open document). Sensitive, but not restricted.

**Verification Center**

- **Brand verification** (logo + domain): takes a few days.

## 3. Versioned Deployment

In the Apps Script editor: **Deploy > New deployment > Add-on**.
Note the **deployment number** — this is what the Marketplace SDK asks for.
Each published update = new deployment + store listing update.

## 4. Marketplace SDK

**APIs & Services > Google Workspace Marketplace SDK > App configuration**:

- Visibility: **Public**.
- Installation: **Individual users + Administrator** (otherwise only domain admins
  can install, which would block personal Gmail accounts).
- Integrations: **Docs add-on**, with the script ID and deployment number.
- Scopes: identical to the manifest, character for character.

## 5. Store Listing

**Store listing** tab. Assets to prepare:

| Item | Constraint |
|---|---|
| Name | 50 characters max |
| Short description | 200 characters max |
| Long description | 16,000 characters max |
| Icon | PNG **32×32** and **128×128** |
| Card banner | **220×140** |
| Screenshots | 1 to 10, **1280×800** recommended (640×400 or 2560×1600 accepted), full frame, no margins |
| URL | privacy policy, terms of service, support |
| Category + language | choose (Japanese/English) |

At least one screenshot must show the add-on **in action in Google Docs** (Extensions menu visible
+ before/after on a sentence): this is an explicit review criterion.

## 6. Submission

**Publish > Submit for review**. Google reviews both the listing *and* the app behavior.
Expect a few days to a few weeks. Common rejection reasons:

- screenshots that don't show Docs integration;
- description that doesn't clearly explain what the app does;
- privacy policy that doesn't mention sending data to a third party.

## Important Note: Dependency on Mikann

The add-on sends selected text to `fast-mikann-api.vercel.app`, a public instance
you don't control. Consequences once public:

- if it goes down or changes URL, the add-on breaks for **all** users, and you'll need
  to republish a version (going through review again);
- you must declare this in the privacy policy (done in `PRIVACY.md`).

It's still publishable as-is. But if the add-on gains traction, hosting your own service becomes the
first priority — you'd just need to change `FURIGANA_ENDPOINT` and `urlFetchWhitelist`.

See also `LIMITATIONS.md`: occasional incorrect readings and formatting loss
deserve mention in the store description, not discovery by the user.
