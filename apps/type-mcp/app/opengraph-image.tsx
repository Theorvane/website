import { ImageResponse } from "next/og";

export const alt = "TypeMCP — decorator-first MCP, built for boundaries";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Sampled from the repository hero art: near-black navy ground with an electric blue accent.
const ink = "#eaf0ff";
const ground = "#00010f";
const glow = "#0b1e5c";
const accent = "#2860f8";
const muted = "#93a4cc";

export default function OpenGraphImage() {
	return new ImageResponse(
		(
			<div
				style={{
					width: "100%",
					height: "100%",
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between",
					padding: "72px 80px",
					background: `radial-gradient(circle at 78% 6%, ${glow} 0%, ${ground} 58%)`,
					color: ink,
				}}
			>
				<div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 36, fontWeight: 700 }}>
					<div style={{ width: 40, height: 40, borderRadius: 10, background: accent }} />
					<div style={{ display: "flex" }}>
						type<span style={{ color: accent }}>mcp</span>
					</div>
				</div>

				<div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
					<div style={{ display: "flex", fontSize: 27, letterSpacing: "0.1em", color: accent, textTransform: "uppercase" }}>
						TypeScript · MCP · Explicit contracts
					</div>
					<div style={{ display: "flex", flexDirection: "column", fontSize: 80, fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1.04 }}>
						<div style={{ display: "flex" }}>Decorator-first MCP.</div>
						<div style={{ display: "flex", color: accent }}>Built for boundaries.</div>
					</div>
					<div style={{ display: "flex", fontSize: 30, lineHeight: 1.45, color: muted, maxWidth: 940 }}>
						Declare, validate, and compile MCP server surfaces — your application keeps hosting and policy.
					</div>
				</div>

				<div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: muted }}>
					<div style={{ display: "flex" }}>typemcp.theorvane.tech</div>
					<div style={{ display: "flex" }}>Theorvane</div>
				</div>
			</div>
		),
		size,
	);
}
