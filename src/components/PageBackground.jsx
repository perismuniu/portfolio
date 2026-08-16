import { FloatingGeometrics, ParticleField } from "./AnimatedVectors";

export default function PageBackground({ mode }) {
  return (
    <div className={`page-background page-bg-${mode}`}>
      <FloatingGeometrics />
      <ParticleField />
    </div>
  );
}
