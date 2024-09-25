uniform float uTime;
uniform float uSize;
uniform vec2 uMouse;
uniform vec3 uObjectPosition;
uniform vec3 uCameraPosition;
varying vec3 vPosition;

// ランダムな値を生成する関数
float random(vec3 scale, float seed) {
    return fract(sin(dot(gl_Position.xyz + seed, scale)) * 43758.5453 + seed);
}

// パーリンノイズ風の関数（簡易版）
float noise(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(mix(random(i, 0.0), 
                       random(i + vec3(1.0, 0.0, 0.0), 1.0), f.x),
                   mix(random(i + vec3(0.0, 1.0, 0.0), 2.0), 
                       random(i + vec3(1.0, 1.0, 0.0), 3.0), f.x), f.y),
               mix(mix(random(i + vec3(0.0, 0.0, 1.0), 4.0), 
                       random(i + vec3(1.0, 0.0, 1.0), 5.0), f.x),
                   mix(random(i + vec3(0.0, 1.0, 1.0), 6.0), 
                       random(i + vec3(1.0, 1.0, 1.0), 7.0), f.x), f.y), f.z);
}

void main() {
    vPosition = position;
    vec3 pos = position;
    vec3 originalPos = position; // 元の位置を保存
    
    vec4 worldPosition = modelMatrix * vec4(pos, 1.0);
    vec4 clipSpace = projectionMatrix * viewMatrix * worldPosition;
    vec3 ndc = clipSpace.xyz / clipSpace.w;
    vec2 screenPosition = ndc.xy;
    
    vec2 mouseDistanceXY = abs(uMouse - screenPosition);
    float mouseDistance = length(mouseDistanceXY);
    
    // マウスに近い点をより散漫に動かす
    float moveFactor = smoothstep(0.2, 0.0, mouseDistance) * 0.7;
    vec3 moveDirection = normalize(worldPosition.xyz - uCameraPosition);
    
    // ノイズベースの動き
    vec3 noisePos = pos * 2.0 + uTime * 0.3;
    vec3 noiseDisplacement = vec3(
        noise(noisePos),
        noise(noisePos + 100.0),
        noise(noisePos + 200.0)
    ) * 2.0 - 1.0;
    
    // より大きな動きを与える
    vec3 displacement = (moveDirection + noiseDisplacement) * moveFactor * 0.5;
    
    // 時間に基づく追加の動き
    vec3 timeDisplacement = vec3(
        sin(uTime * 2.0 + pos.x * 10.0) * 0.02,
        cos(uTime * 1.7 + pos.y * 8.0) * 0.02,
        sin(uTime * 1.5 + pos.z * 6.0) * 0.02
    );
    
    pos += displacement + timeDisplacement;
    
    // 元の位置に向かってゆっくり戻る
    pos = mix(pos, originalPos, 0.001); // さらにゆっくり戻るように調整

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    
    // ポイントサイズも変動させる
    gl_PointSize = uSize * (770.0 / -mvPosition.z) * (1.0 + noise(vec3(uTime * 0.1)) * 0.5);
}