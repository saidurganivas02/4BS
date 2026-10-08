import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  Server, 
  Database, 
  Zap, 
  X,
  ShieldCheck,
  Send
} from 'lucide-react';
import { api } from '../../services/api';
import { BackendConnectionInfo } from '../../types';

export const BackendConnectionBadge: React.FC = () => {
  const [info, setInfo] = useState<BackendConnectionInfo>(api.getConnectionInfo());
  const [modalOpen, setModalOpen] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = api.subscribeConnectionStatus((newInfo) => {
      setInfo(newInfo);
    });
    return unsubscribe;
  }, []);

  const handleTestNow = async () => {
    setTesting(true);
    setTestResult(null);
    try {
      const result = await api.testBidirectionalConnection('frontend_live_handshake_' + Date.now());
      setTestResult(result);
      await api.checkConnection();
    } catch (err: any) {
      setTestResult({ success: false, error: err?.message });
    } finally {
      setTesting(false);
    }
  };

  const isConnected = info.status === 'connected';

  return (
    <>
      {/* Clickable Badge in Header Bar */}
      <button
        onClick={() => setModalOpen(true)}
        title="Click to view Backend & Database connection diagnostics"
        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold transition border ${
          isConnected
            ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40 hover:bg-emerald-900/60'
            : 'bg-amber-950/60 text-amber-300 border-amber-500/40 hover:bg-amber-900/60'
        }`}
      >
        <span className={`w-2 h-2 rounded-full shrink-0 ${
          isConnected ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
        }`} />
        <span>{isConnected ? `Django API Link (${info.latency_ms ?? '~10'}ms)` : 'Local Mode'}</span>
      </button>

      {/* Diagnostics Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-slate-200 shadow-2xl relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold ${
                isConnected ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
              }`}>
                <Server className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                  Full Stack Telemetry
                </span>
                <h3 className="text-xl font-black text-slate-900">
                  Frontend-Backend Connection
                </h3>
              </div>
            </div>

            {/* Connection Status Banner */}
            <div className={`p-4 rounded-2xl border mb-5 flex items-center justify-between ${
              isConnected
                ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
                : 'bg-amber-50/80 border-amber-200 text-amber-950'
            }`}>
              <div className="flex items-center gap-2.5">
                {isConnected ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
                )}
                <div>
                  <span className="text-xs font-bold block">
                    {isConnected ? 'Strong Bidirectional Link Active' : 'Operating in Resilient Local Mode'}
                  </span>
                  <span className="text-[11px] opacity-80 block">
                    Endpoint: {api.getBaseUrl()}
                  </span>
                </div>
              </div>
              {info.latency_ms !== undefined && (
                <div className="text-right shrink-0">
                  <span className="text-xs font-black text-emerald-700">{info.latency_ms} ms</span>
                  <span className="text-[10px] block opacity-70">Ping Roundtrip</span>
                </div>
              )}
            </div>

            {/* Diagnostics Details */}
            <div className="space-y-3 mb-5 text-xs">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2 text-slate-700">
                <div className="flex justify-between">
                  <span className="text-slate-400 font-semibold flex items-center gap-1.5">
                    <Database className="w-3.5 h-3.5 text-blue-600" />
                    <span>Database Engine:</span>
                  </span>
                  <strong className="text-slate-900">{info.database?.engine || 'SQLite (db.sqlite3)'}</strong>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-400 font-semibold flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Database Health:</span>
                  </span>
                  <strong className={info.database?.status === 'connected' ? 'text-emerald-700' : 'text-amber-700'}>
                    {info.database?.status === 'connected' ? 'Connected & Synced' : 'Ready on Standby'}
                  </strong>
                </div>

                {info.database?.record_counts && (
                  <div className="pt-2 border-t border-slate-200/60 grid grid-cols-3 gap-2 text-[11px] text-center">
                    <div className="bg-white p-2 rounded-xl border border-slate-100">
                      <span className="text-slate-400 block">Leads</span>
                      <strong className="text-slate-900">{info.database.record_counts.leads ?? 0}</strong>
                    </div>
                    <div className="bg-white p-2 rounded-xl border border-slate-100">
                      <span className="text-slate-400 block">Customers</span>
                      <strong className="text-slate-900">{info.database.record_counts.customers ?? 0}</strong>
                    </div>
                    <div className="bg-white p-2 rounded-xl border border-slate-100">
                      <span className="text-slate-400 block">Appointments</span>
                      <strong className="text-slate-900">{info.database.record_counts.appointments ?? 0}</strong>
                    </div>
                  </div>
                )}

                {info.server_environment && (
                  <div className="pt-2 border-t border-slate-200/60 flex justify-between text-[11px]">
                    <span className="text-slate-400 font-medium">Django / Python:</span>
                    <span className="font-bold text-slate-700">
                      v{info.server_environment.django_version} / {info.server_environment.python_version}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Test Roundtrip Section */}
            {testResult && (
              <div className={`p-3 rounded-2xl mb-4 text-xs ${
                testResult.success
                  ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                  : 'bg-red-50 text-red-900 border border-red-200'
              }`}>
                <div className="flex items-center gap-1.5 font-bold">
                  {testResult.success ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <AlertCircle className="w-4 h-4 text-red-600" />}
                  <span>{testResult.message || 'Echo Test Completed'}</span>
                </div>
                {testResult.measured_rtt_ms && (
                  <div className="mt-1 text-[11px]">Roundtrip Latency: <strong>{testResult.measured_rtt_ms} ms</strong></div>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleTestNow}
                disabled={testing}
                className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 disabled:opacity-50 shadow-md shadow-blue-600/20"
              >
                {testing ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Pinging Backend...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-3.5 h-3.5" />
                    <span>Test Handshake Now</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
