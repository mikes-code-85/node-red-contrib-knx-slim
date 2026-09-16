module.exports = function dispatchWatchDogNodeError (configNode, nodeError) {
  const clients = Array.isArray(configNode && configNode.nodeClients) ? configNode.nodeClients : []

  clients
    .filter(client => client && client.isWatchDog === true && client.listenToKnxSlimNodeErrors !== false && client.listenToKnxSlimNodeErrors !== 'false')
    .forEach(client => {
      try {
        if (typeof client.signalNodeErrorCalledByConfigNode === 'function') {
          client.signalNodeErrorCalledByConfigNode(nodeError)
        }
      } catch (error) {
        try {
          configNode.sysLogger?.error(`Unable to report KNX-Slim node error to Watchdog ${client.id}: ${error.message || error}`)
        } catch {
          // Error reporting must not prevent delivery to the remaining Watchdogs.
        }
      }
    })
}
