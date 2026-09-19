import { useEffect, useRef } from "react";

/**
 * Signature Liquid Chrome Sculpture for UNIGNORABLE Hero.
 * Renders a high-performance WebGL procedural liquid metallic/chrome sculpture
 * that smoothly reacts to cursor position, mouse velocity, and scroll tilt.
 */
export function HeroChromeSculpture() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });

    if (!gl) return;

    // Vertex Shader: Fullscreen quad
    const vsSource = `
      attribute vec2 a_position;
      varying vec2 v_uv;
      void main() {
        v_uv = (a_position + 1.0) * 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    // Fragment Shader: Raymarched reflective liquid chrome object
    const fsSource = `
      precision mediump float;
      varying vec2 v_uv;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;
      uniform float u_time;
      uniform float u_scroll;

      // Rotation matrix
      mat2 rot(float a) {
        float s = sin(a), c = cos(a);
        return mat2(c, -s, s, c);
      }

      // Smooth minimum for organic liquid blending
      float smin(float a, float b, float k) {
        float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
        return mix(b, a, h) - k * h * (1.0 - h);
      }

      // Signed distance function of twisting chrome sculpture
      float map(vec3 p) {
        vec3 q = p;
        q.yz *= rot(u_mouse.y * 1.2 + sin(u_time * 0.35) * 0.4 + u_scroll * 1.5);
        q.xz *= rot(u_mouse.x * 1.4 + u_time * 0.45);

        // Torus base
        vec2 t = vec2(1.1, 0.35);
        float d1 = length(vec2(length(q.xz) - t.x, q.y)) - t.y;

        // Floating dynamic liquid spheres
        vec3 p2 = q + vec3(sin(u_time * 1.2) * 0.6, cos(u_time * 0.9) * 0.5, sin(u_time * 0.7) * 0.5);
        float d2 = length(p2) - 0.55;

        vec3 p3 = q - vec3(cos(u_time * 0.8) * 0.7, sin(u_time * 1.1) * 0.6, cos(u_time * 0.6) * 0.6);
        float d3 = length(p3) - 0.45;

        // Ripple distortion
        float displacement = sin(5.0 * q.x + u_time) * sin(5.0 * q.y + u_time) * sin(5.0 * q.z + u_time) * 0.08;

        return smin(smin(d1, d2, 0.45), d3, 0.4) + displacement;
      }

      // Calculate normal
      vec3 calcNormal(vec3 p) {
        vec2 e = vec2(0.003, 0.0);
        return normalize(vec3(
          map(p + e.xyy) - map(p - e.xyy),
          map(p + e.yxy) - map(p - e.yxy),
          map(p + e.yyx) - map(p - e.yyx)
        ));
      }

      void main() {
        vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);

        // Subtle perspective camera
        vec3 ro = vec3(0.0, 0.0, 3.4);
        vec3 rd = normalize(vec3(uv, -1.8));

        float dO = 0.0;
        float dS = 0.0;
        vec3 p = ro;

        for(int i = 0; i < 48; i++) {
          p = ro + rd * dO;
          dS = map(p);
          dO += dS;
          if (dS < 0.002 || dO > 10.0) break;
        }

        vec4 col = vec4(0.0);

        if (dO < 9.0) {
          vec3 n = calcNormal(p);
          vec3 ref = reflect(rd, n);

          // Liquid chrome lighting: metallic fresnel + iridescent reflections
          float fresnel = pow(1.0 - clamp(dot(-rd, n), 0.0, 1.0), 3.0);
          float spec1 = pow(max(dot(ref, normalize(vec3(1.2, 1.8, 1.0))), 0.0), 32.0);
          float spec2 = pow(max(dot(ref, normalize(vec3(-1.5, -1.0, 0.5))), 0.0), 16.0);

          // Acid lime & mercury silver reflection tones
          vec3 env1 = vec3(0.85, 1.0, 0.15) * spec1 * 1.8; // Acid flash
          vec3 env2 = vec3(0.92, 0.95, 1.0) * (spec2 * 0.9 + 0.1);
          vec3 baseChrome = mix(vec3(0.12, 0.12, 0.14), vec3(0.96, 0.96, 0.98), fresnel * 0.85 + 0.15);

          vec3 finalColor = baseChrome + env1 + env2 * 0.6;
          float alpha = smoothstep(9.0, 2.0, dO) * 0.85;

          col = vec4(finalColor, alpha);
        }

        gl_FragColor = col;
      }
    `;

    function createShader(glCtx: WebGLRenderingContext, type: number, source: string) {
      const shader = glCtx.createShader(type);
      if (!shader) return null;
      glCtx.shaderSource(shader, source);
      glCtx.compileShader(shader);
      if (!glCtx.getShaderParameter(shader, glCtx.COMPILE_STATUS)) {
        glCtx.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vs = createShader(gl, gl.VERTEX_SHADER, vsSource);
    const fs = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      return;
    }

    const positionLoc = gl.getAttribLocation(program, "a_position");
    const resolutionLoc = gl.getUniformLocation(program, "u_resolution");
    const mouseLoc = gl.getUniformLocation(program, "u_mouse");
    const timeLoc = gl.getUniformLocation(program, "u_time");
    const scrollLoc = gl.getUniformLocation(program, "u_scroll");

    // Full-screen quad buffer
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1, -1,
         1, -1,
        -1,  1,
        -1,  1,
         1, -1,
         1,  1,
      ]),
      gl.STATIC_DRAW,
    );

    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    let scrollY = 0;
    let targetScrollY = 0;
    let animationId = 0;

    const onPointerMove = (e: PointerEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };

    const onScroll = () => {
      targetScrollY = window.scrollY / (window.innerHeight || 1);
    };

    const resize = () => {
      const width = canvas.clientWidth || window.innerWidth;
      const height = canvas.clientHeight || window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    resize();

    const startTime = performance.now();

    const render = (timeNow: number) => {
      // Lerp mouse and scroll
      mouseX += (targetMouseX - mouseX) * 0.06;
      mouseY += (targetMouseY - mouseY) * 0.06;
      scrollY += (targetScrollY - scrollY) * 0.08;

      gl.useProgram(program);

      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

      gl.enableVertexAttribArray(positionLoc);
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

      gl.uniform2f(resolutionLoc, canvas.width, canvas.height);
      gl.uniform2f(mouseLoc, mouseX, mouseY);
      gl.uniform1f(timeLoc, (timeNow - startTime) * 0.001);
      gl.uniform1f(scrollLoc, scrollY);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buffer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 size-full opacity-70 mix-blend-screen"
    />
  );
}
