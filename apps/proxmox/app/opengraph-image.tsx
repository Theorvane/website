import { ImageResponse } from "next/og";

export const alt = "Proxmox MCP — a safety-gated MCP server for Proxmox VE";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// The site's own cool teal-ink palette, echoing the cyan accent on the landing page.
const ink = "#eaf6f6";
const ground = "#06110f";
const glow = "#08312f";
const accent = "#22d3ee";
const muted = "#8fb0b0";

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
					background: `radial-gradient(circle at 82% 8%, ${glow} 0%, ${ground} 55%)`,
					color: ink,
				}}
			>
				<div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 34, fontWeight: 800, letterSpacing: "0.08em" }}>
					<div style={{ width: 38, height: 38, borderRadius: 10, background: accent }} />
					<div style={{ display: "flex" }}>PROXMOX·MCP</div>
				</div>

				<div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
					<div style={{ display: "flex", fontSize: 27, letterSpacing: "0.1em", color: accent, textTransform: "uppercase" }}>
						Safety-gated MCP server
					</div>
					<div style={{ display: "flex", flexDirection: "column", fontSize: 84, fontWeight: 700, letterSpacing: "-0.045em", lineHeight: 1.02 }}>
						<div style={{ display: "flex" }}>Proxmox,</div>
						<div style={{ display: "flex", color: accent }}>behind a safety gate.</div>
					</div>
					<div style={{ display: "flex", fontSize: 30, lineHeight: 1.45, color: muted, maxWidth: 940 }}>
						An MCP server for the Proxmox VE API — reads stay open, every mutation stays behind explicit, auditable boundaries.
					</div>
				</div>

				<div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: muted }}>
					<div style={{ display: "flex" }}>proxmox.theorvane.tech</div>
					<div style={{ display: "flex" }}>Built on TypeMCP</div>
				</div>
			</div>
		),
		size,
	);
}
