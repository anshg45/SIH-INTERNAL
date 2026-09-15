import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Blocks,
  ShieldCheck,
  AlertOctagon,
  RefreshCw,
  Cpu,
  Database,
  FileCode2,
  Layers,
  Copy,
  Check,
  Radio,
  Sparkles,
  ArrowRight,
  Fingerprint
} from 'lucide-react';
import KpiCard from '../common/KpiCard';
import SpotlightCard from '../common/SpotlightCard';
import { BLOCKCHAIN_AUDIT_LOG, INSTITUTION_INFO } from '../../data/mockData';

export default function AuditBlockchainView({ currentRole }) {
  const [isTampered, setIsTampered] = useState(false);
  const [copiedHash, setCopiedHash] = useState(false);
  const [activeLeafNode, setActiveLeafNode] = useState(84);

  const originalRoot = INSTITUTION_INFO.currentMerkleRoot;
  const tamperedRoot = "0x9f182ce7a1b029487c9182305719382049281a04879d1468205ec9b10deadbeef";

  const currentRoot = isTampered ? tamperedRoot : originalRoot;
  const isReadOnly = currentRole === 'regulator';

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header Banner with 3D Holographic Cryptographic Seal */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-linear-to-r from-teal-950 via-[#04261f] to-slate-950 p-6 sm:p-8 rounded-3xl text-white shadow-2xl border border-teal-900/50 relative overflow-hidden"
      >
        {/* Ambient radial blur in header */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center gap-5 relative z-10">
          {/* Holographic 3D Cryptographic Seal */}
          <div className="relative shrink-0 hidden sm:block">
            <img
              src="/images/blockchain_security_seal.jpg"
              alt="Polygon Amoy Cryptographic Merkle Seal"
              className="w-20 h-20 rounded-2xl object-cover border-2 border-teal-400/40 shadow-xl glow-teal"
            />
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-slate-900 animate-ping" />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-3 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-teal-900/90 text-teal-200 border border-teal-500/40 flex items-center gap-1.5">
                <Fingerprint className="w-3 h-3 text-teal-400" />
                <span>Immutable Cryptographic Consensus</span>
              </span>
              <span className="text-xs text-teal-300 font-medium hidden sm:inline">
                Polygon Amoy PoA Testnet
              </span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-black tracking-tight text-white font-sans">
              Blockchain Audit Integrity &amp; Merkle Tree Engine
            </h1>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              Every clinical event (patient consent, eCRF completion, SAE submission) is hashed via SHA-256, compiled into a binary Merkle tree, and anchored to Polygon Amoy smart contracts for statutory non-repudiation.
            </p>
          </div>
        </div>

        {/* Live Tamper Simulation Interactive Trigger */}
        <div className="flex items-center gap-2.5 shrink-0 relative z-10">
          <AnimatePresence mode="wait">
            {!isTampered ? (
              <motion.button
                key="tamper-btn"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsTampered(true)}
                disabled={isReadOnly}
                className="px-5 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-rose-950/50 transition-all glow-rose"
              >
                <AlertOctagon className="w-4 h-4" />
                <span>Simulate Database Tampering</span>
              </motion.button>
            ) : (
              <motion.button
                key="restore-btn"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsTampered(false)}
                disabled={isReadOnly}
                className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-emerald-950/50 transition-all glow-emerald"
              >
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Restore Cryptographic Integrity</span>
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Verification Status Banner (MATCH vs MISMATCH) */}
      <AnimatePresence mode="wait">
        {!isTampered ? (
          <motion.div
            key="match-banner"
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -10 }}
            transition={{ duration: 0.3 }}
            className="p-4.5 rounded-2xl bg-emerald-50 border-2 border-emerald-400/90 shadow-md flex items-start sm:items-center justify-between gap-4"
          >
            <div className="flex items-start sm:items-center gap-3.5">
              <div className="p-3 rounded-xl bg-emerald-100 text-emerald-800 shrink-0">
                <ShieldCheck className="w-7 h-7 text-emerald-600" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black uppercase tracking-wider text-emerald-900 bg-emerald-200 px-2.5 py-0.5 rounded font-mono">
                    ✓ CRYPTOGRAPHIC MATCH CONFIRMED
                  </span>
                  <span className="text-xs text-slate-500 font-mono">Block #{INSTITUTION_INFO.blockHeight}</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 mt-1">
                  Local Database SHA-256 Hash Chain Matches Polygon Amoy Merkle Root
                </h3>
                <p className="text-xs text-emerald-900 mt-0.5 font-mono truncate max-w-xl">
                  Anchor Root: {originalRoot}
                </p>
              </div>
            </div>

            <span className="hidden sm:inline-block px-3.5 py-1.5 rounded-xl bg-emerald-700 text-white font-extrabold text-xs shadow-xs">
              100% Cryptographic Integrity
            </span>
          </motion.div>
        ) : (
          <motion.div
            key="mismatch-banner"
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -10 }}
            transition={{ duration: 0.3 }}
            className="p-4.5 rounded-2xl bg-rose-50 border-2 border-rose-500 shadow-xl flex items-start sm:items-center justify-between gap-4 relative overflow-hidden"
          >
            <div className="flex items-start sm:items-center gap-3.5 relative z-10">
              <div className="relative">
                <span className="animate-radar-ring absolute -inset-1 rounded-full bg-rose-400 opacity-75"></span>
                <div className="p-3 rounded-xl bg-rose-200 text-rose-800 relative z-10">
                  <AlertOctagon className="w-7 h-7 text-rose-700 animate-pulse" />
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black uppercase tracking-wider text-white bg-rose-700 px-2.5 py-0.5 rounded font-mono shadow-xs">
                    🔴 MISMATCH DETECTED: AUDIT INTEGRITY BREACH
                  </span>
                  <span className="text-xs text-rose-700 font-bold font-mono">Corrupted Leaf: Record #84</span>
                </div>
                <h3 className="text-sm font-bold text-rose-950 mt-1">
                  Cryptographic Mismatch: Local Merkle Root deviates from immutable Polygon Smart Contract!
                </h3>
                <p className="text-xs text-rose-800 mt-0.5 font-mono truncate max-w-xl">
                  Computed Root: {tamperedRoot} ≠ Expected On-Chain: {originalRoot}
                </p>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsTampered(false)}
              disabled={isReadOnly}
              className="px-4 py-2 rounded-xl bg-rose-700 hover:bg-rose-800 text-white font-extrabold text-xs shrink-0 shadow-md"
            >
              Re-verify Database
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4 Blockchain Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KpiCard
          title="Polygon Network"
          value="Amoy Testnet"
          subvalue="Chain ID: 80002"
          trend="Proof of Authority"
          trendPositive={true}
          icon={Blocks}
          iconBg="bg-teal-50 text-teal-700"
          sparklineData={[80, 80, 80, 80, 80, 80]}
          sparklineColor="#0d9488"
        />
        <KpiCard
          title="Smart Contract"
          value="0x8a92...A206"
          subvalue="AIIAAuditRegistry.sol"
          trend="Verified Contract"
          trendPositive={true}
          icon={FileCode2}
          iconBg="bg-emerald-50 text-emerald-700"
          sparklineData={[1, 1, 1, 1, 1, 1]}
          sparklineColor="#059669"
        />
        <KpiCard
          title="Anchored Leaves"
          value="85 Records"
          subvalue="Binary SHA-256 Tree"
          trend="+3 today"
          trendPositive={true}
          icon={Layers}
          iconBg="bg-indigo-50 text-indigo-700"
          sparklineData={[72, 75, 78, 80, 82, 85]}
          sparklineColor="#4f46e5"
        />
        <KpiCard
          title="Consensus State"
          value={isTampered ? "Compromised" : "Verified"}
          subvalue={isTampered ? "Hash Mismatch" : "Zero Collisions"}
          trend={isTampered ? "Tamper Alert" : "100% Valid"}
          trendPositive={!isTampered}
          icon={ShieldCheck}
          iconBg={isTampered ? "bg-rose-50 text-rose-700" : "bg-teal-50 text-teal-700"}
          sparklineData={[100, 100, 100, 100, 100, isTampered ? 20 : 100]}
          sparklineColor={isTampered ? "#e11d48" : "#059669"}
          alertPulsing={isTampered}
        />
      </div>

      {/* Visual Interactive Pipeline with Animated Flow Particles */}
      <SpotlightCard className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-extrabold text-slate-900">
              End-to-End Cryptographic Data Conduit
            </h3>
            <p className="text-xs text-slate-500">
              Live cryptographic stream from local clinical transactions to decentralized blockchain consensus
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-teal-800 bg-teal-50 px-3 py-1 rounded-lg border border-teal-200 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-teal-600 animate-pulse" />
            <span>SHA-256 + Keccak256 Stream Active</span>
          </span>
        </div>

        {/* 5-Node Interactive Conduit with Animated Connection Vectors */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 pt-2 relative">
          {/* Node 1: PostgreSQL */}
          <motion.div 
            whileHover={{ y: -4, scale: 1.02 }}
            className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2 text-xs relative shadow-xs"
          >
            <div className="flex items-center justify-between font-bold text-slate-800">
              <span className="flex items-center gap-1.5">
                <Database className="w-4 h-4 text-emerald-600" /> PostgreSQL
              </span>
              <span className="font-mono text-[10px] text-slate-400">Step 1</span>
            </div>
            <p className="text-slate-600 text-[11px]">
              Transactional eCRF, patient consent, and SAE records.
            </p>
            <div className="p-1.5 rounded bg-white font-mono text-[10px] text-slate-500 truncate border border-slate-200/60">
              Table: trial_crf_events
            </div>
          </motion.div>

          {/* Node 2: Event Sourcing */}
          <motion.div 
            whileHover={{ y: -4, scale: 1.02 }}
            className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2 text-xs relative shadow-xs"
          >
            <div className="flex items-center justify-between font-bold text-slate-800">
              <span className="flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-teal-600" /> Audit Log
              </span>
              <span className="font-mono text-[10px] text-slate-400">Step 2</span>
            </div>
            <p className="text-slate-600 text-[11px]">
              Append-only audit trail with actor signature & timestamp.
            </p>
            <div className="p-1.5 rounded bg-white font-mono text-[10px] text-slate-500 truncate border border-slate-200/60">
              Actor: Dr. Priya Nair
            </div>
          </motion.div>

          {/* Node 3: SHA-256 Hash Chain */}
          <motion.div 
            whileHover={{ y: -4, scale: 1.02 }}
            className={`p-4 rounded-xl border space-y-2 text-xs relative shadow-xs transition-colors ${
              isTampered 
                ? 'bg-rose-50 border-rose-400 ring-2 ring-rose-300' 
                : 'bg-slate-50/70 border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between font-bold text-slate-800">
              <span className="flex items-center gap-1.5">
                <FileCode2 className={`w-4 h-4 ${isTampered ? 'text-rose-600' : 'text-indigo-600'}`} />
                SHA-256 Chain
              </span>
              <span className="font-mono text-[10px] text-slate-400">Step 3</span>
            </div>
            <p className="text-slate-600 text-[11px]">
              {isTampered ? "Corrupted leaf #84 hash detected!" : "Linked cryptographic event blocks."}
            </p>
            <div className={`p-1.5 rounded font-mono text-[10px] truncate border ${
              isTampered ? 'bg-rose-200 text-rose-900 border-rose-300 font-bold' : 'bg-white text-slate-600 border-slate-200/60'
            }`}>
              {isTampered ? "0xdeadbeef9981..." : "0x892a014fb56c..."}
            </div>
          </motion.div>

          {/* Node 4: Merkle Tree */}
          <motion.div 
            whileHover={{ y: -4, scale: 1.02 }}
            className={`p-4 rounded-xl border space-y-2 text-xs relative shadow-xs transition-colors ${
              isTampered 
                ? 'bg-rose-50 border-rose-400' 
                : 'bg-slate-50/70 border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between font-bold text-slate-800">
              <span className="flex items-center gap-1.5">
                <Layers className={`w-4 h-4 ${isTampered ? 'text-rose-600' : 'text-amber-600'}`} />
                Merkle Tree
              </span>
              <span className="font-mono text-[10px] text-slate-400">Step 4</span>
            </div>
            <p className="text-slate-600 text-[11px]">
              Binary hierarchical leaves combined to compute root.
            </p>
            <div className="p-1.5 rounded bg-white font-mono text-[10px] text-slate-600 truncate border border-slate-200/60">
              Root: {currentRoot.slice(0, 14)}...
            </div>
          </motion.div>

          {/* Node 5: Polygon Amoy */}
          <motion.div 
            whileHover={{ y: -4, scale: 1.02 }}
            className="p-4 rounded-xl border border-teal-300 bg-teal-50/80 space-y-2 text-xs relative shadow-xs"
          >
            <div className="flex items-center justify-between font-bold text-teal-950">
              <span className="flex items-center gap-1.5">
                <Blocks className="w-4 h-4 text-teal-700" /> Polygon Amoy
              </span>
              <span className="font-mono text-[10px] text-teal-700">Anchor</span>
            </div>
            <p className="text-teal-900 text-[11px]">
              Smart contract verifies root every 30 minutes.
            </p>
            <div className="p-1.5 rounded bg-white font-mono text-[10px] text-teal-800 font-bold truncate border border-teal-200">
              Block #{INSTITUTION_INFO.blockHeight}
            </div>
          </motion.div>
        </div>

        {/* Animated Connecting Data Stream Vector (Awwwards feature) */}
        <div className="hidden md:block mt-3 px-4">
          <svg className="w-full h-3 overflow-visible">
            <line
              x1="0"
              y1="6"
              x2="100%"
              y2="6"
              stroke={isTampered ? "#f43f5e" : "#10b981"}
              strokeWidth="2.5"
              className="animate-dash-stream"
            />
          </svg>
        </div>
      </SpotlightCard>

      {/* Merkle Tree Leaf Nodes & Event Log */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-200 bg-slate-50/70 flex items-center justify-between">
          <div>
            <h3 className="text-base font-extrabold text-slate-900">
              Cryptographic Audit Log & SHA-256 Hashes
            </h3>
            <p className="text-xs text-slate-500">
              Immutable sequence of recent clinical trial events anchored on Polygon
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleCopy(originalRoot)}
            className="px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-mono font-bold flex items-center gap-1.5 shadow-2xs transition-all"
          >
            {copiedHash ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
            <span>{copiedHash ? "Copied Root" : "Copy Merkle Root"}</span>
          </motion.button>
        </div>

        <div className="divide-y divide-slate-100">
          {BLOCKCHAIN_AUDIT_LOG.map((entry) => {
            const isTargetOfTampering = isTampered && entry.id === 84;
            return (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className={`p-4.5 transition-colors space-y-2 text-xs ${
                  isTargetOfTampering ? 'bg-rose-50/90 border-l-4 border-rose-600' : 'hover:bg-slate-50/70'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`font-mono font-bold text-xs px-2.5 py-0.5 rounded ${
                      isTargetOfTampering ? 'bg-rose-200 text-rose-900' : 'bg-slate-100 text-slate-800'
                    }`}>
                      Record #{entry.id}
                    </span>
                    <span className="font-mono font-bold text-slate-800">{entry.event}</span>
                    <span className="text-slate-500">• {entry.studyId}</span>
                    <span className="font-semibold text-slate-600">Actor: {entry.user}</span>
                  </div>

                  <span className="text-slate-500 text-[11px] font-mono">
                    {entry.timestamp}
                  </span>
                </div>

                <p className="text-slate-700 leading-relaxed font-medium">
                  {entry.details}
                </p>

                <div className="pt-2 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-2 font-mono text-[11px]">
                  <div className="truncate">
                    <span className="text-slate-400">Previous Hash: </span>
                    <span className="text-slate-600">{entry.previousHash}</span>
                  </div>
                  <div className="truncate">
                    <span className="text-slate-400">Current Hash: </span>
                    <span className={isTargetOfTampering ? "text-rose-600 font-bold" : "text-emerald-700 font-semibold"}>
                      {isTargetOfTampering ? "0xdeadbeef998172cba04879d1468205ec9b1099..." : entry.currentHash}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 font-mono">
                  <span>Polygon Tx: {entry.polygonTx.slice(0, 32)}...</span>
                  <span className={isTargetOfTampering ? "text-rose-600 font-bold" : "text-teal-700 font-semibold"}>
                    {isTargetOfTampering ? "❌ INTEGRITY CHECK FAILED" : "✓ POLYGON AMOY ANCHORED"}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
