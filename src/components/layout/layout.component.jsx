import React from 'react'
import { Route, Redirect, Link, Switch, withRouter } from 'react-router-dom'
import { auth } from '../../firebase/firebase.util'

import clsx from 'clsx'
import { useTheme } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import IconButton from '@material-ui/core/IconButton'
import ListItem from '@material-ui/core/ListItem'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt, faSignInAlt } from '@fortawesome/free-solid-svg-icons'

import Header from '../header/header.component'
import { ReactComponent as Logo } from '../../assets/crown.svg'
import { layoutStyle } from './layout.styles'

import mainRoutes from '../utils/routes'

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
  const theme = useTheme()
  const [open, setOpen] = React.useState(false)

  const getRoute = () => {
    return location.pathname
  }

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <div className={classes.root}>
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
        <IconButton onClick={handleDrawerClose}>
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
        <IconButton>
          {currentUser ? (
            <FontAwesomeIcon
              icon={faSignOutAlt}
              size={'md'}
              color='#a80000'
              onClick={() => auth.signOut()}
              to='/signin'
            />
          ) : (
            <Link to='/signin'>
              <FontAwesomeIcon icon={faSignInAlt} size={'md'} color='#6a28fa' />
            </Link>
          )}
        </IconButton>
      </Drawer>
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
    </div>
  )
}

export default withRouter(Layout)
