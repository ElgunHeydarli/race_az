import { useState, useEffect, useCallback } from "react";
import { FaRegSnowflake } from "react-icons/fa";
import { api } from "@/api/axiosClient";

interface Snowflake {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  createdAt: number;
  drift: number;
  direction: 1 | -1;
  type: "dot" | "icon";
}

const SnowEffect = () => {
  const [enabled, setEnabled] = useState(false);
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);

  useEffect(() => {
    api
      .get<{ snow_effect: boolean }>("/settings/snow-effect")
      .then((res) => setEnabled(res.data.snow_effect))
      .catch(() => setEnabled(false));
  }, []);

  const createSnowflake = useCallback((): Snowflake => {
    return {
      id: Math.random(),
      left: Math.random() * 100,
      size: Math.random() * 3 + 2,
      duration: Math.random() * 5 + 6,
      delay: Math.random(),
      opacity: Math.random() * 0.4 + 0.4,
      createdAt: Date.now(),
      drift: Math.random() * 60 + 40,
      direction: Math.random() > 0.5 ? 1 : -1,
      type: Math.random() < 0.6 ? "icon" : "dot",
    };
  }, []);

  useEffect(() => {
    if (!enabled) {
      setSnowflakes([]);
      return;
    }

    setSnowflakes(Array.from({ length: 35 }, createSnowflake));

    const interval = setInterval(() => {
      setSnowflakes((prev) => {
        const now = Date.now();
        return [
          ...prev.filter((s) => now - s.createdAt < 11000),
          createSnowflake(),
        ];
      });
    }, 300);

    return () => clearInterval(interval);
  }, [enabled, createSnowflake]);

  if (!enabled) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        overflow: "hidden",
        zIndex: 9999,
      }}
    >
      <style>{`
        @keyframes snowDiagonal {
          from {
            transform: translate(0px, -20px);
          }
          to {
            transform: translate(
              calc(var(--drift) * var(--dir)),
              110vh
            );
          }
        }
      `}</style>

      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          style={{
            position: "absolute",
            top: "-20px",
            left: `${flake.left}%`,
            opacity: flake.opacity,
            animation: `snowDiagonal ${flake.duration}s linear ${flake.delay}s infinite`,
            color: "white",
            ["--drift" as any]: `${flake.drift}px`,
            ["--dir" as any]: flake.direction,
          }}
        >
          {flake.type === "icon" ? (
            <FaRegSnowflake size={flake.size * 4} />
          ) : (
            <div
              style={{
                width: flake.size,
                height: flake.size,
                backgroundColor: "white",
                borderRadius: "50%",
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default SnowEffect;
