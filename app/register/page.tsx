import Link from "next/link";
import { AuthForm } from "@/components/auth-form";

export default function RegisterPage() {
  return <main className="auth-page"><div className="auth-wrap"><Link className="brand auth-brand" href="/"><span className="brand-mark">✓</span>Simple Todo</Link><section className="panel"><h1>เริ่มต้นง่าย ๆ</h1><p className="panel-subtitle">สร้างบัญชี แล้วเพิ่มงานแรกของคุณ</p><AuthForm mode="register" /></section></div></main>;
}
