import { 
  Book, 
  Code, 
  History, 
  FileText, 
  Star, 
  GitFork, 
  CheckCircle, 
  GraduationCap,
  Folder,
  CircleDot,
  PlayCircle,
  Layout,
  Shield,
  LineChart,
  List,
  PenTool,
  Link
} from "lucide-react";
import Section from "./Section";
import SectionTitle from "./SectionTitle";

export default function About() {
  return (
    <Section id="about" className="pt-24 md:pt-32">
      <SectionTitle
        label="About"
        line1="ABOUT"
        line2="ME"
        description="Styled perfectly like a GitHub repository. Check out my background and education timeline."
        align="left"
      />

      <div className="w-full mt-8 rounded-xl border border-[#d0d7de] bg-[#f6f8fa] shadow-sm overflow-hidden text-[#1F2328] font-sans">
        
        {/* Repo Header */}
        <div className="bg-[#f6f8fa] px-4 sm:px-6 pt-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 gap-4">
            <div className="flex items-center gap-1.5 flex-wrap">
              <Book className="w-4 h-4 text-[#656d76] mr-1" />
              <span className="text-xl text-[#0969da] font-semibold hover:underline cursor-pointer">Sasikiran</span>
              <span className="text-xl text-[#656d76] mx-0.5">/</span>
              <span className="text-xl text-[#0969da] font-semibold hover:underline cursor-pointer">About-Me</span>
              <span className="border border-[#d0d7de] text-[#656d76] font-medium text-xs px-2 py-0.5 rounded-full ml-1 mb-0.5">Public</span>
            </div>
            
            <div className="flex gap-2">
              <div className="flex bg-[#f6f8fa] border border-[#d0d7de] rounded-md text-xs font-semibold shadow-sm transition-colors hover:border-[#8c959f]">
                <div className="flex items-center gap-1.5 px-3 py-1 border-r border-[#d0d7de] hover:bg-[#f3f4f6] cursor-pointer bg-[#f6f8fa] rounded-l-md">
                  <Star className="w-4 h-4 text-[#656d76]" /> Star
                </div>
                <div className="px-3 py-1 bg-white hover:bg-[#f3f4f6] cursor-pointer rounded-r-md">24</div>
              </div>
              <div className="flex bg-[#f6f8fa] border border-[#d0d7de] rounded-md text-xs font-semibold shadow-sm transition-colors hover:border-[#8c959f]">
                <div className="flex items-center gap-1.5 px-3 py-1 border-r border-[#d0d7de] hover:bg-[#f3f4f6] cursor-pointer bg-[#f6f8fa] rounded-l-md">
                  <GitFork className="w-4 h-4 text-[#656d76]" /> Fork
                </div>
                <div className="px-3 py-1 bg-white hover:bg-[#f3f4f6] cursor-pointer rounded-r-md">12</div>
              </div>
            </div>
          </div>
          
          {/* Tabs */}
          <div className="flex gap-2 sm:gap-4 text-sm font-medium border-b border-transparent overflow-x-auto scrollbar-none">
            <div className="flex items-center gap-2 pb-2.5 border-b-2 border-[#fd8c73] text-[#1F2328] whitespace-nowrap px-2">
              <Code className="w-4 h-4 text-[#656d76]" /> Code
            </div>
            <div className="flex items-center gap-2 pb-2.5 text-[#656d76] hover:text-[#1F2328] hover:border-b-2 hover:border-[#d0d7de] transition-colors cursor-pointer whitespace-nowrap px-2">
              <CircleDot className="w-4 h-4" /> Issues
            </div>
            <div className="flex items-center gap-2 pb-2.5 text-[#656d76] hover:text-[#1F2328] hover:border-b-2 hover:border-[#d0d7de] transition-colors cursor-pointer whitespace-nowrap px-2">
              <GitFork className="w-4 h-4" /> Pull requests
            </div>
            <div className="hidden md:flex items-center gap-2 pb-2.5 text-[#656d76] hover:text-[#1F2328] hover:border-b-2 hover:border-[#d0d7de] transition-colors cursor-pointer whitespace-nowrap px-2">
              <PlayCircle className="w-4 h-4" /> Actions
            </div>
            <div className="hidden lg:flex items-center gap-2 pb-2.5 text-[#656d76] hover:text-[#1F2328] hover:border-b-2 hover:border-[#d0d7de] transition-colors cursor-pointer whitespace-nowrap px-2">
              <Layout className="w-4 h-4" /> Projects
            </div>
            <div className="hidden lg:flex items-center gap-2 pb-2.5 text-[#656d76] hover:text-[#1F2328] hover:border-b-2 hover:border-[#d0d7de] transition-colors cursor-pointer whitespace-nowrap px-2">
              <Shield className="w-4 h-4" /> Security
            </div>
            <div className="hidden xl:flex items-center gap-2 pb-2.5 text-[#656d76] hover:text-[#1F2328] hover:border-b-2 hover:border-[#d0d7de] transition-colors cursor-pointer whitespace-nowrap px-2">
              <LineChart className="w-4 h-4" /> Insights
            </div>
          </div>
        </div>

        {/* Main Repo Content */}
        <div className="p-4 sm:p-6 bg-white min-h-[500px]">
          
          {/* Latest Commit Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-[#f6f8fa] border border-[#d0d7de] rounded-t-md p-3 sm:px-4 text-sm gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 bg-gradient-to-br from-[#0969da] to-[#2da44e] rounded-full flex items-center justify-center text-white font-bold text-xs shadow-sm shrink-0">S</div>
              <span className="font-semibold text-[#1F2328] hover:text-[#0969da] hover:underline cursor-pointer">Sasikiran</span>
              <span className="text-[#1F2328] hover:text-[#0969da] hover:underline cursor-pointer truncate max-w-[200px] sm:max-w-md">Update README.md with latest education timeline</span>
            </div>
            <div className="flex items-center gap-2 text-[#656d76] text-xs sm:text-sm pl-8 sm:pl-0">
              <span className="font-mono text-[#0969da] hover:underline cursor-pointer">a1b2c3d</span>
              <span className="hidden sm:inline">·</span>
              <span className="hover:underline cursor-pointer">2 hours ago</span>
              <span className="hidden sm:flex items-center gap-1.5 ml-3 hover:text-[#0969da] cursor-pointer"><History className="w-4 h-4" /> <strong>42</strong> commits</span>
            </div>
          </div>

          {/* File Browser */}
          <div className="border-x border-[#d0d7de] rounded-b-md mb-6">
            <div className="flex items-center justify-between p-2.5 px-4 border-b border-[#d0d7de] hover:bg-[#f6f8fa] text-sm group cursor-pointer transition-colors">
              <div className="flex items-center gap-3 w-1/3">
                <Folder className="w-4 h-4 text-[#54aeff] fill-current" />
                <span className="text-[#1F2328] group-hover:text-[#0969da] group-hover:underline">src</span>
              </div>
              <span className="text-[#656d76] w-1/3 hidden sm:block truncate group-hover:text-[#0969da] group-hover:underline">Build stunning UI components</span>
              <span className="text-[#656d76] w-1/3 text-right">3 days ago</span>
            </div>
            <div className="flex items-center justify-between p-2.5 px-4 border-b border-[#d0d7de] hover:bg-[#f6f8fa] text-sm group cursor-pointer transition-colors">
              <div className="flex items-center gap-3 w-1/3">
                <Folder className="w-4 h-4 text-[#54aeff] fill-current" />
                <span className="text-[#1F2328] group-hover:text-[#0969da] group-hover:underline">public</span>
              </div>
              <span className="text-[#656d76] w-1/3 hidden sm:block truncate group-hover:text-[#0969da] group-hover:underline">Add fresh assets</span>
              <span className="text-[#656d76] w-1/3 text-right">5 days ago</span>
            </div>
            <div className="flex items-center justify-between p-2.5 px-4 border-b border-[#d0d7de] bg-[#f6f8fa] hover:bg-white text-sm group cursor-pointer transition-colors rounded-b-md">
              <div className="flex items-center gap-3 w-1/3">
                <FileText className="w-4 h-4 text-[#656d76]" />
                <span className="text-[#1F2328] group-hover:text-[#0969da] group-hover:underline">README.md</span>
              </div>
              <span className="text-[#656d76] w-1/3 hidden sm:block truncate group-hover:text-[#0969da] group-hover:underline">Update README.md with latest education timeline</span>
              <span className="text-[#656d76] w-1/3 text-right">2 hours ago</span>
            </div>
          </div>

          {/* Rendered README Viewer */}
          <div className="border border-[#d0d7de] rounded-md shadow-sm">
            {/* README Header */}
            <div className="flex items-center justify-between p-3 px-4 border-b border-[#d0d7de] bg-[#f6f8fa] rounded-t-md sticky top-0 z-10">
              <div className="flex items-center gap-2">
                <List className="w-4 h-4 text-[#1F2328]" />
                <span className="font-semibold text-sm text-[#1F2328]">README.md</span>
              </div>
              <div className="flex items-center gap-3">
                <PenTool className="w-4 h-4 text-[#656d76] hover:text-[#0969da] cursor-pointer" />
              </div>
            </div>
            
            {/* README Content (GitHub Markdown Render Style) */}
            <div className="p-6 sm:p-10 text-[#1F2328]">
              
              <h1 className="text-[2em] font-semibold border-b border-[#d0d7de] pb-2.5 mb-4 tracking-tight flex items-center gap-3 group">
                <Link className="w-5 h-5 text-[#656d76] opacity-0 group-hover:opacity-100 transition-opacity -ml-8 absolute" />
                👋 Hi, I'm Sasikiran T.T.
              </h1>
              
              <p className="text-base leading-7 mb-4">
                I'm a B.E. Computer Science student, product builder, and aspiring founder. I specialize in building full-stack web applications with an intense focus on clean UI/UX and scalable architectures.
              </p>
              
              <p className="text-base leading-7 mb-8">
                By combining engineering, creativity, and product thinking, I work to turn abstract ideas into real, usable digital products. Hackathons, startup programs, and continuous learning keep me sharp, curious, and motivated.
              </p>

              <h2 className="text-[1.5em] font-semibold border-b border-[#d0d7de] pb-2 mt-10 mb-4 tracking-tight flex items-center gap-3 group">
                <Link className="w-5 h-5 text-[#656d76] opacity-0 group-hover:opacity-100 transition-opacity -ml-8 absolute" />
                🎓 Education Timeline
              </h2>
              
              <ul className="space-y-6 list-none pl-0 mt-6">
                <li className="flex gap-4 items-start">
                  <div className="mt-1 bg-white border border-[#2da44e] rounded-full p-1 shadow-sm">
                    <GraduationCap className="w-4 h-4 text-[#2da44e]" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-[#1F2328] m-0 leading-tight">Sri Eshwar College of Engineering</h3>
                    <p className="text-[#656d76] mt-1 text-sm font-medium">B.E. Computer Science • 2024 - Present</p>
                    <p className="mt-1 text-sm text-[#1F2328] bg-[#ddf4ff] text-[#0969da] px-2 py-0.5 rounded-md inline-block font-medium">Current CGPA: 7.9 / 10</p>
                  </div>
                </li>
                
                <li className="flex gap-4 items-start">
                  <div className="mt-1 bg-white border border-[#d0d7de] rounded-full p-1 shadow-sm">
                    <CheckCircle className="w-4 h-4 text-[#656d76]" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-[#1F2328] m-0 leading-tight">Vikas Vidyalaya Matriculation Higher Secondary School</h3>
                    <p className="text-[#656d76] mt-1 text-sm font-medium">Higher Secondary (12th) • 2023 - 2024</p>
                    <p className="mt-1 text-sm text-[#1F2328] bg-[#f6f8fa] border border-[#d0d7de] px-2 py-0.5 rounded-md inline-block font-medium">Percentage: 77%</p>
                  </div>
                </li>
                
                <li className="flex gap-4 items-start">
                  <div className="mt-1 bg-white border border-[#d0d7de] rounded-full p-1 shadow-sm">
                    <CheckCircle className="w-4 h-4 text-[#656d76]" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-[#1F2328] m-0 leading-tight">A.V.P. Trust National Matric. Hr. Sec. School</h3>
                    <p className="text-[#656d76] mt-1 text-sm font-medium">Secondary School (10th) • 2021 - 2022</p>
                    <p className="mt-1 text-sm text-[#1F2328] bg-[#f6f8fa] border border-[#d0d7de] px-2 py-0.5 rounded-md inline-block font-medium">Percentage: 77%</p>
                  </div>
                </li>
              </ul>

              <h2 className="text-[1.5em] font-semibold border-b border-[#d0d7de] pb-2 mt-10 mb-4 tracking-tight flex items-center gap-3 group">
                <Link className="w-5 h-5 text-[#656d76] opacity-0 group-hover:opacity-100 transition-opacity -ml-8 absolute" />
                ⚡ Quick Stats
              </h2>
              
              <ul className="pl-6 space-y-2 text-base text-[#1F2328] list-disc marker:text-[#d0d7de]">
                <li><strong className="font-semibold">Status:</strong> Active Student & Product Builder</li>
                <li><strong className="font-semibold">Focus:</strong> Design Systems, MERN Stack, UI/UX</li>
                <li><strong className="font-semibold">Goal:</strong> Turning abstract ideas into highly usable products</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
