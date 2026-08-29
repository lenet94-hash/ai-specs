import { useState } from "react";
import Hero from "@/components/sections/Hero";
import Problem from "@/components/sections/Problem";
import Features from "@/components/sections/Features";
import HowItWorks from "@/components/sections/HowItWorks";
import Faq from "@/components/sections/Faq";
import Cta from "@/components/sections/Cta";
import ConnectFigma from "@/pages/ConnectFigma";
import NodeInput from "@/pages/NodeInput";
import SpecView from "@/pages/SpecView";
import type { SpecData } from "@/lib/figma";

type Route = "landing" | "connect" | "node-input" | "spec";

function getInitialRoute(): Route {
  const path = window.location.pathname;
  if (path === "/connect-figma") return "connect";
  if (path === "/generate") return "node-input";
  return "landing";
}

function push(path: string) {
  try {
    history.pushState(null, "", path);
  } catch {}
}

export default function App() {
  const [route, setRoute] = useState<Route>(getInitialRoute);
  const [token, setToken] = useState("");
  const [spec, setSpec] = useState<SpecData | null>(null);

  function goConnect() {
    push("/connect-figma");
    setRoute("connect");
  }

  function goNodeInput() {
    push("/generate");
    setRoute("node-input");
  }

  function goSpec(s: SpecData) {
    setSpec(s);
    setRoute("spec");
  }

  if (route === "connect" || (route === "node-input" && !token)) {
    return (
      <ConnectFigma
        onConnect={(t) => {
          setToken(t);
          goNodeInput();
        }}
      />
    );
  }

  if (route === "node-input") {
    return (
      <NodeInput
        token={token}
        onSpec={goSpec}
        onReconnect={() => {
          setToken("");
          goConnect();
        }}
      />
    );
  }

  if (route === "spec" && spec) {
    return <SpecView spec={spec} onBack={goNodeInput} />;
  }

  // Landing
  return (
    <div className="flex flex-col items-start w-full">
      <Hero />
      <Problem />
      <Features />
      <HowItWorks />
      <Faq />
      <Cta />
    </div>
  );
}
