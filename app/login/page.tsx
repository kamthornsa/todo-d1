import Link from "next/link";
import { AuthForm } from "@/components/auth-form";

export default function LoginPage() {
  return <main className="auth-page"><div className="auth-wrap"><Link className="brand auth-brand" href="/"><span className="brand-mark">✓</span>Simple Todo</Link><section className="panel"><h1>ยินดีต้อนรับกลับ</h1><p className="panel-subtitle">เข้าสู่ระบบเพื่อดูรายการของคุณ</p><AuthForm mode="login" /></section></div></main>;
}
