import * as React from "react";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";
import {
  ClockIcon,
  HomeIcon,
  UsersIcon,
  ClipboardDocumentListIcon,
  DocumentDuplicateIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import Icon from "@mui/material/Icon";

type DrawerProps = {
  children?: React.ReactNode;
};

const menuItems = [
  {
    id: uuidv4(),
    title: "Dashboard",
    href: "/",
    icon: <HomeIcon style={{ height: 24 }} />,
  },
  {
    id: uuidv4(),
    title: "Users",
    href: "/users",
    icon: <UsersIcon style={{ height: 24 }} />,
  },
  {
    id: uuidv4(),
    title: "Projects",
    href: "/projects",
    icon: <DocumentDuplicateIcon style={{ height: 24 }} />,
  },
  {
    id: uuidv4(),
    title: "Logs",
    href: "/logs",
    icon: <ClipboardDocumentListIcon style={{ height: 24 }} />,
  },
];

const drawerWidth = 200;

export default function Drawer({ children }: DrawerProps) {
  const router = useRouter();

  function handleMenuItemClick(href: string) {
    router.push(href);
  }

  function isActivePage(href: string) {
    if (router.pathname === "/") {
      return href === router.pathname;
    }

    return href.startsWith(router.pathname);
  }

  console.log(router);
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <MuiDrawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
        }}
        PaperProps={{
          sx: {
            border: "1px solid rgb(229, 231, 235)",
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Box
          sx={{
            overflow: "auto",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            pt: 2,
          }}
        >
          <Box sx={{ color: "primary.main", height: 24, width: 24 }}>
            <ClockIcon />
          </Box>

          <List
            sx={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              width: "100%",
              px: 1,
            }}
          >
            {menuItems.map((menuItem, index) => (
              <ListItem
                key={menuItem.id}
                disablePadding
                onClick={() => handleMenuItemClick(menuItem.href)}
                sx={{
                  color: isActivePage(menuItem.href)
                    ? "primary.main"
                    : "grey.600",
                }}
              >
                <ListItemButton>
                  <ListItemIcon
                    sx={{ minWidth: 32, display: "inline", color: "inherit" }}
                  >
                    {menuItem.icon}
                  </ListItemIcon>
                  <ListItemText primary={menuItem.title} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List sx={{ width: "100%", px: 1 }}>
            {["Logout"].map((text, index) => (
              <ListItem key={text} sx={{ color: "grey.600" }} disablePadding>
                <ListItemButton>
                  <ListItemIcon
                    sx={{ minWidth: 32, display: "inline", color: "inherit" }}
                  >
                    {index % 2 === 0 ? (
                      <ArrowRightOnRectangleIcon style={{ height: 24 }} />
                    ) : (
                      <PermIdentityIcon />
                    )}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </MuiDrawer>
      <Box
        component="main"
        sx={{
          bgcolor: "#F3F4F6",
          minHeight: "100vh",
          height: "100%",
          flexGrow: 1,
          py: 6,
          px: 2,
          width: `calc(100% - ${drawerWidth + 50}px)`,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
