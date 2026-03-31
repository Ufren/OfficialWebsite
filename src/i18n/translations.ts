import { AppConfig } from '../config';

export const translations = {
  en: {
    hero: {
      badge: `v${AppConfig.version} Now Available`,
      title: "Ufren AI Studio",
      subtitle: {
        prefix: "The ultimate ",
        highlight: "local-first",
        suffix: " AI workspace."
      },
      description: "Seamlessly orchestrate Ollama models & cloud APIs, manage private knowledge bases, and extend infinite possibilities via MCP.",
      tags: "Privacy-focused. Developer-friendly. Beautifully designed.",
      cta: {
        download: "Download for Windows",
        github: "View on GitHub",
        preview: "Interactive Preview Coming Soon"
      }
    },
    features: {
      heading: "Powering the Future of Work",
      subheading: "Everything you need to integrate AI into your daily workflow, packaged in a beautiful, native application.",
      items: [
        {
          title: "Unified Model Hub",
          description: "Built-in Ollama manager to download and switch local models effortlessly. Connect GPT-4, Claude, and Gemini in one interface."
        },
        {
          title: "RAG Knowledge Base",
          description: "Build private knowledge bases from your documents. Chat with your data securely using advanced retrieval augmentation."
        },
        {
          title: "MCP Ecosystem",
          description: "Unlock infinite potential with Model Context Protocol. Install tools and plugins to connect AI with your real-world workflow."
        },
        {
          title: "Creative Studio",
          description: "Integrated text-to-image generation. Visualize ideas instantly using local Stable Diffusion or cloud-based DALL-E."
        },
        {
          title: "Secure Code Sandbox",
          description: "Execute AI-generated code safely in a built-in isolated environment. Support for Python, JavaScript, and more."
        },
        {
          title: "Native Experience",
          description: "Global floating ball, system-wide text selection shortcuts, and a silky smooth UI with circular reveal theme switching."
        }
      ]
    },
    deepDive: {
      opencode: {
        badge: "OpenCode Sandbox",
        title: "Code Execution, Reimagined.",
        description: "Don't just generate code—run it. Ufren's built-in OpenCode sandbox allows you to execute Python and JavaScript directly within the chat. Test snippets, visualize data, and build prototypes without leaving your AI workspace.",
        features: ["Secure Isolation", "Real-time Output", "Multi-language Support"]
      },
      imageGen: {
        badge: "Creative Studio",
        title: "Visualize Your Imagination.",
        description: "Turn text into stunning visuals instantly. Whether you need assets for your project or just want to explore ideas, our integrated Creative Studio supports both local Stable Diffusion for privacy and DALL-E for cloud-powered creativity.",
        features: ["Local & Cloud Models", "Prompt Enhancement", "High-Resolution Export"]
      }
    },
    testimonials: {
      heading: "Loved by Developers",
      items: [
        {
          content: "Ufren is the most beautiful AI workspace I've ever used. The local model management is a game changer for my privacy-focused workflow.",
          author: "Alex Chen",
          role: "Full Stack Developer"
        },
        {
          content: "The OpenCode feature saves me so much time. I can test data processing scripts immediately without context switching.",
          author: "Sarah Jones",
          role: "Data Scientist"
        },
        {
          content: "Finally, an AI tool that feels native. The UI is incredibly smooth, and the MCP integration opens up so many possibilities.",
          author: "Michael Brown",
          role: "Software Engineer"
        }
      ]
    }
  },
  zh: {
    hero: {
      badge: `v${AppConfig.version} 正式发布`,
      title: "Ufren AI Desktop",
      subtitle: {
        prefix: "终极",
        highlight: "本地优先",
        suffix: " AI 工作台"
      },
      description: "无缝编排 Ollama 本地模型与云端 API，管理私有知识库，通过 MCP 协议无限扩展能力。",
      tags: "隐私至上 · 开发者友好 · 精美设计",
      cta: {
        download: "下载 Windows 版",
        github: "查看 GitHub",
        preview: "交互预览即将上线"
      }
    },
    features: {
      heading: "赋能未来工作方式",
      subheading: "集成本地与云端 AI 能力，打造优雅的原生应用体验，满足你对 AI 工作流的一切想象。",
      items: [
        {
          title: "统一模型中心",
          description: "内置 Ollama 管理器，轻松下载和切换本地模型。在一个界面中同时连接 GPT-4、Claude 和 Gemini。"
        },
        {
          title: "RAG 知识库",
          description: "基于文档构建私有知识库。利用先进的检索增强生成技术，安全地与您的数据进行对话。"
        },
        {
          title: "MCP 生态系统",
          description: "通过 Model Context Protocol 解锁无限潜能。安装工具和插件，将 AI 连接到您的真实工作流中。"
        },
        {
          title: "创意工坊",
          description: "集成文生图能力。使用本地 Stable Diffusion 或云端 DALL-E，瞬间将创意转化为视觉大片。"
        },
        {
          title: "安全代码沙箱",
          description: "在内置的隔离环境中安全执行 AI 生成的代码。开箱即用的 Python 和 JavaScript 支持。"
        },
        {
          title: "原生极致体验",
          description: "全局悬浮球、系统级划词助手，以及丝滑的圆形扩散主题切换动画，带来极致流畅的操作手感。"
        }
      ]
    },
    deepDive: {
      opencode: {
        badge: "OpenCode 代码沙箱",
        title: "代码执行，重塑体验",
        description: "不止于生成代码，更要运行它。Ufren 内置 OpenCode 沙箱，支持直接在对话中执行 Python 和 JavaScript。无需离开 AI 工作台，即可测试片段、可视化数据并构建原型。",
        features: ["安全隔离环境", "实时输出反馈", "多语言支持"]
      },
      imageGen: {
        badge: "创意工坊",
        title: "让想象力可见",
        description: "瞬间将文字转化为惊艳的视觉作品。无论您是需要项目素材还是探索创意，我们的创意工坊都支持本地 Stable Diffusion（隐私优先）和云端 DALL-E，满足您的各种创作需求。",
        features: ["本地 & 云端双模", "智能提示词增强", "高清导出"]
      }
    },
    testimonials: {
      heading: "开发者们的评价",
      items: [
        {
          content: "Ufren 是我用过最漂亮的 AI 工作台。本地模型管理功能对于我这种注重隐私的工作流来说简直是神来之笔。",
          author: "Alex Chen",
          role: "全栈开发者"
        },
        {
          content: "OpenCode 功能帮我节省了大量时间。我可以直接测试数据处理脚本，完全不需要切换上下文。",
          author: "Sarah Jones",
          role: "数据科学家"
        },
        {
          content: "终于有一款感觉像是原生应用的 AI 工具了。UI 极其丝滑，而且 MCP 集成开启了无限可能。",
          author: "Michael Brown",
          role: "软件工程师"
        }
      ]
    }
  }
};
