"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LockKeyhole, MailCheck, ShieldCheck } from "lucide-react";
import { api, json } from "@/lib/api";

type OTPResponse = { message: string; dev_otp?: string };

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [sent, setSent] = useState(false);
  const [devCode, setDevCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setError("");
    try {
      if (!sent) {
        const result = await api<OTPResponse>(
          "/auth/request-otp", json({ email: email.trim().toLowerCase() })
        );
        setSent(true);
        setDevCode(result.dev_otp ?? "");
        setCode("");
      } else {
        await api("/auth/verify-otp", json({ email: email.trim().toLowerCase(), otp: code }));
        window.dispatchEvent(new Event("authChanged"));
        router.push("/sell");
        router.refresh();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "เกิดข้อผิดพลาด กรุณาลองใหม่");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="page flex min-h-[70vh] items-center justify-center">
      <div className="panel w-full max-w-[460px] p-8 md:p-10">
        <div className="mb-5 inline-flex rounded-xl bg-orange-100 p-3 text-orange-600">
          {sent ? <MailCheck size={28} /> : <LockKeyhole size={28} />}
        </div>
        <h1 className="mb-2 text-3xl font-black">
          {sent ? "ยืนยันรหัส OTP" : "ยินดีต้อนรับกลับ"}
        </h1>
        <p className="small mb-7">
          {sent ? `กรอกรหัส 6 หลักสำหรับ ${email}` : "เข้าสู่ระบบด้วยอีเมลสถาบัน @kmitl.ac.th"}
        </p>
        <form onSubmit={submit} className="space-y-4">
          {!sent ? (
            <div>
              <label htmlFor="demo-email" className="label">อีเมลสถาบัน</label>
              <input id="demo-email" required className="field" type="email"
                placeholder="student@kmitl.ac.th" autoComplete="email" value={email}
                onChange={event => setEmail(event.target.value)} />
            </div>
          ) : (
            <div>
              <label htmlFor="demo-otp" className="label">รหัส OTP (6 หลัก)</label>
              <input id="demo-otp" required minLength={6} maxLength={6}
                pattern="[0-9]{6}" inputMode="numeric" autoComplete="one-time-code"
                className="field text-center text-2xl tracking-widest" placeholder="000000"
                value={code} onChange={event => setCode(event.target.value.replace(/\D/g, "").slice(0, 6))} />
            </div>
          )}
          {sent && devCode && (
            <div role="status" className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
              <p className="font-bold">โหมดทดสอบในเครื่อง (Local Demo)</p>
              <p className="mt-1">รหัส OTP จำลองของคุณคือ</p>
              <p className="mt-2 text-center text-3xl font-black tracking-[0.2em]">{devCode}</p>
              <p className="mt-2 text-xs">รหัสมีอายุ 5 นาที ไม่ได้ส่งอีเมลจริง</p>
            </div>
          )}
          {error && <div role="alert" className="alert text-sm">{error}</div>}
          <button className="btn w-full" type="submit" disabled={busy}>
            {busy ? "กำลังดำเนินการ..." : sent ? "ยืนยันและไปลงขายสินค้า" : "ส่งรหัส OTP"}
          </button>
          {sent && <button type="button" className="w-full text-sm font-semibold text-slate-500 hover:text-orange-600"
            onClick={() => { setSent(false); setCode(""); setDevCode(""); setError(""); }} disabled={busy}>
            เปลี่ยนอีเมล
          </button>}
        </form>
        <p className="mt-7 flex items-center gap-2 border-t border-slate-100 pt-5 text-xs text-slate-500">
          <ShieldCheck className="text-green-600" size={18} /> เปิดให้ใช้เฉพาะอีเมลสถาบัน สจล.
        </p>
      </div>
    </main>
  );
}
