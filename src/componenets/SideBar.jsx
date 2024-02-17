import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import TableData from "./Table";
import "./componenet.css";
import logo from "../assets/logo.png";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import CategoryIcon from '@mui/icons-material/Category';
import DescriptionIcon from '@mui/icons-material/Description';
import StyleIcon from '@mui/icons-material/Style';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import WalletIcon from '@mui/icons-material/Wallet';
import PeopleIcon from '@mui/icons-material/People';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useStore } from "../store";

export default function SideBar() {
  const {setList} = useStore()
  const handleClick = (sideData) => {
    setList(sideData)
  }
  return (
    <>
      <div className="header">
        <div className="container flex">
          <img src={logo} />
          <div>
            <Stack direction="row" spacing={2}>
              <Avatar
                alt="Remy Sharp"
                src="/static/images/avatar/1.jpg"
                sx={{ width: 56, height: 56 }}
              />
              <Button variant="outlined" href="#outlined-buttons">
                Sign out
              </Button>
            </Stack>
          </div>
        </div>
      </div>
      <div
        className="main-flex container"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div className="flex1" style={{ flex: 1 }}>
          <Box
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            <nav aria-label="main mailbox folders">
              <List>
                <ListItem disablePadding  onClick={() => handleClick("category")}>
                  <ListItemButton >
                    <ListItemIcon>
                      <CategoryIcon />
                    </ListItemIcon>
                    <ListItemText primary="Category"/>
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding onClick={() => handleClick("product")}>
                  <ListItemButton>
                    <ListItemIcon>
                      <DescriptionIcon />
                    </ListItemIcon>
                    <ListItemText primary="Products" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding onClick={() => handleClick("tag")}>
                  <ListItemButton>
                    <ListItemIcon>
                      <StyleIcon />
                    </ListItemIcon>
                    <ListItemText primary="Tags" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding onClick={() => handleClick("order")}>
                  <ListItemButton>
                    <ListItemIcon>
                      <ShoppingBagIcon />
                    </ListItemIcon>
                    <ListItemText primary="Orders" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding onClick={() => handleClick("wishlist")}>
                  <ListItemButton>
                    <ListItemIcon>
                      <WalletIcon />
                    </ListItemIcon>
                    <ListItemText primary="WishList" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding onClick={() => handleClick("user")}>
                  <ListItemButton>
                    <ListItemIcon>
                      <PeopleIcon />
                    </ListItemIcon>
                    <ListItemText primary="Users" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding onClick={() => handleClick("cart")}>
                  <ListItemButton>
                    <ListItemIcon>
                      <ShoppingCartIcon />
                    </ListItemIcon>
                    <ListItemText primary="Cart" />
                  </ListItemButton>
                </ListItem>
              </List>
            </nav>
            <Divider />
            <nav aria-label="secondary mailbox folders">
              <List>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText primary="Trash" />
                  </ListItemButton>
                </ListItem>
              </List>
            </nav>
          </Box>
        </div>
        <div className="flex2" style={{ flex: 5 }}>
          <TableData />
        </div>
      </div>
    </>
  );
}
