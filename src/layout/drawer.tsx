import * as React from "react";
import { useRouter } from "next/router";
import {
  ArrowRightOnRectangleIcon,
  ClipboardDocumentListIcon,
  ClockIcon,
  DocumentDuplicateIcon,
  HomeIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { v4 as uuidv4 } from "uuid";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LoadingContent from "@/components/contents/loading-content";
import UnauthorizedContent from "@/components/contents/unauthorized-content";
import useAxios from "@/hooks/use-axios";

type DrawerProps = {
  children?: React.ReactNode;
};

const drawerWidth = 200;
const getIdentity = async () => {
  return fetch("/api/me").then((res) => res.json());
};

export default function Drawer({ children }: DrawerProps) {
  const axios = useAxios();
  const router = useRouter();

  const {
    isError,
    isLoading,
    data: identity,
  } = useQuery(["identity"], getIdentity);

  if (isLoading) return <LoadingContent />;
  if (isError) return <UnauthorizedContent />;

  const menuItems = [
    {
      id: uuidv4(),
      title: "Dashboard",
      href: "/",
      icon: <HomeIcon style={{ height: 24 }} />,
      disabled: false,
    },
    {
      id: uuidv4(),
      title: "Users",
      href: "/users",
      icon: <UsersIcon style={{ height: 24 }} />,
      disabled: !identity.isAdmin,
    },
    {
      id: uuidv4(),
      title: "Projects",
      href: "/projects",
      icon: <DocumentDuplicateIcon style={{ height: 24 }} />,
      disabled: !identity.isAdmin,
    },
    {
      id: uuidv4(),
      title: "Reports",
      href: "/reports",
      icon: <ClipboardDocumentListIcon style={{ height: 24 }} />,
      disabled: !identity.isAdmin,
    },
  ];

  function handleMenuItemClick(href: string) {
    router.push(href);
  }

  function handleSignOut() {
    axios.post("/Access/logout");
    // signOut();
  }

  function isActivePage(href: string) {
    if (router.pathname === "/") {
      return href === router.pathname;
    }

    return href.startsWith(router.pathname);
  }

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
                onClick={() =>
                  menuItem.disabled ? null : handleMenuItemClick(menuItem.href)
                }
                sx={{
                  color: isActivePage(menuItem.href)
                    ? "primary.main"
                    : "grey.600",
                }}
                disabled={menuItem.disabled}
              >
                <ListItemButton sx={{ borderRadius: 3 }}>
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
            <ListItem
              sx={{ color: "grey.600" }}
              onClick={() => handleSignOut()}
              disablePadding
            >
              <ListItemButton sx={{ borderRadius: 3 }}>
                <ListItemIcon
                  sx={{ minWidth: 32, display: "inline", color: "inherit" }}
                >
                  <ArrowRightOnRectangleIcon style={{ height: 24 }} />
                </ListItemIcon>
                <ListItemText primary="Log out" />
              </ListItemButton>
            </ListItem>
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
          px: 4,
          width: `calc(100% - ${drawerWidth + 50}px)`,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
