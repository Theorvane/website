import { ImageResponse } from "next/og";

export const alt = "PlanGuard — see the blast radius of a Terraform change before it merges";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// The site's own cool-dark palette, echoing the rose accent on the landing page.
const ink = "#f7ecef";
const ground = "#0c0709";
const glow = "#2a0912";
const accent = "#e11d48";
const muted = "#b39aa2";

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
					<div style={{ display: "flex" }}>PLANGUARD</div>
				</div>

				<div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
					<div style={{ display: "flex", fontSize: 27, letterSpacing: "0.1em", color: accent, textTransform: "uppercase" }}>
						Terraform change review
					</div>
					<div style={{ display: "flex", flexDirection: "column", fontSize: 84, fontWeight: 700, letterSpacing: "-0.045em", lineHeight: 1.02 }}>
						<div style={{ display: "flex" }}>Know the blast radius</div>
						<div style={{ display: "flex", color: accent }}>before you apply.</div>
					</div>
					<div style={{ display: "flex", fontSize: 30, lineHeight: 1.45, color: muted, maxWidth: 940 }}>
						Read the plan for every pull request — destroys, replacements, IAM and network changes — before it merges.
					</div>
				</div>

				<div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: muted }}>
					<div style={{ display: "flex" }}>planguard.theorvane.tech</div>
					<div style={{ display: "flex" }}>We review the change · you keep the apply</div>
				</div>
			</div>
		),
		size,
	);
}
