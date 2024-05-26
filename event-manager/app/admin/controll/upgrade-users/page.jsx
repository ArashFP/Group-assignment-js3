import { ManageAdmins } from "./_components/manage-admin"


async function UpgradeUsers() {




    return (
      <div>
        <h1 className="text-muted-foreground text-center font-mono font-bold">  Upgrad users </h1>
        <p className="text-muted-foreground text-center font-mono">  Click to select one or multiple users to upgrade to admins </p>
        <ManageAdmins/>
      </div>
    )
  }
  export default UpgradeUsers