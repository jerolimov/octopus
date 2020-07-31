import { PodStatusPhase, NamespaceStatusPhase } from "./types";

// https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/
export const PodStatusPhaseColors: Record<PodStatusPhase, string> = {
  Pending: 'lightgreen',
  Running: 'green',
  Succeeded: 'orange',
  Failed: 'red',
  Unknown: 'grey',
}

export const NamespaceStatusPhaseColors: Record<NamespaceStatusPhase, string> = {
  Active: 'green',
  Unknown: 'grey',
}
