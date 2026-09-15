# Private KNX Utility editor sources

This directory is the canonical source of the KNX Utility browser bundle. Its private profiles are independent of the public compatibility editors: Alerter, AutoResponder, DateTime, WatchDog and GlobalContext.

Each value persisted in `utilityType` has an `editors/<type>.js` definition, a `templates/<type>.html` form fragment and a `locales/<locale>/<type>.json` translation dictionary. Gateway and name fields belong to the outer Utility editor and are omitted from the fragments.

`editor-field-contracts.json` records the controls captured from the original legacy forms. Tests check that each remains present exactly once in its private form, including LoadControl's five complete control and monitor address rows. Shared gateway/name controls and DateTime's intentionally removed output topic are excluded. This snapshot keeps the checks independent of legacy files at build/test time.

Run `npm run knx-utility:generate` after changing these sources. Commit the generated `resources/knxUtilityProfiles.js`, which Node-RED serves directly. `npm run knx-utility:check` checks that the committed bundle is current. The generator reads only this directory; runtime implementations live separately in `nodes/utils/knxUtilityProfiles/runtime/`.

The browser API is `KNXUltimateUtilityProfiles`. `getDefinition(type, RED)` captures a private editor registration without registering a legacy node. `getTemplate(type)` supplies the matching form. `translate(type, key, RED, replacements)` uses embedded translations, including fully qualified historical namespaces. `currentLocale(RED)` first checks the active Utility catalog, then editor settings and browser language.

The wrapper must load `htmlUtils.js`, preserve the profile lifecycle context and call `oneditcancel` when unmounting a form. Profiles namespace handlers on shared gateway controls with `.knxUtilityProfile`. DateTime keeps its ETS address suggestions inside the private factory and invalidates pending editor work during cleanup, so a late response cannot change a newly selected profile. Its send button uses the Utility-owned `knxUltimateUtility/sendNow` endpoint.

GlobalContext's `name` is its functional global-variable prefix; the outer wrapper must preserve its profile-specific default and validation. Profile input/output counts are part of each captured definition.

New AutoResponder nodes start with an empty address list. Existing configurations, including migrated JSON, retain their original `commandText`.
