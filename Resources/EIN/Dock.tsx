import { GlassDock } from "@/components/glass-dock"

const items = [
  { id: "home", icon: <Home />, label: "Home", active: true },
  { id: "search", icon: <Search />, label: "Search" },
  { id: "mail", icon: <Mail />, label: "Mail" },
]

<GlassDock items={items} />