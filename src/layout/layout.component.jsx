import React from 'react'
import { Route, Redirect, Link, Switch, withRouter } from 'react-router-dom'
import { auth } from '../firebase/firebase.util'

import clsx from 'clsx'
import { useTheme } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import IconButton from '@material-ui/core/IconButton'
import ListItem from '@material-ui/core/ListItem'
import Grid from '@material-ui/core/Grid'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt, faSignInAlt } from '@fortawesome/free-solid-svg-icons'

import Header from '../components/header/header.component'
import { ReactComponent as Logo } from '../assets/crown.svg'
import { layoutStyle } from './layout.styles'

import mainRoutes from './routes'

const switchRoutes = (
  <Switch>
    {mainRoutes.map((prop, key) => {
      if (prop.redirect)
        return <Redirect from={prop.path} to={prop.pathTo} key={key} />
      else {
        return prop.exact ? (
          <Route exact path={prop.path} component={prop.component} key={key} />
        ) : (
          <Route path={prop.path} component={prop.component} key={key} />
        )
      }
    })}
    {/* <Route path="/newProject" name= "New Project" component={CreateProject}/>
    <Route path="/project/:id" name= "Project Details" component={ProjectDetails}/> */}
  </Switch>
)

const Layout = ({ location, currentUser }) => {
  const classes = layoutStyle()
  const [open, setOpen] = React.useState(false)

  const getRoute = () => {
    return location.pathname
  }

  return (
    <Grid container spacing={0} className={classes.root}>
      <Grid item xs={1}>
        <Drawer
          variant='permanent'
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open
            })
          }}
        >
          <IconButton>
            <Link className={classes.logoContainer} to='/'>
              <Logo className={classes.logo} />
            </Link>
          </IconButton>
          <List className={classes.menuItems}>
            {mainRoutes.map((prop, index) => {
              if (!prop.hideFromDrawer) {
                return (
                  <Link
                    to={prop.path}
                    className={classes.menuItem}
                    style={{ textDecoration: 'none' }}
                    key={index}
                  >
                    <ListItem button key={prop.name}>
                      <FontAwesomeIcon
                        icon={prop.icon}
                        size={prop.size}
                        color='#444'
                      />
                    </ListItem>
                  </Link>
                )
              }
            })}
          </List>
          <IconButton onClick={() => auth.signOut()}>
            {currentUser ? (
              <FontAwesomeIcon
                icon={faSignOutAlt}
                size={'lg'}
                color='#6432ed'
                to='/signin'
              />
            ) : (
              <Link to='/signin'>
                <FontAwesomeIcon
                  icon={faSignInAlt}
                  size={'lg'}
                  color='#6432ed'
                />
              </Link>
            )}
          </IconButton>
        </Drawer>
      </Grid>
      <Grid item xs={10}>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open
          })}
        >
          <Header />
          {getRoute() ? (
            <div className={classes.content}>
              <div className={classes.container}>{switchRoutes}</div>
            </div>
          ) : (
            <div className={classes.map}>{switchRoutes}</div>
          )}
        </main>
      </Grid>
    </Grid>
  )
}

export default withRouter(Layout)
