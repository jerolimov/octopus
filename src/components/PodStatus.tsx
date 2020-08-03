import React from 'react';
import { View } from 'react-native';

import { Pod } from "../types";
import { PodStatusPhaseColors } from "../colors";

export default function PodStatus({ pod }: { pod: Pod }) {
  const color = PodStatusPhaseColors[pod.status.phase] || PodStatusPhaseColors.Unknown;
  return (
    <View style={{ width: 24, height: 24, backgroundColor: color, borderRadius: 12 }} />
  )
}
