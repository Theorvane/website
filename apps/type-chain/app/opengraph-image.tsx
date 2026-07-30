import { ImageResponse } from "next/og";

export const alt = "TypeChain — typed tools, explicit boundaries";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Sampled from the repository hero art: near-black ground with a mint accent.
const ink = "#eafaf3";
const ground = "#000208";
const glow = "#07281f";
const accent = "#60d0a8";
const muted = "#8fab9f";

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
					background: `radial-gradient(circle at 78% 8%, ${glow} 0%, ${ground} 60%)`,
					color: ink,
				}}
			>
				<div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 36, fontWeight: 700, letterSpacing: "0.02em" }}>
					<div style={{ width: 40, height: 40, borderRadius: 10, background: accent }} />
					<div style={{ display: "flex" }}>
						TYPE<span style={{ color: accent }}>CHAIN</span>
					</div>
				</div>

				<div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
					<div style={{ display: "flex", fontSize: 27, letterSpacing: "0.1em", color: accent, textTransform: "uppercase" }}>
						TypeScript · LangChain · Stage 3 decorators
					</div>
					<div style={{ display: "flex", flexDirection: "column", fontSize: 82, fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1.04 }}>
						<div style={{ display: "flex" }}>Typed tools.</div>
						<div style={{ display: "flex", color: accent }}>Explicit boundaries.</div>
					</div>
					<div style={{ display: "flex", fontSize: 30, lineHeight: 1.45, color: muted, maxWidth: 940 }}>
						Author LangChain tools and agents without hiding schemas — models, credentials, and policy stay yours.
					</div>
				</div>

				<div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: muted }}>
					<div style={{ display: "flex" }}>typechain.theorvane.tech</div>
					<div style={{ display: "flex" }}>Theorvane</div>
				</div>
			</div>
		),
		size,
	);
}
