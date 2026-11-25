import Link from "next/link";
import { ArrowLeft, Clock, Sparkles } from "lucide-react";

export interface ComingSoonProps {
  title: string;
  description: string;
  phase: string;
  icon?: React.ReactNode;
}

export function ComingSoon({ title, description, phase, icon }: ComingSoonProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="relative mb-6">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500/20 via-cyan-500/20 to-purple-500/20 border border-violet-500/30 flex items-center justify-center shadow-lg shadow-violet-500/10">
          {icon || <Clock className="w-8 h-8 text-cyan-400" />}
        </div>
        <div className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-violet-500/20 text-violet-300 border border-violet-500/30 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-cyan-300" />
          <span>{phase}</span>
        </div>
      </div>

      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-3">
        {title}
      </h1>
      <p className="text-slate-400 max-w-md text-sm sm:text-base leading-relaxed mb-8">
        {description}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-sm font-medium transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Dashboard Overview</span>
        </Link>
        <Link
          href="/admin/services"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white text-sm font-medium shadow-md shadow-violet-500/20 transition-all"
        >
          <span>Manage Services</span>
        </Link>
      </div>
    </div>
  );
}
