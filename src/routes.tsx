import { Pod, Namespace, Deployment, ReplicaSet, CustomResourceDefinition } from "./types";

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
  CustomResourceDefinitions: any;
  CustomResourceDefinition: { customResourceDefinition: CustomResourceDefinition };
  APIGroups: { path: string };
  APIGroup: { path: string };
  APIResources: { path: string };
  APIServices: { path: string };
  APIService: { path: string };
  CreateDeployment: any,
  ViewYaml: { yaml: any },
}
