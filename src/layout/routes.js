import HomePage from '../pages/homepage/homepage.component'
import ShopPage from '../pages/shop/shop.component'
import AuthenticationPage from '../pages/authentication/authentication.component'
import CheckoutPage from '../pages/checkout/checkout.component'

// @material-ui/icons
import DashboardIcon from "@material-ui/icons/Dashboard";
import WorkIcon from "@material-ui/icons/Work";

import {
  faMars,
  faVenus,
  faHatCowboySide,
  faTshirt,
  faShoePrints,
  faStore
} from '@fortawesome/free-solid-svg-icons'



const mainRoutes = [{
    path: "/",
    name: "Home",
    icon: DashboardIcon,
    component: HomePage,
    exact: true,
    hideFromDrawer: true

  },
  {
    path: "/checkout",
    name: "Checkout",
    icon: DashboardIcon,
    component: CheckoutPage,
    exact: true,
    hideFromDrawer: true
  },
  {
    path: "/signin",
    name: "Login/Register",
    icon: WorkIcon,
    component: AuthenticationPage,
    hideFromDrawer: true
  },
  {
    path: "/shop",
    name: "Shop",
    icon: faStore,
    component: ShopPage,
    size: 'lg'
  },
  {
    path: "/shop/mens",
    name: "Mens",
    icon: faMars,
    component: ShopPage,
    size: '2x',
  },
  {
    path: "/shop/womens",
    name: "Womens",
    icon: faVenus,
    component: ShopPage,
    size: '2x'
  },
  {
    path: "/shop/hats",
    name: "Hats",
    icon: faHatCowboySide,
    component: ShopPage,
    size: 'lg'
  },

  {
    path: "/shop/jackets",
    name: "Jackets",
    icon: faTshirt,
    component: ShopPage,
    size: 'lg'
  },
  {
    path: "/shop/sneakers",
    name: "Sneakers",
    icon: faShoePrints,
    component: ShopPage,
    size: 'lg'

  },

];
export default mainRoutes;