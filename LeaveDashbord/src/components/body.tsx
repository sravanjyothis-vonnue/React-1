import { LeaveSchema } from "./leaveSchema";
import { Header } from "./header";
import { Dashbord } from "./dashbordSchema";
export function Body() {
  return (
    <>
      <Header />
      <Dashbord />
      <LeaveSchema />
    </>
  );
}
