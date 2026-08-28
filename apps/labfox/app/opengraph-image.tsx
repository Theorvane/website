import { ImageResponse } from "next/og";

export const alt = "LabFox — the GitLab workflow client for every platform";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// The site's own warm dark palette, echoing the amber accent on the landing page.
const ink = "#f7f0e6";
const ground = "#100b06";
const glow = "#2a1608";
const accent = "#f97316";
const muted = "#b8a892";

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
					<div style={{ display: "flex" }}>LABFOX</div>
				</div>

				<div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
					<div style={{ display: "flex", fontSize: 27, letterSpacing: "0.1em", color: accent, textTransform: "uppercase" }}>
						GitLab workflow client
					</div>
					<div style={{ display: "flex", flexDirection: "column", fontSize: 84, fontWeight: 700, letterSpacing: "-0.045em", lineHeight: 1.02 }}>
						<div style={{ display: "flex" }}>Your GitLab,</div>
						<div style={{ display: "flex", color: accent }}>in hand.</div>
					</div>
					<div style={{ display: "flex", fontSize: 30, lineHeight: 1.45, color: muted, maxWidth: 940 }}>
						Merge requests, code review, and pipelines — native on every platform, self-hosted included.
					</div>
				</div>

				<div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: muted }}>
					<div style={{ display: "flex" }}>labfox.theorvane.tech</div>
					<div style={{ display: "flex" }}>Android · iOS · Windows · macOS</div>
				</div>
			</div>
		),
		size,
	);
}
