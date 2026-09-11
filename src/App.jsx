
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
  ChevronRight,
  Gauge,
  Home,
  Lightbulb,
  MessageCircle,
  PhoneCall,
  Send,
  Sparkles,
  TrendingUp,
  Upload,
  UserRound,
  WandSparkles,
  X,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
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


const proactiveInsights = [
  {
    type: "Signal",
    title: "Repeat contacts are rising faster than volume",
    text: "Repeat contacts increased 8.2%, while overall Credit volume increased 4.1%.",
    action: "Review drivers",
    icon: AlertTriangle,
    tone: "amber",
    prompt: "Why are repeat contacts rising?",
  },
  {
    type: "Forecast",
    title: "Credit volume may reach 3,625 contacts",
    text: "The prototype projects an 11.9% increase between August and November.",
    action: "Explain forecast",
    icon: TrendingUp,
    tone: "green",
    prompt: "Explain the Credit volume forecast",
  },
  {
    type: "Opportunity",
    title: "A 3-point FCR lift could reduce repeat demand",
    text: "Approximately 140 monthly contacts may be avoidable based on current demo assumptions.",
    action: "See recommendation",
    icon: Lightbulb,
    tone: "blue",
    prompt: "What action should we take to improve FCR?",
  },
];

const starterMessages = [
  {
    role: "ellie",
    text: "Hi Dasia! I’m Ellie. I can explain queue trends, repeat-contact drivers, forecasts, and recommended actions.",
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

  const answerQuestion = (text) => {
    const lower = text.toLowerCase();

    if (
      lower.includes("joke") ||
      lower.includes("funny") ||
      lower.includes("laugh")
    ) {
      return getNextJoke();
    }

    if (lower.includes("executive")) {
      return "Executive summary: repeat contacts are growing faster than total volume. Payment arrangements are the leading visible driver. Review that journey first, then validate Friday staffing and contact-cost assumptions.";
    }
    if (lower.includes("action") || lower.includes("recommend")) {
      return "Start with payment-arrangement contacts. Review transfers, unresolved outcomes, and repeat behavior, then test clearer agent guidance or proactive follow-up during the Friday midday peak.";
    }
    if (lower.includes("why") || lower.includes("driver") || lower.includes("repeat")) {
      return "Payment arrangements are the largest visible Credit driver, with 1,260 demo contacts. Repeat demand is also concentrated around Friday midday.";
    }
    if (lower.includes("forecast")) {
      return "The demo forecast increases from 3,240 contacts in August to 3,625 in November, an increase of approximately 11.9%.";
    }
    if (lower.includes("fcr")) {
      return "FCR is 78.2%. A 3-point lift may avoid about 140 contacts per month under the demo assumptions.";
    }
    return "Credit currently shows 3,240 contacts, 78.2% FCR, and a 24.4% repeat-contact rate in this prototype.";
  };

  const ask = (prompt) => {
    const text = (prompt || question).trim();
    if (!text) return;

    setMood("thinking");
    setMessages((current) => [
      ...current,
      { role: "user", text },
      { role: "ellie", text: answerQuestion(text) },
    ]);
    setQuestion("");
    window.setTimeout(() => setMood("happy"), 800);
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
                    className={`max-w-[78%] rounded-[20px] px-4 py-3 text-sm leading-6 shadow-sm ${
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

function OverviewView({ theme, ellieTheme, outfit, viewMode, askEllie, explainMetric, metrics }) {
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
            <CheckCircle2 size={14} /> 3 insights detected
          </span>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {proactiveInsights.map((insight) => (
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

function ForecastingView({ theme, askEllie, forecastData, historicalData }) {
  return (
    <motion.section
      key="forecasting"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.3 }}
    >
      <GlassCard className="p-6" theme={theme}>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-[#7b8d81]">
              Contact outlook
            </p>
            <h2 className="mt-1 text-2xl font-black" style={{ color: theme.deep }}>
              Actual and projected Credit volume
            </h2>
            <p className="mt-2 text-sm text-[#718078]">
              August is the transition point between actual and projected volume.
            </p>
          </div>
          <button
            type="button"
            onClick={() => askEllie("Explain the Credit volume forecast")}
            className="flex items-center gap-2 rounded-full px-3 py-2 text-xs font-bold"
            style={{ background: `${theme.dark}16`, color: theme.dark }}
          >
            <Sparkles size={13} /> Ask Ellie to explain
          </button>
        </div>

        <div className="mt-4 h-[360px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={forecastData}>
              <defs>
                <linearGradient id="actualFill" x1="0" y1="0" x2="0" y2="1">
                  <stop stopColor={theme.dark} stopOpacity=".34" />
                  <stop offset="1" stopColor={theme.dark} stopOpacity=".02" />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} strokeOpacity=".1" />
              <XAxis dataKey="date" axisLine={false} tickLine={false} minTickGap={35} tickFormatter={(value) =>
                new Date(`${value}T00:00:00`).toLocaleDateString(
                  "en-US",
                  {
                    month: "short",
                    day: "numeric",
                  }
                )
              } />

              <YAxis axisLine={false} tickLine={false} domain={["auto", "auto"]} tickFormatter={(value) =>
                Number(value).toLocaleString()
              }
              />

              <Tooltip
                contentStyle={{
                  borderRadius: 16,
                  border: "1px solid rgba(255,255,255,.9)",
                  background: "rgba(255,255,255,.94)",
                }}
              />
              <Area
                type="monotone"
                dataKey="actual"
                stroke={theme.dark}
                strokeWidth={3}
                fill="url(#actualFill)"
                connectNulls={false}
              />
              <Area
                type="monotone"
                dataKey="projected"
                stroke={theme.accent}
                strokeWidth={3}
                strokeDasharray="7 6"
                fill="transparent"
                connectNulls={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {[
            ["Projected growth", "+11.9%"],
            ["November volume", "3,625"],
            ["Model status", "Prototype"],
          ].map(([label, value]) => (
            <div key={label} className="rounded-2xl border border-white/80 bg-white/45 p-4">
              <p className="text-[10px] font-black uppercase tracking-widest text-[#7b8d81]">
                {label}
              </p>
              <p className="mt-2 text-xl font-black" style={{ color: theme.deep }}>
                {value}
              </p>
            </div>
          ))}
        </div>
      </GlassCard>
    </motion.section>
  );
}

function EllieAIView({ theme, ellieTheme, outfit, setEllieOpen, askEllie }) {
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
                onClick={() => askEllie("Give me the executive summary and recommended action")}
                className="rounded-2xl border border-white bg-white/70 px-6 py-3 text-sm font-black"
                style={{ color: theme.dark }}
              >
                Generate summary
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

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setUploading(true);

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      transformHeader: (header) => header.trim(),

      complete: async (results) => {
        try {
          const cleanedData = results.data
            .filter(
              (row) =>
                row.Date &&
                row.Queue &&
                Number.isFinite(Number(row.Calls)) &&
                Number(row.Calls) >= 0
            )
            .map((row) => ({
              ...row,
              Date: String(row.Date).trim(),
              Queue: String(row.Queue).trim(),
              CallType: String(
                row.CallType || row["Call Type"] || "Unknown"
              ).trim(),
              Calls: Number(row.Calls) || 0,
              RepeatCalls: Number(row.RepeatCalls) || 0,
              ResolvedCalls: Number(row.ResolvedCalls) || 0,
              Transfers: Number(row.Transfers) || 0,
              Escalations: Number(row.Escalations) || 0,
              AverageHandleTime:
                Number(row.AverageHandleTime) || 0,
            }));

          if (cleanedData.length === 0) {
            throw new Error(
              "No valid rows were found in the CSV."
            );
          }

          const uploadUrl =
            "/.netlify/functions/upload-pulse-data";
          
          console.log("Calling upload endpoint:", uploadUrl);

          const response = await fetch(
            uploadUrl,
            {
              method: "POST",
              cache: "no-store",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
              body: JSON.stringify({
                data: cleanedData,
              }),
            }
          );

          const responseText = await response.text();

          let result = {};

          try {
            result = responseText
              ? JSON.parse(responseText)
              : {};
          } catch {
            throw new Error(
              `Upload returned invalid JSON. Status ${response.status}.`
            );
          }

          if (!response.ok) {
            throw new Error(
              result.details ||
                result.message ||
                `Upload failed with status ${response.status}.`
            );
          }

          onDataLoaded(cleanedData);

          alert(
            `Successfully uploaded ${cleanedData.length.toLocaleString()} records.`
          );
        } catch (error) {
          console.error("Upload error:", error);

          alert(
            `Upload failed:\n\n${
              error instanceof Error
                ? error.message
                : "Unknown error"
            }`
          );
        } finally {
          setUploading(false);
          event.target.value = "";
        }
      },

      error: (error) => {
        console.error("CSV error:", error);
        alert("Unable to read the CSV.");
        setUploading(false);
        event.target.value = "";
      },
    });
  };

  return (
    <label
      className={`rounded-2xl px-4 py-3 text-sm font-black text-white ${
        uploading
          ? "cursor-not-allowed bg-emerald-400"
          : "cursor-pointer bg-emerald-600 hover:bg-emerald-700"
      }`}
    >
      {uploading ? "Uploading..." : "Upload Data"}

      <input
        type="file"
        accept=".csv,text/csv"
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

  useEffect(() => {
    let cancelled = false;
    let initialLoad = true;
  
    const cleanRows = (rows) => {
      return rows
        .filter(
          (row) =>
            row.Date &&
            row.Queue &&
            Number.isFinite(Number(row.Calls)) &&
            Number(row.Calls) >= 0
        )
        .map((row) => ({
          ...row,
          Date: String(row.Date).trim(),
          Queue: String(row.Queue).trim(),
          CallType: String(
            row.CallType || row["Call Type"] || "Unknown"
          ).trim(),
          Calls: Number(row.Calls) || 0,
          RepeatCalls: Number(row.RepeatCalls) || 0,
          ResolvedCalls: Number(row.ResolvedCalls) || 0,
          Transfers: Number(row.Transfers) || 0,
          Escalations: Number(row.Escalations) || 0,
          AverageHandleTime: Number(row.AverageHandleTime) || 0,
        }));
    };
  
    const loadFallbackData = () => {
      return new Promise((resolve, reject) => {
        Papa.parse("/data/AcceleratorDatas.csv", {
          download: true,
          header: true,
          skipEmptyLines: true,
          dynamicTyping: true,
          transformHeader: (header) => header.trim(),
  
          complete: (results) => {
            resolve(cleanRows(results.data));
          },
  
          error: reject,
        });
      });
    };
  
    const loadSharedData = async () => {
      if (initialLoad && !cancelled) {
        setDataLoading(true);
      }
  
      try {
        const response = await fetch(
        `/.netlify/functions/get-pulse-data?t=${Date.now()}`,
          {
            method: "GET",
            cache: "no-store",
            headers: {
              Accept: "application/json",
            },
          }
        );
  
        const responseText = await response.text();
  
        let result;
  
        try {
          result = responseText
            ? JSON.parse(responseText)
            : {};
        } catch {
          throw new Error(
            "The Netlify function returned HTML instead of JSON."
          );
        }
  
        if (!response.ok) {
          throw new Error(
            result.message ||
              `The shared data request failed with status ${response.status}.`
          );
        }
  
        if (cancelled) return;
  
        if (
          result.found === true &&
          Array.isArray(result.data)
        ) {
          setCallData(cleanRows(result.data));
          setDataError("");
        } else if (initialLoad) {
          const fallbackData = await loadFallbackData();
  
          if (cancelled) return;
  
          setCallData(fallbackData);
          setDataError("");
        }
      } catch (error) {
        if (cancelled) return;
  
        console.error("Shared data loading error:", error);
  
        if (initialLoad) {
          try {
            const fallbackData = await loadFallbackData();
  
            if (cancelled) return;
  
            setCallData(fallbackData);
  
            setDataError(
              "The shared data API is unavailable. Displaying demonstration data."
            );
          } catch (fallbackError) {
            console.error(
              "Fallback CSV loading error:",
              fallbackError
            );
  
            setCallData([]);
  
            setDataError(
              "The shared data and demonstration data could not be loaded."
            );
          }
        } else {
          setDataError(
            "Unable to check for new shared data. Displaying the last successfully loaded dataset."
          );
        }
      } finally {
        if (!cancelled) {
          initialLoad = false;
          setDataLoading(false);
        }
      }
    };
  
    loadSharedData();
  
    const refreshTimer = window.setInterval(
      loadSharedData,
      10000
    );
  
    const handleWindowFocus = () => {
      loadSharedData();
    };
  
    window.addEventListener("focus", handleWindowFocus);
  
    return () => {
      cancelled = true;
  
      window.clearInterval(refreshTimer);
  
      window.removeEventListener(
        "focus",
        handleWindowFocus
      );
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
          status,
        };
      })
      .sort((a, b) => b.calls - a.calls);
  }, [callData]);

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

  const askEllie = (prompt) => {
    const lower = prompt.toLowerCase();
  
    const topDriver = dynamicQueueDrivers[0];
  
    let answer = `The uploaded dataset contains ${calculatedMetrics.totalCalls.toLocaleString()} calls across ${callData.length.toLocaleString()} records.`;
  
    if (lower.includes("forecast")) {
      answer =
        "Forecasting is now being built from the uploaded dataset. Historical volume has been loaded successfully.";
    }
  
    else if (lower.includes("fcr")) {
      answer =
        `Current FCR is ${calculatedMetrics.fcr.toFixed(1)}%, based on ${
          calculatedMetrics.totalResolved.toLocaleString()
        } resolved calls out of ${
          calculatedMetrics.totalCalls.toLocaleString()
        } total calls.`;
    }
  
    else if (lower.includes("repeat") || lower.includes("driver")) {
      answer = topDriver
        ? `${topDriver.name} is currently the largest call driver with ${topDriver.contacts} contacts and a ${topDriver.repeat} repeat-contact rate.`
        : "No queue driver information is currently available.";
    }
  
    else if (lower.includes("transfer")) {
      answer =
        `Current transfer rate is ${calculatedMetrics.transferRate.toFixed(1)}%.`;
    }
  
    else if (lower.includes("executive")) {
      answer =
        `Executive Summary:
  
  Total Calls: ${calculatedMetrics.totalCalls.toLocaleString()}
  FCR: ${calculatedMetrics.fcr.toFixed(1)}%
  Repeat Rate: ${calculatedMetrics.repeatRate.toFixed(1)}%
  Transfer Rate: ${calculatedMetrics.transferRate.toFixed(1)}%
  
  ${
    topDriver
      ? `Top Call Driver: ${topDriver.name} (${topDriver.contacts} contacts)`
      : ""
  }
  
  Recommendation:
  Focus improvement efforts on the highest-volume repeat-contact driver first.`;
    }
  
    setMessages((current) => [
      ...current,
      { role: "user", text: prompt },
      { role: "ellie", text: answer },
    ]);
  
    setEllieOpen(true);
  };

  const explainMetric = (metric) => {
    setMessages((current) => [
      ...current,
      { role: "user", text: `Explain ${metric.name}` },
      { role: "ellie", text: metric.explanation },
    ]);
    setEllieOpen(true);
  };

  const renderActiveView = () => {
    switch (activeTab) {
      case "Queue Analytics":
        return <QueueAnalyticsView theme={theme} askEllie={askEllie} queueDrivers={dynamicQueueDrivers} />;
      case "Forecasting":
        return <ForecastingView theme={theme} askEllie={askEllie} forecastData={forecastData} historicalData={historicalData}/>;
      case "Ellie AI":
        return (
          <EllieAIView
            theme={theme}
            ellieTheme={ellieTheme}
            outfit={outfit}
            setEllieOpen={setEllieOpen}
            askEllie={askEllie}
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
            
            <UploadDataButton onDataLoaded={setCallData} />

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
          <p>Error: {dataError || "None"}</p>

          <pre>
            {JSON.stringify(callData[0], null, 2)}
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
      />
    </div>
  );
}
