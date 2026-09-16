'use strict'

// utilityType is persisted in flows. Historical names are private editor and
// translation namespaces, never registry lookups or legacy node imports.
const profiles = Object.freeze({
  alerter: 'knxSlimAlerter',
  autoresponder: 'knxSlimAutoResponder',
  datetime: 'knxSlimDateTime',
  watchdog: 'knxSlimWatchDog',
  globalcontext: 'knxSlimGlobalContext'
})

const locales = Object.freeze(['en'])

module.exports = { profiles, locales }
