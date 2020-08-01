import { Pod, Namespace, Deployment, ReplicaSet } from "./types";

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
  ReplicaSets: any,
  ReplicaSet: { replicaSet: ReplicaSet }
  CreateDeployment: any,
  ViewYaml: { yaml: any },
}
