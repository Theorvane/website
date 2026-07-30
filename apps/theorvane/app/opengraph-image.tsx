import { ImageResponse } from "next/og";

export const alt = "Theorvane — precise tools for the AI-native web";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// The site's own dark palette, matching the radial accent used on the landing page.
const ink = "#f1f1e9";
const ground = "#0b0d0b";
const glow = "#1a2112";
const accent = "#c9ff55";
const muted = "#a4aa9b";

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
					background: `radial-gradient(circle at 80% 0%, ${glow} 0%, ${ground} 55%)`,
					color: ink,
				}}
			>
				<div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 34, fontWeight: 700, letterSpacing: "0.04em" }}>
					<div style={{ width: 38, height: 38, borderRadius: 9, background: accent }} />
					<div style={{ display: "flex" }}>THEORVANE</div>
				</div>

				<div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
					<div style={{ display: "flex", fontSize: 27, letterSpacing: "0.1em", color: accent, textTransform: "uppercase" }}>
						Independent software studio
					</div>
					<div style={{ display: "flex", flexDirection: "column", fontSize: 82, fontWeight: 700, letterSpacing: "-0.045em", lineHeight: 1.03 }}>
						<div style={{ display: "flex" }}>Precise tools for</div>
						<div style={{ display: "flex", color: accent }}>the AI-native web.</div>
					</div>
					<div style={{ display: "flex", fontSize: 30, lineHeight: 1.45, color: muted, maxWidth: 920 }}>
						Focused, verifiable developer tools for explicit contracts and inspectable systems.
					</div>
				</div>

				<div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: muted }}>
					<div style={{ display: "flex" }}>theorvane.tech</div>
					<div style={{ display: "flex" }}>TypeMCP · TypeChain · OpenVideo</div>
				</div>
			</div>
		),
		size,
	);
}
