import * as ROUTES from "../../constants/routes";
// import image1 from "../../assets/images/img-1.png";
// import image2 from "../../assets/images/img-2.png";
import image3 from "../../assets/images/img-3.png";
import logo from "../../assets/images/logo.png";


export const Side_Menu_Links = [
  {
    icon: "desktop",
    text: "Dashboard",
    link: ROUTES.DASHBOARD,
    count: 50
  },
  {
    icon: "desktop",
    text: "Brand Introduction",
    link: ROUTES.BRAND,
    count: 50
  },
  {
    icon: "pie-chart",
    text: "Qualify",
    link: ROUTES.QUALIFY,
    count: 13
  },
  {
    icon: "desktop",
    text: "Financials Overview",
    link: ROUTES.FINANCIALS,
    count: 244
  },
  {
    icon: "pie-chart",
    text: "Meet the Franchisees",
    link: ROUTES.MEET_The_FRANCHISEES,
    count: 65
  },
  {
    icon: "desktop",
    text: "Discovery Day",
    link: ROUTES.DISCOVERY_DAY,
    count: 11
  },
  {
    icon: "pie-chart",
    text: "Executive Interview",
    link: ROUTES.EXECUTIVE_INTERVIEW,
    count: 3
  }];

export const Dashboard_Image = [
  {
    image: image3,
    title: "Dashboard Home"
  }
];

export const Images = [
  {
    image: image3,
    title: "Quality"
  },
  {
    image: image3,
    title: "Brand Introduction"
  }
];


export const LOGO = {
  image: logo,
  title: "Tapout Fitness"  
}