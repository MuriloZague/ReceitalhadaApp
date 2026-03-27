import React from "react";
import { StyleSheet, View } from "react-native";
import Svg, { Path } from "react-native-svg";

interface WavesProps {
  height?: number;
  color?: string;
}

export default function Waves({ height = 120, color = "#E96B35" }: WavesProps) {
  return (
    <View style={styles.container}>
      <Svg
        height={height}
        width="100%"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        style={styles.svg}
      >
        <Path
          d="M0,40 Q300,80 600,40 T1200,40 L1200,120 L0,120 Z"
          fill={color}
          opacity="0.1"
        />
        <Path
          d="M0,50 Q300,90 600,50 T1200,50 L1200,120 L0,120 Z"
          fill={color}
          opacity="0.15"
        />
        <Path
          d="M0,60 Q300,100 600,60 T1200,60 L1200,120 L0,120 Z"
          fill={color}
          opacity="0.2"
        />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    overflow: "hidden",
  },
  svg: {
    marginTop: -1,
  },
});
