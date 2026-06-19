import Script from "next/script";

const ROOF_ACCOUNT_ID = "5156362907731527";

export function RoofAiChat() {
  return (
    <Script
      defer
      src="https://cdn.roof.ai/webchat/widget.js"
      data-roof-account-id={ROOF_ACCOUNT_ID}
      strategy="afterInteractive"
    />
  );
}
