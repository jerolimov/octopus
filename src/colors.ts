import { PodStatusPhase } from "./types";

// https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/
export const PodStatusPhaseColors: Record<PodStatusPhase, string> = {
  Pending: 'lightgreen',
  Running: 'green',
  Succeeded: 'orange',
  Failed: 'red',
  Unknown: 'gray',
}
