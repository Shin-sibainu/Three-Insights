uniform vec3 uColor;
uniform float uTime;
varying vec3 vPosition;

// HSLからRGBに変換する関数
vec3 hsl2rgb(vec3 c) {
    vec3 rgb = clamp(abs(mod(c.x * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
    return c.z + c.y * (rgb - 0.5) * (1.0 - abs(2.0 * c.z - 1.0));
}

void main() {
    // 円形のポイントを描画
    vec2 center = gl_PointCoord - 0.5;
    float dist = length(center);
    if (dist > 0.5) discard;

    // ポイントの明るさを計算
    float brightness = 1.0 - smoothstep(0.4, 0.5, dist);
    
    // 位置と時間に基づいて色相を変化させる
    float hue = fract(uTime * 0.1 + vPosition.x * 0.01 + vPosition.y * 0.02 + vPosition.z * 0.03);
    
    // 彩度と明度も時間と位置に基づいて変化させる
    float saturation = 0.5 + 0.5 * sin(uTime + vPosition.y * 5.0);
    float lightness = 0.5 + 0.3 * sin(uTime * 0.5 + vPosition.z * 3.0);

    // HSLからRGBに変換
    vec3 color = hsl2rgb(vec3(hue, saturation, lightness));
    
    // 元の色との混合
    color = mix(uColor, color, 0.8);  // 80%新しい色、20%元の色

    gl_FragColor = vec4(color * brightness, brightness);
}