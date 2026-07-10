// lib/external-services.ts
// 外部サービスリンク管理ファイル
// - 診断ロジック・ランキングとは完全に分離
// - affiliateUrl を設定するだけでアフィリエイトリンクに切り替わる

export interface ExternalService {
  id: string;
  name: string;
  officialUrl: string;
  affiliateUrl: string | null;
  linkLabel: string;
  ctaLabel: string;
}

export const externalServices: ExternalService[] = [
  {
    id: "crowdworks",
    name: "クラウドワークス",
    officialUrl: "https://crowdworks.jp",
    affiliateUrl: null,
    linkLabel: "案件を見てみる",
    ctaLabel: "クラウドワークスで案件を見る",
  },
  {
    id: "studio",
    name: "STUDIO",
    officialUrl: "https://studio.design",
    affiliateUrl: null,
    linkLabel: "STUDIOを開く",
    ctaLabel: "STUDIOでLP制作を試す",
  },
  {
    id: "google_maps_local",
    name: "Googleマップ",
    officialUrl: "https://www.google.com/maps/search/近所の飲食店",
    affiliateUrl: null,
    linkLabel: "Googleマップで地元を検索",
    ctaLabel: "Googleマップで地元のお店を調べる",
  },
  {
    id: "bubble",
    name: "Bubble",
    officialUrl: "https://bubble.io",
    affiliateUrl: null,
    linkLabel: "Bubbleのテンプレートを見る",
    ctaLabel: "Bubbleのテンプレートを見てみる",
  },
  {
    id: "chatgpt",
    name: "ChatGPT",
    officialUrl: "https://chat.openai.com",
    affiliateUrl: null,
    linkLabel: "ChatGPTを開く",
    ctaLabel: "ChatGPTで試してみる",
  },
  {
    id: "google_maps",
    name: "Googleマップ",
    officialUrl: "https://maps.google.com",
    affiliateUrl: null,
    linkLabel: "Googleマップを開く",
    ctaLabel: "Googleマップを開いてお店を分析する",
  },
  {
    id: "note",
    name: "note",
    officialUrl: "https://note.com",
    affiliateUrl: null,
    linkLabel: "noteを開く",
    ctaLabel: "noteで売れている記事を見てみる",
  },
  {
    id: "booth",
    name: "BOOTH",
    officialUrl: "https://booth.pm",
    affiliateUrl: null,
    linkLabel: "BOOTHを開く",
    ctaLabel: "BOOTHで売れ筋商品を見てみる",
  },
  {
    id: "youtube_bgm_search",
    name: "YouTube",
    officialUrl: "https://www.youtube.com/results?search_query=著作権フリーBGM+チャンネル",
    affiliateUrl: null,
    linkLabel: "YouTubeで調べる",
    ctaLabel: "YouTubeでBGMチャンネルを調べる",
  },
  {
    id: "youtube",
    name: "YouTube",
    officialUrl: "https://youtube.com",
    affiliateUrl: null,
    linkLabel: "YouTubeを開く",
    ctaLabel: "YouTubeでチャンネルを分析する",
  },
  {
    id: "rakko_keywords",
    name: "ラッコキーワード",
    officialUrl: "https://related-keywords.com",
    affiliateUrl: null,
    linkLabel: "ラッコキーワードを開く",
    ctaLabel: "ラッコキーワードでキーワードを調べる",
  },
  {
    id: "a8net",
    name: "A8.net",
    officialUrl: "https://www.a8.net",
    affiliateUrl: null,
    linkLabel: "案件を確認してみる",
    ctaLabel: "A8.netで案件を確認してみる",
  },
  {
    id: "gumroad",
    name: "Gumroad",
    officialUrl: "https://gumroad.com",
    affiliateUrl: null,
    linkLabel: "Gumroadを開く",
    ctaLabel: "Gumroadでベストセラーを見てみる",
  },
  {
    id: "n8n",
    name: "n8n",
    officialUrl: "https://n8n.io",
    affiliateUrl: null,
    linkLabel: "n8nを開く",
    ctaLabel: "n8nでできることを確認する",
  },
];

export function getService(id: string): ExternalService | undefined {
  return externalServices.find(s => s.id === id);
}

export function getServiceUrl(service: ExternalService): string {
  return service.affiliateUrl ?? service.officialUrl;
}

export function isAffiliateLink(service: ExternalService): boolean {
  return service.affiliateUrl !== null;
}

export function hasAnyAffiliateLink(): boolean {
  return externalServices.some(s => s.affiliateUrl !== null);
}
