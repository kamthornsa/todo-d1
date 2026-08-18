"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { authClient } from "@/lib/auth-client";

type Mode = "login" | "register";

export function AuthForm({ mode }: { mode: Mode }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setPending(true);
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") ?? "").trim();
    const password = String(data.get("password") ?? "");

    const result = mode === "register"
      ? await authClient.signUp.email({ name: String(data.get("name") ?? "").trim(), email, password })
      : await authClient.signIn.email({ email, password });

    setPending(false);
    if (result.error) {
      setError(mode === "login" ? "อีเมลหรือรหัสผ่านไม่ถูกต้อง" : result.error.message || "สร้างบัญชีไม่สำเร็จ");
      return;
    }
    router.push("/todos");
    router.refresh();
  }

  return (
    <form className="form-stack" onSubmit={submit}>
      {mode === "register" && <div className="field"><label htmlFor="name">ชื่อ</label><input className="input" id="name" name="name" minLength={2} maxLength={100} required autoComplete="name" /></div>}
      <div className="field"><label htmlFor="email">อีเมล</label><input className="input" id="email" name="email" type="email" required autoComplete="email" /></div>
      <div className="field"><label htmlFor="password">รหัสผ่าน</label><input className="input" id="password" name="password" type="password" minLength={8} required autoComplete={mode === "login" ? "current-password" : "new-password"} /></div>
      {error && <div className="form-error" role="alert">{error}</div>}
      <button className="button button-primary full" disabled={pending}>{pending ? "กำลังดำเนินการ…" : mode === "login" ? "เข้าสู่ระบบ" : "สร้างบัญชี"}</button>
      <p className="auth-foot">{mode === "login" ? <>ยังไม่มีบัญชี? <Link href="/register">สมัครสมาชิก</Link></> : <>มีบัญชีแล้ว? <Link href="/login">เข้าสู่ระบบ</Link></>}</p>
    </form>
  );
}

