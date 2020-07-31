
type ApiVersion = string;
type Kind = string;
type JSONString = string;
type DateTimeString = string;

export interface OwnerReferences {
  apiVersion: ApiVersion;
  kind: Kind;
  name: string;
  uid: string;
  controller: boolean;
  blockOwnerDeletion: boolean;
}

export interface Metadata {
  namespace: string;
  name: string;
  generateName: string;
  selfLink: string;
  uid: string;
  resourceVersion: string | number;
  creationTimestamp: DateTimeString;
  labels: Record<string, string>;
  ownerReferences: OwnerReferences;
  managedFields: {
    manager: string;
    operation: string;
    apiVersion: string;
    time: DateTimeString;
    fieldsType: string;
    fieldsV1: JSONString;
  }[];
}

export interface VolumeMount {
  name: string;
  mountPath: string;
  readOnly: boolean;
}

export interface Container {
  name: string;
  image: string;
  resources: {};
  volumeMounts: VolumeMount[];
}

export interface Toleration {
  key: string;
  operator: 'Exists';
  effect: 'NoExecute';
  tolerationSeconds: number;
}

export interface Condition {
  type: string;
  status: string;
  lastProbeTime: DateTimeString;
  lastTransitionTime: DateTimeString;
}

export interface ContainerStatus {
  name: string;
  state: {
    running: {
      startedAt: DateTimeString;
    };
  };
  lastState: {};
  ready: boolean;
  restartCount: number;
  image: string;
  imageID: string;
  containerID: string;
  started: true;
}

export type PodStatusPhase = 'Pending' | 'Running' | 'Succeeded' | 'Failed' | 'Unknown';

export interface Pod {
  metadata: Metadata,
  spec: {
    volumes: {
      name: string;
      secret: {
        secretName: string;
        defaultMode: number;
      }
    }[],
    containers: Container[],
    restartPolicy: 'Always';
    terminationGracePeriodSeconds: number;
    dnsPolicy: string;
    serviceAccountName: string;
    serviceAccount: string;
    nodeName: string;
    securityContext: {};
    schedulerName: string;
    tolerations: Toleration[];
    priority: number;
    enableServiceLinks: boolean;
  };
  status: {
    phase: PodStatusPhase;
    conditions: Condition[];
    hostIP: string;
    podIP: string;
    podIPs: { ip: string }[];
    startTime: DateTimeString;
    containerStatuses: ContainerStatus[];
    qosClass: string;
  }
}

export interface PodList {
  apiVersion: 'v1',
  kind: 'PodList',
  metadata: Record<string, string>,
  items: Pod[],
}
