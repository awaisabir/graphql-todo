import React from 'react';
import { NavLink } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

const Logged = props => (
  <IconMenu
    {...props}
    iconButtonElement={(
      <IconButton>
        <MoreVertIcon />
      </IconButton>
)}
    targetOrigin={{ horizontal: 'right', vertical: 'top' }}
    anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
  >
    {props.isLoggedIn
      ? (
        <span>
          <NavLink to="/profile">
            <MenuItem primaryText="Profile" />
          </NavLink>
          <MenuItem primaryText="Sign out" onClick={() => props.onLogout()} />
        </span>
      )
      : (
        <span>
          <NavLink to="/login">
            <MenuItem primaryText="Login" />
          </NavLink>
          <NavLink to="/register">
            <MenuItem primaryText="Register" />
          </NavLink>
        </span>
      )
    }
  </IconMenu>
);

Logged.muiName = 'IconMenu';

export default (props) => {
  const { onLogout, isLoggedIn } = props;
  return (
    <div>
      <div>
        <AppBar
          showMenuIconButton={false}
          title="Todo"
          iconElementRight={
            <Logged isLoggedIn={isLoggedIn} onLogout={onLogout} />
            }
        />
      </div>
    </div>
  );
};
