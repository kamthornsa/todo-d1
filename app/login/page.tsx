import Link from "next/link";
import { redirect } from "next/navigation";
import { AuthForm } from "@/components/auth-form";
import { getSession } from "@/lib/session";

export const dynamic = "force-dynamic";

export default async function LoginPage() {
  if (await getSession()) redirect("/todos");
  return <main className="auth-page"><div className="auth-wrap"><Link className="brand auth-brand" href="/"><span className="brand-mark">✓</span>Simple Todo</Link><section className="panel"><h1>ยินดีต้อนรับกลับ</h1><p className="panel-subtitle">เข้าสู่ระบบเพื่อดูรายการของคุณ</p><AuthForm mode="login" /></section></div></main>;
}
