import React, { useCallback, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  IconButton,
  MenuItem,
  Menu,
  Divider
} from "@material-ui/core";
import { MoreHoriz } from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
  menu: {
    padding: 5,
    paddingLeft: "15px",
    fontSize: "13px",
    color: "#666666"
  },
  menuStyle: {
    borderRadius: "5px",
    marginTop: "30px"
  },
  moreIcon: {
    marginTop: "auto",
    marginBottom: "auto",
    display: "flex",
    justifyContent: "center"
  }
}));

const MoreHorizMenu = ({
   menuList,
  }) => {

  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const menuLength = menuList && menuList.length - 1;

  const handleMenuClick = useCallback((event) => {
    setAnchorEl(event.currentTarget);
  });

  const handleMenuClose = useCallback(() => {
    setAnchorEl(null);
  });

  return (
        <Fragment>
          <IconButton
            aria-label="more"
            size="small"
            aria-controls="long-menu"
            aria-haspopup="true"
            onClick={handleMenuClick}
          >
            <MoreHoriz fontSize="small" />
          </IconButton>
          <Menu
            elevation={2}
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={handleMenuClose}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            PaperProps={{
              style: {
                maxHeight: 48 * 4.5,
                width: "20ch",
                marginLeft: "20px"
              }
            }}
            className={classes.menuStyle}
          >
              {
                menuList &&
                menuList.map(({
                name,
                actionHandler,
                },index) => (
                  <div key={`${index}-menu-${name}`}>
                    <MenuItem
                      aria-label="menu"
                      size="small"
                      onClick={actionHandler}
                      className={classes.menu}
                    >
                      {name}
                    </MenuItem>
                    {menuLength != index &&
                      <Divider variant="middle" />}
                  </div>
                )
                )}
          </Menu>
        </Fragment>
  );
};

export default MoreHorizMenu;