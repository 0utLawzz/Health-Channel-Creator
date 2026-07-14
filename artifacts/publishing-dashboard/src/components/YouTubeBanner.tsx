import React from "react";
import { useGetYouTubeStatus, useGetYouTubeAuthUrl } from "@workspace/api-client-react";
import { AlertCircle, Youtube } from "lucide-react";

export function YouTubeBanner() {
  const { data: status, isLoading } = useGetYouTubeStatus();
  const { data: authUrl } = useGetYouTubeAuthUrl();

  if (isLoading || (status && status.connected)) return null;

  return (
    <div className="bg-[#C9A800] border-b-[3px] border-[#0C0C0C] px-6 py-3 flex items-center justify-between shadow-[0_5px_0_#0C0C0C] z-50 relative">
      <div className="flex items-center gap-3">
        <div className="bg-[#0C0C0C] p-1.5 border-2 border-[#0C0C0C]">
          <AlertCircle className="w-5 h-5 text-[#C9A800]" />
        </div>
        <p className="font-mono font-bold text-sm uppercase text-[#0C0C0C] tracking-wide">
          YouTube channel not connected. Publishing is disabled.
        </p>
      </div>
      {authUrl && (
        <a 
          href={authUrl.url}
          className="brutal-btn brutal-btn-secondary text-sm py-1.5 flex items-center gap-2 bg-[#FAF7EE]"
        >
          <Youtube className="w-4 h-4 text-[#C94A00]" />
          Connect Channel
        </a>
      )}
    </div>
  );
}
