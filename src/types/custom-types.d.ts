// custom-types.d.ts

import { Object3DNode } from "@react-three/fiber";
import { Vector2, Vector3 } from "three";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      mainShaderMaterial: Object3DNode<any, any>;
    }
  }
}

type ShaderMaterialProps = {
  uColor?: Color;
  uTime?: number;
} & Omit<JSX.IntrinsicElements["shaderMaterial"], "args">;

interface MainShaderMaterialImpl extends ShaderMaterial {
  uColor: Color;
  uTime: number;
  uMouse: Vector2;
  uObjectPosition: Vector3;
  uCameraPosition: Vector3;
}
