import React, { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { useRouteInvitationMutation } from "../../generated/graphql";

export const Invitation: React.FC = () => {
  const [routeInvitationMutation] = useRouteInvitationMutation();
  const location = useLocation();
  const history = useHistory();
  const keyToken = location.pathname.split("/")[2];

  useEffect(() => {
    async function express() {
      try {
        await routeInvitationMutation({
          variables: { keyToken },
        });
        history.push("/auth/register");
      } catch (err) {
        console.log(err);
      }
    }
    express();
  }, [keyToken, routeInvitationMutation, history]);

  return <p>Redirecting...</p>;
};

export default Invitation;
