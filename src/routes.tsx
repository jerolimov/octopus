import { Pod, Namespace, Deployment } from "./types";

export type StackParamList = {
  Home: any,
  Details: any,
  OCLogin: any,
  Pods: any,
  Pod: { pod: Pod },
  Namespaces: any,
  Namespace: { namespace: Namespace },
  Deployments: any,
  Deployment: { deployment: Deployment },
}
