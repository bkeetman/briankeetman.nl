# SiteHome testpreview

Branch: sitehome/test-preview. Bestaande env-bestanden en productie-instellingen zijn intact.

```sh
node scripts/sitehome-preview.mjs dev
```

Preview: http://localhost:3100/portfolio. Build: `node scripts/sitehome-preview.mjs build`.
De wrapper dwingt project fzn0qzqj en dataset sitehome-test af voor website en Studio, zonder CDN of bestaande productie-readtokens/revalidatiegeheimen.

Dataset sitehome-test is publiek (private is niet beschikbaar in dit project) en bevat één bestaand publiek portfolio-item met een eigen afbeeldingsasset. De seed stopt bij onbekende documentreferenties en overschrijft geen bestaande testcontent.

Een ingelogde CLI kan de idempotente seed uitvoeren vanuit studio:

```sh
npx sanity exec scripts/sitehome-seed.cjs --with-user-token
```

De tijdelijke gebruikerssessie wordt uitsluitend opgeslagen buiten de repository, in /Users/brian/.sitehome-local/sanity-session.json (0600). Configureer vervolgens vanuit SiteHome met `node scripts/configure-local.mjs`. Deel geen secrets.

Niet deployen onder de productiedomeinnaam. Cloudgebruik vereist eerst afzonderlijke minimaal bevoegde credentials en klantauthenticatie.
