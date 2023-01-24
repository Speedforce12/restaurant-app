import axios from "axios";

const menuApi = axios.create({ baseURL: process.env.NEXT_PUBLIC_URI });

// get all menu items
export const getMenus = async () => {
  const response = await menuApi.get("/menu");

  const menus = response.data;

  return menus;
};

// create a menu item
export const createMenu = async (menuItem) => {
  try {
    const response = await menuApi.post("/menu", menuItem);
    const menu = response.data;
    return menu;
  } catch (error) {
    console.log(error);
  }
};

// get one menu item
export const getMenu = async (menuId) => {
  try {
    const response = await menuApi.get(`/menu/${menuId}`);
    const menu = response.data;
    return menu;
  } catch (error) {
    console.log(error);
  }
};

// create a user
export const createUser = async (data) => {
  try {
    const response = await menuApi.post("/auth/singup/", data);
    const user = response.data;
    return user;
  } catch (error) {
    console.log(error);
  }
};
