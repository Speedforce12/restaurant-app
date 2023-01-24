import Menu from "./model/foodItems";

// get all menus
export async function getMenus(req, res) {
  try {
    const menus = await Menu.find({});
    if (!menus) {
      res.status(404).json({ error: "Data not found" });
    }

    res.status(200).json(menus);
  } catch (error) {
    res.status(404).json({ error: "Error fetching Data" });
  }
}

// create a new menu
export async function createMenu(req, res) {
  try {
    if (!req.body) {
      res.status(404).json({ error: "No data provided" });
    }
    const menu = await Menu.create(req.body);
    res.status(201).json({ success: true, data: menu });
  } catch (error) {
    res.status(401).json({ error: "Error While creating menu Item" });
  }
}

// delete an existing user
export async function deleteMenu(req, res) {
  try {
    const { menuId } = req.query;
    if (menuId) {
      const menu = await Menu.findByIdAndDelete(menuId);
      return res
        .status(200)
        .json({ success: "Menu Item deleted successfully" });
    }

    res.status(404).json({ error: "No Menu Item selected for deleting" });
  } catch (error) {
    res.status(404).json({ error: "Error while deleting Menu" });
  }
}

export async function getMenu(req, res) {
  try {
    const { menuId } = req.query;
    const menu = await Menu.findById(menuId);
    if (menu) {
      res.status(200).json(menu);
    }
  } catch (error) {
    res.status(404).json({ error: "Error fetching menu Item data" });
  }
}
