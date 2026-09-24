import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { HomePage } from "./components/pages/HomePage";
import { CatalogPage } from "./components/pages/CatalogPage";
import { AboutPage } from "./components/pages/AboutPage";
import { PrivacyPage } from "./components/pages/PrivacyPage";
import { TermsPage } from "./components/pages/TermsPage";
import { ContactPage } from "./components/pages/ContactPage";
import { ToolDetailView } from "./components/tools/ToolDetailView";
import { SearchModal } from "./components/SearchModal";
import { SocialShareModal } from "./components/SocialShareModal";
import { ALL_TOOLS } from "./data/toolsData";
import { AdsterraSlot } from "./components/AdsterraSlot";
export default function App() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("lovescore_theme");
      if (saved) return saved === "dark";
    }
    return false;
  });
  const [currentHash, setCurrentHash] = useState(() => {
    if (typeof window !== "undefined") {
      return window.location.hash.replace(/^#\/?/, "") || "home";
    }
    return "home";
  });
  const [searchOpen, setSearchOpen] = useState(false);
  const [shareData, setShareData] = useState(null);
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("lovescore_theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("lovescore_theme", "light");
    }
  }, [isDark]);
  useEffect(() => {
    const handleHashChange = () => {
      const cleanHash = window.location.hash.replace(/^#\/?/, "") || "home";
      setCurrentHash(cleanHash);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
  const handleNavigate = (route) => {
    const cleanRoute = route.replace(/^#\/?/, "");
    window.location.hash = `#/${cleanRoute}`;
    setCurrentHash(cleanRoute);
  };
  const handleToggleTheme = () => {
    setIsDark((prev) => !prev);
  };
  const handleOpenShare = (data) => {
    setShareData(data);
  };
  const renderContent = () => {
    if (currentHash.startsWith("tool/")) {
      const slug = currentHash.replace("tool/", "").split("?")[0];
      const tool = ALL_TOOLS.find((t) => t.slug === slug);
      if (tool) {
        return /* @__PURE__ */ jsx(
          ToolDetailView,
          {
            tool,
            onNavigate: handleNavigate,
            onShare: handleOpenShare
          }
        );
      }
    }
    if (currentHash.startsWith("catalog")) {
      const queryPart = currentHash.includes("?") ? currentHash.split("?")[1] : "";
      const params = new URLSearchParams(queryPart);
      const categoryParam = params.get("category");
      const phaseParam = params.get("phase") ? parseInt(params.get("phase"), 10) : null;
      return /* @__PURE__ */ jsx(
        CatalogPage,
        {
          initialCategory: categoryParam,
          initialPhase: phaseParam,
          onNavigate: handleNavigate
        }
      );
    }
    switch (currentHash) {
      case "about":
        return /* @__PURE__ */ jsx(AboutPage, {});
      case "privacy":
        return /* @__PURE__ */ jsx(PrivacyPage, {});
      case "terms":
        return /* @__PURE__ */ jsx(TermsPage, {});
      case "contact":
        return /* @__PURE__ */ jsx(ContactPage, {});
      case "home":
      default:
        return /* @__PURE__ */ jsx(
          HomePage,
          {
            onNavigate: handleNavigate,
            onShare: handleOpenShare
          }
        );
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex flex-col bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors selection:bg-pink-500 selection:text-white", children: [
    /* @__PURE__ */ jsx(
      Navbar,
      {
        currentRoute: currentHash,
        onNavigate: handleNavigate,
        isDark,
        onToggleTheme: handleToggleTheme,
        onOpenSearch: () => setSearchOpen(true)
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      currentHash.startsWith("tool/") && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(
          "aside",
          {
            className: "hidden md:block fixed top-28 left-0 xl:left-6 2xl:left-[max(1rem,calc(50%-760px))] z-30 w-[160px]",
            "aria-label": "Left advertisement",
            children: /* @__PURE__ */ jsx("div", { className: "w-[160px] overflow-hidden rounded-xl border border-slate-200 bg-white/90 p-0 shadow-sm dark:border-slate-800 dark:bg-slate-900/90", children: /* @__PURE__ */ jsx(AdsterraSlot, { slot: "footer_banner", className: "!my-0 !w-[160px] !px-0" }) })
          }
        ),
        /* @__PURE__ */ jsx(
          "aside",
          {
            className: "hidden md:block fixed top-28 right-0 xl:right-6 2xl:right-[max(1rem,calc(50%-760px))] z-30 w-[160px]",
            "aria-label": "Right advertisement",
            children: /* @__PURE__ */ jsx("div", { className: "w-[160px] overflow-hidden rounded-xl border border-slate-200 bg-white/90 p-0 shadow-sm dark:border-slate-800 dark:bg-slate-900/90", children: /* @__PURE__ */ jsx(AdsterraSlot, { slot: "tool_bottom", className: "!my-0 !w-[160px] !px-0" }) })
          }
        )
      ] }),
      /* @__PURE__ */ jsx("main", { className: "flex-grow", children: renderContent() })
    ] }),
    /* @__PURE__ */ jsx(Footer, { onNavigate: handleNavigate }),
    /* @__PURE__ */ jsx(
      SearchModal,
      {
        isOpen: searchOpen,
        onClose: () => setSearchOpen(false),
        onSelectTool: (slug) => handleNavigate(`tool/${slug}`)
      }
    ),
    shareData && /* @__PURE__ */ jsx(
      SocialShareModal,
      {
        isOpen: !!shareData,
        onClose: () => setShareData(null),
        shareData
      }
    )
  ] });
}
