
type ApiVersion = string;
type Kind = string;
type JSONString = string;
type DateTimeString = string;
type Labels = Record<string, string>;
type Annotations = Record<string, string>;
type BooleanString = 'True' | 'False';

export interface Version {
  major: string;
  minor: string;
  gitVersion: string;
  gitCommit: string;
  gitTreeState: string;
  buildDate: string;
  goVersion: string;
  compiler: string;
  platform: string;
}

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
  labels?: Labels;
  annotations?: Annotations;
  ownerReferences?: OwnerReferences[];
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
  reason: string;
  message: string;
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
  apiVersion: 'v1';
  kind: 'Pod';
  metadata: Metadata;
  spec: PodSpec;
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

export interface PodSpec {
  volumes: {
    name: string;
    secret: {
      secretName: string;
      defaultMode: number;
    }
  }[];
  containers: Container[];
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
}

export interface PodList {
  apiVersion: 'v1';
  kind: 'PodList';
  metadata: Record<string, string>;
  items: Pod[];
}

export interface NamespaceList {
  kind: 'NamespaceList';
  apiVersion: 'v1';
  metadata: {
    selfLink: string;
    resourceVersion: string | number;
  };
  items: Namespace[];
}

export type NamespaceStatusPhase = 'Active' | 'Unknown';

export interface Namespace {
  kind: 'Namespace';
  apiVersion: 'v1';
  metadata: Metadata;
  spec: {
    finalizers: string[];
  };
  status: {
    phase: NamespaceStatusPhase;
  };
}

export interface DeploymentList {
  kind: 'DeploymentList';
  apiVersion: 'apps/v1';
  metadata: {
    selfLink: string;
    resourceVersion: string | number;
  };
  items: Deployment[];
}

export interface Deployment {
  kind: 'Deployment';
  apiVersion: 'apps/v1';
  metadata: Metadata & {
    generation: number;
  };
  spec: {
    replicas: number;
    selector: {
      matchLabels: Labels;
    };
    template: {
      metadata: Metadata;
      spec: PodSpec;
    };
    strategy: {
      type: 'RollingUpdate';
      rollingUpdate: {
        maxUnavailable: string;
        maxSurge: string;
      };
    };
    revisionHistoryLimit: number;
    progressDeadlineSeconds: number;
  };
  status: {
    observedGeneration: number;
    replicas: number;
    updatedReplicas: number;
    readyReplicas: number;
    availableReplicas: number;
    conditions: {
      type: DeploymentStatusConditionType;
      status: BooleanString;
      lastUpdateTime: DateTimeString;
      lastTransitionTime: DateTimeString;
      reason: string;
      message: string;
    }[];
  };
}

type DeploymentStatusConditionType = 'Available' | 'Progressing';

export interface ReplicaSetList {
  kind: 'ReplicaSetList';
  apiVersion: 'apps/v1';
  metadata: Metadata;
  items: ReplicaSet[];
};

export interface ReplicaSet {
  kind: 'ReplicaSet';
  apiVersion: 'apps/v1';
  metadata: Metadata & {
    generation: number;
  };
  spec: {
    replicas: number;
    selector: {
      matchLabels: Labels;
    };
    template: {
      metadata: Metadata;
    };
    spec: {
      containers: (Container & {
        imagePullPolicy: 'Always';
      })[];
      restartPolicy: 'Always';
      terminationGracePeriodSeconds: number;
      dnsPolicy: 'ClusterFirst';
      securityContext: {};
      schedulerName: string;
    };
  };
  status: {
    replicas: number;
    fullyLabeledReplicas: number;
    readyReplicas: number;
    availableReplicas: number;
    observedGeneration: number;
  }
}

export interface CustomResourceDefinitionList {
  apiVersion: 'apiextensions.k8s.io/v1';
  kind: 'CustomResourceDefinitionList';
  metadata: Metadata;
  items: CustomResourceDefinition[];
}

export interface CustomResourceDefinition {
  apiVersion: 'apiextensions.k8s.io/v1';
  kind: 'CustomResourceDefinitionList';
  metadata: Metadata;
  spec: {
    group: string;
    names: {
      listKind: string;
      kind: string;
      singular: string;
      plural: string;
      categories: string[];      
    };
    scope: 'Cluster' | 'Namespaced';
    versions: {
      name: string;
      served: boolean;
      storage: boolean;
      schema: {
        openAPIV3Schema: {
          type: 'object';
          'x-kubernetes-preserve-unknown-fields': boolean;
        };
      };
      subresources: {
        status: {};
      };
    }[];
    conversion: {
      strategy: 'Webhook';
      webhook: {
        clientConfig: {
          service: {
            namespace: string;
            name: string;
            path: string;
            port: number;
          };
          caBundle: string;
        };
        conversionReviewVersions: string[];
      };
    };
    status: {
      conditions: {
        type: string;
        status: string;
        lastTransitionTime: DateTimeString;
        reason: string;
        message: string;
      }[];
      acceptedNames: {
        listKind: string;
        kind: string;
        singular: string;
        plural: string;
        categories: string[];      
      };
      storedVersions: string[];
    };
  };
}
