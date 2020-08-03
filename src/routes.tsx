import { V1Pod as Pod } from '@kubernetes/client-node/dist/gen/model/v1Pod';
import { V1Namespace as Namespace } from '@kubernetes/client-node/dist/gen/model/v1Namespace';
import { V1Deployment as Deployment } from '@kubernetes/client-node/dist/gen/model/v1Deployment';
import { V1ReplicaSet as ReplicaSet } from '@kubernetes/client-node/dist/gen/model/v1ReplicaSet';
import { V1CustomResourceDefinition as CustomResourceDefinition } from '@kubernetes/client-node/dist/gen/model/v1CustomResourceDefinition';

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
