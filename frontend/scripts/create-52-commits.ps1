$ErrorActionPreference = "Stop"
Set-Location "c:\Users\Sasi\Desktop\Sasi-Portfolio"

function Commit-Files {
    param([string]$Message, [string[]]$Paths)
    if ($Paths.Count -eq 0) { throw "No paths for commit: $Message" }
    git add -- $Paths
    git commit -m $Message
}

$uiBatches = @(
    @("src/components/ui/accordion.tsx", "src/components/ui/alert.tsx", "src/components/ui/alert-dialog.tsx"),
    @("src/components/ui/aspect-ratio.tsx", "src/components/ui/avatar.tsx", "src/components/ui/badge.tsx"),
    @("src/components/ui/breadcrumb.tsx", "src/components/ui/button.tsx", "src/components/ui/calendar.tsx"),
    @("src/components/ui/card.tsx", "src/components/ui/carousel.tsx", "src/components/ui/chart.tsx"),
    @("src/components/ui/checkbox.tsx", "src/components/ui/collapsible.tsx", "src/components/ui/command.tsx"),
    @("src/components/ui/context-menu.tsx", "src/components/ui/dialog.tsx", "src/components/ui/drawer.tsx"),
    @("src/components/ui/dropdown-menu.tsx", "src/components/ui/form.tsx", "src/components/ui/hover-card.tsx"),
    @("src/components/ui/input.tsx", "src/components/ui/input-otp.tsx", "src/components/ui/label.tsx"),
    @("src/components/ui/menubar.tsx", "src/components/ui/navigation-menu.tsx", "src/components/ui/pagination.tsx"),
    @("src/components/ui/popover.tsx", "src/components/ui/progress.tsx", "src/components/ui/radio-group.tsx"),
    @("src/components/ui/resizable.tsx", "src/components/ui/scroll-area.tsx", "src/components/ui/select.tsx"),
    @("src/components/ui/separator.tsx", "src/components/ui/sheet.tsx", "src/components/ui/sidebar.tsx"),
    @("src/components/ui/skeleton.tsx", "src/components/ui/slider.tsx", "src/components/ui/sonner.tsx"),
    @("src/components/ui/switch.tsx", "src/components/ui/table.tsx", "src/components/ui/tabs.tsx"),
    @("src/components/ui/textarea.tsx", "src/components/ui/toggle.tsx", "src/components/ui/toggle-group.tsx"),
    @("src/components/ui/tooltip.tsx")
)

Commit-Files "chore: add gitignore for Node, Vite, and environment files" @(".gitignore")
Commit-Files "chore: initialize TanStack Start portfolio package" @("package.json")
Commit-Files "chore: configure TypeScript, Vite, and Bun settings" @("tsconfig.json", "vite.config.ts", "bunfig.toml")
Commit-Files "chore: add ESLint, Prettier, and shadcn configuration" @("eslint.config.js", "prettierignore", "prettierrc", "components.json")
Commit-Files "feat(styles): add global theme, typography, and section utilities" @("src/styles.css")
Commit-Files "feat(lib): add shared utilities and server configuration" @("src/lib/utils.ts", "src/lib/config.server.ts")
Commit-Files "feat(lib): add social links and contact constants" @("src/lib/constants/social.ts")
Commit-Files "feat(lib): add client error capture and error page helpers" @("src/lib/error-page.ts", "src/lib/error-capture.ts")
Commit-Files "chore: add error reporting and example server function" @("src/lib/lovable-error-reporting.ts", "src/lib/api/example.functions.ts")
Commit-Files "feat(hooks): add mobile breakpoint detection hook" @("src/hooks/use-mobile.tsx")
Commit-Files "feat(hooks): add intersection observer hook for lazy loading" @("src/hooks/use-in-view.ts")

$i = 1
foreach ($batch in $uiBatches) {
    $names = ($batch | ForEach-Object { ($_ -split "/")[-1] -replace "\.tsx$", "" }) -join ", "
    Commit-Files "feat(ui): add shadcn $names components" $batch
    $i++
}

Commit-Files "feat(portfolio): add Section layout wrapper component" @("src/components/portfolio/Section.tsx")
Commit-Files "feat(portfolio): add SectionTitle with gradient headline styling" @("src/components/portfolio/SectionTitle.tsx")
Commit-Files "feat(portfolio): add animated Particles background canvas" @("src/components/portfolio/Particles.tsx")
Commit-Files "feat(portfolio): add fixed Nav with mobile menu and active states" @("src/components/portfolio/Nav.tsx")
Commit-Files "feat(portfolio): add MockIDE typewriter terminal component" @("src/components/portfolio/MockIDE.tsx")
Commit-Files "feat(portfolio): add Hero section with split layout and marquee" @("src/components/portfolio/Hero.tsx")
Commit-Files "feat(portfolio): add About section with IDE workspace layout" @("src/components/portfolio/About.tsx")
Commit-Files "feat(portfolio): add Skills section with tech icon grid" @("src/components/portfolio/Skills.tsx")
Commit-Files "feat(portfolio): add Projects section with browser preview cards" @("src/components/portfolio/Projects.tsx")
Commit-Files "feat(portfolio): add Experience timeline section" @("src/components/portfolio/Experience.tsx")
Commit-Files "feat(portfolio): add Achievements awards workspace section" @("src/components/portfolio/Achievements.tsx")
Commit-Files "feat(api): add GitHub profile server function" @("src/lib/api/github.functions.ts")
Commit-Files "feat(portfolio): add GitHub contribution heatmap graph" @("src/components/portfolio/GitHubContributionGraph.tsx")
Commit-Files "feat(portfolio): add Coding profile section with live GitHub data" @("src/components/portfolio/Coding.tsx")
Commit-Files "feat(portfolio): add Why Work With Me value cards section" @("src/components/portfolio/WhyMe.tsx")
Commit-Files "feat(portfolio): add Entrepreneurial Journey and Techno Vanam section" @("src/components/portfolio/Vision.tsx")
Commit-Files "feat(portfolio): add Contact section with form and social links" @("src/components/portfolio/Contact.tsx")
Commit-Files "feat(portfolio): add Footer with navigation and back to top" @("src/components/portfolio/Footer.tsx")
Commit-Files "perf(portfolio): add DeferredSection for lazy-loaded below-fold content" @("src/components/portfolio/DeferredSection.tsx")
Commit-Files "feat(portfolio): add CertificateViewer and HUD utility components" @("src/components/portfolio/CertificateViewer.tsx", "src/components/portfolio/HudTerminal.tsx", "src/components/portfolio/AnimatedCounter.tsx")
Commit-Files "feat(portfolio): wire main Portfolio layout with Lenis smooth scroll" @("src/components/Portfolio.tsx")
Commit-Files "feat(routes): add root shell, SEO meta, and index route" @("src/routes/__root.tsx", "src/routes/index.tsx", "src/routes/README.md")
Commit-Files "feat(app): add router, SSR server entry, and generated route tree" @("src/router.tsx", "src/start.ts", "src/server.ts", "src/routeTree.gen.ts")
Commit-Files "chore: add public favicon, icons, and certificates folder" @("public/favicon.svg", "public/icons.svg", "public/certificates/.gitkeep", "src/assets/vite.svg", "src/assets/react.svg")
Commit-Files "chore: add npm and Bun lockfiles for reproducible installs" @("package-lock.json", "bun.lock")

$count = (git rev-list --count HEAD)
Write-Host "Created $count commits on main."
