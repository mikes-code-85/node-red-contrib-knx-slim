/* eslint-disable */
// GENERATED FILE — do not edit directly.
// Canonical sources: scripts/knx-utility-profiles/
// Rebuild with: npm run knx-utility:generate
//
// This bundle is deliberately self-contained. It does not import, query or
// require any deprecated KNX node, editor template or localization namespace.
(function (root, factory) {
  // UMD-style export: Node-RED receives the browser global, while unit tests can
  // require the same artifact through CommonJS without maintaining a test copy.
  const api = factory(root)
  if (typeof module === 'object' && module.exports) module.exports = api
  if (root) root.KNXSlimUtilityProfiles = api
}(typeof globalThis !== 'undefined' ? globalThis : this, function (root) {
  'use strict'

  // Values on the left are persisted in utilityType. Values on the
  // right are private editor/translation namespace identifiers, not registry
  // lookups. Keeping them preserves all existing field and i18n contracts.
  const PROFILE_TYPES = Object.freeze(  {
    "alerter": "knxSlimAlerter",
    "autoresponder": "knxSlimAutoResponder",
    "datetime": "knxSlimDateTime",
    "watchdog": "knxSlimWatchDog",
    "globalcontext": "knxSlimGlobalContext"
  })

  // Factories are the private copies of the mature editor definitions. They are
  // inert until getDefinition() asks for one of them.
  const PROFILE_FACTORIES = {
    "alerter": function (RED) {
      RED.nodes.registerType('knxSlimAlerter', {
              category: "KNX Slim",
              color: '#C7E9C0',
              defaults: {
                  server: { type: "knxSlim-config", required: false },
                  name: { value: "" },
                  rules: { value: [] },
                  whentostart: { value: "ifnewalert" },
                  timerinterval: { value: "2" },
                  initialreadGAInRules: { value: "1" },
              },
              inputs: 1,
              outputs: 3,
              outputLabels: function (index) {
                  if (index === 0) return "Emits a message for each alerted device, at selectable intervals.";
                  if (index === 1) return "Emits a unique message containing all alerted devices.";
                  if (index === 2) return "Emits a message containing only the last alerted device.";
              },
              icon: "node-alerter-icon.svg",
              label: function () {
                  return (this.outputRBE == true ? "|rbe| " : "") + (this.name || this.topic || "KNX Alerter") + (this.inputRBE == true ? " |rbe|" : "")
              },
              paletteLabel: "KNX Alerter",
              oneditprepare: function () {
                  // Go to the help panel
                  try {
                      RED.sidebar.show("help");
                  } catch (error) { }
      
                  var node = this;
                  var oNodeServer = RED.nodes.node($("#node-input-server").val()); // Store the config-node
      
                  // 19/02/2020 Used to get the server sooner als deploy.
                  $("#node-input-server").off('.knxUtilityProfile').on('change.knxUtilityProfile', function () {
                      try {
                          oNodeServer = RED.nodes.node($(this).val());
                      } catch (error) { }
                  });
      
      
      
      
                  // Scene configuration
                  function resizeRule(rule) {
      
                  }
                  $("#node-input-rule-container").css('min-height', '350px').css('min-width', '450px').editableList({
                      addItem: function (container, i, opt) { // row, index, data
      
                          // opt.r is: { topic: rowRuleTopic, devicename: rowRuleDeviceName, longdevicename: rowRuleLongDeviceName}
      
                          var rule = opt.r || { topic: '', devicename: '', longdevicename: '' };
                          if (!opt.hasOwnProperty('i')) {
                              opt._i = Math.floor((0x99999 - 0x10000) * Math.random()).toString();
                          }
                          container.css({
                              overflow: 'hidden',
                              whiteSpace: 'nowrap'
                          });
                          var row = $('<div class="form-row"/>').appendTo(container);
      
                          var oTopicField = $("<input/>", { class: "rowRuleTopic", type: "text", placeholder: "GA or devicename", style: "width:20%; margin-left: 5px; text-align: left;" }).appendTo(row);
                          var finalspan = $('<span/>', { style: "" }).appendTo(row);
                          finalspan.append(' <span class="node-input-rule-index"></span> ');
                          var orowRuleDeviceName = $('<input/>', { maxlength: "14", class: "rowRuleDeviceName", type: "text", style: "width:30%; margin-left: 0px; text-align: left;font-style: italic;", placeholder: "Name (max 14 chars)" }).appendTo(row);
                          var orowRuleLongDeviceName = $('<input/>', { class: "rowRuleLongDeviceName", type: "text", style: "width:45%; margin-left: 0px; text-align: left;", placeholder: "Long name" }).appendTo(row);
      
                          oTopicField.on("change", function () {
                              resizeRule(container);
                          });
      
      
                          // Autocomplete suggestion with ETS csv File
                          oTopicField.autocomplete({
                              minLength: 0,
                              source: function (request, response) {
                                  if (!oNodeServer || !oNodeServer.id) { response([]); return; }
                                  $.getJSON("knxSlimcsv?nodeID=" + oNodeServer.id, (data) => {
                                      response($.map(data, function (value, key) {
                                          var sSearch = (value.ga + " (" + value.devicename + ") DPT" + value.dpt);
                                          if (htmlUtilsfullCSVSearch(sSearch, request.term + " 1.")) {
                                              return {
                                                  label: value.ga + " # " + value.devicename + " # " + value.dpt, // Label for Display
                                                  value: value.ga // Value
                                              }
                                          } else {
                                              return null;
                                          }
                                      }));
                                  });
                              }, select: function (event, ui) {
                                  // Sets Datapoint and device name automatically
                                  var sDevName = ui.item.label.split("#")[1].trim();
                                  try {
                                      sDevName = sDevName.substr(sDevName.indexOf(")") + 1).trim();
                                      orowRuleDeviceName.val(sDevName.substr(0, 14));
                                      orowRuleLongDeviceName.val(sDevName);
                                  } catch (error) {
                                  }
      
                              }
                          });
                          oTopicField.on('focus.knxSlimAlerter click.knxSlimAlerter', function () {
                              try {
                                  $(this).autocomplete('search', '');
                              } catch (error) { /* empty */ }
                          });
                          try { if (oNodeServer && oNodeServer.id) KNX_enableSecureFormatting(oTopicField, oNodeServer.id); } catch (e) {}
      
                          oTopicField.val(rule.topic);
                          orowRuleDeviceName.val(rule.devicename);
                          orowRuleLongDeviceName.val(rule.longdevicename);
                          oTopicField.change();
      
                      },
                      removeItem: function (opt) {
      
                      },
                      resizeItem: resizeRule,
                      sortItems: function (rules) {
                      },
                      sortable: true,
                      removable: true
                  });
      
                  // 10/03/2020 For each rule, create a row
                  for (var i = 0; i < (this.rules || []).length; i++) {
                      var rule = this.rules[i];
                      $("#node-input-rule-container").editableList('addItem', { r: rule, i: i });
                  }
      
      
              },
              oneditsave: function () {
                  // Return to the info tab
                  try {
                      RED.sidebar.show("info");
                  } catch (error) { }
      
                  var node = this;
      
                  var rules = $("#node-input-rule-container").editableList('items');
                  node.rules = [];
                  rules.each(function (i) {
                      var rule = $(this);
                      var rowRuleTopic = rule.find(".rowRuleTopic").val();
                      var rowRuleDeviceName = rule.find(".rowRuleDeviceName").val();
                      var rowRuleLongDeviceName = rule.find(".rowRuleLongDeviceName").val();
                      node.rules.push({ topic: rowRuleTopic, devicename: rowRuleDeviceName, longdevicename: rowRuleLongDeviceName });
                  });
              },
              oneditcancel: function () {
                  $("#node-input-server").off('.knxUtilityProfile');
                  try { RED.sidebar.show('info'); } catch (error) { }
              },
              oneditresize: function (size) {
                  const list = $("#node-input-rule-container");
                  const form = $('#dialog-form');
                  const listTop = list.offset();
                  const formTop = form.offset();
                  if (!size || !listTop || !formTop) return;
                  // The fragment is nested in Utility, so measure the actual list
                  // offset instead of assuming it is a direct child of dialog-form.
                  list.editableList('height', Math.max(180, size.height - (listTop.top - formTop.top) - 45));
              }
          })
    },
    "autoresponder": function (RED) {
      RED.nodes.registerType('knxSlimAutoResponder', {
              category: "KNX Slim",
              color: '#C7E9C0',
              defaults: {
                  server: { type: "knxSlim-config", required: true },
                  name: { value: "Auto responder", required: false },
                  commandText: {
                      value: '[]', required: false,
                      validate: function (value) {
                          try {
                              const entries = JSON.parse(value);
                              return Array.isArray(entries) && entries.every((entry) => (
                                  entry && typeof entry === 'object' &&
                                  typeof entry.ga === 'string' && entry.ga.trim() !== '' &&
                                  Object.prototype.hasOwnProperty.call(entry, 'default')
                              ));
                          } catch (error) { return false; }
                      }
                  }
              },
              inputs: 0,
              outputs: 0,
              icon: "node-knx-icon.svg",
              label: function () {
                  return (this.name || "KNX Auto Responder");
              },
              paletteLabel: "KNX Auto Responder",
      	        oneditprepare: function () {
      	            // Go to the help panel
      	            try {
      	                RED.sidebar.show("help");
      	            } catch (error) { }
      
      	            var node = this;
      
      	            $("#node-input-commandText").typedInput({
      	                type: "json",
      	                types: ["json"]
      	            })
      
      	            try {
      	                if (node.commandText !== undefined) {
      	                    $("#node-input-commandText").typedInput('value', node.commandText)
      	                }
      	            } catch (error) { }
      
      	        },
      	        oneditsave: function () {
      	            // Return to the info tab
      	            try {
      	                RED.sidebar.show("info");
      	            } catch (error) { }
      
      	            try {
      	                this.commandText = $("#node-input-commandText").typedInput('value')
      	            } catch (error) { }
      
      	        },
              oneditcancel: function () {
                  // Return to the info tab
                  try {
                      RED.sidebar.show("info");
                  } catch (error) { }
      
      
              }
          })
    },
    "datetime": function (RED) {
      const KNX_ULTIMATE_DATETIME_KEYWORDS = {
          datetime: [/date\s*\/\s*time/i, /date\s*time/i, /datetime/i, /data\s*\/\s*ora/i, /data\s*ora/i],
          date: [/\bdate\b/i, /\bdata\b/i, /\bdatum\b/i, /\bfecha\b/i],
          time: [/\btime\b/i, /\bora\b/i, /\bheure\b/i, /\bzeit\b/i, /\bhora\b/i, /\borologio\b/i, /\bclock\b/i]
        }
      
        const KNX_ULTIMATE_DATETIME_STOPWORDS = new Set([
          'date', 'datetime', 'time', 'data', 'ora', 'orologio', 'clock', 'bus', 'knx', 'set', 'sync', 'sincro', 'synchronization'
        ])
      
        const knxDateTimeNormalizeTokens = (value) => {
          const str = (value || '').toString().toLowerCase()
          const cleaned = str
            .replace(/dpt\s*\d+(\.\d+)?/g, ' ')
            .replace(/[^a-z0-9]+/g, ' ')
            .trim()
          if (!cleaned) return []
          return cleaned
            .split(/\s+/)
            .map((t) => t.trim())
            .filter((t) => t.length > 1 && !KNX_ULTIMATE_DATETIME_STOPWORDS.has(t))
        }
      
        const knxDateTimeTokenSimilarity = (aTokens, bTokens) => {
          if (!Array.isArray(aTokens) || !Array.isArray(bTokens) || aTokens.length === 0 || bTokens.length === 0) return 0
          const a = new Set(aTokens)
          const b = new Set(bTokens)
          let inter = 0
          a.forEach((t) => { if (b.has(t)) inter += 1 })
          const union = a.size + b.size - inter
          return union > 0 ? inter / union : 0
        }
      
        const knxDateTimeParseGA = (ga) => {
          const parts = (ga || '').toString().trim().split('/')
          if (parts.length !== 3) return null
          const nums = parts.map((p) => Number(p))
          if (nums.some((n) => !Number.isInteger(n) || n < 0)) return null
          return nums
        }
      
        const knxDateTimeCompareGA = (a, b) => {
          const aa = knxDateTimeParseGA(a)
          const bb = knxDateTimeParseGA(b)
          if (!aa && !bb) return 0
          if (!aa) return 1
          if (!bb) return -1
          for (let i = 0; i < 3; i++) {
            if (aa[i] !== bb[i]) return aa[i] - bb[i]
          }
          return 0
        }
      
        const knxGetKnxSlimConfigs = () => {
          const configs = []
          try {
            if (RED && RED.nodes) {
              if (typeof RED.nodes.eachConfig === 'function') {
                RED.nodes.eachConfig((cfg) => {
                  if (cfg && cfg.type === 'knxSlim-config') configs.push(cfg)
                })
              } else if (typeof RED.nodes.eachNode === 'function') {
                RED.nodes.eachNode((n) => {
                  if (n && n.type === 'knxSlim-config') configs.push(n)
                })
              }
              if (configs.length === 0 && typeof RED.nodes.filterNodes === 'function') {
                try {
                  const filtered = RED.nodes.filterNodes({ type: 'knxSlim-config' })
                  if (Array.isArray(filtered)) filtered.forEach((n) => configs.push(n))
                } catch (error) { /* ignore */ }
              }
            }
          } catch (error) { /* ignore */ }
          return configs
        }
      
        const knxFetchGroupAddresses = (serverId) => {
          return new Promise((resolve) => {
            if (!serverId) return resolve([])
            $.getJSON(`knxSlimcsv?nodeID=${serverId}&_=${Date.now()}`, (data) => {
              resolve(Array.isArray(data) ? data : [])
            }).fail(() => resolve([]))
          })
        }
      
        const knxScoreEntry = (entry, kind, baseTokens) => {
          if (!entry) return -1
          const dpt = (entry.dpt || '').toString()
          const name = (entry.devicename || '').toString()
          const tokens = knxDateTimeNormalizeTokens(name)
      
          let score = 0
      
          if (kind === 'datetime') {
            if (dpt === '19.001') score += 60
            else if (dpt.startsWith('19.')) score += 45
            KNX_ULTIMATE_DATETIME_KEYWORDS.datetime.forEach((re) => { if (re.test(name)) score += 20 })
            KNX_ULTIMATE_DATETIME_KEYWORDS.time.forEach((re) => { if (re.test(name)) score += 6 })
            KNX_ULTIMATE_DATETIME_KEYWORDS.date.forEach((re) => { if (re.test(name)) score += 6 })
          } else if (kind === 'date') {
            if (dpt === '11.001') score += 60
            else if (dpt.startsWith('11.')) score += 45
            KNX_ULTIMATE_DATETIME_KEYWORDS.date.forEach((re) => { if (re.test(name)) score += 18 })
          } else if (kind === 'time') {
            if (dpt === '10.001') score += 60
            else if (dpt.startsWith('10.')) score += 45
            KNX_ULTIMATE_DATETIME_KEYWORDS.time.forEach((re) => { if (re.test(name)) score += 18 })
          }
      
          if (Array.isArray(baseTokens) && baseTokens.length > 0) {
            score += Math.round(knxDateTimeTokenSimilarity(tokens, baseTokens) * 30)
          }
      
          return score
        }
      
        const knxPickBest = (entries, kind, baseTokens) => {
          if (!Array.isArray(entries) || entries.length === 0) return null
          let best = null
          let bestScore = -1
          entries.forEach((e) => {
            const s = knxScoreEntry(e, kind, baseTokens)
            if (s > bestScore) {
              bestScore = s
              best = e
            } else if (s === bestScore && best) {
              const cmp = knxDateTimeCompareGA(e.ga, best.ga)
              if (cmp < 0) best = e
            }
          })
          return best
        }
      
        const knxSuggestFromCsv = (csvRows) => {
          const rows = Array.isArray(csvRows) ? csvRows : []
          const datetimeRows = rows.filter((r) => (r && typeof r.dpt === 'string' && r.dpt.startsWith('19.')))
          const dateRows = rows.filter((r) => (r && typeof r.dpt === 'string' && r.dpt.startsWith('11.')))
          const timeRows = rows.filter((r) => (r && typeof r.dpt === 'string' && r.dpt.startsWith('10.')))
      
          const bestDateTime = knxPickBest(datetimeRows, 'datetime', [])
          const baseTokens = bestDateTime ? knxDateTimeNormalizeTokens(bestDateTime.devicename || '') : []
      
          const bestDate = knxPickBest(dateRows, 'date', baseTokens)
          const bestTime = knxPickBest(timeRows, 'time', baseTokens)
      
          return {
            dateTime: bestDateTime,
            date: bestDate,
            time: bestTime
          }
        }
      
        const knxAutoConfigureDateTimeNode = async (node, { updateDom = false, preferExistingServer = true, canApply = () => true } = {}) => {
          try {
            if (!node || !canApply()) return
      
            const hasAnyGA = !!((node.gaDateTime || '').trim() || (node.gaDate || '').trim() || (node.gaTime || '').trim())
            if (hasAnyGA) return
      
            // If server already selected and it has ETS rows, reuse it.
            const currentServerId = preferExistingServer ? (node.server || '') : ''
            if (currentServerId && currentServerId !== '_ADD_') {
              const rows = await knxFetchGroupAddresses(currentServerId)
              if (rows.length > 0) {
                const suggestions = knxSuggestFromCsv(rows)
                return knxApplySuggestions(node, currentServerId, suggestions, { updateDom, canApply })
              }
            }
      
            // Otherwise, select the first knxSlim-config that has an ETS CSV imported (non-empty parsed GA list).
            const configs = knxGetKnxSlimConfigs()
            if (configs.length === 0) return
      
            // Fast path: config node already carries an ETS file/path in its `csv` property.
            for (let i = 0; i < configs.length; i++) {
              const cfg = configs[i]
              const id = cfg && cfg.id ? cfg.id : null
              const csvHint = cfg && typeof cfg.csv === 'string' ? cfg.csv.trim() : ''
              if (!id || !csvHint) continue
              const rows = await knxFetchGroupAddresses(id)
              if (rows.length === 0) continue
              const suggestions = knxSuggestFromCsv(rows)
              return knxApplySuggestions(node, id, suggestions, { updateDom, canApply })
            }
      
            const maxCandidates = Math.min(10, configs.length)
            const checks = configs.slice(0, maxCandidates).map((cfg) => {
              const id = cfg && cfg.id ? cfg.id : null
              return knxFetchGroupAddresses(id).then((rows) => ({ id, rows }))
            })
            const results = await Promise.all(checks)
      
            let selected = null
            for (let i = 0; i < results.length; i++) {
              if (results[i] && results[i].id && Array.isArray(results[i].rows) && results[i].rows.length > 0) {
                selected = results[i]
                break
              }
            }
            if (!selected) return
      
            const suggestions = knxSuggestFromCsv(selected.rows)
            return knxApplySuggestions(node, selected.id, suggestions, { updateDom, canApply })
          } catch (error) {
            try { console.warn('knxSlimDateTime auto-config failed', error) } catch (e) { /* ignore */ }
          }
        }
      
        const knxAutoConfigureDateTimeNodeForServer = async (node, serverId, { updateDom = false, overwrite = false, canApply = () => true } = {}) => {
          try {
            if (!node || !serverId || !canApply()) return
            const rows = await knxFetchGroupAddresses(serverId)
            if (!Array.isArray(rows) || rows.length === 0) return
            const suggestions = knxSuggestFromCsv(rows)
            return knxApplySuggestions(node, serverId, suggestions, { updateDom, overwrite, canApply })
          } catch (error) {
            try { console.warn('knxSlimDateTime auto-config for server failed', error) } catch (e) { /* ignore */ }
          }
        }
      
        const knxApplySuggestions = (node, serverId, suggestions, { updateDom = false, overwrite = false, canApply = () => true } = {}) => {
          // The Utility wrapper can replace this fragment while ETS requests are in
          // flight. Never let a late response update its successor's fields.
          if (!node || !serverId || !canApply()) return
          if (!suggestions) return
      
          // Avoid repeating the same automation multiple times.
          if (node._knxDateTimeAutoConfigured === true && overwrite !== true) return
      
          node.server = serverId
      
          if (suggestions.dateTime && suggestions.dateTime.ga && (overwrite || !(node.gaDateTime || '').trim())) {
            node.gaDateTime = suggestions.dateTime.ga
            node.nameDateTime = suggestions.dateTime.devicename || ''
          }
          if (suggestions.date && suggestions.date.ga && (overwrite || !(node.gaDate || '').trim())) {
            node.gaDate = suggestions.date.ga
            node.nameDate = suggestions.date.devicename || ''
          }
          if (suggestions.time && suggestions.time.ga && (overwrite || !(node.gaTime || '').trim())) {
            node.gaTime = suggestions.time.ga
            node.nameTime = suggestions.time.devicename || ''
          }
      
          node._knxDateTimeAutoConfigured = true
          node._knxDateTimeAutoConfiguredServer = serverId
      
          if (updateDom) {
            try {
              $('#node-input-server').val(serverId).trigger('change')
              if (node.gaDateTime) $('#node-input-gaDateTime').val(node.gaDateTime)
              if (node.nameDateTime) $('#node-input-nameDateTime').val(node.nameDateTime)
              if (node.gaDate) $('#node-input-gaDate').val(node.gaDate)
              if (node.nameDate) $('#node-input-nameDate').val(node.nameDate)
              if (node.gaTime) $('#node-input-gaTime').val(node.gaTime)
              if (node.nameTime) $('#node-input-nameTime').val(node.nameTime)
            } catch (error) { /* ignore */ }
          } else {
            try {
              if (RED && RED.nodes && typeof RED.nodes.dirty === 'function') RED.nodes.dirty(true)
            } catch (error) { /* ignore */ }
            try { if (RED && RED.view && typeof RED.view.redraw === 'function') RED.view.redraw() } catch (error) { /* ignore */ }
          }
        }
      
        const knxDateTimeOptionalNumber = (toggle) => function (value) {
          let enabled = this[toggle] === undefined || this[toggle] === true || this[toggle] === 'true';
          // The wrapper validates the saved node while its draft is open. Read the
          // active checkbox only in that case; unrelated nodes use their saved flag.
          if (this._utilityEditor && typeof $ === 'function') {
            const field = $('#node-input-' + toggle)
            if (field.length) enabled = field.is(':checked')
          }
          return !enabled || RED.validators.number()(value)
        }
      
        RED.nodes.registerType('knxSlimDateTime', {
          category: 'KNX Slim',
          color: '#C7E9C0',
          defaults: {
            server: { type: 'knxSlim-config', required: true },
            name: { value: '' },
            outputtopic: { value: '' },
            gaDateTime: { value: '' },
            nameDateTime: { value: '' },
            dptDateTime: { value: '19.001' },
            gaDate: { value: '' },
            nameDate: { value: '' },
            dptDate: { value: '11.001' },
            gaTime: { value: '' },
            nameTime: { value: '' },
            dptTime: { value: '10.001' },
            sendOnDeploy: { value: true },
            sendOnDeployDelay: { value: 30, validate: knxDateTimeOptionalNumber('sendOnDeploy') },
            periodicSend: { value: true },
            periodicSendInterval: { value: 60, validate: knxDateTimeOptionalNumber('periodicSend') },
            periodicSendUnit: { value: 'm' }
          },
          inputs: 0,
          outputs: 0,
          icon: 'node-knx-icon.svg',
          label: function () {
            return this.name || 'KNX DateTime'
          },
          paletteLabel: function () {
            try {
              return RED._('node-red-contrib-knx-slim/knxSlimDateTime:knxSlimDateTime.paletteLabel') || 'DateTime'
            } catch (error) {
              return 'DateTime'
            }
          },
          onadd: function () {
            // Auto-select a KNX gateway (first one with ETS CSV imported) and prefill coherent group addresses.
            // This runs when the node is dragged from the palette. Best-effort, non-blocking.
            const node = this
            setTimeout(() => {
              knxAutoConfigureDateTimeNode(node, {
                updateDom: false,
                preferExistingServer: true,
                canApply: () => node.utilityType === 'datetime'
              })
            }, 50)
          },
          button: {
            enabled: function () {
              return !this.changed
            },
            visible: function () {
              return true
            },
            onclick: function () {
              const node = this
              $.ajax({
                type: 'POST',
                url: 'knxSlimUtility/sendNow',
                data: { id: node.id },
                success: function (response) {
                  const queued = response && response.queued === true
                  const message = queued
                    ? (RED._('node-red-contrib-knx-slim/knxSlimDateTime:knxSlimDateTime.notifyQueued') || 'Queued (gateway not connected yet)')
                    : (RED._('node-red-contrib-knx-slim/knxSlimDateTime:knxSlimDateTime.notifySent') || 'Sent to KNX')
                  RED.notify(message, 'success')
                },
                error: function (xhr) {
                  let message = 'Error'
                  try {
                    if (xhr && xhr.responseJSON && xhr.responseJSON.error) message = xhr.responseJSON.error
                  } catch (error) { /* ignore */ }
                  RED.notify(message, 'error')
                }
              })
            }
          },
          oneditprepare: function () {
            const node = this
            if (node._knxDateTimeEditorSession) node._knxDateTimeEditorSession.active = false
            const editorSession = { active: true }
            node._knxDateTimeEditorSession = editorSession
            const $knxServerInput = $('#node-input-server')
            const KNX_EMPTY_VALUES = new Set(['', '_ADD_', '__NONE__', 'none'])
            const KNX_GA_CACHE = node._knxGaCache || (node._knxGaCache = new Map())
      
            try { RED.sidebar.show('help') } catch (error) { /* ignore */ }
      
            const resolveKnxServerValue = () => {
              const domValue = $knxServerInput.val()
              if (domValue !== undefined && domValue !== null && domValue !== '') return domValue
              if (node.server !== undefined && node.server !== null && node.server !== '') return node.server
              return ''
            }
      
            const addressFields = ['gaDateTime', 'nameDateTime', 'dptDateTime', 'gaDate', 'nameDate', 'dptDate', 'gaTime', 'nameTime', 'dptTime']
            const addressSnapshot = () => JSON.stringify(addressFields.map((field) => $('#node-input-' + field).val() || ''))
      
            const hasKnxServerSelected = () => {
              const val = resolveKnxServerValue()
              return !(val === undefined || val === null || KNX_EMPTY_VALUES.has(String(val)))
            }
      
            const fetchGroupAddresses = (serverId) => {
              if (!serverId) return Promise.resolve([])
              if (KNX_GA_CACHE.has(serverId)) return Promise.resolve(KNX_GA_CACHE.get(serverId))
              return new Promise((resolve) => {
                $.getJSON(`knxSlimcsv?nodeID=${serverId}&_=${Date.now()}`, (data) => {
                  const list = Array.isArray(data) ? data : []
                  KNX_GA_CACHE.set(serverId, list)
                  resolve(list)
                }).fail(() => resolve([]))
              })
            }
      
            const setupGA = (gaSelector, nameSelector, dptSelector, allowedPrefixes, defaultDpt) => {
              const $gaInput = $(gaSelector)
              const $nameInput = $(nameSelector)
              const $dptInput = $(dptSelector)
              if (!$gaInput.length) return
      
              if ($dptInput.length && (!$dptInput.val() || $dptInput.val() === '')) $dptInput.val(defaultDpt)
      
              const sourceFn = (request, response) => {
                if (!hasKnxServerSelected()) {
                  response([])
                  return
                }
                const serverId = resolveKnxServerValue()
                fetchGroupAddresses(serverId).then((data) => {
                  if (!editorSession.active || resolveKnxServerValue() !== serverId) return
                  const items = []
                  data.forEach((entry) => {
                    const dpt = entry.dpt || ''
                    const allowed = allowedPrefixes.some((prefix) => prefix === '' || dpt.startsWith(prefix))
                    if (!allowed) return
                    const devName = entry.devicename || ''
                    const searchStr = `${entry.ga} (${devName}) DPT${dpt}`
                    if (!htmlUtilsfullCSVSearch(searchStr, request.term || '')) return
                    items.push({
                      label: `${entry.ga} # ${devName} # ${dpt}`,
                      value: entry.ga,
                      ga: entry.ga
                    })
                  })
                  response(items)
                })
              }
      
              if ($gaInput.data('knx-ga-initialised')) {
                $gaInput.autocomplete('option', 'source', sourceFn)
              } else {
                $gaInput
                  .autocomplete({
                    minLength: 0,
                    source: sourceFn,
                    select: (event, ui) => {
                      let deviceName = ''
                      try {
                        deviceName = ui.item.label.split('#')[1].trim()
                      } catch (error) { deviceName = '' }
                      if ($nameInput.length) {
                        $nameInput.val(deviceName || '')
                      }
                      try {
                        const parts = ui.item.label.split('#')
                        const dptFromLabel = parts.length >= 3 ? parts[2].trim() : ''
                        $dptInput.val(dptFromLabel || defaultDpt)
                      } catch (error) {
                        $dptInput.val(defaultDpt)
                      }
                    }
                  })
                  .on('focus.knxSlimDateTime click.knxSlimDateTime', function () {
                    const currentValue = $(this).val() || ''
                    try { $(this).autocomplete('search', `${currentValue} exactmatch`) } catch (error) { /* ignore */ }
                  })
                $gaInput.data('knx-ga-initialised', true)
              }
      
              try {
                if (hasKnxServerSelected()) {
                  const srv = RED.nodes.node(resolveKnxServerValue())
                  if (srv && srv.id) KNX_enableSecureFormatting($gaInput, srv.id)
                }
              } catch (error) { /* ignore */ }
            }
      
            const refresh = () => {
              setupGA('#node-input-gaDateTime', '#node-input-nameDateTime', '#node-input-dptDateTime', ['19.'], '19.001')
              setupGA('#node-input-gaDate', '#node-input-nameDate', '#node-input-dptDate', ['11.'], '11.001')
              setupGA('#node-input-gaTime', '#node-input-nameTime', '#node-input-dptTime', ['10.'], '10.001')
            }
      
            $knxServerInput.off('.knxUtilityProfile').on('change.knxUtilityProfile', () => {
              KNX_GA_CACHE.clear()
              refresh()
              try {
                const sid = resolveKnxServerValue()
                if (!sid || sid === '_ADD_') return
                const hasAnyGAInUi = !!(
                  ($('#node-input-gaDateTime').val() || '').toString().trim() ||
                  ($('#node-input-gaDate').val() || '').toString().trim() ||
                  ($('#node-input-gaTime').val() || '').toString().trim()
                )
                // If the current values were auto-filled, allow overwrite when server changes.
                const shouldOverwrite = node._knxDateTimeAutoConfigured === true && node._knxDateTimeAutoConfiguredServer && node._knxDateTimeAutoConfiguredServer !== sid
                const beforeRequest = addressSnapshot()
                // Otherwise fill only empty fields (do not override manual config).
                knxAutoConfigureDateTimeNodeForServer(node, sid, {
                  updateDom: true,
                  overwrite: shouldOverwrite || !hasAnyGAInUi,
                  canApply: () => editorSession.active && resolveKnxServerValue() === sid && addressSnapshot() === beforeRequest
                })
              } catch (error) { /* ignore */ }
            })
      
            refresh()
      
            // Auto-select server + fill GAs only for a brand new node (all GAs empty).
            const initialServer = resolveKnxServerValue()
            const initialAddresses = addressSnapshot()
            editorSession.timer = setTimeout(() => {
              knxAutoConfigureDateTimeNode(node, {
                updateDom: true,
                preferExistingServer: true,
                canApply: () => editorSession.active && resolveKnxServerValue() === initialServer && addressSnapshot() === initialAddresses
              })
            }, 50)
      
            const syncUi = () => {
              const sendOnDeploy = $('#node-input-sendOnDeploy').is(':checked')
              $('.knx-datetime-deploy-options').toggle(sendOnDeploy)
              const periodicSend = $('#node-input-periodicSend').is(':checked')
              $('.knx-datetime-periodic-options').toggle(periodicSend)
            }
      
            $('#node-input-sendOnDeploy').on('change.knxUtilityProfile', syncUi)
            $('#node-input-periodicSend').on('change.knxUtilityProfile', syncUi)
            syncUi()
          },
          oneditcancel: function () {
            const session = this._knxDateTimeEditorSession
            if (session) {
              session.active = false
              clearTimeout(session.timer)
            }
            $('#node-input-server').off('.knxUtilityProfile')
            $('#node-input-sendOnDeploy').off('.knxUtilityProfile')
            $('#node-input-periodicSend').off('.knxUtilityProfile')
          }
        })
    },
    "watchdog": function (RED) {
      const utilityFieldValue = (node, key) => {
        if (node._utilityEditor && typeof $ === 'function') {
          const field = $('#node-input-' + key);
          if (field.length) return field.is(':checkbox') ? field.is(':checked') : field.val();
        }
        return node[key];
      };
      const utilityNumber = (minimum, integer = false, enabled = () => true) => function (value) {
        if (!enabled(this)) return true;
        const numeric = Number(value);
        return value !== null && value !== undefined && String(value).trim() !== '' &&
          Number.isFinite(numeric) && numeric >= minimum && (!integer || Number.isInteger(numeric));
      };
      
      RED.nodes.registerType('knxSlimWatchDog', {
              category: "KNX Slim",
              color: '#C7E9C0',
              defaults: {
                  server: { type: "knxSlim-config", required: true },
                  topic: { value: "12/0/0" },
                  maxRetry: { value: 6, validate: utilityNumber(0, true) }, // Zero reports failure on the first unsuccessful check.
                  retryInterval: { value: 10, validate: utilityNumber(0.001) },
                  name: { value: "" },
                  autoStart: { value: true },
                  listenToKnxSlimNodeErrors: { value: true },
                  checkLevel: { value: "Ethernet" }
              },
              inputs: 1,
              outputs: 1,
              outputLabels: ["Output"],
              icon: "node-watchdog-icon.svg",
              label: function () {
                  return ((this.name || "KNX Watchdog") + " " + (this.checkLevel == "Ethernet" ? "Gateway IP" : this.topic));
              },
              paletteLabel: "KNX WatchDog",
              oneditprepare: function () {
                  if (this._knxUtilityProfileSession) this._knxUtilityProfileSession.active = false;
                  const editorSession = { active: true };
                  this._knxUtilityProfileSession = editorSession;
                  // Ignore responses belonging to a closed editor or a previous gateway.
                  const profileGetJSON = (url, callback) => {
                      const serverId = $('#node-input-server').val();
                      return $.getJSON(url, (data) => {
                          if (editorSession.active && $('#node-input-server').val() === serverId) callback(data);
                      });
                  };
                  const node = this;
                  const $knxServerInput = $("#node-input-server");
                  const $gaInput = $("#node-input-topic");
                  const KNX_EMPTY_VALUES = new Set(['', '_ADD_', '__NONE__', 'none']);
      
                  // Go to the help panel
                  try {
                      RED.sidebar.show("help");
                  } catch (error) { }
      
                  $("#advancedOptionsAccordion").accordion({
                      header: "h3",
                      heightStyle: "content",
                      collapsible: true,
                      active: false
                  });
      
                  const KNX_GA_CACHE = node._knxGaCache || (node._knxGaCache = new Map());
      
                  const resolveKnxServerValue = () => {
                      const domValue = $knxServerInput.val();
                      if (domValue !== undefined && domValue !== null) {
                          return KNX_EMPTY_VALUES.has(String(domValue)) ? '' : domValue;
                      }
                      if (node.server !== undefined && node.server !== null && !KNX_EMPTY_VALUES.has(String(node.server))) {
                          return node.server;
                      }
                      return '';
                  };
      
                  const fetchGroupAddresses = (serverId) => {
                      if (!serverId) return Promise.resolve([]);
                      if (KNX_GA_CACHE.has(serverId)) return Promise.resolve(KNX_GA_CACHE.get(serverId));
                      return new Promise((resolve) => {
                          profileGetJSON(`knxSlimcsv?nodeID=${serverId}&_=${Date.now()}`, (data) => {
                              const list = Array.isArray(data) ? data : [];
                              KNX_GA_CACHE.set(serverId, list);
                              resolve(list);
                          }).fail(() => resolve([]));
                      });
                  };
      
                  const ensureGaAutocomplete = () => {
                      const serverId = resolveKnxServerValue();
                      if (!serverId) {
                          if ($gaInput.data('ui-autocomplete')) {
                              $gaInput.autocomplete('disable');
                          }
                          return;
                      }
      
                      const sourceFn = (request, response) => {
                          fetchGroupAddresses(serverId).then((data) => {
                              if (!editorSession.active || resolveKnxServerValue() !== serverId) return;
                              const items = [];
                              (data || []).forEach((entry) => {
                                  const dpt = typeof entry.dpt === 'string' ? entry.dpt : '';
                                  if (!dpt.startsWith('1.')) return; // Watchdog only accepts boolean GAs
                                  const devName = entry.devicename || '';
                                  const searchStr = `${entry.ga} (${devName}) DPT${dpt}`;
                                  if (!htmlUtilsfullCSVSearch(searchStr, request.term || '')) return;
                                  items.push({
                                      label: `${entry.ga} # ${devName} # ${dpt}`,
                                      value: entry.ga
                                  });
                              });
                              response(items);
                          });
                      };
      
                      if ($gaInput.data('knx-watchdog-ga')) {
                          $gaInput.autocomplete('option', 'source', sourceFn);
                          $gaInput.autocomplete('enable');
                      } else {
                          $gaInput.autocomplete({
                              minLength: 0,
                              source: sourceFn,
                              select: function (event, ui) {
                                  event.preventDefault();
                                  $(this).val(ui.item.value);
                                  const parts = ui.item.label.split('#');
                                  let deviceName = (parts[1] || '').trim().replace(/^\)/, '').trim();
                                  if (deviceName.indexOf('/') > -1) {
                                      deviceName = deviceName.split('/').pop().trim();
                                  }
                                  const $nameInput = $('#node-input-name');
                                  if (deviceName && $nameInput.length) {
                                      $nameInput.val(deviceName);
                                  }
                              }
                          }).on('focus.knxSlimWatchDog click.knxSlimWatchDog', function () {
                              const currentValue = $(this).val() || '';
                              try {
                                  $(this).autocomplete('search', currentValue ? `${currentValue} exactmatch` : '');
                              } catch (error) { }
                          });
                          $gaInput.data('knx-watchdog-ga', true);
                      }
      
                      try {
                          const srv = RED.nodes.node(serverId);
                          if (srv && srv.id) KNX_enableSecureFormatting($gaInput, srv.id);
                      } catch (error) { }
                  };
      
                  $knxServerInput.off('.knxUtilityProfile').on('change.knxUtilityProfile', () => {
                      KNX_GA_CACHE.clear();
                      ensureGaAutocomplete();
                  });
                  ensureGaAutocomplete();
      
                  const syncDivHost = () => {
                      const level = $("#node-input-checkLevel").val() || node.checkLevel || "Ethernet";
                      if (level === "Ethernet") {
                          $("#divHost").hide();
                      } else {
                          $("#divHost").show();
                      }
                  };
      
                  $("#node-input-checkLevel").on('change.knxUtilityProfile', function () {
                      syncDivHost();
                  });
                  syncDivHost();
              },
              oneditcancel: function () {
                  if (this._knxUtilityProfileSession) this._knxUtilityProfileSession.active = false;
                  $('#node-input-server').off('.knxUtilityProfile');
                  try { RED.sidebar.show('info'); } catch (error) { }
              },
              oneditsave: function () {
                  // Return to the info tab
                  try {
                      RED.sidebar.show("info");
                  } catch (error) { }
      
      
              }
      
          })
    },
    "globalcontext": function (RED) {
      const utilityFieldValue = (node, key) => {
        if (node._utilityEditor && typeof $ === 'function') {
          const field = $('#node-input-' + key);
          if (field.length) return field.is(':checkbox') ? field.is(':checked') : field.val();
        }
        return node[key];
      };
      const utilityNumber = (minimum, integer = false, enabled = () => true) => function (value) {
        if (!enabled(this)) return true;
        const numeric = Number(value);
        return value !== null && value !== undefined && String(value).trim() !== '' &&
          Number.isFinite(numeric) && numeric >= minimum && (!integer || Number.isInteger(numeric));
      };
      
      RED.nodes.registerType('knxSlimGlobalContext', {
              category: "KNX Slim",
              color: '#C7E9C0',
              defaults: {
                  server: { type: "knxSlim-config", required: true },
                  name: { value: "KNXGlobalContext", validate: function (value) { return /^[a-zA-Z]+$/.test(value || ''); } },
                  exposeAsVariable: { value: "exposeAsVariableREADWRITE", required: false },
                  writeExecutionInterval: { value: 1000, validate: utilityNumber(1) },
                  contextStorage: { value: "" }
              },
              inputs: 0,
              outputs: 0,
              icon: "node-knx-icon.svg",
              label: function () {
                  return (this.name);
              },
              paletteLabel: "KNX Global Context",
              oneditprepare: function () {
                  // Go to the help panel
                  try {
                      RED.sidebar.show("help");
                  } catch (error) { }
      
      
      
              },
              oneditsave: function () {
                  // Return to the info tab
                  try {
                      RED.sidebar.show("info");
                  } catch (error) { }
      
      
      
              },
              oneditcancel: function () {
                  // Return to the info tab
                  try {
                      RED.sidebar.show("info");
                  } catch (error) { }
      
      
              }
          })
    }
  }

  // Form fragments are mounted inside #knx-utility-profile-editor. The gateway
  // and name fields remain owned by the outer Utility template.
  const PROFILE_TEMPLATES = {
    "alerter": "<div class=\"form-row\">\r\n    <label for=\"node-input-whentostart\"><i class=\"fa fa-repeat\"></i> <span data-i18n=\"knxSlimAlerter.properties.node-input-whentostart\"></span> </label>\r\n    <select id=\"node-input-whentostart\">\r\n        <option value=\"manualstart\" data-i18n=\"knxSlimAlerter.selectlists.manualstart\"></option>\r\n        <option value=\"ifnewalert\" data-i18n=\"knxSlimAlerter.selectlists.ifnewalert\"></option>\r\n    </select>\r\n</div>\r\n\r\n<div class=\"form-row\">\r\n    <label for=\"node-input-timerinterval\" style=\"width:70%\"><i class=\"fa fa-clock-o\"></i> <span data-i18n=\"knxSlimAlerter.properties.node-input-timerinterval\"></span> </label>\r\n    <input type=\"text\" id=\"node-input-timerinterval\" style=\"width:10%\">       \r\n</div>\r\n\r\n<br/>\r\n<br/>\r\n<dt><i class=\"fa fa-code-fork\"></i>&nbsp; <span data-i18n=\"knxSlimAlerter.other.sceneConfig\"></span></dt>\r\n    <br/>\r\n    <div class=\"form-row\" id=\"divNode-input-initialreadGAInRules\">\r\n        &nbsp;&nbsp;<label style=\"width:60%\" for=\"node-input-initialreadGAInRules\">\r\n            <i class=\"fa fa-question-circle-o\"></i>\r\n            <span data-i18n=\"knxSlimAlerter.properties.node-input-initialreadGAInRules\"></span>\r\n        </label>\r\n        <select style=\"width:30%\" id=\"node-input-initialreadGAInRules\">\r\n            <option value=\"0\" data-i18n=\"knxSlimAlerter.properties.node-input-initialread0\"></option>\r\n            <option value=\"1\" data-i18n=\"knxSlimAlerter.properties.node-input-initialread1\"></option>\r\n        </select>\r\n    \r\n    </div>\r\n<div class=\"form-row node-input-rule-container-row\">\r\n    <ol id=\"node-input-rule-container\"></ol>\r\n</div>\r\n\r\n<div class=\"form-row\">\r\n    <p><span data-i18n=\"knxSlimAlerter.other.add\"></span></p>\r\n</div>",
    "autoresponder": "<div class=\"form-row\">\r\n    <label  for=\"node-input-commandText\"><i class=\"fa fa-tasks\"></i> <span data-i18n=\"knxSlimAutoResponder.respondTo\"></span></label>\r\n    <input  type=\"text\" id=\"node-input-commandText\">\r\n</div>",
    "datetime": "<hr>\r\n  <div class=\"form-row\" style=\"margin:4px 0 2px;\">\r\n    <span style=\"font-weight:bold;\" data-i18n=\"knxSlimDateTime.section_addresses\"></span>\r\n  </div>\r\n\r\n  <div class=\"form-row\" style=\"display:flex; align-items:center; gap:8px;\">\r\n    <label for=\"node-input-gaDateTime\" style=\"width:155px\"><i class=\"fa fa-calendar\"></i> <span data-i18n=\"knxSlimDateTime.gaDateTime\"></span></label>\r\n    <input type=\"text\" id=\"node-input-gaDateTime\" style=\"width:110px\" placeholder=\"1/7/1\" data-i18n=\"[placeholder]knxSlimDateTime.placeholders.ga\">\r\n    <input type=\"text\" id=\"node-input-nameDateTime\" style=\"flex:1; min-width:70px\" placeholder=\"DateTime object\" data-i18n=\"[placeholder]knxSlimDateTime.placeholders.nameDateTime\">\r\n    <label for=\"node-input-dptDateTime\" style=\"width:30px; text-align:right\">DPT</label>\r\n    <input type=\"text\" id=\"node-input-dptDateTime\" style=\"width:75px\" readonly>\r\n  </div>\r\n\r\n  <div class=\"form-row\" style=\"display:flex; align-items:center; gap:8px;\">\r\n    <label for=\"node-input-gaDate\" style=\"width:155px\"><i class=\"fa fa-calendar-o\"></i> <span data-i18n=\"knxSlimDateTime.gaDate\"></span></label>\r\n    <input type=\"text\" id=\"node-input-gaDate\" style=\"width:110px\" placeholder=\"1/7/2\" data-i18n=\"[placeholder]knxSlimDateTime.placeholders.ga\">\r\n    <input type=\"text\" id=\"node-input-nameDate\" style=\"flex:1; min-width:70px\" placeholder=\"Date object\" data-i18n=\"[placeholder]knxSlimDateTime.placeholders.nameDate\">\r\n    <label for=\"node-input-dptDate\" style=\"width:30px; text-align:right\">DPT</label>\r\n    <input type=\"text\" id=\"node-input-dptDate\" style=\"width:75px\" readonly>\r\n  </div>\r\n\r\n  <div class=\"form-row\" style=\"display:flex; align-items:center; gap:8px;\">\r\n    <label for=\"node-input-gaTime\" style=\"width:155px\"><i class=\"fa fa-clock-o\"></i> <span data-i18n=\"knxSlimDateTime.gaTime\"></span></label>\r\n    <input type=\"text\" id=\"node-input-gaTime\" style=\"width:110px\" placeholder=\"1/7/3\" data-i18n=\"[placeholder]knxSlimDateTime.placeholders.ga\">\r\n    <input type=\"text\" id=\"node-input-nameTime\" style=\"flex:1; min-width:70px\" placeholder=\"Time object\" data-i18n=\"[placeholder]knxSlimDateTime.placeholders.nameTime\">\r\n    <label for=\"node-input-dptTime\" style=\"width:30px; text-align:right\">DPT</label>\r\n    <input type=\"text\" id=\"node-input-dptTime\" style=\"width:75px\" readonly>\r\n  </div>\r\n\r\n  <hr>\r\n  <div class=\"form-row\" style=\"margin:4px 0 2px;\">\r\n    <span style=\"font-weight:bold;\" data-i18n=\"knxSlimDateTime.section_send\"></span>\r\n  </div>\r\n\r\n  <div class=\"form-row\" style=\"display:flex; align-items:center;\">\r\n    <label for=\"node-input-sendOnDeploy\" style=\"width:180px\"><i class=\"fa fa-play\"></i> <span data-i18n=\"knxSlimDateTime.node-input-sendOnDeploy\"></span></label>\r\n    <input type=\"checkbox\" id=\"node-input-sendOnDeploy\" style=\"width:auto\">\r\n  </div>\r\n\r\n  <div class=\"form-row knx-datetime-deploy-options\" style=\"display:flex; align-items:center;\">\r\n    <label for=\"node-input-sendOnDeployDelay\" style=\"width:180px\"><i class=\"fa fa-clock-o\"></i> <span data-i18n=\"knxSlimDateTime.node-input-sendOnDeployDelay\"></span></label>\r\n    <input type=\"number\" id=\"node-input-sendOnDeployDelay\" style=\"width:120px\">\r\n  </div>\r\n\r\n  <div class=\"form-row\" style=\"display:flex; align-items:center;\">\r\n    <label for=\"node-input-periodicSend\" style=\"width:180px\"><i class=\"fa fa-repeat\"></i> <span data-i18n=\"knxSlimDateTime.node-input-periodicSend\"></span></label>\r\n    <input type=\"checkbox\" id=\"node-input-periodicSend\" style=\"width:auto\">\r\n  </div>\r\n\r\n  <div class=\"form-row knx-datetime-periodic-options\" style=\"display:flex; align-items:center; gap:8px;\">\r\n    <label for=\"node-input-periodicSendInterval\" style=\"width:180px\"><i class=\"fa fa-hourglass\"></i> <span data-i18n=\"knxSlimDateTime.node-input-periodicSendInterval\"></span></label>\r\n    <input type=\"number\" id=\"node-input-periodicSendInterval\" style=\"width:120px\">\r\n    <select id=\"node-input-periodicSendUnit\" style=\"width:160px\">\r\n      <option value=\"s\" data-i18n=\"knxSlimDateTime.unit_seconds\"></option>\r\n      <option value=\"m\" data-i18n=\"knxSlimDateTime.unit_minutes\"></option>\r\n    </select>\r\n  </div>",
    "watchdog": "<div class=\"form-row\">\r\n        <label for=\"node-input-checkLevel\"><i class=\"fa fa-search\"></i> <span data-i18n=\"knxSlimWatchDog.properties.node-input-checkLevel\"></span> </label>\r\n        <select id=\"node-input-checkLevel\">\r\n            <option value=\"Ethernet\" data-i18n=\"knxSlimWatchDog.selectlists.Ethernet\"></option>\r\n            <option value=\"Eth+KNX\" data-i18n=\"knxSlimWatchDog.selectlists.EthKNX\"></option>\r\n        </select>\r\n    </div>\r\n    <div class=\"form-row\" id=\"divHost\">\r\n        <label for=\"node-input-topic\"><i class=\"fa fa-tasks\"></i> <span data-i18n=\"knxSlimWatchDog.properties.node-input-topic\"></span></label>\r\n        <input style=\"width:90px;\" type=\"text\" id=\"node-input-topic\" data-i18n=\"[placeholder]knxSlimWatchDog.placeholder.monitor\"> <span data-i18n=\"knxSlimWatchDog.booleanHint\"></span>\r\n    </div>  \r\n    \r\n    <div class=\"form-row\">\r\n        <input type=\"checkbox\" id=\"node-input-autoStart\" style=\"display:inline-block; width:auto; vertical-align:top;\">\r\n        <label style=\"width:auto\" for=\"node-input-autoStart\">&nbsp;&nbsp;<i class=\"fa fa-play-circle\"></i> <span data-i18n=\"knxSlimWatchDog.properties.node-input-autoStart\"></span> </label>\r\n    </div>\r\n    <div class=\"form-row\">\r\n        <input type=\"checkbox\" id=\"node-input-listenToKnxSlimNodeErrors\" style=\"display:inline-block; width:auto; vertical-align:top;\">\r\n        <label style=\"width:auto\" for=\"node-input-listenToKnxSlimNodeErrors\">&nbsp;&nbsp;<i class=\"fa fa-exclamation-triangle\"></i> <span data-i18n=\"knxSlimWatchDog.properties.node-input-listenToKnxSlimNodeErrors\"></span> </label>\r\n    </div>\r\n    \r\n    <div id=\"advancedOptionsAccordion\">\r\n        <h3><span data-i18n=\"knxSlimWatchDog.properties.advancedOptionsAccordion\"></span></h3>\r\n        <div>\r\n            <p>\r\n                <div class=\"form-row\">\r\n                    <label for=\"node-input-retryInterval\"><i class=\"fa fa-clock-o\"></i> <span data-i18n=\"knxSlimWatchDog.properties.node-input-retryInterval\"></span></label>\r\n                    <input type=\"text\" id=\"node-input-retryInterval\">\r\n                </div>\r\n                <div class=\"form-row\">\r\n                    <label for=\"node-input-maxRetry\"><i class=\"fa fa-undo\"></i> <span data-i18n=\"knxSlimWatchDog.properties.node-input-maxRetry\"></span></label>\r\n                    <input type=\"text\" id=\"node-input-maxRetry\">\r\n                </div>\r\n            </p>\r\n        </div>\r\n    </div>",
    "globalcontext": "<div class=\"form-tips\" style=\"margin-bottom:16px\" data-i18n=\"knxSlimGlobalContext.advanced.warning\"></div>\r\n\r\n<div class=\"form-row\">\r\n    <label for=\"node-input-exposeAsVariable\" style=\"width:60%;\">\r\n        <i class=\"fa fa-link\"></i>\r\n        <span data-i18n=\"knxSlimGlobalContext.advanced.exposeAsVariable\"></span>\r\n    </label>\r\n    <select id=\"node-input-exposeAsVariable\" style=\"width:35%;\">\r\n        <option value=\"exposeAsVariableNO\" data-i18n=\"knxSlimGlobalContext.advanced.exposeAsVariableNO\"></option>\r\n        <option value=\"exposeAsVariableREADONLY\" data-i18n=\"knxSlimGlobalContext.advanced.exposeAsVariableREADONLY\"></option>\r\n        <option value=\"exposeAsVariableREADWRITE\" data-i18n=\"knxSlimGlobalContext.advanced.exposeAsVariableREADWRITE\"></option>\r\n    </select>\r\n</div>\r\n\r\n<div class=\"form-row\">\r\n    <label for=\"node-input-writeExecutionInterval\" style=\"width:60%;\">\r\n        <i class=\"fa fa-link\"></i>\r\n        <span data-i18n=\"knxSlimGlobalContext.advanced.writeExecutionInterval\"></span>\r\n    </label>\r\n    <select id=\"node-input-writeExecutionInterval\" style=\"width:35%;\">\r\n        <option value=250 data-i18n=\"knxSlimGlobalContext.interval_250ms\"></option>\r\n        <option value=500 data-i18n=\"knxSlimGlobalContext.interval_500ms\"></option>\r\n        <option value=1000 data-i18n=\"knxSlimGlobalContext.interval_1000ms_default\"></option>\r\n        <option value=1500 data-i18n=\"knxSlimGlobalContext.interval_1500ms\"></option>\r\n        <option value=2000 data-i18n=\"knxSlimGlobalContext.interval_2000ms\"></option>\r\n    </select>\r\n</div>\r\n\r\n<div class=\"form-row\">\r\n    <label for=\"node-input-contextStorage\" style=\"width:60%;\">\r\n        <i class=\"fa fa-tag\"></i> <span data-i18n=\"knxSlimGlobalContext.contextStorage\"></span>\r\n    </label>\r\n    <input style=\"width:35%;\" type=\"text\" id=\"node-input-contextStorage\" data-i18n=\"[placeholder]knxSlimGlobalContext.contextStoragePlaceholder\" />\r\n</div>"
  }

  // All supported locales travel with the Utility. The bundle therefore
  // keeps working after the legacy locale files and node types are removed.
  const PROFILE_TRANSLATIONS = {"en":{"knxSlimAlerter":{"knxSlimAlerter":{"paletteLabel":"KNX Alerter","title":"Alerter node","properties":{"node-input-server":"Gateway","node-input-name":"Name","node-input-timerinterval":"Interval between each MSG (in seconds)","node-input-whentostart":"Alerting cycle start type","node-input-initialread":"Read value of each device on connection/reconnect","node-input-initialread0":"No","node-input-initialread1":"Read from KNX BUS","node-input-initialreadGAInRules":"Read states at start/reconnection"},"selectlists":{"manualstart":"Start alert cycle manually via incoming message","ifnewalert":"Start the alert cycle with each new alerted device"},"other":{"sceneConfig":"Devices to monitor (DPT MUST BE BOOLEAN)","add":"Press Add, to add a device"}}},"knxSlimAutoResponder":{"knxSlimAutoResponder":{"paletteLabel":"KNX Auto Responder","respondTo":"Respond to"}},"knxSlimDateTime":{"knxSlimDateTime":{"title":"Date/Time","paletteLabel":"DateTime","node-input-server":"KNX Gateway","node-input-name":"Name","node-input-outputtopic":"Topic for node output","section_addresses":"Group addresses","gaDateTime":"DateTime GA (DPT 19.001)","gaDate":"Date GA (DPT 11.001)","gaTime":"Time GA (DPT 10.001)","section_send":"Send options","node-input-sendOnDeploy":"Send on deploy/startup","node-input-sendOnDeployDelay":"Startup delay (seconds)","node-input-periodicSend":"Periodic send","node-input-periodicSendInterval":"Interval","unit_seconds":"Seconds","unit_minutes":"Minutes","notifySent":"Sent to KNX","notifyQueued":"Queued (gateway not connected yet)","placeholders":{"outputtopic":"Optional output topic","ga":"e.g. 1/7/1","nameDateTime":"Optional ETS device name","nameDate":"Optional ETS device name","nameTime":"Optional ETS device name"}}},"knxSlimWatchDog":{"knxSlimWatchDog":{"paletteLabel":"KNX WatchDog","title":"Watchdog","properties":{"node-input-server":"Gateway","node-input-checkLevel":"Check level (please see the wiki)","node-input-topic":"Group Address to monitor","node-input-name":"Node Name","node-input-autoStart":"Auto start the watchdog timer","node-input-listenToKnxSlimNodeErrors":"Listen to KNX-Slim node errors","advancedOptionsAccordion":"Advanced Options","node-input-retryInterval":"Retry interval (in seconds)","node-input-maxRetry":"Number of retry before giving an error"},"placeholder":{"monitor":"Ex: 12/0/0. For 'Only Ethernet' checks, please use a non existent Group Address."},"selectlists":{"Ethernet":"Only Ethernet unicast (Default), using ping. Works ONLY with KNX Interfaces (not routers)","EthKNX":"Ethernet + KNX Twisted Pair, using a real KNX device"},"booleanHint":"DPT must be 1.x (Boolean)"}},"knxSlimGlobalContext":{"knxSlimGlobalContext":{"paletteLabel":"KNX Global Context","title":"KNX Global Context","node-input-name":"Variable Name (no spaces, only chars [a-z])","advanced":{"exposeAsVariable":"Expose as Global variable","exposeAsVariableNO":"No","exposeAsVariableREADONLY":"Read Only","exposeAsVariableREADWRITE":"Read/Write","node-input-server":"Gateway","writeExecutionInterval":"BUS write interval","warning":"Warning: a single node is shared between ALL FLOWS. You don't need more than one node; regardless of where it is, you can see the variable GLOBALLY."},"interval_250ms":"250ms","interval_500ms":"500ms","interval_1000ms_default":"1000ms (Default)","interval_1500ms":"1500ms","interval_2000ms":"2000ms","contextStorage":"Context storage","contextStoragePlaceholder":"Optional context storage name"}}}}

  // Editor definitions contain closure state. Cache one definition per profile
  // and RED editor instance, matching Node-RED's normal registration lifetime.
  // WeakMap prevents a discarded test/editor RED object from being retained.
  const definitionCaches = new WeakMap()

  const normalizeUtilityType = (utilityType) => (
    Object.prototype.hasOwnProperty.call(PROFILE_TYPES, utilityType) ? utilityType : 'alerter'
  )

  const normalizeLocale = (locale) => {
    const value = String(locale || '').trim()
    if (!value) return 'en'
    if (/^zh(?:[-_]|$)/i.test(value)) return 'zh-CN'
    const shortLocale = value.split(/[-_]/)[0].toLowerCase()
    return Object.prototype.hasOwnProperty.call(PROFILE_TRANSLATIONS, shortLocale) ? shortLocale : 'en'
  }

  const UTILITY_LOCALE_KEY = 'node-red-contrib-knx-slim/knxSlimUtility:knxSlimUtility.locale'

  const nodeRedLocale = (RED) => {
    try {
      if (RED && typeof RED._ === 'function') {
        const translated = RED._(UTILITY_LOCALE_KEY)
        if (translated && translated !== UTILITY_LOCALE_KEY) return translated
      }
    } catch (error) { /* use the compatibility fallbacks below */ }
    return undefined
  }

  const currentLocale = (RED) => {
    // Ask Node-RED's active catalog first. documentElement.lang can remain
    // English even while the editor has loaded another locale.
    const candidates = [
      nodeRedLocale(RED),
      RED && RED.settings && RED.settings.lang,
      root && root.document && root.document.documentElement && root.document.documentElement.lang,
      root && root.navigator && root.navigator.language
    ]
    return normalizeLocale(candidates.find((candidate) => candidate))
  }

  const nestedValue = (object, key) => String(key || '').split('.').reduce((value, part) => (
    value && Object.prototype.hasOwnProperty.call(value, part) ? value[part] : undefined
  ), object)

  const interpolate = (value, replacements) => {
    if (typeof value !== 'string' || !replacements || typeof replacements !== 'object') return value
    return value.replace(/{{\s*([^{}]+?)\s*}}/g, (match, key) => (
      Object.prototype.hasOwnProperty.call(replacements, key) ? String(replacements[key]) : match
    ))
  }

  const translationLookup = (utilityType, key, RED, replacements) => {
    let selectedType = normalizeUtilityType(utilityType)
    let localKey = String(key || '')
    const separatorIndex = localKey.lastIndexOf(':')
    if (separatorIndex >= 0) {
      // Fully qualified keys may name a different private profile. Resolve that
      // namespace locally instead of delegating to a legacy Node-RED node type.
      const namespace = localKey.slice(0, separatorIndex)
      localKey = localKey.slice(separatorIndex + 1)
      const namespaceNodeType = namespace.split('/').pop()
      const matchedType = Object.keys(PROFILE_TYPES).find((type) => PROFILE_TYPES[type] === namespaceNodeType)
      if (matchedType) selectedType = matchedType
    }

    const nodeType = PROFILE_TYPES[selectedType]
    const locale = currentLocale(RED)
    const localized = nestedValue(PROFILE_TRANSLATIONS[locale] && PROFILE_TRANSLATIONS[locale][nodeType], localKey)
    const fallback = nestedValue(PROFILE_TRANSLATIONS.en && PROFILE_TRANSLATIONS.en[nodeType], localKey)
    return interpolate(localized === undefined ? fallback : localized, replacements)
  }

  const translate = (utilityType, key, RED, replacements) => {
    const translated = translationLookup(utilityType, key, RED, replacements)
    if (translated !== undefined) return translated
    // Unknown keys may belong to Node-RED itself or the outer Utility. Only
    // those keys are allowed to fall through to the real editor translator.
    if (RED && typeof RED._ === 'function') {
      try { return RED._(key, replacements) } catch (error) { /* use the key below */ }
    }
    return key
  }

  const createDefinition = (utilityType, RED) => {
    const selectedType = normalizeUtilityType(utilityType)
    let capturedDefinition

    // Object.create keeps every real RED editor service available (nodes.node,
    // sidebar, events, notify, and so on) while replacing only the registration
    // boundary and translation resolver used by the private editor source.
    const redFacade = Object.create(RED)
    redFacade.nodes = Object.create((RED && RED.nodes) || null)
    redFacade.nodes.registerType = (nodeType, definition) => {
      if (nodeType === PROFILE_TYPES[selectedType]) capturedDefinition = definition
    }
    redFacade._ = (key, replacements) => translate(selectedType, key, RED, replacements)

    PROFILE_FACTORIES[selectedType](redFacade)
    if (!capturedDefinition) throw new Error('Unable to load KNX Utility editor profile: ' + selectedType)

    // Node-RED normally attaches a scoped translator while registering a type.
    // Because registration is captured, attach the equivalent private resolver.
    capturedDefinition._ = (key, replacements) => translate(selectedType, key, RED, replacements)
    return capturedDefinition
  }

  const getDefinition = (utilityType, RED) => {
    const selectedType = normalizeUtilityType(utilityType)
    let cache = definitionCaches.get(RED)
    if (!cache) {
      cache = new Map()
      definitionCaches.set(RED, cache)
    }
    if (!cache.has(selectedType)) cache.set(selectedType, createDefinition(selectedType, RED))
    return cache.get(selectedType)
  }

  const getTemplate = (utilityType) => PROFILE_TEMPLATES[normalizeUtilityType(utilityType)]

  // Expose only the narrow API consumed by knxSlimUtility.html and
  // tests. The implementation tables remain private and cannot be mutated.
  return Object.freeze({
    PROFILE_TYPES,
    createDefinition,
    getDefinition,
    getTemplate,
    normalizeUtilityType,
    normalizeLocale,
    currentLocale,
    translate
  })
}))
