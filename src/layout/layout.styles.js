import {
    makeStyles
} from '@material-ui/core/styles'

const drawerWidth = 100;


export const layoutStyle = makeStyles(theme => ({
    root: {
        display: 'flex'
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(80% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    menuItems: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: '0.5rem',
        padding: '4px'
    },
    menuItem: {
        margin: 0,
        marginBottom: '0.9rem'
    },
    hide: {
        display: 'none'
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        overflowX: 'hidden',
        width: theme.spacing(8),
        // [theme.breakpoints.up('sm')]: {
        //     width: theme.spacing(9) + 1
        // },
        justifyContent: 'space-between'
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

    },
    content: {
        padding: theme.spacing(2, 0, 2, 0),
    }
}))