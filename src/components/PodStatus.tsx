import React from 'react';
import { View } from 'react-native';
import { V1Pod as Pod } from '@kubernetes/client-node/dist/gen/model/v1Pod';

import { PodStatusPhaseColors } from "../colors";

export default function PodStatus({ pod }: { pod: Pod }) {
  const color = pod.status?.phase && PodStatusPhaseColors[pod.status.phase] || PodStatusPhaseColors.Unknown;
  return (
    <View style={{ width: 24, height: 24, backgroundColor: color, borderRadius: 12 }} />
  )
}
