import { Namespace } from "./types";

export function filterSystemNamespace(namespace: Namespace) {
  const name = namespace.metadata.name;
  return name.startsWith('kube-') || name.startsWith('kubernetes-');
}
