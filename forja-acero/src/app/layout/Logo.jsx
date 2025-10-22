export default function Logo({ size = 48 }) {
  return (
    <div
      className="logo d-flex align-items-center justify-content-center"
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: 'radial-gradient(circle at 30% 30%, #c8a54e, #1a1a1a 70%)',
        boxShadow: '0 0 12px rgba(200,165,78,0.6), inset 0 0 10px #2a2a2a',
        position: 'relative'
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 64"
        width={size * 0.7}
        height={size * 0.7}
        fill="none"
        stroke="#f5f5f5"
        strokeWidth="2"
        strokeLinecap="round"
      >
        {/* Espada */}
        <path d="M32 10 L32 42" />
        <path d="M28 42 L36 42" />
        <path d="M31 10 L33 10 L32 4 Z" />
        {/* Martillo */}
        <rect x="20" y="24" width="8" height="6" fill="#c8a54e" stroke="none" />
        <rect x="22.5" y="30" width="3" height="14" fill="#c8a54e" stroke="none" />
        {/* Efecto brillo */}
        <circle cx="32" cy="32" r="31" stroke="rgba(200,165,78,0.3)" />
      </svg>
    </div>
  )
}