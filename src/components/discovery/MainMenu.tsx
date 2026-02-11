import { FilePlus, Search, FileBarChart } from 'lucide-react';

type View = 'new' | 'search' | 'report';

interface MainMenuProps {
  onNavigate: (view: View) => void;
}

const MENU_ITEMS: { view: View; icon: typeof FilePlus; title: string; description: string }[] = [
  {
    view: 'new',
    icon: FilePlus,
    title: 'New Submission',
    description: 'Start a new Adobe Experience Cloud discovery questionnaire.',
  },
  {
    view: 'search',
    icon: Search,
    title: 'Search Existing Record',
    description: 'Find and review previously submitted discovery entries.',
  },
  {
    view: 'report',
    icon: FileBarChart,
    title: 'Generate Report',
    description: 'Create an AI-powered assessment report from a completed discovery.',
  },
];

export function MainMenu({ onNavigate }: MainMenuProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <div className="w-full max-w-4xl space-y-12 text-center">
        <div className="space-y-12">
          <div className="flex justify-center">
            <img
              src={`${import.meta.env.BASE_URL}images/logo-dept.svg`}
              className="h-24 md:h-32 w-auto"
              alt="DEPT®"
            />
          </div>
          <div className="space-y-2 leading-none tracking-tighter flex flex-col items-center cursor-default select-none">
            <div className="font-black text-2xl sm:text-4xl md:text-5xl text-foreground uppercase text-center whitespace-nowrap">
              ADOBE EXPERIENCE CLOUD
            </div>
            <div className="font-black text-2xl sm:text-4xl md:text-5xl text-[#ff4901] uppercase text-center whitespace-nowrap">
              DISCOVERY TOOL
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MENU_ITEMS.map(({ view, icon: Icon, title, description }) => (
            <button
              key={view}
              onClick={() => onNavigate(view)}
              className="dept-gradient rounded-lg p-8 text-left hover:shadow-lg transition-all duration-200 group cursor-pointer"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-lg font-bold tracking-tight text-foreground">{title}</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
