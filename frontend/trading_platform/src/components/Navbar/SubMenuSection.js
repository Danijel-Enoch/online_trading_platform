import React from "react";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MoreIcon from "@material-ui/icons/MoreVert";
import Button from "@material-ui/core/Button";
import Login from "../../pages/Login";
import Signup from "../../pages/Signup";
import Dialog from "@material-ui/core/Dialog";
import { connect } from "react-redux";
import { getFunds, addFunds } from "../../redux/actions/fundsAction";

class SubMenuSection extends React.Component {
  componentDidUpdate() {
    const { isAuthenticated } = this.props;
    if (isAuthenticated) {
      if (this.props.funds === null) {
        this.props.getFunds();
      } else {
        if (this.props.funds.length === 0) {
          this.props.addFunds(this.state.initialFund);
        }
      }
    }
  }

  render() {
    const {
      isAuthenticated,
      openLogin,
      openSignup,
      isMenuOpen,
      handleMenuOpen,
      handleMenuClose,
      handleOpen,
      classes
    } = this.props;

    return (
      <>
        {isAuthenticated ? (
          <>
            <div className={classes.navBarSectionDesktop}>
              <IconButton
                aria-owns={isMenuOpen ? "material-appbar" : undefined}
                aria-haspopup="true"
                onClick={handleMenuOpen("anchorEl")}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
            <div className={classes.navBarSectionMobile}>
              <IconButton
                aria-haspopup="true"
                onClick={handleMenuOpen("mobileMoreAnchorEl")}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </>
        ) : (
          <>
            <Button color="inherit" onClick={handleOpen("openSignup")}>
              Signup
            </Button>
            <Dialog
              open={openSignup}
              onClose={handleMenuClose}
              aria-labelledby="form-dialog-title"
            >
              <Signup />
            </Dialog>
            <Button color="inherit" onClick={handleOpen("openLogin")}>
              Login
            </Button>
            <Dialog
              open={openLogin}
              onClose={handleMenuClose}
              aria-labelledby="form-dialog-title"
            >
              <Login />
            </Dialog>
          </>
        )}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.authReducer.isAuthenticated,
    funds: state.fundsReducer.funds
  };
};

const mapDispatchToProps = {
  getFunds,
  addFunds
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubMenuSection);