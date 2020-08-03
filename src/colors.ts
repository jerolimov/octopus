// https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/
export const PodStatusPhaseColors: Record<string, string> = {
  Pending: 'lightgreen',
  Running: 'green',
  Succeeded: 'orange',
  Failed: 'red',
  Unknown: 'grey',
}

export const NamespaceStatusPhaseColors: Record<string, string> = {
  Active: 'green',
  Unknown: 'grey',
}
