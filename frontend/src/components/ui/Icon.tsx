interface IconProps {
  name: string;
  filled?: boolean;
  className?: string;
  size?: number;
}

export function Icon({ name, filled = false, className = '', size }: IconProps) {
  return (
    <span
      className={`material-symbols-outlined ${className}`}
      style={{
        ...(size ? { fontSize: `${size}px` } : {}),
        ...(filled ? { fontVariationSettings: "'FILL' 1" } : {}),
      }}
    >
      {name}
    </span>
  );
}
