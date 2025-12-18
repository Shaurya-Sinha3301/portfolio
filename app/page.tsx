"use client";

import type React from "react";

import { useEffect, useMemo, useState } from "react";
import { useUIStore, type AppKey } from "@/lib/ui-store";
import Eyes from "./components/Eyes";
import Dock from "./components/Dock";
import DesktopWindow from "./components/Window";
import CommandPalette from "./components/CommandPalette";

type WindowSpec = {
  key: Exclude<AppKey, "palette" | null>;
  title: string;
  content: React.ReactNode;
};


function AboutContent() {
  return (
    <div className="p-5 md:p-6">
      <h1 className="font-black leading-none" style={{ fontSize: 52 }}>
        Hello, I&apos;m Shaurya Sinha.
      </h1>
      <p className="mt-4 text-lg">
        Full Stack Developer | TypeScript Enthusiast | Building scalable web applications with modern technologies
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        {[
          "TypeScript",
          "Python",
          "React",
          "Next.js",
          "Node.js",
          "Blockchain",
          "Web3",
        ].map((chip) => (
          <span
            key={chip}
            className="text-sm font-semibold px-3 py-1 rounded-md border-[3px] border-black"
            style={{ backgroundColor: "#FF2E63", color: "#000" }}
          >
            {chip}
          </span>
        ))}
      </div>
    </div>
  );
}

function ProjectsContent() {
  const projects = [
    {
      title: "OceanEYE-Taxa",
      description: "Marine species identification and taxonomy system using advanced computer vision",
      tech: ["TypeScript", "Machine Learning", "Computer Vision"],
      status: "Active",
      githubUrl: "https://github.com/Shaurya-Sinha3301/OceanEYE-Taxa",
    },
    {
      title: "Taxaformer-Final",
      description: "Advanced transformer-based model for taxonomic classification",
      tech: ["TypeScript", "Deep Learning", "Transformers"],
      status: "Completed",
      githubUrl: "https://github.com/Shaurya-Sinha3301/Taxaformer-Final",
    },
    {
      title: "SecureChain",
      description: "Blockchain-based secure data management system with MIT license",
      tech: ["Python", "Blockchain", "Cryptography"],
      status: "Active",
      githubUrl: "https://github.com/Shaurya-Sinha3301/SecureChain",
    },
    {
      title: "Taxaformer",
      description: "Initial implementation of taxonomic transformer architecture",
      tech: ["TypeScript", "Machine Learning", "Neural Networks"],
      status: "Completed",
      githubUrl: "https://github.com/Shaurya-Sinha3301/Taxaformer",
    },
  ];

  return (
    <div className="p-4 md:p-5">
      <div className="grid gap-4 md:grid-cols-2">
        {projects.map((project, i) => (
          <a
            key={i}
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 border-[3px] border-black bg-white shadow-[6px_6px_0_0_#000] hover:shadow-[8px_8px_0_0_#000] hover:translate-y-[-2px] transition-all duration-200 cursor-pointer group"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-black group-hover:text-blue-600 transition-colors">
                {project.title}
              </h3>
              <span
                className={`text-xs px-2 py-1 rounded border-2 border-black font-semibold ${
                  project.status === "Active"
                    ? "bg-green-200"
                    : project.status === "In Progress"
                    ? "bg-yellow-200"
                    : project.status === "Planning"
                    ? "bg-blue-200"
                    : "bg-gray-200"
                }`}
              >
                {project.status}
              </span>
            </div>
            <p className="text-sm mb-3">{project.description}</p>
            <div className="flex flex-wrap gap-1">
              {project.tech.map((tech, j) => (
                <span
                  key={j}
                  className="text-xs px-2 py-1 bg-gray-100 border border-black rounded font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="mt-3 text-xs text-gray-600 group-hover:text-blue-600 transition-colors">
              View on GitHub →
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

function PhilosophyContent() {
  const thoughts = [
    "Code with purpose, build with passion.",
    "Innovation happens at the intersection of curiosity and persistence.",
    "Clean code is not just about syntax, it's about clarity of thought.",
    "The best solutions are simple, elegant, and scalable.",
  ];
  return (
    <div className="p-5 grid gap-4 md:grid-cols-2">
      {thoughts.map((t, i) => (
        <div
          key={i}
          className="p-4 border-[3px] border-black bg-white shadow-[6px_6px_0_0_#000] text-lg font-semibold"
        >
          {t}
        </div>
      ))}
    </div>
  );
}

function ResumeContent() {
  const cards = [
    {
      title: "Work",
      body: "Full Stack Developer | Building innovative solutions with modern tech stacks",
    },
    {
      title: "Tech",
      body: "TypeScript, Python, React, Next.js, Node.js, Blockchain, Web3",
    },
    {
      title: "Focus",
      body: "Machine Learning, Computer Vision, Blockchain Technology, and Scalable Web Applications",
    },
    { title: "Education", body: "Computer Science & Engineering" },
  ];
  return (
    <div className="p-5 grid gap-4 md:grid-cols-2">
      {cards.map((c, i) => (
        <div
          key={i}
          className="p-4 border-[3px] border-black bg-white shadow-[6px_6px_0_0_#000]"
        >
          <div className="text-xl font-black">{c.title}</div>
          <div className="mt-2">{c.body}</div>
        </div>
      ))}
    </div>
  );
}

export default function Page() {

  const [openApps, setOpenApps] = useState<Exclude<AppKey, "palette" | null>[]>(
    ["about"]
  );
  const [paletteOpen, setPaletteOpen] = useState(false);
  const setActiveApp = useUIStore((s) => s.setActiveApp);
  const activeApp = useUIStore((s) => s.activeApp);


  useEffect(() => {
    setActiveApp("about");
  }, [setActiveApp]);


  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (paletteOpen) {
          setPaletteOpen(false);
          setActiveApp(null);
          return;
        }
        if (openApps.length > 0) {
          const top = openApps[openApps.length - 1];
          closeApp(top);
          return;
        }
      }

    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [paletteOpen, openApps]);

  const windows: WindowSpec[] = useMemo(
    () => [
      { key: "about", title: "About", content: <AboutContent /> },
      { key: "projects", title: "Projects", content: <ProjectsContent /> },
      {
        key: "philosophy",
        title: "Philosophy",
        content: <PhilosophyContent />,
      },
      { key: "resume", title: "Resume", content: <ResumeContent /> },
    ],
    []
  );

  function openApp(app: Exclude<AppKey, "palette" | null>) {
    setOpenApps((prev) => {
      if (prev.includes(app)) {
        const without = prev.filter((a) => a !== app);
        return [...without, app];
      }
      return [...prev, app];
    });
    setActiveApp(app);
  }

  function closeApp(app: Exclude<AppKey, "palette" | null>) {
    setOpenApps((prev) => prev.filter((a) => a !== app));
    setActiveApp(null);
  }

  function focusApp(app: Exclude<AppKey, "palette" | null>) {
    setOpenApps((prev) => {
      const without = prev.filter((a) => a !== app);
      return [...without, app];
    });
    setActiveApp(app);
  }

  function resetAll() {
    setOpenApps(["about"]);
    setPaletteOpen(false);
    setActiveApp("about");
  }

  return (
    <main className="fixed inset-0 overflow-hidden">

      <div
        className="absolute inset-0"
        style={{
          backgroundColor: "#FAFAF0",
          backgroundImage: `
            repeating-linear-gradient(0deg, rgba(0,0,0,0.04) 0, rgba(0,0,0,0.04) 1px, transparent 1px, transparent 8px),
            repeating-linear-gradient(90deg, rgba(0,0,0,0.04) 0, rgba(0,0,0,0.04) 1px, transparent 1px, transparent 8px)
          `,
          backgroundSize: "8px 8px, 8px 8px",
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(rgba(0,0,0,0.04) 1px, transparent 1px)",
          backgroundSize: "2px 2px",
        }}
      />


      <Eyes activeApp={activeApp ?? null} />


      <div className="absolute inset-0 z-10">
        {windows
          .filter((w) => openApps.includes(w.key))
          .map((w) => {
            const zIndex = 100 + openApps.indexOf(w.key);
            return (
              <DesktopWindow
                key={w.key}
                appKey={w.key}
                title={w.title}
                zIndex={zIndex}
                onClose={() => closeApp(w.key)}
                onFocus={() => focusApp(w.key)}
              >
                {w.content}
              </DesktopWindow>
            );
          })}
      </div>


      <div className="absolute left-0 right-0 bottom-6 z-20 flex justify-center">
        <Dock
          activeApp={activeApp ?? null}
          onOpen={(k) => openApp(k)}
          onOpenPalette={() => {
            setPaletteOpen(true);
            setActiveApp("palette");
          }}
        />
      </div>


      <CommandPalette
        open={paletteOpen}
        onOpenChange={(o) => {
          setPaletteOpen(o);
          if (!o) setActiveApp(null);
          if (o) setActiveApp("palette");
        }}
        onAction={(k) => {
          openApp(k);
          setPaletteOpen(false);
        }}
        onReset={resetAll}
      />
    </main>
  );
}
