import "./main.css"

import { Icon } from "@tailwind-deobfuscator/ui/icon"
import { useState } from "react"

export default function Popup() {
  const [data, setData] = useState("")

  return (
    <div className="w-[360px] bg-white text-slate-900 overflow-hidden shadow-2xl">
      {/* Header with gradient */}
      <div className="bg-gradient-to-br from-cyan-500 to-blue-600 px-5 py-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center shadow-lg">
            <Icon className="h-6 w-6 text-blue-500" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white leading-tight">
              Tailwind Deobfuscator
            </h1>
            <p className="text-blue-100 text-[11px] font-medium">
              Element Inspector
            </p>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 space-y-4">
        {/* Status pill */}
        <div className="flex items-center gap-2.5 px-3 py-2.5 bg-emerald-50 border border-emerald-100 rounded-lg">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-semibold text-emerald-700">
            Ready to inspect elements
          </span>
        </div>

        {/* Input section */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Quick Class Preview
          </label>
          <input
            onChange={(e) => setData(e.target.value)}
            value={data}
            placeholder="e.g., flex items-center gap-2"
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all hover:border-slate-300"
          />
          {data && (
            <div className="mt-2 px-3 py-2 bg-slate-900 rounded-md border border-slate-800">
              <code className="text-xs font-mono text-cyan-400">
                &lt;div className="{data}" /&gt;
              </code>
            </div>
          )}
        </div>

        {/* Action hint */}
        <div className="flex items-start gap-3 px-3 py-3 bg-blue-50 border border-blue-100 rounded-lg">
          <svg
            className="w-4 h-4 text-blue-500 mt-0.5 shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-xs text-blue-700 leading-relaxed">
            Navigate to any website, click the extension icon, then hover and
            click any element to generate its Tailwind equivalent.
          </p>
        </div>

        {/* Footer links */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <a
            href="https://www.plasmo.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group text-xs text-slate-400 hover:text-slate-600 transition-colors flex items-center gap-1">
            https://github.com/derick-kibiwott/tailwind-deobfuscator
            <svg
              className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
          <a
            href="https://docs.plasmo.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold grid @[1100px]:grid-cols-[auto_minmax(0,1fr)] text-cyan-600 hover:text-cyan-700 transition-colors">
            Documentation →
          </a>
        </div>
      </div>
    </div>
  )
}
