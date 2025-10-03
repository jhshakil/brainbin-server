import config from "../config";
import { AUTH_ROLE } from "../modules/auth/auth.constant";
import { Auth } from "../modules/auth/auth.modal";

const superUser = {
  name: "Super Admin",
  email: config.super_admin_email,
  password: config.super_admin_password,
  role: AUTH_ROLE.superAdmin,
};

const seedSuperAdmin = async () => {
  const isSuperAdminExits = await Auth.findOne({ role: AUTH_ROLE.superAdmin });

  if (!isSuperAdminExits) {
    await Auth.create(superUser);
  }
};

export default seedSuperAdmin;
