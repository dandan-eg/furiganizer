---
layout: default
title: Privacy Policy
---

# Privacy Policy — Furiganizer

*Last updated: August 16, 2026*

Furiganizer is a Google Docs add-on that adds furigana to selected text.
This page describes the data processed.

## Data Processing

When you run **Extensions > Furiganizer > ふりがなを付ける**, the add-on reads **only
the text you have selected** in the open document, and replaces it with its annotated version.

Furiganizer does not read the rest of the document, does not access any other files in your Drive, and
does not access any document when not explicitly launched. This is technically guaranteed
by the authorization scope used, `documents.currentonly`, which limits access to only the
open document.

## Transmission to a Third Party

The selected text is sent via HTTPS to the public **Mikann** API
(`https://fast-mikann-api.vercel.app`, hosted on Vercel) which calculates the readings and returns
the result. This service is developed by a third party
([NoHeartPen/fast-mikann-api](https://github.com/NoHeartPen/fast-mikann-api)) and is not
controlled by the author of Furiganizer.

**Do not use Furiganizer on confidential text.**

## Data Retention

Furiganizer stores no data: no database, no application logs,
no cookies, no account. Text passes through memory during the call and then disappears.
The author has no access to any content in your documents.

Technical execution logs (errors) are those provided by the Google Apps
Script platform and do not contain document content.

## No Sharing, No Advertising

No data is sold, rented, shared for commercial purposes, or used for
advertising or model training.

## Limited Use

The use of data received from Google APIs complies with the
[Google API Services User Data policy](https://developers.google.com/terms/api-services-user-data-policy),
including its limited use requirements.

## Deletion

Since nothing is retained, there is nothing to delete. You can revoke access at any time
from [myaccount.google.com/permissions](https://myaccount.google.com/permissions) or uninstall
the add-on via **Extensions > Add-ons > Manage add-ons**.

## Contact

For any questions: open an issue on the project repository.
