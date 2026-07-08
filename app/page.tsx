// app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="px-6 py-16 text-center max-w-lg mx-auto">
        <p className="text-xs font-semibold text-zinc-400 mb-4 tracking-widest uppercase">
          副業コンパスAI
        </p>
        <h1 className="text-3xl font-bold text-zinc-900 leading-tight mb-4">
          副業を当てるより、<br />
          あなた自身を知ることから。
        </h1>
        <p className="text-zinc-500 leading-relaxed mb-8">
          自分でも気づいていない強みをAIが言語化します。<br />
          12問・5分で、今日の一歩へ。
        </p>
        <Link
          href="/diagnosis"
          className="inline-block bg-zinc-900 text-white px-10 py-4 rounded-full text-base font-semibold hover:bg-zinc-700 transition-colors"
        >
          無料で診断をはじめる
        </Link>
        <p className="text-xs text-zinc-400 mt-3">登録不要・無料・5分で完了</p>
      </section>

      {/* Pain points */}
      <section className="px-6 pb-8 max-w-lg mx-auto">
        <p className="text-xs font-semibold text-zinc-400 mb-3">こんな方におすすめ</p>
        <ul className="space-y-3">
          {[
            "副業したいけど何から始めればいいかわからない",
            "自分に向いている副業が知りたい",
            "営業なしで在宅でできる副業を探している",
            "まず月3〜5万円から副業を始めたい",
          ].map(text => (
            <li key={text} className="flex items-start gap-2 text-sm text-zinc-700">
              <span className="text-emerald-500 mt-0.5 shrink-0">✓</span>
              <span>{text}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 3 steps */}
      <section className="mx-4 mb-8 px-6 py-8 bg-zinc-50 rounded-2xl max-w-lg lg:mx-auto">
        <p className="text-xs font-semibold text-zinc-400 mb-6 text-center">3ステップで結果が出る</p>
        <div className="space-y-5">
          {[
            { step: "01", title: "12問に答える（5分）", desc: "過去の行動や得意なことを選ぶだけ" },
            { step: "02", title: "あなたの強みを言語化", desc: "自分でも気づいていない特徴をAIが言葉にする" },
            { step: "03", title: "向いている副業と一歩を提示", desc: "今日やることと7日間ロードマップまで提示" },
          ].map(item => (
            <div key={item.step} className="flex gap-4 items-start">
              <span className="text-2xl font-bold text-zinc-200 w-10 shrink-0">{item.step}</span>
              <div>
                <p className="font-semibold text-zinc-800 text-sm">{item.title}</p>
                <p className="text-xs text-zinc-500 mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Second CTA */}
      <section className="px-6 pb-16 text-center">
        <Link
          href="/diagnosis"
          className="inline-block bg-zinc-900 text-white px-10 py-4 rounded-full text-base font-semibold hover:bg-zinc-700 transition-colors"
        >
          無料で診断をはじめる
        </Link>
      </section>
    </main>
  );
}
