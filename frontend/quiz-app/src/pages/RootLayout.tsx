import { Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <div>
      <div>Layout</div>
      <Outlet />
    </div>
  );
}

export default RootLayout;
