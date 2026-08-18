import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";

export const dynamic = "force-dynamic";

export default async function Home() {
  const session = await getSession();
  if (session) redirect("/todos");

  return (
    <main className="shell">
      <nav className="nav">
        <Link className="brand" href="/"><span className="brand-mark">✓</span>Simple Todo</Link>
        <div className="nav-actions">
          <Link className="button button-ghost" href="/login">เข้าสู่ระบบ</Link>
          <Link className="button button-primary" href="/register">เริ่มใช้งาน</Link>
        </div>
      </nav>
      <section className="hero">
        <div>
          <div className="eyebrow">เรียบง่าย • เป็นส่วนตัว • พร้อมใช้</div>
          <h1>เคลียร์หัว<br />ด้วยรายการที่<em>ชัดเจน</em></h1>
          <p className="hero-copy">พื้นที่เล็ก ๆ สำหรับงานสำคัญของคุณ เพิ่มงาน เช็กว่าเสร็จ แล้วไปต่อ โดยไม่มีสิ่งรบกวนที่ไม่จำเป็น</p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/register">สร้างบัญชีฟรี →</Link>
            <Link className="button button-ghost" href="/login">ฉันมีบัญชีแล้ว</Link>
          </div>
        </div>
        <div className="sample-card" aria-label="ตัวอย่างรายการ Todo">
          <div className="eyebrow">วันนี้</div>
          <div className="sample-title">สามอย่างก็พอ</div>
          <div className="sample-row done"><span className="sample-check" />วางแผนงานของวัน</div>
          <div className="sample-row"><span className="sample-check" />ส่งเอกสารโครงการ</div>
          <div className="sample-row"><span className="sample-check" />อ่านหนังสือ 20 นาที</div>
        </div>
      </section>
    </main>
  );
}
