

import React from 'react'
import {
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sideNavbar/sidebar"

export const SideBarItem = ({ item }) => {
  return (
    <SidebarMenuItem key={item.title}>
      <SidebarMenuButton asChild>
        <a href={item.url}>
          <item.icon />
          <span>{item.title}</span>
        </a>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}
