
import React, { useEffect, useMemo, useRef, useState } from "react";
import Papa from "papaparse"; 
import CountUp from "react-countup";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  AlertTriangle,
  ArrowUpRight,
  BarChart3,
  Bot,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Gauge,
  Home,
  Lightbulb,
  MessageCircle,
  PhoneCall,
  Send,
  Sparkles,
  TrendingUp,
  UserRound,
  WandSparkles,
  X,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";


const ellieThemes = {
  Sage: {
    page: "#e6eee0",
    pageGlow: "#92ae7b",
    cardTint: "#eff7e8",
    light: "#dff3d2",
    mid: "#8fcf82",
    dark: "#315f43",
    deep: "#244a35",
    glow: "#b9ee9f",
    accent: "#f3c879",
  },
  Mint: {
    page: "#e4f5ef",
    pageGlow: "#75d0ad",
    cardTint: "#edfbf6",
    light: "#dcfff2",
    mid: "#76d6af",
    dark: "#23735a",
    deep: "#185642",
    glow: "#9ff0d2",
    accent: "#ffd07a",
  },
  Forest: {
    page: "#e1eade",
    pageGlow: "#67a75e",
    cardTint: "#edf4e9",
    light: "#d8edce",
    mid: "#68a85f",
    dark: "#214d35",
    deep: "#153a27",
    glow: "#91d77d",
    accent: "#f4bf69",
  },
  Lavender: {
    page: "#eeeaf6",
    pageGlow: "#b7a0ee",
    cardTint: "#f6f2ff",
    light: "#eee7ff",
    mid: "#b7a0ee",
    dark: "#66549a",
    deep: "#4c3c79",
    glow: "#d7c8ff",
    accent: "#ffd085",
  },
};




const starterMessages = [
  {
    role: "ellie",
    text: "Hi Dasia! I’m Ellie. I can explain queue trends, repeat-contact drivers, forecasts, and recommended actions.",
    createdAt: new Date().toISOString(),
  },
];

function GlassCard({ children, className = "", theme }) {
  return (
    <div
      className={`rounded-[28px] ${className}`}
      style={{
        background: `linear-gradient(145deg, rgba(255,255,255,.82), ${theme.cardTint}bb)`,
        border: "1px solid rgba(255,255,255,.9)",
        boxShadow:
          "0 22px 60px rgba(38,74,50,.11), inset 0 1px 0 rgba(255,255,255,.96)",
        backdropFilter: "blur(26px)",
        WebkitBackdropFilter: "blur(26px)",
      }}
    >
      {children}
    </div>
  );
}

function EllieRobot({
  size = 72,
  waving = false,
  mood = "happy",
  themeName = "Sage",
  outfit = "Classic",
}) {
  const c = ellieThemes[themeName] || ellieThemes.Sage;
  const isThinking = mood === "thinking";
  const isExcited = mood === "excited";

  return (
    <motion.div
      className="relative shrink-0"
      style={{ width: size, height: size }}
      animate={{
        y: [0, -size * 0.035, 0],
        rotate: isExcited ? [-2, 2, -2] : 0,
      }}
      transition={{
        duration: isExcited ? 0.8 : 2.6,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      aria-label={`Ellie robot, ${mood} mood, ${outfit} outfit`}
    >
      <div className="absolute bottom-[1%] left-1/2 h-[8%] w-[58%] -translate-x-1/2 rounded-full bg-[#173f2d]/20 blur-md" />

      <div
        className="absolute left-[28%] top-[8%] h-[18%] w-[4%] origin-bottom -rotate-[32deg] rounded-full"
        style={{ background: c.dark }}
      >
        <motion.span
          className="absolute -left-[70%] -top-[25%] aspect-square w-[240%] rounded-full"
          style={{ background: c.glow }}
          animate={{ scale: [0.9, 1.12, 0.9] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        />
      </div>

      <div
        className="absolute right-[28%] top-[8%] h-[18%] w-[4%] origin-bottom rotate-[32deg] rounded-full"
        style={{ background: c.dark }}
      >
        <motion.span
          className="absolute -left-[70%] -top-[25%] aspect-square w-[240%] rounded-full"
          style={{ background: c.glow }}
          animate={{ scale: [1.1, 0.9, 1.1] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        />
      </div>

      <div
        className="absolute left-[16%] top-[19%] h-[67%] w-[68%] overflow-hidden rounded-[48%_48%_44%_44%] border-[3px] border-white/55 shadow-[inset_-10px_-12px_20px_rgba(20,80,45,.20),inset_9px_8px_18px_rgba(255,255,255,.72),0_18px_35px_rgba(35,95,63,.30)]"
        style={{
          background: `linear-gradient(145deg, ${c.light} 5%, ${c.mid} 52%, ${c.dark} 115%)`,
        }}
      >
        <div className="absolute left-[15%] top-[9%] h-[20%] w-[28%] -rotate-[24deg] rounded-full bg-white/45" />

        {isThinking ? (
          <>
            <div className="absolute left-[23%] top-[31%] h-[10%] w-[11%] rounded-full bg-[#17372a]" />
            <div className="absolute right-[22%] top-[30%] h-[5%] w-[15%] -rotate-[10deg] rounded-full bg-[#17372a]" />
            <div className="absolute left-1/2 top-[45%] h-[6%] w-[13%] -translate-x-1/2 rounded-full border-b-[3px] border-[#17372a]" />
          </>
        ) : (
          <>
            <motion.div
              className="absolute left-[21%] top-[31%] h-[9%] w-[15%] rounded-t-full border-t-[4px] border-[#17372a]"
              animate={{ scaleY: [1, 1, 0.15, 1, 1] }}
              transition={{ duration: 4.5, repeat: Infinity }}
            />
            <motion.div
              className="absolute right-[21%] top-[31%] h-[9%] w-[15%] rounded-t-full border-t-[4px] border-[#17372a]"
              animate={{ scaleY: [1, 1, 0.15, 1, 1] }}
              transition={{ duration: 4.5, repeat: Infinity }}
            />
            <div className="absolute left-1/2 top-[41%] h-[12%] w-[15%] -translate-x-1/2 rounded-b-full bg-[#ef668d] shadow-inner">
              <div className="mx-auto mt-[7%] h-[22%] w-[47%] rounded-full bg-white" />
            </div>
          </>
        )}

        <div className="absolute left-[13%] top-[43%] h-[10%] w-[15%] rounded-full bg-[#f08ca8]/75 blur-[2px]" />
        <div className="absolute right-[13%] top-[43%] h-[10%] w-[15%] rounded-full bg-[#f08ca8]/75 blur-[2px]" />
        <div className="absolute bottom-[13%] left-1/2 grid h-[23%] w-[42%] -translate-x-1/2 place-items-center rounded-[28%] border-2 border-white/35 bg-white/20 shadow-inner">
          <Sparkles size={Math.max(9, size * 0.13)} style={{ color: c.accent }} />
        </div>
      </div>

      <div
        className="absolute left-[7%] top-[43%] h-[24%] w-[18%] rotate-[19deg] rounded-[60%_35%_55%_45%] border-2 border-white/35 shadow-lg"
        style={{ background: `linear-gradient(145deg, ${c.light}, ${c.dark})` }}
      />
      <motion.div
        className="absolute right-[6%] top-[39%] h-[25%] w-[18%] origin-bottom-left rounded-[35%_60%_45%_55%] border-2 border-white/35 shadow-lg"
        style={{ background: `linear-gradient(145deg, ${c.light}, ${c.dark})` }}
        animate={waving ? { rotate: [-12, -43, -12] } : { rotate: -12 }}
        transition={{ duration: 1, repeat: waving ? Infinity : 0, repeatDelay: 1.2 }}
      />

      {outfit === "Bow" && (
        <div
          className="absolute left-1/2 top-[73%] z-20 -translate-x-1/2"
          style={{ fontSize: size * 0.22 }}
        >
          🎀
        </div>
      )}

      {outfit === "Headphones" && (
        <div className="absolute left-[10%] top-[23%] h-[34%] w-[80%] rounded-t-full border-[5px] border-[#263f35] border-b-0">
          <span className="absolute -left-1 top-[55%] h-[34%] w-[13%] rounded-full bg-[#263f35]" />
          <span className="absolute -right-1 top-[55%] h-[34%] w-[13%] rounded-full bg-[#263f35]" />
        </div>
      )}

      {outfit === "Analyst" && (
        <div
          className="absolute right-[5%] top-[12%] z-20 rounded-full border border-white/70 bg-white/90 px-[8%] py-[3%] text-[8px] font-black shadow-lg"
          style={{ color: c.dark }}
        >
          AI
        </div>
      )}

      {isThinking && (
        <motion.div
          className="absolute right-[-7%] top-[4%] rounded-full bg-white px-2 py-1 text-[10px] font-black shadow-lg"
          style={{ color: c.dark }}
          animate={{ y: [0, -3, 0] }}
          transition={{ repeat: Infinity }}
        >
          •••
        </motion.div>
      )}
    </motion.div>
  );
}

function MetricCard({ metric, index, theme, onExplain }) {
  const Icon = metric.icon;

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      whileHover={{ y: -5 }}
      onClick={() => onExplain(metric)}
      className="h-full w-full text-left"
    >
      <GlassCard className="h-full p-5 transition hover:ring-2 hover:ring-white/80" theme={theme}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[.16em] text-[#819086]">
              {metric.name}
            </p>
           <p
            className="mt-3 text-3xl font-black"
            style={{ color: theme.deep }}
            >
              {typeof metric.numericValue === "number" ? (
                <CountUp
                  end={metric.numericValue}
                  duration={1.2}
                  separator=","
                  decimals={metric.decimals || 0}
                  suffix={metric.suffix || ""}
                />
              ) : (
                metric.value
              )}
            </p>
            <p className="mt-2 text-xs text-[#718078]">{metric.detail}</p>
            <p
              className="mt-3 flex items-center gap-1 text-[10px] font-black uppercase tracking-wider"
              style={{ color: theme.dark }}
            >
              Ask Ellie <ChevronRight size={12} />
            </p>
          </div>
          <div
            className="grid h-11 w-11 place-items-center rounded-2xl text-white shadow-lg"
            style={{ background: theme.dark }}
          >
            <Icon size={18} />
          </div>
        </div>
      </GlassCard>
    </motion.button>
  );
}

function InsightCard({ insight, theme, onAsk }) {
  const Icon = insight.icon;
  const tones = {
    amber: "bg-amber-50 text-amber-700 ring-amber-200",
    green: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    blue: "bg-sky-50 text-sky-700 ring-sky-200",
  };

  return (
    <motion.div whileHover={{ y: -4 }}>
      <GlassCard className="h-full p-5" theme={theme}>
        <div className="flex items-start gap-3">
          <div
            className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl ring-1 ${tones[insight.tone]}`}
          >
            <Icon size={18} />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-[.16em] text-[#819086]">
              {insight.type}
            </p>
            <h4 className="mt-2 text-sm font-black" style={{ color: theme.deep }}>
              {insight.title}
            </h4>
            <p className="mt-2 text-xs leading-5 text-[#718078]">{insight.text}</p>
            <button
              type="button"
              onClick={() => onAsk(insight.prompt)}
              className="mt-4 inline-flex items-center gap-1 text-xs font-black"
              style={{ color: theme.dark }}
            >
              {insight.action} <ArrowUpRight size={13} />
            </button>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}

function ExecutiveSummary({ theme, onAsk }) {
  return (
    <GlassCard className="mt-5 overflow-hidden p-1" theme={theme}>
      <div
        className="grid gap-5 rounded-[25px] p-6 text-white lg:grid-cols-4"
        style={{
          background: `linear-gradient(115deg, ${theme.deep}, ${theme.dark}, ${theme.mid})`,
        }}
      >
        <div>
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-white/65">
            <BriefcaseBusiness size={15} /> Executive brief
          </div>
          <h3 className="mt-3 text-2xl font-black">Credit queue opportunity</h3>
          <p className="mt-2 text-sm leading-6 text-white/70">
            A concise view of the signal, impact, action, and confidence.
          </p>
        </div>

        {[
          ["Key insight", "Repeat contacts are increasing faster than total contact volume."],
          ["Estimated impact", "$6.8K annual prototype opportunity from preventable demand."],
          ["Recommended action", "Review payment-arrangement journeys and Friday staffing."],
        ].map(([label, value]) => (
          <div
            key={label}
            className="rounded-[22px] border border-white/20 bg-white/10 p-4 backdrop-blur-xl"
          >
            <p className="text-[10px] font-black uppercase tracking-widest text-white/55">
              {label}
            </p>
            <p className="mt-3 text-sm font-bold leading-6">{value}</p>
          </div>
        ))}

        <div className="flex flex-wrap items-center justify-between gap-3 rounded-[20px] border border-white/15 bg-black/10 px-4 py-3 lg:col-span-3 lg:col-start-2">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-white/55">
              Prototype confidence
            </p>
            <div className="mt-2 flex items-center gap-3">
              <div className="h-2 w-36 overflow-hidden rounded-full bg-white/20">
                <div
                  className="h-full w-[74%] rounded-full"
                  style={{ background: theme.accent }}
                />
              </div>
              <span className="text-sm font-black">74%</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onAsk("Give me the executive summary and recommended action")}
            className="rounded-2xl bg-white px-4 py-2.5 text-xs font-black"
            style={{ color: theme.dark }}
          >
            Ask Ellie for details
          </button>
        </div>
      </div>
    </GlassCard>
  );
}

function FloatingEllie({
  open,
  setOpen,
  messages,
  setMessages,
  ellieTheme,
  setEllieTheme,
  outfit,
  setOutfit,
  generateEllieAnswer,
}) {
  const [question, setQuestion] = useState("");
  const [customizing, setCustomizing] = useState(false);
  const [mood, setMood] = useState("happy");
  const theme = ellieThemes[ellieTheme];

  const lastJokeIndexRef = useRef(-1); 

  const ellieJokes = [
    "My favorite KPI is FCR. I love a one-call wonder!",
    "I tried forecasting the future. Turns out customers had other plans.",
    "The only thing scarier than a repeat call is a spreadsheet with merged cells.",
    "I don't dream of electric sheep. I dream of clean datasets.",
    "My love language is well-structured data.",
    "I asked the forecast what tomorrow looks like. It said 'probably more calls.'",
    "I don't gossip. I generate insights.",
    "My therapist says I should stop counting calls. I told them it's literally my job.",
    "What's a contact center's favorite exercise? Repeat reps.",
    "I tried being a customer once. The queue analytics were fascinating.",
    "Dasia loves collecting vinyl."
  ]

  const getNextJoke = () => {
    if (ellieJokes.length === 0) {
      return "My joke database is taking a coffee break.";
    }
  
    if (ellieJokes.length === 1) {
      return ellieJokes[0];
    }
  
    let nextIndex;
  
    do {
      nextIndex = Math.floor(
        Math.random() * ellieJokes.length
      );
    } while (nextIndex === lastJokeIndexRef.current);
  
    lastJokeIndexRef.current = nextIndex;
  
    return ellieJokes[nextIndex];
  };

  const ask = async (prompt) => {
    const text = String(
      prompt || question
    ).trim();
  
    if (!text) return;
  
    setMood("thinking");
    setQuestion("");
  
    setMessages((current) => [
      ...current,
      {
        role: "user",
        text,
        createdAt:
          new Date().toISOString(),
      },
    ]);
  
    try {
      const lower =
        text.toLowerCase();
  
      const answer =
        lower.includes("joke") ||
        lower.includes("funny") ||
        lower.includes("laugh")
          ? getNextJoke()
          : await generateEllieAnswer(
              text
            );
  
      setMessages((current) => [
        ...current,
        {
          role: "ellie",
          text:
            typeof answer ===
            "string"
              ? answer
              : "I could not format that response.",
          createdAt:
            new Date().toISOString(),
        },
      ]);
  
      setMood("excited");
  
      window.setTimeout(() => {
        setMood("happy");
      }, 900);
    } catch (error) {
      console.error(
        "Ellie response error:",
        error
      );
  
      setMessages((current) => [
        ...current,
        {
          role: "ellie",
          text:
            "I could not generate a response. Check the Ellie AI server function and API settings.",
          createdAt:
            new Date().toISOString(),
        },
      ]);
  
      setMood("happy");
    }
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.aside
            initial={{ opacity: 0, y: 28, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 22, scale: 0.95 }}
            className="fixed bottom-28 right-4 z-50 flex h-[min(700px,calc(100vh-145px))] w-[min(420px,calc(100vw-32px))] flex-col overflow-hidden rounded-[30px] border border-white/80 shadow-[0_30px_90px_rgba(24,59,40,.28)] backdrop-blur-2xl sm:right-7"
            style={{ background: `${theme.cardTint}f4` }}
          >
            <div
              className="p-5 text-white"
              style={{
                background: `linear-gradient(135deg, ${theme.deep}, ${theme.dark}, ${theme.mid})`,
              }}
            >
              <div className="flex items-center gap-3">
                <div className="rounded-[20px] bg-white/14 p-1 ring-1 ring-white/20">
                  <EllieRobot
                    size={68}
                    waving
                    mood={mood}
                    themeName={ellieTheme}
                    outfit={outfit}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg font-black">Ellie AI</h3>
                  <p className="text-xs text-white/65">Your Pulse intelligence guide</p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="grid h-9 w-9 place-items-center rounded-xl bg-white/10 hover:bg-white/20"
                  aria-label="Close Ellie"
                >
                  <X size={17} />
                </button>
              </div>

              <button
                type="button"
                onClick={() => setCustomizing((value) => !value)}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-white/12 px-4 py-2.5 text-xs font-black hover:bg-white/20"
              >
                <WandSparkles size={14} /> Customize Ellie
              </button>
            </div>

            <AnimatePresence>
              {customizing && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden border-b border-white/70 bg-white/60"
                >
                  <div className="space-y-4 p-4">
                    <div className="grid grid-cols-4 gap-2">
                      {Object.entries(ellieThemes).map(([name, colors]) => (
                        <button
                          type="button"
                          key={name}
                          onClick={() => setEllieTheme(name)}
                          className={`rounded-2xl border p-2 text-[10px] font-bold ${
                            ellieTheme === name
                              ? "border-transparent text-white"
                              : "border-white bg-white/75"
                          }`}
                          style={ellieTheme === name ? { background: colors.dark } : {}}
                        >
                          <span
                            className="mx-auto mb-1 block h-5 w-5 rounded-full ring-2 ring-white"
                            style={{ background: colors.mid }}
                          />
                          {name}
                        </button>
                      ))}
                    </div>

                    <div className="grid grid-cols-4 gap-2">
                      {["Classic", "Bow", "Headphones", "Analyst"].map((name) => (
                        <button
                          type="button"
                          key={name}
                          onClick={() => setOutfit(name)}
                          className={`rounded-xl border px-2 py-2 text-[10px] font-bold ${
                            outfit === name
                              ? "border-transparent text-white"
                              : "border-white bg-white/75"
                          }`}
                          style={outfit === name ? { background: theme.dark } : {}}
                        >
                          {name}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {messages.map((message, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={`${message.role}-${index}`}
                  className={`flex items-end gap-2 ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {message.role === "ellie" && (
                    <div
                      className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl"
                      style={{ background: theme.light }}
                    >
                      <EllieRobot size={38} themeName={ellieTheme} outfit={outfit} />
                    </div>
                  )}
                  <div
                    className={`max-w-[78%] whitespace-pre-line rounded-[20px] px-4 py-3 text-sm leading-6 shadow-sm ${
                      message.role === "user"
                        ? "rounded-br-md text-white"
                        : "rounded-bl-md border border-white bg-white/80 text-[#355443]"
                    }`}
                    style={message.role === "user" ? { background: theme.dark } : {}}
                  >
                    {message.text}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="border-t border-white/70 bg-white/40 p-4">
              <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
                {["Why are repeats rising?", "Show forecast", "Explain FCR", "Tell me a joke",].map(
                  (prompt) => (
                    <button
                      type="button"
                      key={prompt}
                      onClick={() => ask(prompt)}
                      className="whitespace-nowrap rounded-full border border-white bg-white/75 px-3 py-2 text-[11px] font-bold"
                    >
                      {prompt}
                    </button>
                  )
                )}
              </div>

              <div className="flex gap-2 rounded-[20px] border border-white bg-white/80 p-2 shadow-sm">
                <input
                  value={question}
                  onChange={(event) => setQuestion(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") ask();
                  }}
                  placeholder="Ask Ellie anything..."
                  className="min-w-0 flex-1 bg-transparent px-3 text-sm outline-none"
                />
                <button
                  type="button"
                  onClick={() => ask()}
                  className="grid h-11 w-11 place-items-center rounded-2xl text-white"
                  style={{ background: theme.dark }}
                  aria-label="Send question"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setOpen((value) => !value)}
        whileHover={{ scale: 1.05, y: -3 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-5 right-4 z-50 flex items-center gap-3 rounded-[25px] border border-white/80 p-2 pr-4 text-white shadow-[0_18px_50px_rgba(31,73,48,.34)] sm:bottom-7 sm:right-7"
        style={{ background: `linear-gradient(135deg, ${theme.dark}, ${theme.deep})` }}
      >
        <div
          className="grid h-16 w-16 place-items-center rounded-[20px] ring-1 ring-white/50"
          style={{ background: theme.light }}
        >
          <EllieRobot
            size={60}
            waving={!open}
            mood={open ? mood : "happy"}
            themeName={ellieTheme}
            outfit={outfit}
          />
        </div>
        <div className="hidden text-left sm:block">
          <div className="flex items-center gap-1 text-sm font-black">
            Ask Ellie <Sparkles size={13} style={{ color: theme.accent }} />
          </div>
          <p className="text-[10px] text-white/60">Insights, outfits, and jokes</p>
        </div>
      </motion.button>
    </>
  );
}

function OverviewView({ theme, ellieTheme, outfit, viewMode, askEllie, explainMetric, metrics, dynamicInsights,}) {
  return (
    <motion.section
      key="overview"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.3 }}
      className="space-y-12"
    >
      <div>
        <GlassCard className="overflow-hidden p-1" theme={theme}>
          <div
            className="grid gap-6 rounded-[25px] p-6 text-white lg:grid-cols-[1fr_250px]"
            style={{
              background: `linear-gradient(105deg, ${theme.deep}, ${theme.dark}, ${theme.mid})`,
            }}
          >
            <div>
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[.18em] text-white/65">
                <Sparkles size={14} /> Today’s intelligence brief
              </div>
              <h2 className="mt-3 max-w-3xl text-3xl font-black">
                Credit repeat contacts are growing faster than volume.
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/70">
                Payment arrangements are the largest visible driver. Ellie can explain the signal
                and connect users to the supporting queue insight.
              </p>
              <button
                type="button"
                onClick={() => askEllie("Why are Credit repeat contacts growing?")}
                className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-2.5 text-sm font-black shadow-lg"
                style={{ color: theme.dark }}
              >
                <EllieRobot size={34} themeName={ellieTheme} outfit={outfit} />
                Ask Ellie about this
              </button>
            </div>
            <div className="flex items-center justify-center rounded-[24px] border border-white/20 bg-white/10 p-4 backdrop-blur-xl">
              <EllieRobot size={150} waving themeName={ellieTheme} outfit={outfit} />
            </div>
          </div>
        </GlassCard>

        {viewMode === "Executive" && <ExecutiveSummary theme={theme} onAsk={askEllie} />}
      </div>

      <div>
        <div className="mb-4 flex items-end justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-[#7b8d81]">
              Proactive intelligence
            </p>
            <h2 className="mt-1 text-2xl font-black" style={{ color: theme.deep }}>
              What Ellie noticed
            </h2>
          </div>
          <span className="hidden items-center gap-1 rounded-full bg-white/55 px-3 py-2 text-xs font-bold text-[#64776c] sm:flex">
            <CheckCircle2 size={14} /> 
            {dynamicInsights.length} insights detected 
          </span>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {dynamicInsights.map((insight) => (
            <InsightCard
              key={insight.title}
              insight={insight}
              theme={theme}
              onAsk={askEllie}
            />
          ))}
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric, index) => (
            <MetricCard
              key={metric.name}
              metric={metric}
              index={index}
              theme={theme}
              onExplain={explainMetric}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
}

function QueueAnalyticsView({
  theme,
  askEllie,
  queueDrivers,
}) {
  const [selectedQueue, setSelectedQueue] = useState("All Queues");

  const queueOptions = useMemo(() => {
    return [
      "All Queues",
      ...Array.from(
        new Set(queueDrivers.map((row) => row.queue))
      ).sort(),
    ];
  }, [queueDrivers]);

  const filteredDrivers = useMemo(() => {
    if (selectedQueue === "All Queues") {
      return queueDrivers;
    }

    return queueDrivers.filter(
      (row) => row.queue === selectedQueue
    );
  }, [queueDrivers, selectedQueue]);

  return (
    <motion.section
      key="analytics"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-[#7b8d81]">
            Queue analytics
          </p>

          <h2
            className="mt-1 text-2xl font-black"
            style={{ color: theme.deep }}
          >
            {selectedQueue === "All Queues"
              ? "All queue breakdown"
              : `${selectedQueue} breakdown`}
          </h2>

          <p className="mt-2 text-sm text-[#718078]">
            Calculated from the currently uploaded dataset.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">

        <div className="flex flex-wrap gap-2">
  {queueOptions.map((queue) => (
    <button
      key={queue}
      type="button"
      onClick={() => setSelectedQueue(queue)}
      className={`rounded-2xl px-4 py-2 text-sm font-black transition ${
        selectedQueue === queue
          ? "text-white shadow"
          : "border border-white/80 bg-white/60"
      }`}
      style={
        selectedQueue === queue
          ? { background: theme.dark }
          : { color: theme.deep }
      }
    >
      {queue}
    </button>
  ))}
</div>

          

          <button
            type="button"
            onClick={() =>
              askEllie(
                `Analyze repeat-contact drivers for ${selectedQueue}`
              )
            }
            className="flex items-center gap-2 rounded-full px-3 py-2 text-xs font-bold"
            style={{
              background: `${theme.dark}16`,
              color: theme.dark,
            }}
          >
            <Sparkles size={13} />
            Analyze drivers
          </button>
        </div>
      </div>

      <GlassCard className="overflow-hidden p-6" theme={theme}>
        <div className="mb-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl bg-white/50 p-4">
            <p className="text-[10px] font-black uppercase tracking-widest text-[#7b8d81]">
              Call types
            </p>
            <p
              className="mt-2 text-xl font-black"
              style={{ color: theme.deep }}
            >
              <CountUp
  key={`${selectedQueue}-call-types`}
  start={0}
  end={filteredDrivers.length}
  duration={0.8}
/>
            </p>
          </div>

          <div className="rounded-2xl bg-white/50 p-4">
            <p className="text-[10px] font-black uppercase tracking-widest text-[#7b8d81]">
              Total contacts
            </p>
            <p
              className="mt-2 text-xl font-black"
              style={{ color: theme.deep }}
            >
              <CountUp
  key={selectedQueue}
  start={0}
  end={filteredDrivers.reduce(
    (sum, row) => sum + row.calls,
    0
  )}
  duration={1.1}
  separator=","
/>
            </p>
          </div>

          <div className="rounded-2xl bg-white/50 p-4">
            <p className="text-[10px] font-black uppercase tracking-widest text-[#7b8d81]">
              Highest-volume driver
            </p>
            <motion.p
  key={`${selectedQueue}-${filteredDrivers[0]?.name || "no-data"}`}
  initial={{ opacity: 0, x: -10 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.35 }}
  className="mt-2 text-sm font-black"
  style={{ color: theme.deep }}
>
  {filteredDrivers[0]?.name || "No data"}
</motion.p>
          </div>

          <div className="rounded-2xl bg-white/50 p-4">
            <p className="text-[10px] font-black uppercase tracking-widest text-[#7b8d81]">
              Items needing review
            </p>
            <p
              className="mt-2 text-xl font-black"
              style={{ color: theme.deep }}
            >
              <CountUp
  key={`${selectedQueue}-review-count`}
  start={0}
  end={
    filteredDrivers.filter(
      (row) => row.status === "Review"
    ).length
  }
  duration={0.8}
/>
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead>
              <tr className="border-b border-[#728378]/15 text-[10px] uppercase tracking-widest text-[#7b8d81]">
                <th className="px-4 py-3">Queue</th>
                <th className="px-4 py-3">Call type</th>
                <th className="px-4 py-3">Contacts</th>
                <th className="px-4 py-3">FCR</th>
                <th className="px-4 py-3">Repeat rate</th>
                <th className="px-4 py-3">Transfer rate</th>
                <th className="px-4 py-3">Avg handle time</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredDrivers.map((row) => (
                <tr
                  key={`${row.queue}-${row.name}`}
                  className="border-b border-[#728378]/10 last:border-0"
                >
                  <td className="px-4 py-4 text-[#66766d]">
                    {row.queue}
                  </td>

                  <td
                    className="px-4 py-4 font-black"
                    style={{ color: theme.deep }}
                  >
                    {row.name}
                  </td>

                  <td className="px-4 py-4 text-[#66766d]">
                    {row.contacts}
                  </td>

                  <td className="px-4 py-4 text-[#66766d]">
                    {row.fcr}
                  </td>

                  <td className="px-4 py-4 text-[#66766d]">
                    {row.repeat}
                  </td>

                  <td className="px-4 py-4 text-[#66766d]">
                    {row.transferRate}
                  </td>

                  <td className="px-4 py-4 text-[#66766d]">
                    {row.averageHandleTime} min
                  </td>

                  <td className="px-4 py-4">
                    <span
                      className="rounded-full px-3 py-1.5 text-[10px] font-black"
                      style={{
                        background:
                          row.status === "Review"
                            ? "#fee2e2"
                            : row.status === "Monitor"
                            ? "#fef3c7"
                            : `${theme.dark}13`,
                        color:
                          row.status === "Review"
                            ? "#b91c1c"
                            : row.status === "Monitor"
                            ? "#a16207"
                            : theme.dark,
                      }}
                    >
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </motion.section>
  );
}

const parseDashboardDate = (value) => {
   if (!value) return null;
 
   const text = String(value).trim();
 
   const isoMatch = text.match(
     /^(\d{4})-(\d{1,2})-(\d{1,2})$/
   );
 
   if (isoMatch) {
     const [, year, month, day] = isoMatch;
 
     const date = new Date(
       Number(year),
       Number(month) - 1,
       Number(day)
     );
 
     return Number.isNaN(date.getTime())
       ? null
       : date;
   }
 
   const slashMatch = text.match(
     /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/
   );
 
   if (slashMatch) {
     const [, month, day, year] = slashMatch;
 
     const date = new Date(
       Number(year),
       Number(month) - 1,
       Number(day)
     );
 
     return Number.isNaN(date.getTime())
       ? null
       : date;
   }
 
   const fallbackDate = new Date(text);
 
   return Number.isNaN(
     fallbackDate.getTime()
   )
     ? null
     : fallbackDate;
 };
 
 const createDateKey = (date) => {
   if (!date) return "";
 
   const year = date.getFullYear();
 
   const month = String(
     date.getMonth() + 1
   ).padStart(2, "0");
 
   const day = String(
     date.getDate()
   ).padStart(2, "0");
 
   return `${year}-${month}-${day}`;
 };
 
 const createMonthKey = (date) => {
   if (!date) return "";
 
   const year = date.getFullYear();
 
   const month = String(
     date.getMonth() + 1
   ).padStart(2, "0");
 
   return `${year}-${month}`;
 };
 
 const formatMonthLabel = (monthKey) => {
   if (!monthKey) {
     return "No month selected";
   }
 
   const [year, month] =
     monthKey.split("-");
 
   const date = new Date(
     Number(year),
     Number(month) - 1,
     1
   );
 
   return date.toLocaleDateString(
     "en-US",
     {
       month: "long",
       year: "numeric",
     }
   );
 };
 
 const getPreviousMonthKey = (
   monthKey
 ) => {
   if (!monthKey) return "";
 
   const [year, month] =
     monthKey.split("-").map(Number);
 
   const previousMonth = new Date(
     year,
     month - 2,
     1
   );
 
   return createMonthKey(
     previousMonth
   );
 };
 
 const getPriorYearMonthKey = (
   monthKey
 ) => {
   if (!monthKey) return "";
 
   const [year, month] =
     monthKey.split("-").map(Number);
 
   return `${year - 1}-${String(
     month
   ).padStart(2, "0")}`;
 };
 
 const getForecastPeriodStart = (
   date,
   frequency
 ) => {
   const result = new Date(date);
 
   result.setHours(0, 0, 0, 0);
 
   if (
     frequency === "Weekly" 
   ) {
     const day = result.getDay();
 
     const distanceFromMonday =
       day === 0 ? 6 : day - 1;
 
     result.setDate(
       result.getDate() -
         distanceFromMonday
     );
   }
 
   if (frequency === "Monthly") {
     result.setDate(1);
   }
 
   return result;
 };
 
 const aggregateForecastRows = (
   rows,
   frequency
 ) => {
   if (frequency === "Daily") {
     return rows;
   }
 
   const grouped = {};
 
   rows.forEach((row) => {
     const date =
       parseDashboardDate(row.date);
 
     if (!date) return;
 
     const periodStart =
       getForecastPeriodStart(
         date,
         frequency
       );
 
     const periodKey =
       createDateKey(periodStart);
 
     if (!grouped[periodKey]) {
       grouped[periodKey] = {
         date: periodKey,
         actual: null,
         projected: null,
       };
     }
 
     if (
       Number.isFinite(row.actual)
     ) {
       grouped[periodKey].actual =
         (grouped[periodKey]
           .actual || 0) +
         row.actual;
     }
 
     if (
       Number.isFinite(
         row.projected
       )
     ) {
       grouped[
         periodKey
       ].projected =
         (grouped[periodKey]
           .projected || 0) +
         row.projected;
     }
   });
 
   return Object.values(
     grouped
   ).sort((first, second) => {
     const firstDate =
       parseDashboardDate(
         first.date
       );
 
     const secondDate =
       parseDashboardDate(
         second.date
       );
 
     return (
       firstDate.getTime() -
       secondDate.getTime()
     );
   });
 };
 
 const calculatePeriodMetrics = (
   rows
 ) => {
   const totals = rows.reduce(
     (result, row) => {
       const calls =
         Number(row.Calls) || 0;
 
       result.calls += calls;
 
       result.repeats +=
         Number(row.RepeatCalls) ||
         0;
 
       result.resolved +=
         Number(
           row.ResolvedCalls
         ) || 0;
 
       result.transfers +=
         Number(row.Transfers) ||
         0;
 
       result.escalations +=
         Number(
           row.Escalations
         ) || 0;
 
       result.handleTimeTotal +=
         (Number(
           row.AverageHandleTime
         ) || 0) * calls;
 
       const callType = String(
         row.CallType ||
           row["Call Type"] ||
           "Unknown"
       ).trim();
 
       result.callTypes[
         callType
       ] =
         (result.callTypes[
           callType
         ] || 0) + calls;
 
       return result;
     },
     {
       calls: 0,
       repeats: 0,
       resolved: 0,
       transfers: 0,
       escalations: 0,
       handleTimeTotal: 0,
       callTypes: {},
     }
   );
 
   const topCallTypeEntry =
     Object.entries(
       totals.callTypes
     ).sort(
       (first, second) =>
         second[1] - first[1]
     )[0];
 
   return {
     calls: totals.calls,
 
     fcr:
       totals.calls > 0
         ? (totals.resolved /
             totals.calls) *
           100
         : 0,
 
     repeatRate:
       totals.calls > 0
         ? (totals.repeats /
             totals.calls) *
           100
         : 0,
 
     transferRate:
       totals.calls > 0
         ? (totals.transfers /
             totals.calls) *
           100
         : 0,
 
     escalationRate:
       totals.calls > 0
         ? (totals.escalations /
             totals.calls) *
           100
         : 0,
 
     averageHandleTime:
       totals.calls > 0
         ? totals.handleTimeTotal /
           totals.calls
         : 0,
 
     topCallType:
       topCallTypeEntry?.[0] ||
       "No data",
 
     topCallTypeCalls:
       topCallTypeEntry?.[1] ||
       0,
   };
 };
 
 const calculatePercentChange = (
   current,
   comparison
 ) => {
   if (
     !Number.isFinite(current) ||
     !Number.isFinite(
       comparison
     ) ||
     comparison === 0
   ) {
     return null;
   }
 
   return (
     ((current - comparison) /
       comparison) *
     100
   );
 };

 function PulseDropdown({
  value,
  options,
  onChange,
  formatOption = (option) => option,
  open,
  setOpen,
  theme,
  placeholder = "Select an option",
}) {
  const selectedLabel = value
    ? formatOption(value)
    : placeholder;

  return (
    <div className="relative z-[9999]">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="flex w-full items-center justify-between gap-3 rounded-2xl border border-white/80 bg-[#f7faf7] px-4 py-3 text-left text-sm font-black shadow-sm backdrop-blur-md transition-all hover:bg-white/90"
        style={{
          color: theme.deep,
          border: "1px solid rgba(214,223,216,0.95)"
        }}
      >
        <span className="min-w-0 truncate">
          {selectedLabel}
        </span>

        <ChevronDown
          size={16}
          className={`shrink-0 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
          initial={{
            opacity: 0,
            y: -8,
            scale: 0.97,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            y: -6,
            scale: 0.97,
          }}
          transition={{
            duration: 0.18,
          }}
          className="absolute top-full z-[9999] mt-2 max-h-72 w-full overflow-auto rounded-2xl p-2 shadow-2xl"
          style={{
            background: "#f7faf7",
            border: "1px solid rgba(214,223,216,0.95)",
            boxShadow:
              "0 18px 40px rgba(36,74,53,0.15)",
          }}
        >
            {options.length === 0 ? (
              <div className="px-3 py-3 text-sm font-bold text-[#718078]">
                No options available
              </div>
            ) : (
              options.map((option) => {
                const isSelected =
                  option === value;

                return (
                  <button
                    key={String(option)}
                    type="button"
                    onClick={() => {
                      onChange(option);
                      setOpen(false);
                    }}
                    className="w-full rounded-xl px-3 py-2.5 text-left text-sm font-bold transition-all duration-150 hover:bg-[#eef4ef] hover:shadow-sm"
                    style={{
                      color: theme.deep,
                      background: isSelected
                        ? "#dfe8e0"
                        : "#f7faf7",
                    }}
                  >
                    <span className="truncate">
                      {formatOption(option)}
                    </span>

                    {isSelected && (
                      <CheckCircle2
                        size={15}
                        style={{
                          color: theme.dark,
                        }}
                      />
                    )}
                  </button>
                );
              })
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

 function ForecastingView({
   theme,
   askEllie,
   forecastData,
   callData,
   setHistoricalComparisonContext,
 }) {
   const [frequency, setFrequency] =
     useState("Daily");
   
   const [forecastRange, setForecastRange] =
      useState("All Data");
   
   const [forecastStartDate, setForecastStartDate] =
      useState("");
  
   const [forecastEndDate, setForecastEndDate] =
      useState("");
    
   const [forecastRangeOpen, setForecastRangeOpen] =
      useState(false);
 
   const [selectedQueue, setSelectedQueue] =
     useState("All Queues");
   
   const [
    primaryMonthDropdownOpen,
    setPrimaryMonthDropdownOpen,
   ] = useState(false);

   const [
    comparisonModeDropdownOpen,
    setComparisonModeDropdownOpen,
   ] = useState(false);

   const [
    customMonthDropdownOpen,
    setCustomMonthDropdownOpen,
   ] = useState(false);

   const [queueDropdownOpen, setQueueDropdownOpen] =
    useState(false);
 
   const [selectedMonth, setSelectedMonth] =
     useState("");
 
   const [comparisonMode, setComparisonMode] =
     useState("Previous Month");
 
   const [
     customComparisonMonth,
     setCustomComparisonMonth,
   ] = useState("");
 
   const queueOptions = useMemo(() => {
     return [
       "All Queues",
       ...Array.from(
         new Set(
           callData
             .map((row) =>
               String(
                 row.Queue || ""
               ).trim()
             )
             .filter(Boolean)
         )
       ).sort(),
     ];
   }, [callData]);
 
   const filteredCallData = useMemo(() => {
     if (
       selectedQueue ===
       "All Queues"
     ) {
       return callData;
     }
 
     return callData.filter(
       (row) =>
         String(row.Queue).trim() ===
         selectedQueue
     );
   }, [callData, selectedQueue]);
 
   const availableMonths = useMemo(() => {
     return Array.from(
       new Set(
         filteredCallData
           .map((row) => {
             const date =
               parseDashboardDate(
                 row.Date
               );
 
             return date
               ? createMonthKey(date)
               : "";
           })
           .filter(Boolean)
       )
     ).sort();
   }, [filteredCallData]);
 
   useEffect(() => {
     if (
       availableMonths.length === 0
     ) {
       setSelectedMonth("");
       return;
     }
 
     if (
       !availableMonths.includes(
         selectedMonth
       )
     ) {
       setSelectedMonth(
         availableMonths[
           availableMonths.length - 1
         ]
       );
     }
   }, [
     availableMonths,
     selectedMonth,
   ]);
 
   useEffect(() => {
     if (
       availableMonths.length === 0
     ) {
       setCustomComparisonMonth(
         ""
       );
 
       return;
     }
 
     if (
       !availableMonths.includes(
         customComparisonMonth
       )
     ) {
       setCustomComparisonMonth(
         availableMonths[
           Math.max(
             0,
             availableMonths.length -
               2
           )
         ]
       );
     }
   }, [
     availableMonths,
     customComparisonMonth,
   ]);
 
   const comparisonMonth =
     useMemo(() => {
       if (!selectedMonth) {
         return "";
       }
 
       if (
         comparisonMode ===
         "Previous Month"
       ) {
         return getPreviousMonthKey(
           selectedMonth
         );
       }
 
       if (
         comparisonMode ===
         "Same Month Last Year"
       ) {
         return getPriorYearMonthKey(
           selectedMonth
         );
       }
 
       if (
         comparisonMode ===
         "Custom Month"
       ) {
         return customComparisonMonth;
       }
 
       return "";
     }, [
       selectedMonth,
       comparisonMode,
       customComparisonMonth,
     ]);
 
   const selectedMonthRows =
     useMemo(() => {
       return filteredCallData.filter(
         (row) => {
           const date =
             parseDashboardDate(
               row.Date
             );
 
           return (
             date &&
             createMonthKey(date) ===
               selectedMonth
           );
         }
       );
     }, [
       filteredCallData,
       selectedMonth,
     ]);
 
   const comparisonMonthRows =
     useMemo(() => {
       if (!comparisonMonth) {
         return [];
       }
 
       return filteredCallData.filter(
         (row) => {
           const date =
             parseDashboardDate(
               row.Date
             );
 
           return (
             date &&
             createMonthKey(date) ===
               comparisonMonth
           );
         }
       );
     }, [
       filteredCallData,
       comparisonMonth,
     ]);
 
   const selectedMetrics =
     useMemo(
       () =>
         calculatePeriodMetrics(
           selectedMonthRows
         ),
       [selectedMonthRows]
     );
 
   const comparisonMetrics =
     useMemo(
       () =>
         calculatePeriodMetrics(
           comparisonMonthRows
         ),
       [comparisonMonthRows]
     );
 
   const comparisonExists =
     comparisonMonthRows.length > 0;
 
     const allAggregatedForecastData =
     useMemo(() => {
       return aggregateForecastRows(
         forecastData,
         frequency
       );
     }, [forecastData, frequency]);
   
   const forecastDateBounds =
     useMemo(() => {
       const validDates =
         allAggregatedForecastData
           .map((row) =>
             parseDashboardDate(row.date)
           )
           .filter(Boolean)
           .sort(
             (first, second) =>
               first.getTime() -
               second.getTime()
           );
   
       if (validDates.length === 0) {
         return {
           minimum: "",
           maximum: "",
         };
       }
   
       return {
         minimum: createDateKey(
           validDates[0]
         ),
         maximum: createDateKey(
           validDates[
             validDates.length - 1
           ]
         ),
       };
     }, [allAggregatedForecastData]);
   
   useEffect(() => {
     if (
       !forecastDateBounds.minimum ||
       !forecastDateBounds.maximum
     ) {
       return;
     }
   
     if (!forecastStartDate) {
       setForecastStartDate(
         forecastDateBounds.minimum
       );
     }
   
     if (!forecastEndDate) {
       setForecastEndDate(
         forecastDateBounds.maximum
       );
     }
   }, [
     forecastDateBounds,
     forecastStartDate,
     forecastEndDate,
   ]);
   
   const aggregatedForecastData =
     useMemo(() => {
       if (
         allAggregatedForecastData.length === 0
       ) {
         return [];
       }
   
       if (forecastRange === "All Data") {
         return allAggregatedForecastData;
       }
   
       const maximumDate =
         parseDashboardDate(
           forecastDateBounds.maximum
         );
   
       if (!maximumDate) {
         return allAggregatedForecastData;
       }
   
       let rangeStart = null;
       let rangeEnd =
         new Date(maximumDate);
   
       if (forecastRange === "Last 30 Days") {
         rangeStart =
           new Date(maximumDate);
   
         rangeStart.setDate(
           rangeStart.getDate() - 29
         );
       }
   
       if (forecastRange === "Last 90 Days") {
         rangeStart =
           new Date(maximumDate);
   
         rangeStart.setDate(
           rangeStart.getDate() - 89
         );
       }
   
       if (forecastRange === "Year to Date") {
         rangeStart =
           new Date(
             maximumDate.getFullYear(),
             0,
             1
           );
       }
   
       if (forecastRange === "Custom Range") {
         rangeStart =
           parseDashboardDate(
             forecastStartDate
           );
   
         rangeEnd =
           parseDashboardDate(
             forecastEndDate
           );
       }
   
       if (!rangeStart || !rangeEnd) {
         return allAggregatedForecastData;
       }
   
       rangeStart.setHours(0, 0, 0, 0);
       rangeEnd.setHours(
         23,
         59,
         59,
         999
       );
   
       return allAggregatedForecastData.filter(
         (row) => {
           const rowDate =
             parseDashboardDate(
               row.date
             );
   
           return (
             rowDate &&
             rowDate >= rangeStart &&
             rowDate <= rangeEnd
           );
         }
       );
     }, [
       allAggregatedForecastData,
       forecastRange,
       forecastStartDate,
       forecastEndDate,
       forecastDateBounds,
     ]);
 
   const historicalComparisonChart =
     useMemo(() => {
       const selectedByDay = {};
       const comparisonByDay = {};
 
       selectedMonthRows.forEach(
         (row) => {
           const date =
             parseDashboardDate(
               row.Date
             );
 
           if (!date) return;
 
           const day =
             date.getDate();
 
           selectedByDay[day] =
             (selectedByDay[day] ||
               0) +
             (Number(row.Calls) || 0);
         }
       );
 
       comparisonMonthRows.forEach(
         (row) => {
           const date =
             parseDashboardDate(
               row.Date
             );
 
           if (!date) return;
 
           const day =
             date.getDate();
 
           comparisonByDay[day] =
             (comparisonByDay[day] ||
               0) +
             (Number(row.Calls) || 0);
         }
       );
 
       const days = Array.from(
         new Set([
           ...Object.keys(
             selectedByDay
           ).map(Number),
 
           ...Object.keys(
             comparisonByDay
           ).map(Number),
         ])
       ).sort(
         (first, second) =>
           first - second
       );
 
       return days.map((day) => ({
         day: `Day ${day}`,
         selected:
           selectedByDay[day] ??
           null,
         comparison:
           comparisonByDay[day] ??
           null,
       }));
     }, [
       selectedMonthRows,
       comparisonMonthRows,
     ]);
 
   const selectedMonthLabel =
     formatMonthLabel(
       selectedMonth
     );
 
   const comparisonMonthLabel =
     formatMonthLabel(
       comparisonMonth
     );
 
   const callChange =
     comparisonExists
       ? calculatePercentChange(
           selectedMetrics.calls,
           comparisonMetrics.calls
         )
       : null;
 
   const fcrPointChange =
     comparisonExists
       ? selectedMetrics.fcr -
         comparisonMetrics.fcr
       : null;
 
   const repeatPointChange =
     comparisonExists
       ? selectedMetrics.repeatRate -
         comparisonMetrics.repeatRate
       : null;
 
   const transferPointChange =
     comparisonExists
       ? selectedMetrics.transferRate -
         comparisonMetrics.transferRate
       : null;
    
       useEffect(() => {
        if (
          !selectedMonth ||
          !setHistoricalComparisonContext
        ) {
          return;
        }
      
        setHistoricalComparisonContext({
          queue: selectedQueue,
      
          selectedMonth,
          selectedMonthLabel,
      
          comparisonMode,
          comparisonMonth,
          comparisonMonthLabel,
          comparisonExists,
      
          selectedMetrics: {
            calls: selectedMetrics.calls,
            fcr: selectedMetrics.fcr,
            repeatRate:
              selectedMetrics.repeatRate,
            transferRate:
              selectedMetrics.transferRate,
            escalationRate:
              selectedMetrics.escalationRate,
            averageHandleTime:
              selectedMetrics.averageHandleTime,
            topCallType:
              selectedMetrics.topCallType,
            topCallTypeCalls:
              selectedMetrics.topCallTypeCalls,
          },
      
          comparisonMetrics: {
            calls: comparisonMetrics.calls,
            fcr: comparisonMetrics.fcr,
            repeatRate:
              comparisonMetrics.repeatRate,
            transferRate:
              comparisonMetrics.transferRate,
            escalationRate:
              comparisonMetrics.escalationRate,
            averageHandleTime:
              comparisonMetrics.averageHandleTime,
            topCallType:
              comparisonMetrics.topCallType,
            topCallTypeCalls:
              comparisonMetrics.topCallTypeCalls,
          },
      
          changes: {
            callPercent: callChange,
            fcrPoints: fcrPointChange,
            repeatPoints:
              repeatPointChange,
            transferPoints:
              transferPointChange,
          },
        });
      }, [
        selectedQueue,
        selectedMonth,
        selectedMonthLabel,
        comparisonMode,
        comparisonMonth,
        comparisonMonthLabel,
        comparisonExists,
        selectedMetrics,
        comparisonMetrics,
        callChange,
        fcrPointChange,
        repeatPointChange,
        transferPointChange,
        setHistoricalComparisonContext,
      ]);
 
   const projectedRows =
     aggregatedForecastData.filter(
       (row) =>
         Number.isFinite(
           row.projected
         )
     );
 
   const finalProjection =
     projectedRows.length > 0
       ? projectedRows[
           projectedRows.length - 1
         ].projected
       : 0;
   
   const actualRows = 
      aggregatedForecastData.filter(
         (row) =>
            Number.isFinite(row.actual)
      );
    
   const latestActual =
      actualRows.length > 0
        ? actualRows[
            actualRows.length - 1
          ].actual
        : 0;
   
        const firstProjection =
        projectedRows.length > 0
          ? projectedRows[0].projected
          : 0;
      
      const projectedChange =
        firstProjection > 0
          ? (
              (finalProjection -
                firstProjection) /
              firstProjection
            ) * 100
          : 0;
      
      const forecastAnimationKey =
        `${frequency}-${aggregatedForecastData.length}-${finalProjection}`;

   const formatForecastTick = (
     value
   ) => {
     const date =
       parseDashboardDate(value);
 
     if (!date) return value;
 
     if (frequency === "Monthly") {
       return date.toLocaleDateString(
         "en-US",
         {
           month: "short",
           year: "2-digit",
         }
       );
     }
 
     return date.toLocaleDateString(
       "en-US",
       {
         month: "short",
         day: "numeric",
       }
     );
   };
 
   const formatChange = (
     value,
     suffix = "%"
   ) => {
     if (
       value === null ||
       !Number.isFinite(value)
     ) {
       return "No comparison";
     }
 
     return `${
       value >= 0 ? "+" : ""
     }${value.toFixed(1)}${suffix}`;
   };
 
   return (
     <motion.section
       key="forecasting"
       initial={{
         opacity: 0,
         y: 20,
       }}
       animate={{
         opacity: 1,
         y: 0,
       }}
       exit={{
         opacity: 0,
         y: -12,
       }}
       transition={{
         duration: 0.3,
       }}
       className="space-y-6"
     >
       <GlassCard
         className="p-6"
         theme={theme}
       >
         <div className="flex flex-wrap items-end justify-between gap-4">
           <div>
             <p className="text-xs font-black uppercase tracking-widest text-[#7b8d81]">
               Forecast outlook
             </p>
 
             <h2
               className="mt-1 text-2xl font-black"
               style={{
                 color: theme.deep,
               }}
             >
               Historical and forecasted contact
               volume
             </h2>
 
             <p className="mt-2 text-sm text-[#718078]">
               View the forecast by daily,
               weekly, or monthly
               planning period.
             </p>
           </div>
 
           <button
             type="button"
             onClick={() =>
               askEllie(
                 `Explain the ${frequency.toLowerCase()} forecast`
               )
             }
             className="flex items-center gap-2 rounded-full px-3 py-2 text-xs font-bold"
             style={{
               background:
                 `${theme.dark}16`,
               color: theme.dark,
             }}
           >
             <Sparkles size={13} />
             Ask Ellie to explain
           </button>
         </div>
 
         <div className="mt-6 flex flex-wrap gap-2">
           {[
             "Daily",
             "Weekly",
             "Monthly",
           ].map((option) => (
             <button
               type="button"
               key={option}
               onClick={() =>
                 setFrequency(option)
               }
               className={`rounded-2xl px-5 py-3 text-sm font-black transition-all duration-200 ${
                 frequency === option
                   ? "text-white shadow-lg"
                   : "border border-white bg-white/85 hover: bg-white"
               }`}
               style={
                 frequency === option
                   ? {
                       background:
                         theme.dark,
                     }
                   : {
                       color:
                         theme.deep,
                     }
               }
             >
               {option}
             </button>
           ))}
         </div>
        
         <div className="relative z-30 mt-4 grid gap-3 rounded-[22px] border border-white/80 bg-white/45 p-4 lg:grid-cols-[1fr_auto]">
  <div>
    <p className="text-[10px] font-black uppercase tracking-widest text-[#7b8d81]">
      Timeline
    </p>

    <div className="relative mt-2 max-w-sm">
      <button
        type="button"
        onClick={() =>
          setForecastRangeOpen(
            (current) => !current
          )
        }
        className="flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm font-black shadow-sm transition hover:bg-white"
        style={{
          color: theme.deep,
          background: "#f7faf7",
          border:
            "1px solid rgba(214,223,216,0.95)",
        }}
      >
        <span>{forecastRange}</span>

        <ChevronDown
          size={16}
          className={`transition-transform ${
            forecastRangeOpen
              ? "rotate-180"
              : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {forecastRangeOpen && (
          <motion.div
            initial={{
              opacity: 0,
              y: -8,
              scale: 0.97,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: -6,
              scale: 0.97,
            }}
            transition={{
              duration: 0.18,
            }}
            className="absolute left-0 top-full z-[9999] mt-2 w-full rounded-2xl p-2 shadow-2xl"
            style={{
              background: "#f7faf7",
              border:
                "1px solid rgba(214,223,216,0.95)",
              boxShadow:
                "0 18px 40px rgba(36,74,53,0.15)",
            }}
          >
            {[
              "All Data",
              "Last 30 Days",
              "Last 90 Days",
              "Year to Date",
              "Custom Range",
            ].map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => {
                  setForecastRange(
                    option
                  );

                  setForecastRangeOpen(
                    false
                  );
                }}
                className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm font-bold transition hover:bg-[#eef4ef]"
                style={{
                  color: theme.deep,
                  background:
                    option ===
                    forecastRange
                      ? "#dfe8e0"
                      : "#f7faf7",
                }}
              >
                {option}

                {option ===
                  forecastRange && (
                  <CheckCircle2
                    size={15}
                    style={{
                      color:
                        theme.dark,
                    }}
                  />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  </div>

  {forecastRange ===
    "Custom Range" && (
    <motion.div
      initial={{
        opacity: 0,
        y: 8,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="grid gap-3 sm:grid-cols-2"
    >
      <div>
        <label className="mb-2 block text-[10px] font-black uppercase tracking-widest text-[#7b8d81]">
          Start date
        </label>

        <input
          type="date"
          value={forecastStartDate}
          min={
            forecastDateBounds.minimum
          }
          max={
            forecastEndDate ||
            forecastDateBounds.maximum
          }
          onChange={(event) =>
            setForecastStartDate(
              event.target.value
            )
          }
          className="w-full rounded-2xl px-4 py-3 text-sm font-black shadow-sm outline-none"
          style={{
            color: theme.deep,
            background: "#f7faf7",
            border:
              "1px solid rgba(214,223,216,0.95)",
          }}
        />
      </div>

      <div>
        <label className="mb-2 block text-[10px] font-black uppercase tracking-widest text-[#7b8d81]">
          End date
        </label>

        <input
          type="date"
          value={forecastEndDate}
          min={
            forecastStartDate ||
            forecastDateBounds.minimum
          }
          max={
            forecastDateBounds.maximum
          }
          onChange={(event) =>
            setForecastEndDate(
              event.target.value
            )
          }
          className="w-full rounded-2xl px-4 py-3 text-sm font-black shadow-sm outline-none"
          style={{
            color: theme.deep,
            background: "#f7faf7",
            border:
              "1px solid rgba(214,223,216,0.95)",
          }}
        />
      </div>
    </motion.div>
  )}
</div>
 
         <motion.div
  initial={{
    opacity: 0,
    y: 16,
  }}
  animate={{
    opacity: 1,
    y: 0,
  }}
  transition={{
    duration: 0.45,
  }}
  className="mt-6 rounded-[24px] border border-white/80 bg-white/45 p-4"
>
  <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
    <div>
      <p className="text-[10px] font-black uppercase tracking-widest text-[#7b8d81]">
        Volume trend
      </p>

      <h3
        className="mt-1 text-lg font-black"
        style={{ color: theme.deep }}
      >
        Contact Volume Outlook
      </h3>
    </div>

    <p className="mt-1 text-sm text-[#718078]">
      Showing {frequency.toLowerCase()} forecast trends based on loaded contact data.
    </p>

    <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-[#66766d]">
      <span className="flex items-center gap-2">
        <span
          className="h-3 w-3 rounded-full"
          style={{
            background: theme.dark,
          }}
        />
        Actual
      </span>

      <span className="flex items-center gap-2">
        <span
          className="h-3 w-3 rounded-full"
          style={{
            background: theme.accent,
          }}
        />
        Projected
      </span>
    </div>
  </div>

  <div className="relative min-h-[390px] w-full overflow-x-auto">
  {aggregatedForecastData.length === 0 ? (
    <div className="grid h-[390px] min-w-[900px] place-items-center rounded-2xl border border-dashed border-white bg-white/70">
      <div className="text-center">
        <TrendingUp
          className="mx-auto"
          size={28}
          style={{ color: theme.dark }}
        />

        <p
          className="mt-3 font-black"
          style={{ color: theme.deep }}
        >
          No forecast data available
        </p>

        <p className="mt-1 text-xs text-[#718078]">
          Load a file containing valid Date and Calls columns.
        </p>
      </div>
    </div>
  ) : (
    <AreaChart
      width={1100}
      height={390}
      data={aggregatedForecastData}
      margin={{
        top: 20,
        right: 30,
        left: 15,
        bottom: 10,
      }}
    >
      <defs>
        <linearGradient
          id="forecastActualFill"
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <stop
            offset="0%"
            stopColor={theme.dark}
            stopOpacity={0.35}
          />

          <stop
            offset="100%"
            stopColor={theme.dark}
            stopOpacity={0.02}
          />
        </linearGradient>

        <linearGradient
          id="forecastProjectedFill"
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <stop
            offset="0%"
            stopColor={theme.accent}
            stopOpacity={0.3}
          />

          <stop
            offset="100%"
            stopColor={theme.accent}
            stopOpacity={0.02}
          />
        </linearGradient>
      </defs>

      <CartesianGrid
        vertical={false}
        stroke="rgba(49,95,67,0.14)"
        strokeDasharray="4 5"
      />

      <XAxis
        dataKey="date"
        axisLine={false}
        tickLine={false}
        minTickGap={30}
        tickFormatter={formatForecastTick}
        tick={{
          fill: "#66766d",
          fontSize: 12,
          fontWeight: 800,
        }}
      />

      <YAxis
        axisLine={false}
        tickLine={false}
        width={76}
        domain={[0, "auto"]}
        tickFormatter={(value) =>
          Number(value).toLocaleString()
        }
        tick={{
          fill: "#66766d",
          fontSize: 12,
          fontWeight: 800,
        }}
      />

      <Tooltip
        labelFormatter={(value) =>
          formatForecastTick(value)
        }
        formatter={(value, name) => [
          Number(value).toLocaleString(),
          name,
        ]}
        contentStyle={{
          borderRadius: 18,
          border: "1px solid rgba(255,255,255,.95)",
          background: "rgba(255,255,255,.96)",
          boxShadow:
            "0 14px 36px rgba(38,74,50,.14)",
        }}
        labelStyle={{
          color: theme.deep,
          fontWeight: 900,
        }}
      />

      <Area
        key={`actual-${frequency}-${aggregatedForecastData.length}`}
        type="linear"
        dataKey="actual"
        name="Actual"
        stroke={theme.dark}
        strokeWidth={4}
        fill="url(#forecastActualFill)"
        connectNulls={false}
        dot={false}
        activeDot={{
          r: 6,
          fill: theme.dark,
          stroke: "white",
          strokeWidth: 3,
        }}
        isAnimationActive={true}
        animationDuration={900}
        animationEasing="ease-out"
      />

      <Area
        key={`projected-${frequency}-${aggregatedForecastData.length}`}
        type="linear"
        dataKey="projected"
        name="Projected"
        stroke="#d89a2b"
        strokeWidth={4}
        strokeDasharray="8 6"
        fill="url(#forecastProjectedFill)"
        connectNulls={false}
        dot={false}
        activeDot={{
          r: 6,
          fill: "#d89a2b",
          stroke: "white",
          strokeWidth: 3,
        }}
        isAnimationActive={true}
        animationBegin={150}
        animationDuration={1100}
        animationEasing="ease-out"
      />
    </AreaChart>
  )}
  </div> 
</motion.div>
   
         <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
  <motion.div
    key={`period-${forecastAnimationKey}`}
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.35 }}
    whileHover={{ y: -4 }}
    className="rounded-3xl border border-white/80 bg-white/55 p-5 shadow-sm"
  >
    <p className="text-[10px] font-black uppercase tracking-widest text-[#7b8d81]">
      Forecast view
    </p>

    <p
      className="mt-2 text-2xl font-black"
      style={{ color: theme.deep }}
    >
      {frequency}
    </p>

    <p className="mt-2 text-xs text-[#718078]">
      Historical and forecasted volume
    </p>
  </motion.div>

  <motion.div
    key={`actual-${forecastAnimationKey}`}
    initial={{
      opacity: 0,
      y: 12,
      scale: 0.98,
    }}
    animate={{
      opacity: 1,
      y: 0,
      scale: 1,
    }}
    transition={{
      duration: 0.4,
      delay: 0.05,
    }}
    whileHover={{ y: -4 }}
    className="rounded-3xl border border-white/80 bg-white/55 p-5 shadow-sm"
  >
    <p className="text-[10px] font-black uppercase tracking-widest text-[#7b8d81]">
      Latest actual
    </p>

    <p
      className="mt-2 text-2xl font-black"
      style={{ color: theme.deep }}
    >
      <CountUp
        key={`actual-count-${forecastAnimationKey}`}
        start={0}
        end={latestActual}
        duration={1.1}
        separator=","
      />
    </p>

    <p className="mt-2 text-xs text-[#718078]">
      Latest completed {frequency.toLowerCase()} period
    </p>
  </motion.div>

  <motion.div
    key={`projection-${forecastAnimationKey}`}
    initial={{
      opacity: 0,
      y: 12,
      scale: 0.98,
    }}
    animate={{
      opacity: 1,
      y: 0,
      scale: 1,
    }}
    transition={{
      duration: 0.4,
      delay: 0.1,
    }}
    whileHover={{ y: -4 }}
    className="rounded-3xl border border-white/80 bg-white/55 p-5 shadow-sm"
  >
    <p className="text-[10px] font-black uppercase tracking-widest text-[#7b8d81]">
      Final projection
    </p>

    <p
      className="mt-2 text-2xl font-black"
      style={{ color: theme.deep }}
    >
      <CountUp
        key={`projection-count-${forecastAnimationKey}`}
        start={0}
        end={finalProjection}
        duration={1.25}
        separator=","
      />
    </p>

    <p className="mt-2 text-xs text-[#718078]">
      Final projected {frequency.toLowerCase()} period
    </p>
  </motion.div>

  <motion.div
    key={`change-${forecastAnimationKey}`}
    initial={{
      opacity: 0,
      y: 12,
      scale: 0.98,
    }}
    animate={{
      opacity: 1,
      y: 0,
      scale: 1,
    }}
    transition={{
      duration: 0.4,
      delay: 0.15,
    }}
    whileHover={{ y: -4 }}
    className="rounded-3xl border border-white/80 bg-white/55 p-5 shadow-sm"
  >
    <p className="text-[10px] font-black uppercase tracking-widest text-[#7b8d81]">
      Projected change
    </p>

    <p
      className="mt-2 text-2xl font-black"
      style={{
        color:
          projectedChange >= 0
            ? theme.dark
            : "#b91c1c",
      }}
    >

      <CountUp
        key={`change-count-${forecastAnimationKey}`}
        start={0}
        end={projectedChange}
        duration={1.1}
        decimals={1}
        prefix={projectedChange >= 0 ? "+" : ""}
        suffix="%"
      />
    </p>

    <p className="mt-2 text-xs text-[#718078]">
      First forecast period to final forecast period
    </p>
  </motion.div>
</div>
       </GlassCard>
 
       <GlassCard
         className="p-6"
         theme={theme}
       >
         <div className="flex flex-wrap items-end justify-between gap-4">
           <div>
             <p className="text-xs font-black uppercase tracking-widest text-[#7b8d81]">
               Historical analytics
             </p>
 
             <h2
               className="mt-1 text-2xl font-black"
               style={{
                 color: theme.deep,
               }}
             >
               What did a previous month
               look like?
             </h2>
 
             <p className="mt-2 text-sm text-[#718078]">
               Select a queue and month,
               then compare it with the
               previous month, the same
               month last year, or another
               custom month.
             </p>
           </div>
 
           <button
             type="button"
             onClick={() =>
               askEllie(
                 comparisonExists
                   ? `Compare ${selectedMonthLabel} to ${comparisonMonthLabel} for ${selectedQueue}`
                   : `Summarize ${selectedMonthLabel} for ${selectedQueue}`
               )
             }
             className="flex items-center gap-2 rounded-full px-3 py-2 text-xs font-bold"
             style={{
               background:
                 `${theme.dark}16`,
               color: theme.dark,
             }}
           >
             <Sparkles size={13} />
             Ask Ellie about this
           </button>
         </div>

 <div className="relative mt-6 grid gap-4 rounded-[24px] border border-white/80 bg-white/45 p-5 md:grid-cols-2 xl:grid-cols-4">
{/* Queue */}
<div>
  <label className="mb-2 block text-[10px] font-black uppercase tracking-widest text-[#7b8d81]">
Queue
</label>  
             <div className="relative">
  <button
    type="button"
    onClick={() =>
      setQueueDropdownOpen(
        !queueDropdownOpen
      )
    }
    className="flex w-full items-center justify-between rounded-2xl border border-white/80 bg-[#f7faf7] px-4 py-3 text-sm font-black shadow-sm backdrop-blur-md transition-all hover:bg-white/90"
    style={{
      color: theme.deep,
    }}
  >
    <span>{selectedQueue}</span>

    <ChevronDown
      size={16}
      className={`transition-transform ${
        queueDropdownOpen
          ? "rotate-180"
          : ""
      }`}
    />
  </button>
  
  <AnimatePresence>
  {queueDropdownOpen && (
    <motion.div
      initial={{
        opacity: 0,
        y: -8,
        scale: 0.97,
      }}
      animate={{
        opacity: 1,
        y:0,
        scale:1,
      }}
      exit={{
        opacity: 0,
        y: -6,
        scale: 0.97,
      }}
      transition={{
        duration: 0.18,
      }}
    className="absolute top-full z-50 mt-2 max-h-72 w-full overflow-auto rounded-2xl p-2 shadow-2xl"
    style={{
      background: "#f7faf7",
      border: "1px solid rgba(214,223,216,0.95)",
      boxShadow: "0 18px 40px rgba(36,74,53,0.15)",
    }}
  >

      {queueOptions.map((queue) => (
        <button
          key={queue}
          type="button"
          onClick={() => {
            setSelectedQueue(queue);
            setQueueDropdownOpen(false);
          }}
          className="w-full rounded-xl px-3 py-2 text-left text-sm font-bold transition-all duration-150 hover:bg-white hover:shadow-sm"
          style={{
            color: theme.deep,
            background:
              queue === selectedQueue
                ? "rgba(107,139,116,0.15)"
                : "transparent",
          }}
        >
          {queue}
        </button>
      ))}
    </motion.div>
  )}
  </AnimatePresence>
</div>
</div>


          {/* Primary Month */}
<div>

<label className="mb-2 block text-[10px] font-black uppercase tracking-widest text-[#7b8d81]">
Primary month
</label>

<PulseDropdown value={selectedMonth}
options={availableMonths}
onChange={setSelectedMonth}
formatOption={formatMonthLabel}
open={primaryMonthDropdownOpen}
setOpen={setPrimaryMonthDropdownOpen}
theme={theme}
placeholder="Select a month" />
</div>

{/* Compare To */}

<div>

<label className="mb-2 block text-[10px] font-black uppercase tracking-widest text-[#7b8d81]">
Compare to
</label>
<PulseDropdown value={comparisonMode}
options={[
"No Comparison",
"Previous Month",
"Same Month Last Year",
"Custom Month",
]}

onChange={setComparisonMode}
open={comparisonModeDropdownOpen}
setOpen={setComparisonModeDropdownOpen}
theme={theme}
placeholder="Choose a comparison"
/>

</div>

{/* Comparison Month */}
<div>
  <label className="mb-2 block text-[10px] font-black uppercase tracking-widest text-[#7b8d81]">
    Comparison month
  </label>

  {comparisonMode === "Custom Month" ? (
    <PulseDropdown
      value={customComparisonMonth}
      options={availableMonths.filter(
        (month) => month !== selectedMonth
      )}
      onChange={setCustomComparisonMonth}
      formatOption={formatMonthLabel}
      open={customMonthDropdownOpen}
      setOpen={setCustomMonthDropdownOpen}
      theme={theme}
      placeholder="Select comparison month"
    />
  ) : (
    <div
      className="flex min-h-[46px] items-center rounded-2xl border border-white/80 bg-[#f7faf7] px-4 py-3 text-sm font-black shadow-sm"
      style={{
        color: theme.deep,
      }}
    >
      {comparisonMode === "No Comparison"
        ? "No comparison selected"
        : comparisonMonthLabel}
    </div>
  )}
</div>
</div>
         {!selectedMonth ? (
           <div className="mt-5 rounded-2xl bg-amber-50 p-4 text-sm font-bold text-amber-800">
             No historical months were
             found in the currently loaded
             data.
           </div>
         ) : (
           <>
             
             <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
  {[
    {
      label: "Total calls",
      value: selectedMetrics.calls,
      decimals: 0,
      suffix: "",
      change: callChange,
      changeSuffix: "%",
    },
    {
      label: "FCR",
      value: selectedMetrics.fcr,
      decimals: 1,
      suffix: "%",
      change: fcrPointChange,
      changeSuffix: " pts",
    },
    {
      label: "Repeat rate",
      value: selectedMetrics.repeatRate,
      decimals: 1,
      suffix: "%",
      change: repeatPointChange,
      changeSuffix: " pts",
    },
    {
      label: "Transfer rate",
      value: selectedMetrics.transferRate,
      decimals: 1,
      suffix: "%",
      change: transferPointChange,
      changeSuffix: " pts",
    },
  ].map((metric, index) => (
    <motion.div
      key={`${selectedMonth}-${comparisonMonth}-${selectedQueue}-${metric.label}`}
      initial={{
        opacity: 0,
        y: 12,
        scale: 0.98,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      transition={{
        duration: 0.4,
        delay: index * 0.06,
      }}
      whileHover={{ y: -4 }}
      className="rounded-3xl border border-white/80 bg-white/55 p-5 shadow-sm"
    >
      <p className="text-[10px] font-black uppercase tracking-widest text-[#7b8d81]">
        {metric.label}
      </p>

      <p
        className="mt-2 text-2xl font-black"
        style={{ color: theme.deep }}
      >
        <CountUp
          key={`${selectedMonth}-${selectedQueue}-${metric.label}-count`}
          start={0}
          end={metric.value}
          duration={1.1}
          decimals={metric.decimals}
          separator=","
          suffix={metric.suffix}
        />
      </p>

      <p
        className={`mt-2 text-xs font-black ${
          metric.change === null
            ? "text-[#7b8d81]"
            : metric.change > 0
              ? "text-emerald-700"
              : metric.change < 0
                ? "text-rose-700"
                : "text-[#7b8d81]"
        }`}
      >
        {formatChange(
          metric.change,
          metric.changeSuffix
        )}

        {comparisonExists
          ? ` vs ${comparisonMonthLabel}`
          : ""}
      </p>
    </motion.div>
  ))}
</div>
 
             <div className="mt-6 grid gap-5 xl:grid-cols-[1.6fr_1fr]">
               <div className="rounded-[24px] border border-white/80 bg-white/45 p-5">


                 <div className="flex flex-wrap items-center justify-between gap-3">
                   <div>
                     <p className="text-[10px] font-black uppercase tracking-widest text-[#7b8d81]">
                       Daily historical
                       comparison
                     </p>
 
                     <h3
                       className="mt-1 text-lg font-black"
                       style={{
                         color:
                           theme.deep,
                       }}
                     >
                       {selectedMonthLabel}
                       {comparisonExists
                         ? ` vs ${comparisonMonthLabel}`
                         : ""}
                     </h3>
                   </div>

                  
                   {!comparisonExists &&
                     comparisonMode !==
                       "No Comparison" && (
                       <span className="rounded-full bg-amber-100 px-3 py-2 text-xs font-black text-amber-800">
                         Comparison month
                         unavailable
                       </span>
                     )}
                 </div>

                 <div className="mt-2 flex flex-wrap items-center gap-5 text-xs font-black text-[#66766d]">
                  <span className="flex items-center gap-2">
                    <span
                      className="h-3.5 w-3.5 rounded-full shadow-sm"
                      style={{
                        background: theme.dark,
                      }}
                      />
                      {selectedMonthLabel} (Current)
                  </span>

                  {comparisonExists && (
                    <span className="flex items-center gap-2">
                      <span
                        className="h-3.5 w-3.5 rounded-full shadow-sm"
                        style={{
                          background: theme.accent,
                        }}
                      />
                        {comparisonMonthLabel} (Comparison)
                    </span>
                  )}
                 </div>

             
                 <div className="mt-4 h-[330px]">
                   <ResponsiveContainer
                     width="100%"
                     height="100%"
                   >
                     <AreaChart
                       key={`${selectedMonth}-${comparisonMonth}-${selectedQueue}`} 
                       data={historicalComparisonChart}
                     >
                       <CartesianGrid
                         vertical={false}
                         strokeOpacity=".1"
                       />
 
                       <XAxis
                         dataKey="day"
                         axisLine={false}
                         tickLine={false}
                         minTickGap={24}
                       />
 
                       <YAxis
                         axisLine={false}
                         tickLine={false}
                         tickFormatter={(
                           value
                         ) =>
                           Number(
                             value
                           ).toLocaleString()
                         }
                       />
 
                       <Tooltip
                         formatter={(
                           value,
                           name
                         ) => [
                           Number(
                             value
                           ).toLocaleString(),
                           name,
                         ]}
                         contentStyle={{
                           borderRadius: 16,
                           border:
                             "1px solid rgba(255,255,255,.9)",
                           background:
                             "rgba(255,255,255,.94)",
                         }}
                       />
 
                       <Area
                         key={`selected-${selectedMonth}-${selectedQueue}`}     
                         type="monotone"
                         dataKey="selected"
                         name={selectedMonthLabel}
                         stroke={theme.dark}
                         strokeWidth={3}
                         fill={`${theme.dark}20`}
                         connectNulls={false}
                         isAnimationActive
                         animationDuration={900}
                         animationEasing="ease-out"
                       />
 
                       {comparisonExists && (
                         <Area
                           key={`comparison-${comparisonMonth}-${selectedQueue}`}
                           type="monotone"
                           dataKey="comparison"
                           name={comparisonMonthLabel}
                           stroke={theme.accent}
                           strokeWidth={3}
                           strokeDasharray="7 6"
                           fill="transparent"
                           connectNulls={false}
                           isAnimationActive
                           animationBegin={150}
                           animationDuration={1100}
                           animationEasing="ease-out"
                         />
                       )}
                     </AreaChart>
                   </ResponsiveContainer>
                 </div>
               </div>
 
               <div className="rounded-[24px] border border-white/80 bg-white/50 p-6">
                 <p className="text-[10px] font-black uppercase tracking-widest text-[#7b8d81]">
                   What changed?
                 </p>
 
                 <h3
                   className="mt-2 text-xl font-black"
                   style={{
                     color: theme.deep,
                   }}
                 >
                   Historical interpretation
                 </h3>
 
                 <div className="mt-5 space-y-4 text-sm leading-6 text-[#66766d]">
                   <p>
                     <strong
                       style={{
                         color:
                           theme.deep,
                       }}
                     >
                       {selectedMonthLabel}
                     </strong>{" "}
                     recorded{" "}
                     <strong>
                       {selectedMetrics.calls.toLocaleString()}
                     </strong>{" "}
                     calls.
                   </p>
 
                   {comparisonExists ? (
                     <>
                       <p>
                         Call volume{" "}
                         {callChange >= 0
                           ? "increased"
                           : "decreased"}{" "}
                         by{" "}
                         <strong>
                           {Math.abs(
                             callChange || 0
                           ).toFixed(
                             1
                           )}
                           %
                         </strong>{" "}
                         compared with{" "}
                         {comparisonMonthLabel}.
                       </p>
 
                       <p>
                         FCR changed by{" "}
                         <strong>
                           {formatChange(
                             fcrPointChange,
                             " points"
                           )}
                         </strong>
                         , while repeat
                         contacts changed
                         by{" "}
                         <strong>
                           {formatChange(
                             repeatPointChange,
                             " points"
                           )}
                         </strong>
                         .
                       </p>
                     </>
                   ) : (
                     <p>
                       A valid comparison
                       month is not
                       available for the
                       selected comparison.
                     </p>
                   )}
 
                   <p>
                     The highest-volume
                     contact type was{" "}
                     <strong
                       style={{
                         color:
                           theme.deep,
                       }}
                     >
                       {
                         selectedMetrics.topCallType
                       }
                     </strong>
                     , representing{" "}
                     <strong>
                       {selectedMetrics.topCallTypeCalls.toLocaleString()}
                     </strong>{" "}
                     calls.
                   </p>
 
                   <p>
                     Average handle time
                     was{" "}
                     <strong>
                       {selectedMetrics.averageHandleTime.toFixed(
                         1
                       )}{" "}
                       minutes
                     </strong>
                     .
                   </p>
                 </div>
 
                 <button
                   type="button"
                   onClick={() =>
                     askEllie(
                       comparisonExists
                         ? `What changed between ${comparisonMonthLabel} and ${selectedMonthLabel} for ${selectedQueue}?`
                         : `Summarize ${selectedMonthLabel} for ${selectedQueue}`
                     )
                   }
                   className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-black text-white"
                   style={{
                     background:
                       theme.dark,
                   }}
                 >
                   <Sparkles
                     size={15}
                   />
                   Ask Ellie what changed
                 </button>
               </div>
             </div>
 
             <div className="mt-6 overflow-x-auto rounded-[24px] border border-white/80 bg-white/50">
               <table className="w-full min-w-[800px] text-left">
                 <thead>
                   <tr className="border-b border-[#728378]/15 text-[10px] font-black uppercase tracking-widest text-[#7b8d81]">
                     <th className="px-5 py-4">
                       Metric
                     </th>
 
                     <th className="px-5 py-4">
                       {
                         selectedMonthLabel
                       }
                     </th>
 
                     <th className="px-5 py-4">
                       {comparisonExists
                         ? comparisonMonthLabel
                         : "Comparison"}
                     </th>
 
                     <th className="px-5 py-4">
                       Change
                     </th>
                   </tr>
                 </thead>
 
                 <tbody className="text-sm">
                   {[
                     {
                       metric:
                         "Total calls",
                       selected:
                         selectedMetrics.calls.toLocaleString(),
                       comparison:
                         comparisonExists
                           ? comparisonMetrics.calls.toLocaleString()
                           : "Unavailable",
                       change:
                         formatChange(
                           callChange,
                           "%"
                         ),
                     },
                     {
                       metric: "FCR",
                       selected:
                         `${selectedMetrics.fcr.toFixed(
                           1
                         )}%`,
                       comparison:
                         comparisonExists
                           ? `${comparisonMetrics.fcr.toFixed(
                               1
                             )}%`
                           : "Unavailable",
                       change:
                         formatChange(
                           fcrPointChange,
                           " pts"
                         ),
                     },
                     {
                       metric:
                         "Repeat rate",
                       selected:
                         `${selectedMetrics.repeatRate.toFixed(
                           1
                         )}%`,
                       comparison:
                         comparisonExists
                           ? `${comparisonMetrics.repeatRate.toFixed(
                               1
                             )}%`
                           : "Unavailable",
                       change:
                         formatChange(
                           repeatPointChange,
                           " pts"
                         ),
                     },
                     {
                       metric:
                         "Transfer rate",
                       selected:
                         `${selectedMetrics.transferRate.toFixed(
                           1
                         )}%`,
                       comparison:
                         comparisonExists
                           ? `${comparisonMetrics.transferRate.toFixed(
                               1
                             )}%`
                           : "Unavailable",
                       change:
                         formatChange(
                           transferPointChange,
                           " pts"
                         ),
                     },
                     {
                       metric:
                         "Average handle time",
                       selected:
                         `${selectedMetrics.averageHandleTime.toFixed(
                           1
                         )} min`,
                       comparison:
                         comparisonExists
                           ? `${comparisonMetrics.averageHandleTime.toFixed(
                               1
                             )} min`
                           : "Unavailable",
                       change:
                         comparisonExists
                           ? formatChange(
                               calculatePercentChange(
                                 selectedMetrics.averageHandleTime,
                                 comparisonMetrics.averageHandleTime
                               ),
                               "%"
                             )
                           : "No comparison",
                     },
                   ].map((row) => (
                     <tr
                       key={row.metric}
                       className="border-b border-[#728378]/10 last:border-0"
                     >
                       <td
                         className="px-5 py-4 font-black"
                         style={{
                           color:
                             theme.deep,
                         }}
                       >
                         {row.metric}
                       </td>
 
                       <td className="px-5 py-4 text-[#66766d]">
                         {row.selected}
                       </td>
 
                       <td className="px-5 py-4 text-[#66766d]">
                         {
                           row.comparison
                         }
                       </td>
 
                       <td className="px-5 py-4 font-black text-[#66766d]">
                         {row.change}
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
           </>
         )}
       </GlassCard>
     </motion.section>
   );
 }


function EllieAIView({ theme, ellieTheme, outfit, setEllieOpen, askEllie, generateExecutiveBrief, briefLoading, }) {
  return (
    <motion.section
      key="ellie"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.3 }}
    >
      <GlassCard className="overflow-hidden p-1" theme={theme}>
        <div
          className="grid gap-8 rounded-[25px] p-7 lg:grid-cols-[240px_1fr]"
          style={{
            background: `linear-gradient(135deg, ${theme.cardTint}, rgba(255,255,255,.75))`,
          }}
        >
          <div
            className="flex items-center justify-center rounded-[25px] border border-white/75 p-5"
            style={{ background: `${theme.light}aa` }}
          >
            <EllieRobot size={190} waving themeName={ellieTheme} outfit={outfit} />
          </div>

          <div className="self-center">
            <span
              className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-black"
              style={{ background: `${theme.dark}12`, color: theme.dark }}
            >
              <Bot size={14} /> Pulse AI assistant
            </span>
            <h2 className="mt-4 text-4xl font-black" style={{ color: theme.deep }}>
              Meet Ellie AI
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-[#67796f]">
              Ellie turns customer-experience data into clear answers. Ask about queue performance,
              repeat-contact patterns, call types, forecasts, operational risks, and recommended
              actions.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {[
                ["Explain metrics", "Break down KPIs and performance changes."],
                ["Forecast demand", "Understand projected queue volume."],
                ["Recommend actions", "Identify practical opportunities for improvement."],
              ].map(([title, text]) => (
                <div key={title} className="rounded-3xl border border-white/80 bg-white/55 p-5">
                  <h4 className="font-black" style={{ color: theme.deep }}>
                    {title}
                  </h4>
                  <p className="mt-2 text-xs leading-5 text-[#718078]">{text}</p>
                </div>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setEllieOpen(true)}
                className="inline-flex items-center gap-2 rounded-2xl px-6 py-3 font-black text-white shadow-lg"
                style={{ background: theme.dark }}
              >
                <Sparkles size={16} /> Open Ellie AI
              </button>
              <button
  type="button"
  onClick={generateExecutiveBrief}
  disabled={briefLoading}
  className="rounded-2xl border border-white bg-white/70 px-6 py-3 text-sm font-black transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
  style={{
    color: theme.dark,
  }}
>
  {briefLoading
    ? "Generating brief..."
    : "Generate Full Summary"}
</button>
            </div>
          </div>
        </div>
      </GlassCard>
    </motion.section>
  );
}

const requiredColumns = [
  "Date",
  "Queue",
  "Calls",
  "RepeatCalls",
  "ResolvedCalls",
  "Transfers",
  "Escalations",
  "AverageHandleTime",
];

function UploadDataButton({ onDataLoaded }) {
   const [uploading, setUploading] = useState(false);
 
   const normalizeHeader = (value) =>
     String(value || "")
       .trim()
       .toLowerCase()
       .replace(/[^a-z0-9]/g, "");
 
   const getValue = (row, possibleNames) => {
     const normalizedRow = Object.entries(row).reduce(
       (result, [key, value]) => {
         result[normalizeHeader(key)] = value;
         return result;
       },
       {}
     );
 
     for (const name of possibleNames) {
       const matchedValue =
         normalizedRow[normalizeHeader(name)];
 
       if (
         matchedValue !== undefined &&
         matchedValue !== null &&
         matchedValue !== ""
       ) {
         return matchedValue;
       }
     }
 
     return undefined;
   };
 
   const normalizeRows = (rows) => {
     return rows
       .map((row) => {
         const date = getValue(row, [
           "Date",
           "Call Date",
           "Contact Date",
           "Interaction Date",
         ]);
 
         const queue = getValue(row, [
           "Queue",
           "Queue Name",
           "Department",
           "Business Area",
         ]);
 
         const callType = getValue(row, [
           "CallType",
           "Call Type",
           "Contact Type",
           "Contact Reason",
           "Reason",
           "Driver",
         ]);
 
         const calls = getValue(row, [
           "Calls",
           "Call Count",
           "Contacts",
           "Contact Count",
           "Volume",
           "Total Calls",
         ]);
 
         const repeatCalls = getValue(row, [
           "RepeatCalls",
           "Repeat Calls",
           "Repeats",
           "Repeat Contacts",
         ]);
 
         const resolvedCalls = getValue(row, [
           "ResolvedCalls",
           "Resolved Calls",
           "Resolved",
           "First Call Resolved",
         ]);
 
         const transfers = getValue(row, [
           "Transfers",
           "Transferred Calls",
           "Transfer Count",
         ]);
 
         const escalations = getValue(row, [
           "Escalations",
           "Escalated Calls",
           "Escalation Count",
         ]);
 
         const averageHandleTime = getValue(row, [
           "AverageHandleTime",
           "Average Handle Time",
           "AHT",
           "Handle Time",
         ]);
 
         return {
           Date:
             date !== undefined
               ? String(date).trim()
               : "",
 
           Queue:
             queue !== undefined && String(queue).trim()
               ? String(queue).trim()
               : "Uncategorized",
 
           CallType:
             callType !== undefined && String(callType).trim()
               ? String(callType).trim()
               : "Unknown",
 
           Calls: Number(calls) || 0,
           RepeatCalls: Number(repeatCalls) || 0,
           ResolvedCalls: Number(resolvedCalls) || 0,
           Transfers: Number(transfers) || 0,
           Escalations: Number(escalations) || 0,
 
           AverageHandleTime:
             Number(averageHandleTime) || 0,
         };
       })
       .filter(
         (row) =>
           row.Date &&
           Number.isFinite(row.Calls) &&
           row.Calls >= 0
       );
   };
 
   const finishLoading = (rows, fileName) => {
     const cleanedData = normalizeRows(rows);
 
     if (cleanedData.length === 0) {
       throw new Error(
         "No valid rows were found. The file needs a Date column and a Calls, Contacts, Volume, or Call Count column."
       );
     }
 
     onDataLoaded(cleanedData);
 
     alert(
       `${cleanedData.length.toLocaleString()} records loaded from ${fileName}.`
     );
   };
 
   const parseDelimitedFile = (file, delimiter) => {
     Papa.parse(file, {
       header: true,
       skipEmptyLines: true,
       dynamicTyping: true,
       delimiter,
       transformHeader: (header) => String(header).trim(),
 
       complete: (results) => {
         try {
           finishLoading(results.data, file.name);
         } catch (error) {
           console.error("File processing error:", error);
 
           alert(
             error instanceof Error
               ? error.message
               : "Pulse could not process this file."
           );
         } finally {
           setUploading(false);
         }
       },
 
       error: (error) => {
         console.error("File reading error:", error);
         alert("Pulse could not read this file.");
         setUploading(false);
       },
     });
   };
 
   const handleFileUpload = async (event) => {
     const input = event.target;
     const file = input.files?.[0];
 
     if (!file) return;
 
     setUploading(true);
 
     try {
       const extension =
         file.name.split(".").pop()?.toLowerCase() || "";
 
       if (extension === "json") {
         const text = await file.text();
         const parsed = JSON.parse(text);
 
         const rows = Array.isArray(parsed)
           ? parsed
           : Array.isArray(parsed.data)
             ? parsed.data
             : Array.isArray(parsed.rows)
               ? parsed.rows
               : [];
 
         finishLoading(rows, file.name);
         setUploading(false);
         input.value = "";
         return;
       }
 
       if (extension === "tsv") {
         parseDelimitedFile(file, "\t");
         input.value = "";
         return;
       }
 
       if (extension === "csv" || extension === "txt") {
         parseDelimitedFile(file, "");
         input.value = "";
         return;
       }
 
       throw new Error(
         "Please select a CSV, TSV, JSON, or delimited TXT file."
       );
     } catch (error) {
       console.error("Local file loading error:", error);
 
       alert(
         error instanceof Error
           ? error.message
           : "Pulse could not process this file."
       );
 
       setUploading(false);
       input.value = "";
     }
   };
 
   return (
     <label
       className={`rounded-2xl px-4 py-3 text-sm font-black text-white ${
         uploading
           ? "cursor-not-allowed bg-emerald-400"
           : "cursor-pointer bg-emerald-600 hover:bg-emerald-700"
       }`}
     >
       {uploading ? "Loading..." : "Load Data"}
 
       <input
         type="file"
         accept=".csv,.tsv,.json,.txt,text/csv,text/tab-separated-values,application/json,text/plain"
         onChange={handleFileUpload}
         disabled={uploading}
         className="hidden"
       />
     </label>
   );
 }

export default function PulseIntelligence() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [ellieOpen, setEllieOpen] = useState(false);
  const [messages, setMessages] = useState(starterMessages);
  const [ellieTheme, setEllieTheme] = useState("Sage");
  const [outfit, setOutfit] = useState("Classic");
  const [viewMode, setViewMode] = useState("Employee");

  const [callData, setCallData] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [dataError, setDataError] = useState("");
  const [historicalComparisonContext, setHistoricalComparisonContext] = useState(null);

  const [executiveBrief, setExecutiveBrief] = useState("");
  const [showExecutiveBrief, setShowExecutiveBrief] = useState(false);
  const [briefLoading, setBriefLoading] = useState(false);


  useEffect(() => {
   let cancelled = false;
 
   const cleanRows = (rows) => {
     return rows
       .filter(
         (row) =>
           row.Date &&
           Number.isFinite(Number(row.Calls)) &&
           Number(row.Calls) >= 0
       )
       .map((row) => ({
         ...row,
 
         Date: String(row.Date).trim(),
 
         Queue: String(
           row.Queue || "Uncategorized"
         ).trim(),
 
         CallType: String(
           row.CallType ||
             row["Call Type"] ||
             "Unknown"
         ).trim(),
 
         Calls: Number(row.Calls) || 0,
         RepeatCalls: Number(row.RepeatCalls) || 0,
         ResolvedCalls: Number(row.ResolvedCalls) || 0,
         Transfers: Number(row.Transfers) || 0,
         Escalations: Number(row.Escalations) || 0,
 
         AverageHandleTime:
           Number(row.AverageHandleTime) || 0,
       }));
   };
 
   setDataLoading(true);
 
   Papa.parse("/data/AcceleratorDatas.csv", {
     download: true,
     header: true,
     skipEmptyLines: true,
     dynamicTyping: true,
     transformHeader: (header) =>
       String(header).trim(),
 
     complete: (results) => {
       if (cancelled) return;
 
       const cleanedData = cleanRows(results.data);
 
       setCallData(cleanedData);
 
       setDataError(
         cleanedData.length > 0
           ? ""
           : "The demonstration file did not contain valid rows."
       );
 
       setDataLoading(false);
     },
 
     error: (error) => {
       if (cancelled) return;
 
       console.error(
         "Demonstration data error:",
         error
       );
 
       setCallData([]);
 
       setDataError(
         "No demonstration data is available. Use Load Data to select a local file."
       );
 
       setDataLoading(false);
     },
   });
 
   return () => {
     cancelled = true;
   };
 }, []);

  const theme = useMemo(
    () => ellieThemes[ellieTheme] || ellieThemes.Sage,
    [ellieTheme]
  );
  
  const calculatedMetrics = useMemo(() => {
    const totalCalls = callData.reduce(
      (sum, row) => sum + (Number(row.Calls) || 0),
      0
    );
  
    const totalRepeats = callData.reduce(
      (sum, row) => sum + (Number(row.RepeatCalls) || 0),
      0
    );
  
    const totalResolved = callData.reduce(
      (sum, row) => sum + (Number(row.ResolvedCalls) || 0),
      0
    );
  
    const totalTransfers = callData.reduce(
      (sum, row) => sum + (Number(row.Transfers) || 0),
      0
    );
  
    const totalEscalations = callData.reduce(
      (sum, row) => sum + (Number(row.Escalations) || 0),
      0
    );
  
    const totalHandleTime = callData.reduce(
      (sum, row) =>
        sum +
        (Number(row.AverageHandleTime) || 0) *
          (Number(row.Calls) || 0),
      0
    );
  
    return {
      totalCalls,
      totalRepeats,
      totalResolved,
      totalTransfers,
      totalEscalations,
  
      fcr:
        totalCalls > 0
          ? (totalResolved / totalCalls) * 100
          : 0,
  
      repeatRate:
        totalCalls > 0
          ? (totalRepeats / totalCalls) * 100
          : 0,
  
      transferRate:
        totalCalls > 0
          ? (totalTransfers / totalCalls) * 100
          : 0,
  
      escalationRate:
        totalCalls > 0
          ? (totalEscalations / totalCalls) * 100
          : 0,
  
      averageHandleTime:
        totalCalls > 0
          ? totalHandleTime / totalCalls
          : 0,
    };
  }, [callData]);
  
  const dynamicMetrics = [
    {
      name: "Queue contacts",
      value: calculatedMetrics.totalCalls.toLocaleString(),
      numericValue: calculatedMetrics.totalCalls,
      detail: `${callData.length} records loaded`,
      icon: PhoneCall,
      explanation: `The uploaded data contains ${calculatedMetrics.totalCalls.toLocaleString()} total calls across ${callData.length} records.`,
    },
    {
      name: "First-call resolution",
      value: `${calculatedMetrics.fcr.toFixed(1)}%`,
      numericValue: calculatedMetrics.fcr,
      decimals: 1,
      suffix:"%",
      detail: "Resolved calls divided by total calls",
      icon: Gauge,
      explanation: `FCR is ${calculatedMetrics.fcr.toFixed(
        1
      )}%, calculated from resolved calls divided by total calls.`,
    },
    {
      name: "Repeat-contact rate",
      value: `${calculatedMetrics.repeatRate.toFixed(1)}%`,
      numericValue: calculatedMetrics.repeatRate,
      decimals: 1,
      suffix: "%",
      detail: "Repeat calls divided by total calls",
      icon: MessageCircle,
      explanation: `The repeat-contact rate is ${calculatedMetrics.repeatRate.toFixed(
        1
      )}%, calculated from repeat calls divided by total calls.`,
    },
    {
      name: "Transfer rate",
      value: `${calculatedMetrics.transferRate.toFixed(1)}%`,
      numericValue: calculatedMetrics.transferRate,
      decimals: 1,
      suffix: "%",
      detail: "Transfers divided by total calls",
      icon: TrendingUp,
      explanation: `The transfer rate is ${calculatedMetrics.transferRate.toFixed(
        1
      )}%, calculated from transfers divided by total calls.`,
    },
  ];

  const dynamicQueueDrivers = useMemo(() => {
    const grouped = {};
  
    callData.forEach((row) => {
      const queue = String(row.Queue || "Unknown").trim();
  
      const callType = String(
        row.CallType || row["Call Type"] || "Unknown"
      ).trim();
  
      const key = `${queue}-${callType}`;
  
      if (!grouped[key]) {
        grouped[key] = {
          queue,
          name: callType,
          calls: 0,
          repeats: 0,
          resolved: 0,
          transfers: 0,
          escalations: 0,
          handleTimeTotal: 0,
        };
      }
  
      const calls = Number(row.Calls) || 0;
      const handleTime = Number(row.AverageHandleTime) || 0;
  
      grouped[key].calls += calls;
      grouped[key].repeats += Number(row.RepeatCalls) || 0;
      grouped[key].resolved += Number(row.ResolvedCalls) || 0;
      grouped[key].transfers += Number(row.Transfers) || 0;
      grouped[key].escalations += Number(row.Escalations) || 0;
      grouped[key].handleTimeTotal += handleTime * calls;
    });
  
    return Object.values(grouped)
      .map((row) => {
        const repeatRate =
          row.calls > 0 ? (row.repeats / row.calls) * 100 : 0;
  
        const fcr =
          row.calls > 0 ? (row.resolved / row.calls) * 100 : 0;
  
        const transferRate =
          row.calls > 0 ? (row.transfers / row.calls) * 100 : 0;
  
        const escalationRate =
          row.calls > 0 ? (row.escalations / row.calls) * 100 : 0;
  
        const averageHandleTime =
          row.calls > 0 ? row.handleTimeTotal / row.calls : 0;
  
        let status = "Stable";
  
        if (repeatRate >= 25) {
          status = "Review";
        } else if (repeatRate >= 18) {
          status = "Monitor";
        }
  
        return {
          ...row,

          contacts: row.calls.toLocaleString(),
          repeat: `${repeatRate.toFixed(1)}%`,
          fcr: `${fcr.toFixed(1)}%`,
          transferRate: `${transferRate.toFixed(1)}%`,
          escalationRate: `${escalationRate.toFixed(1)}%`,
          averageHandleTime: averageHandleTime.toFixed(1),
          
          repeatRateValue: repeatRate,
          fcrValue: fcr,
          transferRateValue: transferRate,
          escalationRateValue: escalationRate,
          averageHandleTimeValue: averageHandleTime,

          status,
        };
      })
      .sort((a, b) => b.calls - a.calls);
  }, [callData]);

  const dynamicInsights = useMemo(() => {
   if (dynamicQueueDrivers.length === 0) {
     return [];
   }
 
   const highestRepeatDriver = [
     ...dynamicQueueDrivers,
   ].sort(
     (first, second) =>
       second.repeatRateValue -
       first.repeatRateValue
   )[0];
 
   const highestTransferDriver = [
     ...dynamicQueueDrivers,
   ].sort(
     (first, second) =>
       second.transferRateValue -
       first.transferRateValue
   )[0];
 
   const highestVolumeDriver =
     dynamicQueueDrivers[0];
 
   return [
     {
       type: "Customer Friction",
       title: `${highestRepeatDriver.name} has the highest repeat-contact rate`,
       text: `${highestRepeatDriver.queue} shows a ${highestRepeatDriver.repeat} repeat-contact rate for ${highestRepeatDriver.name}.`,
       action: "Investigate journey",
       icon: AlertTriangle,
       tone: "amber",
       prompt: `Analyze repeat contacts for ${highestRepeatDriver.name} in ${highestRepeatDriver.queue}`,
     },
     {
       type: "Operational Signal",
       title: `${highestTransferDriver.name} has the highest transfer rate`,
       text: `${highestTransferDriver.transferRate} of contacts for this driver were transferred.`,
       action: "Review routing",
       icon: TrendingUp,
       tone: "blue",
       prompt: `Explain transfers for ${highestTransferDriver.name} in ${highestTransferDriver.queue}`,
     },
     {
       type: "Volume Opportunity",
       title: `${highestVolumeDriver.name} is the largest contact driver`,
       text: `${highestVolumeDriver.contacts} contacts are associated with this customer need.`,
       action: "Explore root cause",
       icon: Lightbulb,
       tone: "green",
       prompt: `Recommend an action for ${highestVolumeDriver.name} in ${highestVolumeDriver.queue}`,
     },
   ];
 }, [dynamicQueueDrivers]);

  const historicalData = useMemo(() => {
    const grouped = {};
  
    callData.forEach((row) => {
      const rawDate = row.Date;
      const parsedDate = new Date(rawDate);
  
      if (!rawDate || Number.isNaN(parsedDate.getTime())) {
        return;
      }
  
      const dateKey = parsedDate.toISOString().split("T")[0];
  
      if (!grouped[dateKey]) {
        grouped[dateKey] = {
          date: dateKey,
          actual: 0,
        };
      }
  
      grouped[dateKey].actual += Number(row.Calls) || 0;
    });
  
    return Object.values(grouped).sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
  }, [callData]);

  const forecastData = useMemo(() => {
    if (historicalData.length === 0) {
      return [];
    }
  
    const recentHistory = historicalData.slice(-90);
    const lookbackDays = Math.min(28, recentHistory.length);
  
    const movingAverageSource =
      recentHistory.slice(-lookbackDays);
  
    const averageDailyCalls =
      movingAverageSource.reduce(
        (sum, row) => sum + row.actual,
        0
      ) / lookbackDays;
  
    const firstValue =
      movingAverageSource[0]?.actual || averageDailyCalls;
  
    const lastValue =
      movingAverageSource[movingAverageSource.length - 1]
        ?.actual || averageDailyCalls;
  
    const dailyTrend =
      lookbackDays > 1
        ? (lastValue - firstValue) / (lookbackDays - 1)
        : 0;
  
    const combined = recentHistory.map((row) => ({
      ...row,
      projected: null,
    }));
  
    const lastHistoricalDate = new Date(
      recentHistory[recentHistory.length - 1].date
    );
  
    combined[combined.length - 1].projected =
      combined[combined.length - 1].actual;
  
    for (let day = 1; day <= 30; day += 1) {
      const forecastDate = new Date(lastHistoricalDate);
      forecastDate.setDate(
        lastHistoricalDate.getDate() + day
      );
  
      const weekday = forecastDate.getDay();
  
      let weekdayFactor = 1;
  
      if (weekday === 0) {
        weekdayFactor = 0.42;
      } else if (weekday === 6) {
        weekdayFactor = 0.55;
      } else if (weekday === 1) {
        weekdayFactor = 1.12;
      } else if (weekday === 5) {
        weekdayFactor = 1.08;
      }
  
      const projectedValue = Math.max(
        0,
        Math.round(
          (averageDailyCalls + dailyTrend * day) *
            weekdayFactor
        )
      );
  
      combined.push({
        date: forecastDate.toISOString().split("T")[0],
        actual: null,
        projected: projectedValue,
      });
    }
  
    return combined;
  }, [historicalData]);

  const tabs = [
    { name: "Overview", icon: Home },
    { name: "Queue Analytics", icon: BarChart3 },
    { name: "Forecasting", icon: TrendingUp },
    { name: "Ellie AI", icon: WandSparkles },
  ];

  const switchTab = (tab) => {
    setActiveTab(tab.name);
    if (tab.name !== "Ellie AI") setEllieOpen(false);
  };

  const lastEllieResponseRef = useRef("");

   const chooseResponse = (responses) => {
   const validResponses =
    responses.filter(Boolean);

  if (validResponses.length === 0) {
    return "I could not generate an explanation for that question.";
  }

  const differentResponses =
    validResponses.filter(
      (response) =>
        response !==
        lastEllieResponseRef.current
    );

  const responsePool =
    differentResponses.length > 0
      ? differentResponses
      : validResponses;

  const selectedResponse =
    responsePool[
      Math.floor(
        Math.random() *
          responsePool.length
      )
    ];

  lastEllieResponseRef.current =
    selectedResponse;

  return selectedResponse;
};

const analyticsContext = useMemo(
  () => ({
    totalRecords: callData.length,

    overallMetrics: {
      totalCalls:
        calculatedMetrics.totalCalls,
      fcr:
        calculatedMetrics.fcr,
      repeatRate:
        calculatedMetrics.repeatRate,
      transferRate:
        calculatedMetrics.transferRate,
      escalationRate:
        calculatedMetrics.escalationRate,
      averageHandleTime:
        calculatedMetrics.averageHandleTime,
    },

    historicalComparison:
      historicalComparisonContext,

    topDrivers:
      dynamicQueueDrivers
        .slice(0, 5)
        .map((driver) => ({
          queue: driver.queue,
          callType: driver.name,
          calls: driver.calls,
          fcr: driver.fcrValue,
          repeatRate:
            driver.repeatRateValue,
          transferRate:
            driver.transferRateValue,
          averageHandleTime:
            driver.averageHandleTimeValue,
          status: driver.status,
        })),
  }),
  [
    callData.length,
    calculatedMetrics,
    historicalComparisonContext,
    dynamicQueueDrivers,
  ]
);

const generateEllieAnswer =
  async (prompt) => {

    const response = await fetch(
      "/.netlify/functions/ellie-ai",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          question: prompt,
          context: analyticsContext,
        }),
      }
    );
    
    const result =
      await response.json();
    
    if (!response.ok) {
      throw new Error(
        result.message ||
          "Ellie could not generate a response."
      );
    }
    
    return result.answer;
    };

  const generateExecutiveBrief = async () => {
  if (!historicalComparisonContext) {
    return;
  }

  setBriefLoading(true);

  try {
    const answer =
      await generateEllieAnswer(`
      Generate a detailed, full-page executive brief using the historicalComparison data in the supplied Pulse analytics context.
      
      Write for customer-service leadership.
      
      Include these sections:
      1. Executive Overview
      2. Reporting Period and Queue
      3. Contact Volume Analysis
      4. First-Call Resolution Performance
      5. Repeat-Contact and Transfer Trends
      6. Highest-Volume Contact Driver
      7. Operational Risks
      8. Forecast Outlook, only if supported by the supplied context
      9. Recommend Actions
      
      Use complete paragraphs and specific supplied metrics. 
        Clearly label recommendations as recommendations.
      Do not invent causes, dates, comparisons, financial impact, 
        or operational facts that are not in the context.`);

    setExecutiveBrief(answer);
    setShowExecutiveBrief(true);

    }  catch (error) {
    console.error(
      "Executive brief error:",
      error
  );
    } finally {
    setBriefLoading(false);
  }
};

const askEllie = async (prompt) => {
  const text = String(prompt || "").trim();

  if (!text) return;

  setEllieOpen(true);

  setMessages((current) => [
    ...current,
    {
      role: "user",
      text,
      createdAt: new Date().toISOString(),
    },
  ]);

  try {
    const answer =
      await generateEllieAnswer(text);

    setMessages((current) => [
      ...current,
      {
        role: "ellie",
        text: answer,
        createdAt: new Date().toISOString(),
      },
    ]);
  } catch (error) {
    console.error(
      "Ellie response error:",
      error
    );

    setMessages((current) => [
      ...current,
      {
        role: "ellie",
        text:
          "I could not generate a response right now.",
        createdAt:
          new Date().toISOString(),
      },
    ]);
  }
};

  const explainMetric = (metric) => {
    if (!metric) return;

    askEllie(
      metric.explanation ||
        `Explain ${metric.name}`
    );
  };

  const renderActiveView = () => {
    switch (activeTab) {
      case "Queue Analytics":
        return <QueueAnalyticsView theme={theme} askEllie={askEllie} queueDrivers={dynamicQueueDrivers} />;
      case "Forecasting":
        return <ForecastingView theme={theme} askEllie={askEllie} forecastData={forecastData} callData={callData} setHistoricalComparisonContext={setHistoricalComparisonContext}/>;
      case "Ellie AI":
        return (
          <EllieAIView
            theme={theme}
            ellieTheme={ellieTheme}
            outfit={outfit}
            setEllieOpen={setEllieOpen}
            askEllie={askEllie}
            generateExecutiveBrief={generateExecutiveBrief}
            briefLoading={briefLoading}
          />
        );
      default:
        return (
          <OverviewView
            theme={theme}
            ellieTheme={ellieTheme}
            outfit={outfit}
            viewMode={viewMode}
            askEllie={askEllie}
            explainMetric={explainMetric}
            metrics={dynamicMetrics}
            dynamicInsights={dynamicInsights}
          />
        );
    }
  };

  return (
    <div
      className="min-h-screen overflow-x-hidden pb-28 text-[#244a35] transition-colors duration-500"
      style={{ background: theme.page }}
    >
      <div className="pointer-events-none fixed inset-0">
        <div
          className="absolute -left-24 -top-24 h-96 w-96 rounded-full blur-[110px]"
          style={{ background: `${theme.pageGlow}55` }}
        />
        <div
          className="absolute right-[-100px] top-[15%] h-[430px] w-[430px] rounded-full blur-[120px]"
          style={{ background: `${theme.accent}45` }}
        />
      </div>

      <main className="relative mx-auto max-w-[1500px] px-4 py-5 sm:px-8">
        <header className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
    
          <div className="flex items-center gap-3">
            <div
              className="grid h-12 w-12 place-items-center rounded-[18px] text-white shadow-xl"
              style={{ background: theme.dark }}
            >
              <Activity />
            </div>
            <div>
              <h1 className="text-2xl font-black" style={{ color: theme.deep }}>
                Pulse Intelligence
              </h1>
              <p className="text-xs text-[#718178]">Customer experience command center</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex rounded-2xl border border-white/80 bg-white/60 p-1 shadow-sm backdrop-blur-xl">
              {["Employee", "Executive"].map((mode) => (
                <button
                  type="button"
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-black transition ${
                    viewMode === mode ? "text-white shadow" : "text-[#61756a]"
                  }`}
                  style={viewMode === mode ? { background: theme.dark } : {}}
                >
                  {mode === "Employee" ? (
                    <UserRound size={14} />
                  ) : (
                    <BriefcaseBusiness size={14} />
                  )}
                  {mode}
                </button>
              ))}
            </div>
            
            <UploadDataButton
  onDataLoaded={(rows) => {
    setCallData(rows);
    setDataLoading(false);
    setDataError("");
  }}
/>
              <button
                type="button"
                onClick={() => setEllieOpen(true)}
                className="flex items-center gap-2 rounded-2xl border border-white/80 bg-white/60 px-4 py-3 text-sm font-black shadow-sm backdrop-blur-xl"
                style={{ color: theme.deep }}
            >
              <Bot size={17} /> Meet Ellie <ArrowUpRight size={15} />
            </button>
          </div>
        </header>

        <div className="sticky top-3 z-40 mb-6">
          <GlassCard className="p-2 shadow-xl" theme={theme}>
            <nav className="grid grid-cols-2 gap-2 md:grid-cols-4">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.name;

                return (
                  <button
                    type="button"
                    key={tab.name}
                    onClick={() => switchTab(tab)}
                    className={`relative flex items-center justify-center gap-2 rounded-[18px] px-4 py-3 text-sm font-bold transition ${
                      isActive ? "text-white" : "text-[#61756a] hover:bg-white/45"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="active-tab"
                        className="absolute inset-0 rounded-[18px]"
                        style={{ background: theme.dark }}
                      />
                    )}
                    <Icon className="relative" size={16} />
                    <span className="relative">{tab.name}</span>
                  </button>
                );
              })}
            </nav>
          </GlassCard>
        </div>

        <AnimatePresence mode="wait">{renderActiveView()}</AnimatePresence>
        
        <div className="mt-6 rounded-2xl bg-white p-4">
          <p>Loading: {dataLoading ? "Yes" : "No"}</p>
          <p>Rows Loaded: {callData.length}</p>
          <p>Status: {dataError || "Data ready"}</p>

          <pre>
            {callData.length > 0
               ? JSON.stringify(callData[0], null, 2)
               : "No data loaded"}
          </pre>
        </div>

        <footer className="py-7 text-center text-xs text-[#74857b]">
          Pulse Accelerator Prototype · Synthetic demonstration data · Last 30 days
        </footer>
      </main>

      <FloatingEllie
        open={ellieOpen}
        setOpen={setEllieOpen}
        messages={messages}
        setMessages={setMessages}
        ellieTheme={ellieTheme}
        setEllieTheme={setEllieTheme}
        outfit={outfit}
        setOutfit={setOutfit}
        generateEllieAnswer={generateEllieAnswer}
      />
    </div>
  );
}
