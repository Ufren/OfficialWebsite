import { AppConfig } from '../config';

export const translations = {
  en: {
    nav: {
      features: 'Features',
      screenshots: 'Screenshots',
      testimonials: 'Reviews',
      download: 'Download',
    },
    hero: {
      badge: `v${AppConfig.version} Now Available`,
      title: 'UfrenClaw',
      subtitle: {
        prefix: 'Modern Desktop ',
        highlight: 'AI Assistant',
        suffix: '',
      },
      description: 'A modern desktop AI assistant built with Electron, React, and OpenClaw. More than a chat window—it is a gateway to local intelligence with powerful Agentic Workflows.',
      buttons: {
        primary: 'Download for Windows',
        secondary: 'View on GitHub',
      },
      stats: {
        users: 'Active Users',
        rating: 'User Rating',
        platforms: 'Platforms',
      },
    },
    features: {
      title: 'Key Features',
      subtitle: 'Built with modern technology for a seamless AI experience',
      items: [
        {
          title: 'Modern Stack',
          description: 'React 19 + TypeScript + Vite for a fast, clean development experience.',
        },
        {
          title: 'Polished UI',
          description: 'Tailwind CSS + Framer Motion for a crisp, smooth interface.',
        },
        {
          title: 'Agentic AI',
          description: 'Deep OpenClaw integration for planning, multi-step execution, and tool use.',
        },
        {
          title: 'Local First',
          description: 'Native Ollama support—private, fast, and fully on-device when you want it.',
        },
        {
          title: 'Secure by Default',
          description: 'Electron security best practices with sandboxing and isolation.',
        },
        {
          title: 'Multi-Platform',
          description: 'Connect Telegram, Discord, WhatsApp, DingTalk, Feishu, WeCom, QQ and more.',
        },
      ],
    },
    modules: {
      title: 'Feature Modules',
      subtitle: 'Not just another chat app—it is an agent workbench on your desktop',
      items: [
        {
          icon: 'Rocket',
          title: 'Setup',
          subtitle: 'First-run Wizard',
          description: 'Environment checks, gateway bootstrap, and base configuration.',
        },
        {
          icon: 'MessageSquare',
          title: 'Chat',
          subtitle: 'Conversation Workbench',
          description: 'Streaming replies, thinking toggle, and tool results in one place.',
        },
        {
          icon: 'Cpu',
          title: 'Models',
          subtitle: 'Providers & Usage',
          description: 'Manage providers/models and track recent token usage.',
        },
        {
          icon: 'Brain',
          title: 'Agents',
          subtitle: 'Agent Hub',
          description: 'Create and manage agents for different goals and contexts.',
        },
        {
          icon: 'Plug',
          title: 'Channels',
          subtitle: 'Messaging Integrations',
          description: 'Connect Telegram, Discord, WhatsApp, DingTalk, Feishu, WeCom, QQ and more.',
        },
        {
          icon: 'Wrench',
          title: 'Skills',
          subtitle: 'Skill Library',
          description: 'Install, enable, and configure skill packs to extend capabilities.',
        },
        {
          icon: 'Clock',
          title: 'Cron',
          subtitle: 'Scheduled Tasks',
          description: 'Run prompts on a schedule and automate recurring workflows.',
        },
        {
          icon: 'Settings',
          title: 'Settings',
          subtitle: 'Control Center',
          description: 'Appearance, gateway & proxy, updates, and advanced policies.',
        },
      ],
    },
    screenshots: {
      title: 'App Screenshots',
      subtitle: 'Take a closer look at UfrenClaw',
    },
    deepdive: {
      title: 'Deep Dive',
      subtitle: 'Explore the core capabilities',
      opencode: {
        badge: 'Open Source',
        title: 'Built with Modern Technology',
        description: 'UfrenClaw is built around OpenClaw Gateway with composable modules: models, agents, channels, skills, and scheduled tasks, forming a complete local-first intelligence loop.',
        features: [
          'React 18 + TypeScript + Tailwind CSS',
          'Electron 37 with security best practices',
          'Zustand for state management',
          'OpenClaw Gateway (Local & Remote)',
        ],
      },
      privacy: {
        badge: 'Privacy First',
        title: 'Your Data, Your Control',
        description: 'With native Ollama support, keep your conversations private and fast. All processing can happen locally on your device.',
        features: [
          'Local model support via Ollama',
          'No data leaves your device',
          'Encrypted local storage',
          'Offline-capable architecture',
        ],
      },
    },
    testimonials: {
      title: 'User Reviews',
      subtitle: 'What our users say about UfrenClaw',
      items: [
        {
          name: 'Alex Chen',
          role: 'Software Developer',
          content: 'UfrenClaw has completely changed how I work with AI. The agentic workflow is incredibly powerful.',
          avatar: 'A',
        },
        {
          name: 'Sarah Johnson',
          role: 'Product Manager',
          content: 'The multi-platform integration is seamless. I can manage all my AI conversations in one place.',
          avatar: 'S',
        },
        {
          name: 'Michael Park',
          role: 'Data Scientist',
          content: 'Local-first approach with Ollama support is exactly what I needed for sensitive data processing.',
          avatar: 'M',
        },
      ],
    },
    cta: {
      badge: 'Get Started Today',
      heading: 'Ready to Experience UfrenClaw?',
      description: 'Download now and unlock the power of agentic AI workflows on your desktop.',
      download: 'Download Now',
      comingSoon: 'Coming Soon',
      freeDownload: 'Free Download',
      noSignup: 'No signup required',
    },
    footer: {
      description: 'A modern desktop AI assistant built with Electron, React, and OpenClaw.',
      product: 'Product',
      links: {
        features: 'Features',
        download: 'Download',
        screenshots: 'Screenshots',
        testimonials: 'Reviews',
      },
      resources: 'Resources',
      resourcesLinks: {
        documentation: 'Documentation',
        api: 'API Reference',
        community: 'Community',
        blog: 'Blog',
      },
      legal: 'Legal',
      legalLinks: {
        privacy: 'Privacy Policy',
        terms: 'Terms of Service',
        license: 'License',
      },
      copyright: 'All rights reserved.',
    },
  },
  zh: {
    nav: {
      features: '功能特性',
      screenshots: '应用截图',
      testimonials: '用户评价',
      download: '立即下载',
    },
    hero: {
      badge: `v${AppConfig.version} 正式发布`,
      title: 'UfrenClaw',
      subtitle: {
        prefix: '现代化桌面 ',
        highlight: 'AI 助手',
        suffix: '',
      },
      description: '基于 Electron、React 和 OpenClaw 构建的现代化桌面 AI 助手。它不仅拥有精致优雅的用户界面，更是一把开启本地智能时代的钥匙。',
      buttons: {
        primary: '下载 Windows 版',
        secondary: '查看 GitHub',
      },
      stats: {
        users: '活跃用户',
        rating: '用户评分',
        platforms: '支持平台',
      },
    },
    features: {
      title: '核心特性',
      subtitle: '采用现代技术构建，打造流畅的 AI 体验',
      items: [
        {
          title: '现代技术栈',
          description: '采用 React 19、TypeScript 与 Vite 构建，性能与工程体验兼得。',
        },
        {
          title: '优雅 UI',
          description: '融合 Tailwind CSS 与 Framer Motion，兼顾质感与动效。',
        },
        {
          title: 'Agentic AI',
          description: '深度集成 OpenClaw，支持多步规划、执行与工具调用。',
        },
        {
          title: '本地优先',
          description: '原生支持 Ollama，让隐私与速度都落在本地。',
        },
        {
          title: '安全可靠',
          description: '遵循 Electron 安全最佳实践，默认沙箱与隔离策略。',
        },
        {
          title: '多平台接入',
          description: '接入 Telegram、Discord、WhatsApp、钉钉、飞书、企业微信、QQ 等。',
        },
      ],
    },
    modules: {
      title: '功能模块',
      subtitle: '不是"多一个聊天窗口"，而是"把智能体工作台搬到桌面"',
      items: [
        {
          icon: 'Rocket',
          title: 'Setup',
          subtitle: '首次启动向导',
          description: '一键完成环境检查、网关启动与基础配置。',
        },
        {
          icon: 'MessageSquare',
          title: 'Chat',
          subtitle: '对话工作台',
          description: '流式对话、思考过程、工具调用结果一屏掌控。',
        },
        {
          icon: 'Cpu',
          title: 'Models',
          subtitle: '模型与用量',
          description: '管理 AI 提供商/模型，追踪 Token 消耗与成本。',
        },
        {
          icon: 'Brain',
          title: 'Agents',
          subtitle: '智能体中心',
          description: '创建/管理 Agent，面向不同目标切换"工作人格"。',
        },
        {
          icon: 'Plug',
          title: 'Channels',
          subtitle: '渠道连接',
          description: '接入 Telegram、Discord、WhatsApp、钉钉、飞书、企业微信、QQ 等。',
        },
        {
          icon: 'Wrench',
          title: 'Skills',
          subtitle: '技能库',
          description: '安装/启用/配置技能包，扩展工具能力与工作流。',
        },
        {
          icon: 'Clock',
          title: 'Cron',
          subtitle: '定时任务',
          description: '让 Agent "按时上班"，自动执行周期任务与提醒。',
        },
        {
          icon: 'Settings',
          title: 'Settings',
          subtitle: '设置中枢',
          description: '主题与语言、网关与代理、更新与高级策略统一管理。',
        },
      ],
    },
    screenshots: {
      title: '应用截图',
      subtitle: '近距离了解 UfrenClaw',
    },
    deepdive: {
      title: '深入了解',
      subtitle: '探索核心能力',
      opencode: {
        badge: '开源',
        title: '现代技术构建',
        description: 'UfrenClaw 围绕 OpenClaw Gateway 构建了一套可组合的模块体系：从模型与智能体，到渠道接入、技能扩展与定时任务，形成完整的本地智能闭环。',
        features: [
          'React 18 + TypeScript + Tailwind CSS',
          'Electron 37 安全最佳实践',
          'Zustand 状态管理',
          'OpenClaw Gateway（本地与远程）',
        ],
      },
      privacy: {
        badge: '隐私优先',
        title: '你的数据，你做主',
        description: '原生支持 Ollama，让隐私与速度都落在本地。所有处理都可以在您的设备上本地完成。',
        features: [
          '通过 Ollama 支持本地模型',
          '数据不离开您的设备',
          '加密本地存储',
          '离线可用架构',
        ],
      },
    },
    testimonials: {
      title: '用户评价',
      subtitle: '听听用户怎么说',
      items: [
        {
          name: '陈明',
          role: '软件开发工程师',
          content: 'UfrenClaw 完全改变了我与 AI 协作的方式。智能体工作流非常强大。',
          avatar: '陈',
        },
        {
          name: '王芳',
          role: '产品经理',
          content: '多平台集成非常流畅。我可以在一个地方管理所有的 AI 对话。',
          avatar: '王',
        },
        {
          name: '李强',
          role: '数据科学家',
          content: '本地优先的设计和 Ollama 支持正是我处理敏感数据所需要的。',
          avatar: '李',
        },
      ],
    },
    cta: {
      badge: '立即开始',
      heading: '准备好体验 UfrenClaw 了吗？',
      description: '立即下载，在您的桌面上解锁智能体 AI 工作流的力量。',
      download: '立即下载',
      comingSoon: '即将推出',
      freeDownload: '免费下载',
      noSignup: '无需注册',
    },
    footer: {
      description: '基于 Electron、React 和 OpenClaw 构建的现代化桌面 AI 助手。',
      product: '产品',
      links: {
        features: '功能特性',
        download: '下载',
        screenshots: '应用截图',
        testimonials: '用户评价',
      },
      resources: '资源',
      resourcesLinks: {
        documentation: '文档',
        api: 'API 参考',
        community: '社区',
        blog: '博客',
      },
      legal: '法律',
      legalLinks: {
        privacy: '隐私政策',
        terms: '服务条款',
        license: '许可证',
      },
      copyright: '保留所有权利。',
    },
  },
  ja: {
    nav: {
      features: '機能',
      screenshots: 'スクリーンショット',
      testimonials: 'レビュー',
      download: 'ダウンロード',
    },
    hero: {
      badge: `v${AppConfig.version} リリース`,
      title: 'UfrenClaw',
      subtitle: {
        prefix: '次世代のデスクトップ ',
        highlight: 'AI アシスタント',
        suffix: '',
      },
      description: 'Electron、React、OpenClaw をベースに構築された次世代のデスクトップ AI アシスタント。洗練された UI だけでなく、ローカルインテリジェンスへの入り口でもあります。',
      buttons: {
        primary: 'Windows版をダウンロード',
        secondary: 'GitHubで見る',
      },
      stats: {
        users: 'アクティブユーザー',
        rating: 'ユーザー評価',
        platforms: '対応プラットフォーム',
      },
    },
    features: {
      title: '主な特徴',
      subtitle: 'モダンな技術で構築されたシームレスなAI体験',
      items: [
        {
          title: 'モダンなスタック',
          description: 'React 19 + TypeScript + Vite で快適な開発体験。',
        },
        {
          title: '洗練 UI',
          description: 'Tailwind CSS + Framer Motion による滑らかな操作感。',
        },
        {
          title: 'エージェント AI',
          description: 'OpenClaw と深く統合し、多段の計画・実行・ツール利用を支援。',
        },
        {
          title: 'ローカルファースト',
          description: 'Ollama をネイティブサポート。プライバシーと速度を両立。',
        },
        {
          title: '安全設計',
          description: 'Electron のベストプラクティスに沿ったサンドボックス/隔離。',
        },
        {
          title: 'マルチプラットフォーム',
          description: 'Telegram、Discord、WhatsApp、DingTalk、Feishu、WeCom、QQなどに接続。',
        },
      ],
    },
    modules: {
      title: '機能モジュール',
      subtitle: '「もう一つのチャットアプリ」ではなく、「デスクトップ上のエージェント作業台」',
      items: [
        {
          icon: 'Rocket',
          title: 'Setup',
          subtitle: '初回セットアップ',
          description: '環境チェック、ゲートウェイ起動、基本設定。',
        },
        {
          icon: 'MessageSquare',
          title: 'Chat',
          subtitle: '会話ワークベンチ',
          description: 'ストリーミング応答、思考表示、ツール結果の可視化。',
        },
        {
          icon: 'Cpu',
          title: 'Models',
          subtitle: 'プロバイダー＆使用量',
          description: 'プロバイダー/モデル管理と Token 使用量の追跡。',
        },
        {
          icon: 'Brain',
          title: 'Agents',
          subtitle: 'エージェント管理',
          description: '目的別エージェントの作成・運用。',
        },
        {
          icon: 'Plug',
          title: 'Channels',
          subtitle: 'チャンネル接続',
          description: 'Telegram、Discord、WhatsApp、DingTalk、Feishu、WeCom、QQなど。',
        },
        {
          icon: 'Wrench',
          title: 'Skills',
          subtitle: 'スキル',
          description: 'スキルの導入・有効化・設定で能力を拡張。',
        },
        {
          icon: 'Clock',
          title: 'Cron',
          subtitle: '定期タスク',
          description: '定期プロンプトで繰り返し業務を自動化。',
        },
        {
          icon: 'Settings',
          title: 'Settings',
          subtitle: '設定',
          description: '外観、ゲートウェイ/プロキシ、更新、詳細ポリシーを一括管理。',
        },
      ],
    },
    screenshots: {
      title: 'アプリのスクリーンショット',
      subtitle: 'UfrenClaw を詳しく見る',
    },
    deepdive: {
      title: '詳細',
      subtitle: 'コア機能を探る',
      opencode: {
        badge: 'オープンソース',
        title: 'モダン技術で構築',
        description: 'UfrenClaw は OpenClaw Gateway を中心に、モデル・エージェント・チャンネル・スキル・定期タスクを組み合わせて、ローカルファーストな知能ループを構成します。',
        features: [
          'React 18 + TypeScript + Tailwind CSS',
          'Electron 37 セキュリティベストプラクティス',
          'Zustand 状態管理',
          'OpenClaw Gateway（ローカル＆リモート）',
        ],
      },
      privacy: {
        badge: 'プライバシー優先',
        title: 'あなたのデータ、あなたの管理',
        description: 'Ollama のネイティブサポートにより、会話をプライベートかつ高速に保ちます。すべての処理をデバイス上でローカルに行えます。',
        features: [
          'Ollama によるローカルモデル対応',
          'データはデバイスから出ない',
          '暗号化されたローカルストレージ',
          'オフライン対応アーキテクチャ',
        ],
      },
    },
    testimonials: {
      title: 'ユーザーレビュー',
      subtitle: 'ユーザーの声',
      items: [
        {
          name: '田中太郎',
          role: 'ソフトウェア開発者',
          content: 'UfrenClaw は AI との連携方法を完全に変えました。エージェントワークフローは非常に強力です。',
          avatar: '田',
        },
        {
          name: '佐藤花子',
          role: 'プロダクトマネージャー',
          content: 'マルチプラットフォーム統合はシームレスです。すべての AI 会話を一箇所で管理できます。',
          avatar: '佐',
        },
        {
          name: '鈴木一郎',
          role: 'データサイエンティスト',
          content: 'ローカルファーストアプローチと Ollama サポートは、機密データ処理に必要なものです。',
          avatar: '鈴',
        },
      ],
    },
    cta: {
      badge: '今すぐ始める',
      heading: 'UfrenClaw を体験する準備はできましたか？',
      description: '今すぐダウンロードして、デスクトップでエージェント AI ワークフローの力を解き放ちましょう。',
      download: '今すぐダウンロード',
      comingSoon: '近日公開',
      freeDownload: '無料ダウンロード',
      noSignup: '登録不要',
    },
    footer: {
      description: 'Electron、React、OpenClaw をベースに構築された次世代のデスクトップ AI アシスタント。',
      product: '製品',
      links: {
        features: '機能',
        download: 'ダウンロード',
        screenshots: 'スクリーンショット',
        testimonials: 'レビュー',
      },
      resources: 'リソース',
      resourcesLinks: {
        documentation: 'ドキュメント',
        api: 'API リファレンス',
        community: 'コミュニティ',
        blog: 'ブログ',
      },
      legal: '法的情報',
      legalLinks: {
        privacy: 'プライバシーポリシー',
        terms: '利用規約',
        license: 'ライセンス',
      },
      copyright: '全著作権所有。',
    },
  },
} as const;

export type TranslationKey = keyof typeof translations;
