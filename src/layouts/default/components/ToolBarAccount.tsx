import React from "react";
import { Box, ButtonGroup, IconButton } from "@mui/material";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Logout } from "@mui/icons-material";
import { authService } from "../../../modules/auth/auth.service";
import { useDispatch } from "react-redux";

export const ToolBarAccount = () => {
  const options = [
    {
      icon: <Logout />,
      title: "Logout",
    },
  ];

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const dispatch = useDispatch();

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    index: number,
    title: string
  ) => {
    switch (title) {
      case "Logout":
        authService.logout(dispatch);
    }

    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  return (
    <React.Fragment>
      <Box>
        <ButtonGroup
          size="small"
          variant="contained"
          ref={anchorRef}
          aria-label="Button group with a nested menu"
        >
          {/* <Button onClick={handleClick}>{options[selectedIndex]}</Button> */}
          <IconButton
            aria-controls={open ? "split-button-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-label="select merge strategy"
            aria-haspopup="menu"
            onClick={handleToggle}
          >
            <AccountCircleIcon />
          </IconButton>
        </ButtonGroup>
        <Popper
          sx={{ zIndex: 1 }}
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList id="split-button-menu" autoFocusItem>
                    {options.map((option, index) => (
                      <MenuItem
                        key={option.title}
                        disabled={index === 2}
                        selected={index === selectedIndex}
                        onClick={(event) =>
                          handleMenuItemClick(event, index, option.title)
                        }
                      >
                        <Box
                          display={"flex"}
                          justifyContent={"space-between"}
                          alignItems={"center"}
                          gap={3}
                        >
                          {option.title} {option.icon}
                        </Box>
                      </MenuItem>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </Box>
    </React.Fragment>
  );
};
