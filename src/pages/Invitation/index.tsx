import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useRouteInvitationMutation } from "../../generated/graphql";
import useQuery from "../../hooks/useQuery";

export const Invitation: React.FC = () => {
  const [routeInvitationMutation] = useRouteInvitationMutation();
  const history = useHistory();
  const query = useQuery();
  const keyToken = query.get("projectCode");
  if (!keyToken) {
    history.push("/not-found");
    return <></>;
  }

  useEffect(() => {
    async function express() {
      if (keyToken === null) return;
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
