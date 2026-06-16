/**
 * LoopingVideo — simple native loop background video, full-opacity, covers parent.
 * The `opacity` prop controls the wrapper opacity (default 1 = fully visible).
 * Uses native HTML5 `loop` attribute for seamless looping.
 */
export default function LoopingVideo({ src, opacity = 1, style = {} }) {
  return (
    <video
      src={src}
      autoPlay
      loop
      muted
      playsInline
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        opacity,
        zIndex: 0,
        pointerEvents: "none",
        ...style
      }}
    />
  );
}
