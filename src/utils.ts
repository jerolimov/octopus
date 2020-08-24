import { V1Namespace as Namespace } from '@kubernetes/client-node/dist/gen/model/v1Namespace';

export function filterSystemNamespace(namespace: Namespace) {
  const name = namespace.metadata?.name;
  return name && (
    name.startsWith('kube-') ||
    name.startsWith('kubernetes-') ||
    name.startsWith('tekton-')
  );
}
