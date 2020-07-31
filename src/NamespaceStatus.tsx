import React from 'react';
import { View } from 'react-native';

import { Namespace } from "./types";
import { NamespaceStatusPhaseColors } from "./colors";

export default function NamespaceStatus({ namespace }: { namespace: Namespace }) {
  const color = NamespaceStatusPhaseColors[namespace.status.phase] || NamespaceStatusPhaseColors.Unknown;
  return (
    <View style={{ width: 24, height: 24, backgroundColor: color, borderRadius: 12 }} />
  )
}
