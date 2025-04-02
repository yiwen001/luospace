varying vec3 vPosition;
varying vec2 vUv;
uniform float wireframeWidth;

void main() {
    // 使用 wireframeConfig 中的分段数配置
    vec2 grid = abs(fract(vUv * vec2(280.0, 1.0) - 0.5) - 0.5) / fwidth(vUv * vec2(280.0, 1.0));
    float line = grid.x;
    float wireframe = 1.0 - min(line, 1.0);
    
    // 使用 wireframeConfig 中的颜色配置
    vec3 wireframeColor = vec3(0.5); // 使用配置中的线框颜色
    vec3 baseColor = vec3(1.0);      // 使用配置中的基础颜色
    
    vec3 finalColor = mix(baseColor, wireframeColor, wireframe);
    // 只有线框部分不透明，其他部分完全透明
    float alpha = wireframe;
    gl_FragColor = vec4(finalColor, alpha);
}