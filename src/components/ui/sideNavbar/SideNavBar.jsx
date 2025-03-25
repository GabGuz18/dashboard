
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sideNavbar/sidebar"
import { SideBarItem } from "@/components"

// Menu items.
const items = [
  {
    title: "Reportes",
    url: "/dashboard/reportes",
    icon: Home,
  },
  {
    title: "Reportes Comercial",
    url: "/dashboard/otro",
    icon: Inbox,
  },
  {
    title: "Usuarios",
    url: "/reports2",
    icon: Calendar,
  },
  {
    title: "Nuevo reporte",
    url: "/reports3",
    icon: Search,
  },
]

export function SideNavBar() {
  return (
    <Sidebar className='pt-[8vh] shadow-2xl'>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {
                items.map((item) => (
                  <SideBarItem item={item} key={item.url} />
                ))
              }
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
