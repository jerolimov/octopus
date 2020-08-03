import { Pod, Namespace, Deployment, ReplicaSet, CustomResourceDefinition } from "./types";

export type StackParamList = {
  Home: any,
  Details: any,
  OCLogin: any,
  Pods: any,
  Pod: { pod: Pod },
  NamespaceList: any,
  Namespace: { namespace: Namespace },
  DeploymentList: any,
  Deployment: { deployment: Deployment },
  ReplicaSetList: any,
  ReplicaSet: { replicaSet: ReplicaSet }
  CustomResourceDefinitionList: any;
  CustomResourceDefinition: { customResourceDefinition: CustomResourceDefinition };
  APIGroupList: { path: string };
  APIGroup: { path: string };
  APIResourceList: { path: string };
  APIServiceList: { path: string };
  APIService: { path: string };
  CreateDeployment: any,
  ViewYaml: { yaml: any },
}
