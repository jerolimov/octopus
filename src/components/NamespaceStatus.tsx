import React from 'react';
import { View } from 'react-native';
import { V1Namespace as Namespace } from '@kubernetes/client-node/dist/gen/model/v1Namespace';

import { NamespaceStatusPhaseColors } from "../colors";

export default function NamespaceStatus({ namespace }: { namespace: Namespace }) {
  const color = namespace.status?.phase && NamespaceStatusPhaseColors[namespace.status.phase] || NamespaceStatusPhaseColors.Unknown;
  return (
    <View style={{ width: 24, height: 24, backgroundColor: color, borderRadius: 12 }} />
  )
}
